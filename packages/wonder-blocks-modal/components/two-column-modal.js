// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View, MediaLayoutWrapper} from "@khanacademy/wonder-blocks-core";
import type {AriaProps, MediaSize} from "@khanacademy/wonder-blocks-core";

import ModalDialog from "./modal-dialog.js";
import ModalFooter from "./modal-footer.js";
import ModalPanel from "./modal-panel.js";
import ModalContent from "./modal-content.js";

type BaseProps = {|
    ...AriaProps,

    /** Whether to allow the sidebar contents to be fullbleed. */
    fullBleedSidebar: boolean,

    /** The sidebar contents (which becomes the header on mobile screens). */
    sidebar: React.Node,

    /** The main contents. */
    content: React.Node,

    /** The optional footer to display beneath the content. */
    footer?: React.Node,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.  Doing so will result in a console.warn().
     */
    onClose?: () => void,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

type WrappedProps = {|
    ...BaseProps,

    /**
     * The size of the media layout being used. Populated by MediaLayoutWrapper.
     * @ignore
     */
    mediaSize: MediaSize,
|};

class ContentWrapper extends React.Component<WrappedProps> {
    render() {
        const {
            onClose,
            sidebar,
            fullBleedSidebar,
            content,
            footer,
            mediaSize,
        } = this.props;

        if (mediaSize !== "small") {
            return (
                <View style={styles.contentWrapper}>
                    <ModalPanel
                        showCloseButton
                        color="dark"
                        onClose={onClose}
                        style={styles.column}
                        content={
                            fullBleedSidebar ? (
                                <ModalContent style={styles.fullBleed}>
                                    {sidebar}
                                </ModalContent>
                            ) : (
                                sidebar
                            )
                        }
                    />
                    <ModalPanel
                        style={styles.column}
                        content={content}
                        footer={footer}
                    />
                </View>
            );
        }

        return (
            <View style={styles.contentFooterWrapper}>
                <View
                    style={[styles.contentWrapper, styles.smallContentWrapper]}
                >
                    <ModalPanel
                        showCloseButton
                        color="dark"
                        onClose={onClose}
                        style={styles.smallColumn}
                        content={
                            fullBleedSidebar ? (
                                <ModalContent style={styles.fullBleed}>
                                    {sidebar}
                                </ModalContent>
                            ) : (
                                sidebar
                            )
                        }
                        scrollOverflow={false}
                    />
                    <ModalPanel
                        style={styles.smallColumn}
                        content={content}
                        scrollOverflow={false}
                    />
                </View>
                {footer && (
                    <View style={styles.smallFooter}>
                        {!footer ||
                        (typeof footer === "object" &&
                            footer.type === ModalFooter) ? (
                            footer
                        ) : (
                            <ModalFooter>{footer}</ModalFooter>
                        )}
                    </View>
                )}
            </View>
        );
    }
}

const WrappedContentWrapper = MediaLayoutWrapper(ContentWrapper);

/**
 * A two-column modal layout.
 */
export default class TwoColumnModal extends React.Component<BaseProps> {
    static defaultProps = {
        fullBleedSidebar: true,
    };

    render() {
        return (
            <ModalDialog
                // TODO(jeresig): Replace with <Layout/>
                //style={(mediaSize) =>
                //    mediaSize === "small" ? styles.smallDialog : styles.dialog
                //}
                style={styles.dialog}
            >
                <WrappedContentWrapper {...this.props} />
            </ModalDialog>
        );
    }
}

const styles = StyleSheet.create({
    dialog: {
        width: "86.72%",
        maxWidth: 888,
        height: "60.42%",
        minHeight: 464,
    },

    smallDialog: {
        background: Color.white,
    },

    column: {
        flex: "0 0 50%",
    },

    smallColumn: {
        flex: "0 0 auto",
        height: "auto",
    },

    contentFooterWrapper: {
        flexDirection: "column",
        height: "100%",
    },

    contentWrapper: {
        flexDirection: "row",
        height: "100%",
        width: "100%",
    },

    fullBleed: {
        padding: 0,
    },

    smallContentWrapper: {
        flexDirection: "column",
        overflow: "auto",
    },

    smallFooter: {
        minHeight: 64,
    },
});
