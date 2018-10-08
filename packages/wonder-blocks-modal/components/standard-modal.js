// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import ModalDialog from "./modal-dialog.js";
import ModalPanel from "./modal-panel.js";
import ModalContent from "./modal-content.js";
import ModalContext from "./modal-context.js";

type Props = {|
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

    /**
     * An optional header to display above the contents but below the title bar.
     */
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
     * to the `ModalLauncher`.  Doing so will result in a console.warn().
     */
    onClose?: () => void,
|};

/**
 * The "standard" modal layout: a titlebar, a content area, and a footer.
 */
export default class StandardModal extends React.Component<Props> {
    renderCloseButton() {
        const {header, onClose} = this.props;

        return (
            <ModalContext.Consumer>
                {({closeModal}) => {
                    if (closeModal && onClose) {
                        throw new Error(
                            "You've specified 'onClose' on a modal when using ModalLauncher.  Please specify 'onClose' on the ModalLauncher instead",
                        );
                    }
                    return (
                        <IconButton
                            icon={icons.dismiss}
                            // TODO(mdr): Translate this string for i18n.
                            aria-label="Close modal"
                            onClick={closeModal || onClose}
                            kind={header ? "primary" : "tertiary"}
                            light={!!header}
                        />
                    );
                }}
            </ModalContext.Consumer>
        );
    }

    render() {
        const {
            onClose,
            title,
            subtitle,
            header,
            footer,
            content,
            preview,
        } = this.props;

        return (
            <ModalDialog
                // TODO(jeresig): Replace with <Layout/>
                //style={(mediaSize) => mediaSize !== "small" && styles.wrapper}
                style={styles.wrapper}
            >
                <ModalPanel
                    onClose={onClose}
                    titleBar={
                        <Toolbar
                            leftContent={this.renderCloseButton()}
                            title={title}
                            subtitle={subtitle}
                            color={header ? "dark" : "light"}
                        />
                    }
                    header={header}
                    content={content}
                    footer={footer}
                />
                {preview && (
                    <ModalPanel
                        color="dark"
                        style={[
                            styles.preview,
                            // TODO(jeresig): Replace with <Layout/>
                            //(mediaSize) =>
                            //    mediaSize === "small" && styles.smallPreview
                        ]}
                        content={
                            <ModalContent style={styles.previewContent}>
                                {preview}
                            </ModalContent>
                        }
                    />
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
        maxHeight: 624,
    },

    preview: {
        maxWidth: 392,
        flex: "1 0 auto",
    },

    previewContent: {
        padding: "0 64px 0 0",
    },

    smallPreview: {
        display: "none",
    },
});
