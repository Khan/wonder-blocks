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
     * to the `ModalLauncher`.
     *
     * This defaults to a no-op via `defaultProps`. (When used in a
     * `ModalLauncher`, we'll automatically add an extra listener here via
     * `cloneElement`, so that the `ModalLauncher` can listen for close button
     * clicks too.)
     * @ignore
     */
    onClickCloseButton?: () => void,
|};

class SmallOneColumnModal extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    render() {
        const {onClickCloseButton, content, footer} = this.props;

        return (
            <ModalDialog style={styles.dialog}>
                <View style={styles.contentFooterWrapper}>
                    <View style={styles.smallContentWrapper}>
                        <ModalPanel
                            showCloseButton
                            onClickCloseButton={onClickCloseButton}
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
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    render() {
        const {onClickCloseButton, content, footer} = this.props;

        return (
            <ModalDialog style={[styles.dialog, styles.largeDialog]}>
                <View style={styles.contentWrapper}>
                    <ModalPanel
                        showCloseButton
                        onClickCloseButton={onClickCloseButton}
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
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    render() {
        return (
            <React.Fragment>
                <Layout mdOrLarger={false}>
                    <SmallOneColumnModal {...this.props} />
                </Layout>
                <Layout small={false}>
                    <LargeOneColumnModal {...this.props} />
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
