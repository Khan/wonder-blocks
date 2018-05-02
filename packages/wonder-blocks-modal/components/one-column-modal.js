// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";
import {Grid, Row, Cell, FlexCell, GRID_MODAL_SPEC} from "wonder-blocks-grid";

import ModalCloseButton from "./modal-close-button.js";
import ModalFooter from "./modal-footer.js";

/**
 * A one-column modal layout.
 */
export default class OneColumnModal extends React.Component<{
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

    /** The footer to show under the contents. */
    footer?: React.Node,

    /** The contents of the modal. */
    content: React.Node,
}> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    render() {
        const {footer, content} = this.props;

        return (
            <View style={styles.container}>
                <Grid spec={GRID_MODAL_SPEC}>
                    <Row flush>
                        <FlexCell style={[styles.column, styles.bgContents]}>
                            <View
                                style={[
                                    styles.contents,
                                    footer && styles.contentsHasFooter,
                                ]}
                            >
                                {content}
                            </View>
                            {footer && (
                                <ModalFooter style={styles.footer}>
                                    {footer}
                                </ModalFooter>
                            )}
                        </FlexCell>
                    </Row>
                </Grid>
                <View style={styles.closeButton}>
                    <ModalCloseButton
                        color="dark"
                        onClick={this.props.onClickCloseButton}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: "0 auto",
        position: "relative",

        width: "64.65%",

        borderRadius: 4,
        overflow: "hidden",
    },

    closeButton: {
        position: "absolute",
        left: 4,
        top: 8,
    },

    column: {
        paddingTop: 64,
        paddingBottom: 64,
        flex: "1 1 50%",
        boxSizing: "border-box",
    },

    bgContents: {
        background: Color.white,
        position: "relative",
        flexDirection: "column",
    },

    contents: {
        overflow: "auto",
        flex: "1 0 0",
    },

    contentsHasFooter: {
        paddingBottom: 48,
    },

    footer: {
        position: "absolute",
        left: 0,
        bottom: 0,
    },
});
