// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

import ModalCloseButton from "./modal-close-button.js";

import typeof ModalContent from "./modal-content.js";
import typeof ModalTitleBar from "./modal-title-bar.js";
import typeof ModalHeader from "./modal-header.js";
import typeof ModalFooter from "./modal-footer.js";

export default class ModalContentPane extends React.Component<{
    content: React.Element<ModalContent>,
    titlebar?: React.Element<ModalTitleBar>,
    header?: React.Element<ModalHeader>,
    footer?: React.Element<ModalFooter>,
    showCloseButton: boolean,
    color: "light" | "dark",
    style?: any,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.
     *
     * This defaults to a no-op via `defaultProps`. (When used in a
     * `ModalLauncher`, we'll automatically add an extra listener here via
     * `cloneElement`, so that the `ModalLauncher` can listen for close button
     * clicks too.)
     */
    onClickCloseButton: () => void,
}> {
    static defaultProps = {
        showCloseButton: false,
        color: "light",
        onClickCloseButton: () => {},
    };

    render() {
        const {
            content,
            titlebar,
            header,
            footer,
            showCloseButton,
            onClickCloseButton,
            color,
            style,
        } = this.props;

        const mainContent =
            titlebar || footer
                ? React.cloneElement(content, {
                      style: [
                          titlebar && styles.hasTitle,
                          footer && styles.hasFooter,
                          content.props.style,
                      ],
                  })
                : content;

        return (
            <View
                style={[styles.wrapper, color === "dark" && styles.dark, style]}
            >
                {showCloseButton && (
                    <View style={styles.closeButton}>
                        <ModalCloseButton
                            color={
                                color === "dark" ||
                                (titlebar && titlebar.props.color === "dark")
                                    ? "light"
                                    : "dark"
                            }
                            onClick={onClickCloseButton}
                        />
                    </View>
                )}
                {titlebar}
                {header}
                {mainContent}
                {footer}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: "1 1 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "white",
        boxSizing: "border-box",
    },

    closeButton: {
        position: "absolute",
        left: 4,
        top: 8,
    },

    dark: {
        background: Color.darkBlue,
        color: Color.white,
    },

    hasTitle: {
        paddingTop: 32,
    },

    hasFooter: {
        paddingBottom: 32,
    },
});
