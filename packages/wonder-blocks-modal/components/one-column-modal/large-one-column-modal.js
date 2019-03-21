// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";

import ModalDialog from "../modal-dialog.js";
import ModalPanel from "../modal-panel.js";

import type {Props} from "./one-column-modal.js";

export default class LargeOneColumnModal extends React.Component<Props> {
    render() {
        const {onClose, content, footer} = this.props;

        return (
            <ModalDialog style={styles.dialog}>
                <View style={styles.contentWrapper}>
                    <ModalPanel
                        showCloseButton
                        onClose={onClose}
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
        background: Color.white,
        width: "64.65%",
        maxWidth: 662,
        maxHeight: "90%",
    },

    contentWrapper: {
        width: "100%",
    },
});
