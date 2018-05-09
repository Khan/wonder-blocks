// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import ModalDialog from "./modal-dialog.js";
import ModalContentPane from "./modal-content-pane.js";
import ModalHeader from "./modal-header.js";
import ModalFooter from "./modal-footer.js";
import ModalContent from "./modal-content.js";
import ModalTitleBar from "./modal-title-bar.js";

type Props = {
    /**
     * The content of the modal, appearing between the titlebar and footer.
     */
    content: React.Node,

    /**
     * The title of the modal, appearing in the titlebar.
     *
     * If a subtitle is also present, this becomes smaller to accommodate both
     * within the title bar.
     */
    title: string,

    /**
     * The subtitle of the modal, appearing in the titlebar, below the title.
     */
    subtitle?: string,

    /**
     * The content of the modal's footer. A great place for buttons!
     *
     * Content is right-aligned by default. To control alignment yourself,
     * provide a container element with 100% width.
     */
    footer: React.Node,

    header?: React.Node,

    /**
     * An optional preview area to show on the right-hand-side of the modal.
     */
    preview?: React.Node,

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

/**
 * The "standard" modal layout: a titlebar, a content area, and a footer.
 */
export default class StandardModal extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };
    render() {
        const {
            onClickCloseButton,
            title,
            subtitle,
            header,
            footer,
            content,
            preview,
        } = this.props;

        return (
            <ModalDialog style={styles.wrapper}>
                <ModalContentPane
                    showCloseButton
                    onClickCloseButton={onClickCloseButton}
                    titlebar={
                        <ModalTitleBar
                            title={title}
                            subtitle={subtitle}
                            color={header ? "dark" : "light"}
                        />
                    }
                    header={
                        header ? <ModalHeader>{header}</ModalHeader> : undefined
                    }
                    content={<ModalContent>{content}</ModalContent>}
                    footer={
                        footer ? <ModalFooter>{footer}</ModalFooter> : undefined
                    }
                />
                {preview ? (
                    <ModalContentPane
                        color="dark"
                        style={styles.preview}
                        content={
                            <ModalContent style={styles.previewContent}>
                                {preview}
                            </ModalContent>
                        }
                    />
                ) : (
                    undefined
                )}
            </ModalDialog>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: "93.75%",
        maxWidth: 960,
        height: "81.25%",
        minHeight: 200,
        maxHeight: 624,
    },

    preview: {
        maxWidth: 392,
        flex: "1 0 auto",
    },

    previewContent: {
        padding: "0 64px 0 0",
    },
});
