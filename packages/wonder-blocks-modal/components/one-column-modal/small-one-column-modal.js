// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";

import ModalDialog from "../modal-dialog.js";
import ModalPanel from "../modal-panel.js";
import ModalFooter from "../modal-footer.js";

import type {Props} from "./one-column-modal.js";

export default class SmallOneColumnModal extends React.Component<Props> {
    render() {
        const {onClose, content, footer} = this.props;

        return (
            <ModalDialog style={styles.dialog}>
                <View style={styles.contentFooterWrapper}>
                    <View style={styles.smallContentWrapper}>
                        <ModalPanel
                            showCloseButton
                            onClose={onClose}
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
        background: Color.white,
    },

    contentFooterWrapper: {
        flexDirection: "column",
        height: "100%",
    },

    contentWrapper: {
        width: "100%",
    },

    smallContentWrapper: {
        flexDirection: "column",
        overflow: "auto",
        height: "100%",
        width: "100%",
    },

    smallFooter: {
        minHeight: 64,
    },
});
