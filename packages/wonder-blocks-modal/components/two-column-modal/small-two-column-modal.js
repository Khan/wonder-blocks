// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";

import ModalDialog from "../modal-dialog.js";
import ModalFooter from "../modal-footer.js";
import ModalPanel from "../modal-panel.js";
import ModalContent from "../modal-content.js";

import type {Props} from "./two-column-modal.js";

export default class SmallTwoColumnModal extends React.Component<Props> {
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
                    {!!footer && (
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
