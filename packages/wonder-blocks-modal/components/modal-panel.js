// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {MockStyleSheet} from "@khanacademy/wonder-blocks-layout";

import ModalContent from "./modal-content.js";
import ModalHeader from "./modal-header.js";
import ModalFooter from "./modal-footer.js";
import CloseButton from "./close-button.js";

type Props = {|
    /**
     * The main contents of the ModalPanel. All other parts of the panel
     * are positioned around it.
     */
    content: React.Element<typeof ModalContent> | React.Node,
    /** The Dialog header */
    header?: React.Element<typeof ModalHeader> | React.Node,
    /** A footer to show beneath the contents. */
    footer?: React.Element<typeof ModalFooter> | React.Node,
    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible: boolean,
    /**
     * Should the contents of the panel become scrollable should they
     * become too tall?
     */
    scrollOverflow: boolean,
    /** The color of the panel (defaults to light). */
    color: "light" | "dark",
    /** Any optional styling to apply to the panel. */
    style?: StyleType,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you should not use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.  Doing so will throw an error.
     */
    onClose?: () => mixed,
|};

export default class ModalPanel extends React.Component<Props> {
    static defaultProps = {
        closeButtonVisible: true,
        scrollOverflow: true,
        color: "light",
    };

    maybeRenderCloseButton() {
        const {closeButtonVisible, onClose, color} = this.props;

        if (!closeButtonVisible) {
            return null;
        }

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <CloseButton
                        light={color === "dark"}
                        onClick={onClose}
                        style={styles.closeButton}
                    />
                )}
            </MediaLayout>
        );
    }

    renderMainContent(styles: MockStyleSheet) {
        const {
            content,
            footer,
            scrollOverflow,
            closeButtonVisible,
        } = this.props;

        const mainContent = ModalContent.isClassOf(content) ? (
            ((content: any): React.Element<typeof ModalContent>)
        ) : (
            <ModalContent>{content}</ModalContent>
        );

        if (!mainContent) {
            return mainContent;
        }

        return React.cloneElement(mainContent, {
            // Pass the scrollOverflow and header in to the main content
            scrollOverflow,
            // We override the styling of the main content to help position
            // it if there is a title bar, footer, or close button being
            // shown. We have to do this here as the ModalContent doesn't
            // know about things being positioned around it.
            style: [
                !!footer && styles.hasFooter,
                closeButtonVisible && styles.withCloseButton,
                mainContent.props.style,
            ],
        });
    }

    render() {
        const {footer, header, color, style} = this.props;

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => {
                    const mainContent = this.renderMainContent(styles);

                    return (
                        <View
                            style={[
                                styles.wrapper,
                                color === "dark" && styles.dark,
                                style,
                            ]}
                        >
                            {this.maybeRenderCloseButton()}
                            {header}
                            {mainContent}
                            {!footer || ModalFooter.isClassOf(footer) ? (
                                footer
                            ) : (
                                <ModalFooter>{footer}</ModalFooter>
                            )}
                        </View>
                    );
                }}
            </MediaLayout>
        );
    }
}

const styleSheets = {
    all: StyleSheet.create({
        wrapper: {
            flex: "1 1 auto",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            background: "white",
            boxSizing: "border-box",
            overflow: "hidden",
            height: "100%",
            width: "100%",
        },

        closeButton: {
            position: "absolute",
            right: 16,
            top: 16,
            // This is to allow the button to be tab-ordered before the modal
            // content but still be above the header and content.
            zIndex: 1,
        },

        dark: {
            background: Color.darkBlue,
            color: Color.white,
        },

        hasFooter: {
            paddingBottom: 32,
        },
    }),

    small: StyleSheet.create({
        closeButton: {
            right: 16,
            top: 16,
        },

        withCloseButton: {
            paddingTop: 64,
        },
    }),
};
