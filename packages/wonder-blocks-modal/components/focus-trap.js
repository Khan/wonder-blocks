// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

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
export default class FocusTrap extends React.Component<{children: React.Node}> {
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
