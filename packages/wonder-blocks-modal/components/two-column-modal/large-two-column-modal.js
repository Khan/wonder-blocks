// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";

import ModalDialog from "../modal-dialog.js";
import ModalPanel from "../modal-panel.js";
import ModalContent from "../modal-content.js";

import type {Props} from "./two-column-modal.js";

export default class LargeTwoColumnModal extends React.Component<Props> {
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
