// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import {View} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

/**
 * This component ensures that focus stays within itself. If the user uses Tab
 * at the end of the modal, or Shift-Tab at the start of the modal, then this
 * component wraps focus to the start/end respectively.
 *
 * We use this in `ModalBackdrop` to ensure that focus stays within the launched
 * modal.
 *
 * Adapted from the WAI-ARIA dialog behavior example.
 * https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/dialog-modal/dialog.html
 *
 * NOTE(mdr): This component frequently references the "modal" and the "modal
 *     root", to aid readability in this package. But this component isn't
 *     actually coupled to the modal, and these could be renamed "children"
 *     instead if we were to generalize!
 */

type Props = {|
    children: React.Node,

    /**
     * Style applied to the View containing children.
     * TODO(kevinb): only allow z-index to be specified.  We'll be able to remove
     * this prop once we remove all uses of z-indexes from webapp.
     */
    style?: StyleType,
|};

export default class FocusTrap extends React.Component<Props> {
    /** The most recent node _inside this component_ to receive focus. */
    lastNodeFocusedInModal: ?Node;

    /**
     * Whether we're currently applying programmatic focus, and should therefore
     * ignore focus change events.
     */
    ignoreFocusChanges: boolean;

    /**
     * Tabbing is restricted to descendents of this element.
     */
    modalRoot: ?Node;

    constructor(props: Props) {
        super(props);

        this.lastNodeFocusedInModal = null;
        this.ignoreFocusChanges = false;
    }

    componentDidMount() {
        window.addEventListener("focus", this.handleGlobalFocus, true);
    }

    componentWillUnmount() {
        window.removeEventListener("focus", this.handleGlobalFocus, true);
    }

    getModalRoot: (node: any) => void = (node) => {
        if (!node) {
            // The component is being umounted
            return;
        }

        const modalRoot = ReactDOM.findDOMNode(node);
        if (!modalRoot) {
            throw new Error(
                "Assertion error: modal root should exist after mount",
            );
        }
        this.modalRoot = modalRoot;
    };

    /** Try to focus the given node. Return true iff successful. */
    tryToFocus(node: Node): ?boolean {
        if (node instanceof HTMLElement) {
            this.ignoreFocusChanges = true;
            try {
                node.focus();
            } catch (e) {
                // ignore error
            }
            this.ignoreFocusChanges = false;

            return document.activeElement === node;
        }
    }

    /**
     * Focus the first focusable descendant of the given node.
     *
     * Return true if we succeed. Or, if the given node has no focusable
     * descendants, return false.
     */
    focusFirstElementIn(currentParent: Node): boolean {
        const children = currentParent.childNodes;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (this.tryToFocus(child) || this.focusFirstElementIn(child)) {
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
    focusLastElementIn(currentParent: Node): boolean {
        const children = currentParent.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            if (this.tryToFocus(child) || this.focusLastElementIn(child)) {
                return true;
            }
        }
        return false;
    }

    /** This method is called when any node on the page is focused. */
    handleGlobalFocus: (e: FocusEvent) => void = (e) => {
        // If we're busy applying our own programmatic focus, we ignore focus
        // changes, to avoid an infinite loop.
        if (this.ignoreFocusChanges) {
            return;
        }

        const target = e.target;
        if (!(target instanceof Node)) {
            // Sometimes focus events trigger on the document itself. Ignore!
            return;
        }

        const modalRoot = this.modalRoot;
        if (!modalRoot) {
            return;
        }

        if (modalRoot.contains(target)) {
            // If the newly focused node is inside the modal, we just keep track
            // of that.
            this.lastNodeFocusedInModal = target;
        } else {
            // If the newly focused node is outside the modal, we try refocusing
            // the first focusable node of the modal. (This could be the user
            // pressing Tab on the last node of the modal, or focus escaping in
            // some other way.)
            this.focusFirstElementIn(modalRoot);

            // But, if it turns out that the first focusable node of the modal
            // was what we were previously focusing, then this is probably the
            // user pressing Shift-Tab on the first node, wanting to go to the
            // end. So, we instead try focusing the last focusable node of the
            // modal.
            if (document.activeElement === this.lastNodeFocusedInModal) {
                this.focusLastElementIn(modalRoot);
            }

            // Focus should now be inside the modal, so record the newly-focused
            // node as the last node focused in the modal.
            this.lastNodeFocusedInModal = document.activeElement;
        }
    };

    render(): React.Node {
        const {style} = this.props;

        return (
            <React.Fragment>
                {/* When you press Tab on the last focusable node of the
                 * document, some browsers will move your tab focus outside of
                 * the document. But we want to capture that as a focus event,
                 * and move focus back into the modal! So, we add focusable
                 * sentinel nodes. That way, tabbing out of the modal should
                 * take you to a sentinel node, rather than taking you out of
                 * the document. These sentinels aren't critical to focus
                 * wrapping, though; we're resilient to any kind of focus
                 * shift, whether it's to the sentinels or somewhere else!
                 * We set the sentinels to be position: fixed to make sure
                 * they're always in view, this prevents page scrolling when
                 * tabbing. */}
                <div tabIndex="0" style={{position: "fixed"}} />
                <View style={style} ref={this.getModalRoot}>
                    {this.props.children}
                </View>
                <div tabIndex="0" style={{position: "fixed"}} />
            </React.Fragment>
        );
    }
}
