// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {Layout} from "@khanacademy/wonder-blocks-layout";
import {View} from "@khanacademy/wonder-blocks-core";

import ModalDialog from "./modal-dialog.js";
import ModalPanel from "./modal-panel.js";
import ModalFooter from "./modal-footer.js";

type Props = {|
    /** The modal's content. */
    content: React.Node,

    /** The optional footer to display beneath the contents. */
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

class SmallOneColumnModal extends React.Component<Props> {
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

class LargeOneColumnModal extends React.Component<Props> {
    render() {
        const {onClose, content, footer} = this.props;

        return (
            <ModalDialog style={[styles.dialog, styles.largeDialog]}>
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

/**
 * A one-column modal layout.
 */
export default class OneColumnModal extends React.Component<Props> {
    render() {
        return (
            <React.Fragment>
                <Layout>
                    {({mediaSize}) =>
                        mediaSize === "small"
                         ? <SmallOneColumnModal {...this.props} />
                         : <LargeOneColumnModal {...this.props} />
                    }
                </Layout>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    dialog: {
        background: Color.white,
    },

    largeDialog: {
        width: "64.65%",
        maxWidth: 662,
        maxHeight: "90%",
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
