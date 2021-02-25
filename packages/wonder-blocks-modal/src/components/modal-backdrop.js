// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {ModalLauncherPortalAttributeName} from "../util/constants.js";

import type {ModalElement} from "../util/types.js";

type Props = {|
    children: ModalElement,
    onCloseModal: () => mixed,
    /**
     * The selector for the element that will be focused when the dialog shows.
     * When not set, the first tabbable element within the dialog will be used.
     */
    initialFocusId?: string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

/**
 * List of elements that can be focused
 * @see https://www.w3.org/TR/html5/editing.html#can-be-focused
 */
const FOCUSABLE_ELEMENTS =
    'a[href], details, input, textarea, select, button:not([aria-label^="Close"])';

/**
 * A private component used by ModalLauncher. This is the fixed-position
 * container element that gets mounted outside the DOM. It overlays the modal
 * content (provided as `children`) over the content, with a gray backdrop
 * behind it.
 *
 * This component is also responsible for cloning the provided modal `children`,
 * and adding an `onClose` prop that will call `onCloseModal`. If an
 * `onClose` prop is already provided, the two are merged.
 */
export default class ModalBackdrop extends React.Component<Props> {
    componentDidMount() {
        const node: HTMLElement = (ReactDOM.findDOMNode(this): any);
        if (!node) {
            return;
        }

        const firstFocusableElement =
            // 1. try to get element specified by the user
            this._getInitialFocusElement(node) ||
            // 2. get first occurence from list of focusable elements
            this._getFirstFocusableElement(node) ||
            // 3. get the dialog itself
            this._getDialogElement(node);

        // wait for styles to applied
        setTimeout(() => {
            firstFocusableElement.focus();
        }, 0);
    }

    /**
     * Returns an element specified by the user
     */
    _getInitialFocusElement(node: HTMLElement): HTMLElement | null {
        const {initialFocusId} = this.props;

        if (!initialFocusId) {
            return null;
        }

        return (ReactDOM.findDOMNode(
            node.querySelector(`#${initialFocusId}`),
        ): any);
    }

    /**
     * Returns the first focusable element found inside the Dialog
     */
    _getFirstFocusableElement(node: HTMLElement): HTMLElement | null {
        // get a collection of elements that can be focused
        const focusableElements = node.querySelectorAll(FOCUSABLE_ELEMENTS);

        if (!focusableElements) {
            return null;
        }

        // if found, return the first focusable element
        return focusableElements[0];
    }

    /**
     * Returns the dialog element
     */
    _getDialogElement(node: HTMLElement): HTMLElement {
        // If no focusable elements are found,
        // the dialog content element itself will receive focus.
        const dialogElement: HTMLElement = (ReactDOM.findDOMNode(
            node.querySelector('[role="dialog"]'),
        ): any);
        // add tabIndex to make the Dialog focusable
        dialogElement.tabIndex = -1;

        return dialogElement;
    }

    /**
     * When the user clicks on the gray backdrop area (i.e., the click came
     * _directly_ from the positioner, not bubbled up from its children), close
     * the modal.
     */
    handleClick: (e: SyntheticEvent<>) => void = (e: SyntheticEvent<>) => {
        // Was the lowest-level click target (`e.target`) the positioner element
        // (`e.currentTarget`)?
        if (e.target === e.currentTarget) {
            this.props.onCloseModal();
        }
    };

    render(): React.Node {
        const {children, testId} = this.props;
        const backdropProps = {
            [ModalLauncherPortalAttributeName]: true,
        };

        return (
            <View
                style={styles.modalPositioner}
                onClick={this.handleClick}
                testId={testId}
                {...backdropProps}
            >
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalPositioner: {
        position: "fixed",
        left: 0,
        top: 0,

        width: "100%",
        height: "100%",

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
