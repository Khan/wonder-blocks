// @flow
import * as React from "react";
import propTypes from "prop-types";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";
import Color from "wonder-blocks-color";

import ModalDialog from "./modal-dialog.js";
import ModalFooter from "./modal-footer.js";
import ModalPanel from "./modal-panel.js";

type Props = {
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
        const {onClickCloseButton, sidebar, content, footer} = this.props;
        const {gridSize} = this.context;

        if (gridSize !== "small") {
            return (
                <View style={styles.contentWrapper}>
                    <ModalPanel
                        showCloseButton
                        color="dark"
                        onClickCloseButton={onClickCloseButton}
                        style={styles.column}
                        content={sidebar}
                    />
                    <ModalPanel
                        style={styles.column}
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
                        color="dark"
                        onClickCloseButton={onClickCloseButton}
                        style={styles.smallColumn}
                        content={sidebar}
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
        );
    }
}

/**
 * A two-column modal layout.
 */
export default class TwoColumnModal extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    render() {
        return (
            <ModalDialog
                style={(gridSize) =>
                    gridSize === "small" ? styles.smallDialog : styles.dialog
                }
            >
                <ContentWrapper {...this.props} />
            </ModalDialog>
        );
    }
}

const styles = StyleSheet.create({
    dialog: {
        width: "86.72%",
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
        flex: "0 0",
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
