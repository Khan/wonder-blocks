// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

import FocusTrap from "./focus-trap.js";
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
                {/* When you press Tab on the last focusable node of the
                  * document, some browsers will move your tab focus outside of
                  * the document. But we want to capture that as a focus event,
                  * and move focus back into the modal! So, we add focusable
                  * sentinel nodes. That way, tabbing out of the modal should
                  * take you to a sentinel node, rather than taking you out of
                  * the document. These sentinels aren't critical to focus
                  * wrapping, though; we're resilient to any kind of focus
                  * shift, whether it's to the sentinels or somewhere else! */}
                <div tabIndex="0" />
                <FocusTrap>{clonedChildren}</FocusTrap>
                <div tabIndex="0" />
            </View>
        );
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
