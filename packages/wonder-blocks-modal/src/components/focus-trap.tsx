import * as React from "react";
import * as ReactDOM from "react-dom";

import {View} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

/**
 * List of elements that can be focused
 * @see https://www.w3.org/TR/html5/editing.html#can-be-focused
 */
const FOCUSABLE_ELEMENTS =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

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

type Props = {
    children: React.ReactNode;
    /**
     * Style applied to the View containing children.
     * TODO(kevinb): only allow z-index to be specified.  We'll be able to remove
     * this prop once we remove all uses of z-indexes from webapp.
     */
    style?: StyleType;
};

export default class FocusTrap extends React.Component<Props> {
    /**
     * Tabbing is restricted to descendents of this element.
     */
    modalRoot: Node | null | undefined;

    getModalRoot: (node?: any) => void = (node) => {
        if (!node) {
            // The component is being umounted
            return;
        }

        // eslint-disable-next-line import/no-deprecated
        const modalRoot = ReactDOM.findDOMNode(node);
        if (!modalRoot) {
            throw new Error(
                "Assertion error: modal root should exist after mount",
            );
        }
        this.modalRoot = modalRoot;
    };

    /**
     * Try to focus the given node. Return true if successful.
     */
    tryToFocus(node: Node): boolean | null | undefined {
        if (node instanceof HTMLElement) {
            try {
                node.focus();
            } catch (e: any) {
                // ignore error
            }

            return document.activeElement === node;
        }
    }

    /**
     * Focus the next available focusable element within the modal root.
     *
     * @param {boolean} isLast Used to determine the next available item. true =
     * First element within the modal, false = Last element within the modal.
     */
    focusElementIn(isLast: boolean) {
        const modalRootAsHtmlEl = this.modalRoot as HTMLElement;
        // Get the list of available focusable elements within the modal.
        const focusableNodes = Array.from(
            modalRootAsHtmlEl.querySelectorAll(FOCUSABLE_ELEMENTS),
        );

        const nodeIndex = !isLast ? focusableNodes.length - 1 : 0;

        const focusableNode = focusableNodes[nodeIndex];
        this.tryToFocus(focusableNode);
    }

    /**
     * Triggered when the focus is set to the first sentinel. This way, the
     * focus will be redirected to the last element inside the modal dialog.
     */
    handleFocusMoveToLast: () => void = () => {
        this.focusElementIn(false);
    };

    /**
     * Triggered when the focus is set to the last sentinel. This way, the focus
     * will be redirected to the first element inside the modal dialog.
     */
    handleFocusMoveToFirst: () => void = () => {
        this.focusElementIn(true);
    };

    render(): React.ReactNode {
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
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO: Address a11y error */}
                <div
                    tabIndex={0}
                    className="modal-focus-trap-first"
                    onFocus={this.handleFocusMoveToLast}
                    style={{position: "fixed"}}
                />
                <View style={style} ref={this.getModalRoot}>
                    {this.props.children}
                </View>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO: Address a11y error */}
                <div
                    tabIndex={0}
                    className="modal-focus-trap-last"
                    onFocus={this.handleFocusMoveToFirst}
                    style={{position: "fixed"}}
                />
            </React.Fragment>
        );
    }
}
