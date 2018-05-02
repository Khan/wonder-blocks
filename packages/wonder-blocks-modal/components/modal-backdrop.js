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
    _lastNodeFocusedInRoot: ?Node = null;
    _ignoreFocusChanges: boolean = false;

    componentDidMount() {
        window.addEventListener("focus", this._handleGlobalFocus, true);
    }

    componentWillUnmount() {
        window.removeEventListener("focus", this._handleGlobalFocus, true);
    }

    _getRootNode(): Node {
        return (ReactDOM.findDOMNode(this): any);
    }

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

    _handleGlobalFocus = (e: FocusEvent) => {
        if (this._ignoreFocusChanges) {
            return;
        }

        const target = e.target;
        if (!(target instanceof Node)) {
            // Sometimes focus events trigger on the document itself. Ignore!
            return;
        }

        const root = this._getRootNode();
        if (root.contains(target)) {
            console.log("still in");
            this._lastNodeFocusedInRoot = target;
        } else {
            console.log("got out!");
            this._focusFirstElementIn(root);
            if (document.activeElement === this._lastNodeFocusedInRoot) {
                this._focusLastElementIn(root);
            }
            this._lastNodeFocusedInRoot = document.activeElement;
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
