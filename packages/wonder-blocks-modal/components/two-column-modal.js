// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";

import ModalDialog from "./modal-dialog.js";
import ModalFooter from "./modal-footer.js";
import ModalPanel from "./modal-panel.js";
import ModalContent from "./modal-content.js";

type Props = {|
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
|};

export class SmallTwoColumnModal extends React.Component<Props> {
    render() {
        const {
            onClose,
            sidebar,
            content,
            footer,
            fullBleedSidebar,
        } = this.props;

        return (
            <ModalDialog style={styles.smallDialog}>
                <View style={styles.contentFooterWrapper}>
                    <View
                        style={[
                            styles.contentWrapper,
                            styles.smallContentWrapper,
                        ]}
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
            </ModalDialog>
        );
    }
}

export class LargeTwoColumnModal extends React.Component<Props> {
    render() {
        const {
            onClose,
            sidebar,
            content,
            footer,
            fullBleedSidebar,
        } = this.props;

        return (
            <ModalDialog style={styles.dialog}>
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
            </ModalDialog>
        );
    }
}

/**
 * A two-column modal layout.
 */
export default class TwoColumnModal extends React.Component<Props> {
    static defaultProps = {
        fullBleedSidebar: true,
    };

    render() {
        return (
            <MediaLayout>
                {({mediaSize}) =>
                    mediaSize === "small" ? (
                        <SmallTwoColumnModal {...this.props} />
                    ) : (
                        <LargeTwoColumnModal {...this.props} />
                    )
                }
            </MediaLayout>
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
