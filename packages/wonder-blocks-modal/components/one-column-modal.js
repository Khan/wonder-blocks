// @flow
import * as React from "react";
import propTypes from "prop-types";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";
import Color from "wonder-blocks-color";

import ModalDialog from "./modal-dialog.js";
import ModalPanel from "./modal-panel.js";
import ModalFooter from "./modal-footer.js";

type Props = {
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
     */
    onClickCloseButton: () => void,
};

class ContentWrapper extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    static contextTypes = {
        gridSize: propTypes.string,
    };

    render() {
        const {onClickCloseButton, content, footer} = this.props;
        const {gridSize} = this.context;

        if (gridSize !== "small") {
            return (
                <View style={styles.contentWrapper}>
                    <ModalPanel
                        showCloseButton
                        onClickCloseButton={onClickCloseButton}
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
                        onClickCloseButton={onClickCloseButton}
                        content={content}
                        scrollOverflow={false}
                    />
                </View>
                {footer && (
                    <View style={styles.smallFooter}>
                        {/* $FlowFixMe(0.57): flow can't find 'type' on React$Portal */}
                        {!footer || footer.type === ModalFooter ? (
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

/**
 * A one-column modal layout.
 */
export default class OneColumnModal extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    render() {
        return (
            <ModalDialog
                style={[
                    styles.dialog,
                    (gridSize) => gridSize !== "small" && styles.largeDialog,
                ]}
            >
                <ContentWrapper {...this.props} />
            </ModalDialog>
        );
    }
}

const styles = StyleSheet.create({
    dialog: {
        background: Color.white,
    },

    largeDialog: {
        width: "64.65%",
    },

    contentFooterWrapper: {
        flexDirection: "column",
        height: "100%",
    },

    contentWrapper: {
        flexDirection: "row",
    },

    smallContentWrapper: {
        flexDirection: "column",
        overflow: "auto",
    },

    smallFooter: {
        minHeight: 64,
    },
});
