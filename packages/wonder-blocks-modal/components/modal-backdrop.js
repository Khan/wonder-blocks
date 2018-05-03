// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

import type {ModalElement} from "../util/types.js";

type Props = {
    children: ModalElement,
    onCloseModal: () => void,
};

/**
 * A private component used by ModalLauncher. This is the fixed-position
 * container element that gets mounted outside the DOM. It overlays the modal
 * content (provided as `children`) over the content, with a gray backdrop
 * behind it.
 *
 * This component is also responsible for cloning the provided modal `children`,
 * and adding an `onClickCloseButton` prop that will call `onCloseModal`. If an
 * `onClickCloseButton` prop is already provided, the two are merged.
 */
export default class ModalBackdrop extends React.Component<Props> {
    /**
     * When the user clicks on the gray backdrop area (i.e., the click came
     * _directly_ from the positioner, not bubbled up from its children), close
     * the modal.
     */
    _handleClick = (e: SyntheticEvent<>) => {
        // Was the lowest-level click target (`e.target`) the positioner element
        // (`e.currentTarget`)?
        if (e.target === e.currentTarget) {
            this.props.onCloseModal();
        }
    };

    componentDidMount() {
        // Focus the last button in the modal, on the assumption that it'll be
        // a sensible default action.
        //
        // TODO(mdr): Not sure how robust this is; or whether we'll sometimes
        //     want the default to be something in the modal content, or a
        //     different button, or something else.
        const node: HTMLElement = (ReactDOM.findDOMNode(this): any);
        if (!node) {
            return;
        }

        const buttons = node.querySelectorAll("button");
        const lastButton = buttons[buttons.length - 1];
        if (!lastButton) {
            return;
        }
        lastButton.focus();
    }

    render() {
        const children = this.props.children;
        const clonedChildren = React.cloneElement(children, {
            onClickCloseButton: () => {
                if (typeof children.props.onClickCloseButton === "function") {
                    children.props.onClickCloseButton();
                }
                this.props.onCloseModal();
            },
        });

        return (
            <View style={styles.modalPositioner} onClick={this._handleClick}>
                {/* To ensure that tab wrapping happens inside the modal area,
                  * even if the modal is mounted at the start/end of the
                  * document (end is likely in practice!), we add focusable
                  * sentinel nodes. That way, tabbing out of the modal is more
                  * likely to hit a sentinel node. They're not critical to
                  * focus wrapping, though; we're resilient to any kind of focus
                  * shift, whether they hit the sentinels or not! */}
                <div tabIndex="0" />
                <FocusTrap>{clonedChildren}</FocusTrap>
                <div tabIndex="0" />
            </View>
        );
    }
}

/**
 * This component ensures that focus stays within itself. If the user uses Tab
 * at the end of the modal, or Shift-Tab at the start of the modal, then this
 * component wraps focus to the start/end respectively.
 *
 * Adapted from the WAI-ARIA dialog behavior example.
 * https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/dialog-modal/dialog.html
 */
class FocusTrap extends React.Component<{children: React.Node}> {
    /** The most recent node _inside this component_ to receive focus. */
    _lastNodeFocusedInModal: ?Node = null;

    /**
     * Whether we're currently applying programmatic focus, and should therefore
     * ignore focus change events.
     */
    _ignoreFocusChanges: boolean = false;

    componentDidMount() {
        window.addEventListener("focus", this._handleGlobalFocus, true);
    }

    componentWillUnmount() {
        window.removeEventListener("focus", this._handleGlobalFocus, true);
    }

    /** Get the outermost DOM node of our children. */
    _getModalRoot(): Node {
        const modalRoot = ReactDOM.findDOMNode(this);
        if (!modalRoot) {
            throw new Error(
                "Assertion error: modal root should exist after mount",
            );
        }
        return modalRoot;
    }

    /** Try to focus the given node. Return true iff successful. */
    _tryToFocus(node: Node) {
        if (typeof node.focus !== "function") {
            return;
        }

        this._ignoreFocusChanges = true;
        try {
            node.focus();
        } catch (e) {}
        this._ignoreFocusChanges = false;

        return document.activeElement === node;
    }

    /**
     * Focus the first focusable descendant of the given node.
     *
     * Return true if we succeed. Or, if the given node has no focusable
     * descendants, return false.
     */
    _focusFirstElementIn(currentParent: Node) {
        const children = currentParent.childNodes;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (this._tryToFocus(child) || this._focusFirstElementIn(child)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Focus the last focusable descendant of the given node.
     *
     * Return true if we succeed. Or, if the given node has no focusable
     * descendants, return false.
     */
    _focusLastElementIn(currentParent: Node) {
        const children = currentParent.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            if (this._tryToFocus(child) || this._focusLastElementIn(child)) {
                return true;
            }
        }
        return false;
    }

    /** This method is called when any node on the page is focused. */
    _handleGlobalFocus = (e: FocusEvent) => {
        // If we're busy applying our own programmatic focus, we ignore focus
        // changes, to avoid an infinite loop.
        if (this._ignoreFocusChanges) {
            return;
        }

        const target = e.target;
        if (!(target instanceof Node)) {
            // Sometimes focus events trigger on the document itself. Ignore!
            return;
        }

        const modalRoot = this._getModalRoot();
        if (modalRoot.contains(target)) {
            // If the newly focused node is inside the modal, we just keep track
            // of that.
            this._lastNodeFocusedInModal = target;
        } else {
            // If the newly focused node is outside the modal, we try refocusing
            // the first focusable node of the modal. (This could be the user
            // pressing Tab on the last node of the modal, or focus escaping in
            // some other way.)
            this._focusFirstElementIn(modalRoot);

            // But, if it turns out that the first focusable node of the modal
            // was what we were previously focusing, then this is probably the
            // user pressing Shift-Tab on the first node, wanting to go to the
            // end. So, we instead try focusing the last focusable node of the
            // modal.
            if (document.activeElement === this._lastNodeFocusedInModal) {
                this._focusLastElementIn(modalRoot);
            }

            // Focus should now be inside the modal, so record the newly-focused
            // node as the last node focused in the modal.
            this._lastNodeFocusedInModal = document.activeElement;
        }
    };

    render() {
        return this.props.children;
    }
}

const styles = StyleSheet.create({
    modalPositioner: {
        position: "fixed",
        left: 0,
        top: 0,

        // This z-index is copied from the Khan Academy webapp.
        //
        // TODO(mdr): Should we keep this in a constants file somewhere? Or
        //     not hardcode it at all, and provide it to Wonder Blocks via
        //     configuration?
        zIndex: 1080,

        width: "100%",
        height: "100%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // If the modal ends up being too big for the viewport (e.g., the min
        // height is triggered), add another scrollbar specifically for
        // scrolling modal content.
        //
        // TODO(mdr): The specified behavior is that the modal should scroll
        //     with the rest of the page, rather than separately, if overflow
        //     turns out to be necessary. That sounds hard to do; punting for
        //     now!
        overflow: "auto",

        background: Color.offBlack64,
    },
});
