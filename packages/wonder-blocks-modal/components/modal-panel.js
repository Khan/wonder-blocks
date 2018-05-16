// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

import ModalCloseButton from "./modal-close-button.js";
import ModalContent from "./modal-content.js";
import ModalTitleBar from "./modal-title-bar.js";
import ModalHeader from "./modal-header.js";
import ModalFooter from "./modal-footer.js";

type Props = {
    /**
     * The main contents of the ModalPanel. All other parts of the panel
     * are positioned around it.
     */
    content: React.Element<typeof ModalContent> | React.Node,
    /** A title bar (with optional subtitle) to show at the top of the panel. */
    titleBar?: React.Element<typeof ModalTitleBar>,
    /** A header to show above the contents, but below the title bar. */
    header?: React.Element<typeof ModalHeader> | React.Node,
    /** A footer to show beneath the contents. */
    footer?: React.Element<typeof ModalFooter> | React.Node,
    /** Should a close button be shown on the panel? */
    showCloseButton: boolean,
    /**
     * Should the contents of the panel become scrollable should they
     * become too tall?
     */
    scrollOverflow: boolean,
    /** The color of the panel (defaults to light). */
    color: "light" | "dark",
    /** Any optional styling to apply to the panel. */
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
};

export default class ModalPanel extends React.Component<Props> {
    static defaultProps = {
        showCloseButton: false,
        scrollOverflow: true,
        color: "light",
        onClickCloseButton: () => {},
    };

    render() {
        const {
            content,
            titleBar,
            header,
            footer,
            showCloseButton,
            scrollOverflow,
            onClickCloseButton,
            color,
            style,
        } = this.props;

        let mainContent =
            content &&
            typeof content === "object" &&
            content.type === ModalContent ? (
                ((content: any): React.Element<typeof ModalContent>)
            ) : (
                <ModalContent>{content}</ModalContent>
            );

        if (mainContent) {
            mainContent = React.cloneElement(mainContent, {
                // Pass the scrollOverflow and header in to the main content
                scrollOverflow,
                header: header || mainContent.props.header,
                // We override the styling of the main content to help position
                // it if there is a title bar, footer, or close button being
                // shown. We have to do this here as the ModalContent doesn't
                // know about things being positioned around it.
                style: [
                    titleBar && styles.hasTitleBar,
                    footer && styles.hasFooter,
                    showCloseButton &&
                        !titleBar &&
                        ((gridSize) =>
                            gridSize === "small" &&
                            styles.smallWithCloseButton),
                    mainContent.props.style,
                ],
            });
        }

        // Figure out the background color that'll be behind the close button
        // If a titlebar is specified then we use that, otherwise we use the
        // default background color.
        const topBackgroundColor = (titleBar && titleBar.props.color) || color;

        return (
            <View
                style={[styles.wrapper, color === "dark" && styles.dark, style]}
            >
                {showCloseButton && (
                    <View
                        style={[
                            styles.closeButton,
                            (gridSize) =>
                                gridSize === "small" && styles.smallCloseButton,
                        ]}
                    >
                        <ModalCloseButton
                            color={
                                topBackgroundColor === "dark" ? "light" : "dark"
                            }
                            onClick={onClickCloseButton}
                        />
                    </View>
                )}
                {titleBar}
                {mainContent}
                {/* $FlowFixMe(0.57): flow can't find 'type' on React$Portal */}
                {!footer || footer.type === ModalFooter ? (
                    footer
                ) : (
                    <ModalFooter>{footer}</ModalFooter>
                )}
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
        height: "100%",
    },

    closeButton: {
        position: "absolute",
        left: 4,
        top: 8,
    },

    smallCloseButton: {
        left: 0,
        top: 4,
    },

    dark: {
        background: Color.darkBlue,
        color: Color.white,
    },

    hasTitleBar: {
        paddingTop: 32,
    },

    hasFooter: {
        paddingBottom: 32,
    },

    smallWithCloseButton: {
        paddingTop: 64,
    },
});
