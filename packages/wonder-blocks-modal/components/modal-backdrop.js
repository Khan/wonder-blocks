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

        // try to get a collection of elements that can be focused
        const focusableElements = node.querySelectorAll(FOCUSABLE_ELEMENTS);

        // try to focus the first focusable element
        let firstFocusableElement: HTMLElement = focusableElements[0];

        if (!firstFocusableElement) {
            // If no focusable elements are found,
            // the dialog content element itself will receive focus.
            firstFocusableElement = (ReactDOM.findDOMNode(
                node.querySelector('[role="dialog"]'),
            ): any);
            // add tabIndex to make the Dialog focusable
            firstFocusableElement.tabIndex = -1;
        }

        // wait for styles to applied
        setTimeout(() => {
            firstFocusableElement.focus();
        }, 0);
    }

    /**
     * When the user clicks on the gray backdrop area (i.e., the click came
     * _directly_ from the positioner, not bubbled up from its children), close
     * the modal.
     */
    handleClick = (e: SyntheticEvent<>) => {
        // Was the lowest-level click target (`e.target`) the positioner element
        // (`e.currentTarget`)?
        if (e.target === e.currentTarget) {
            this.props.onCloseModal();
        }
    };

    render() {
        const children = this.props.children;
        const backdropProps = {
            [ModalLauncherPortalAttributeName]: true,
        };

        return (
            <View
                style={styles.modalPositioner}
                onClick={this.handleClick}
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
