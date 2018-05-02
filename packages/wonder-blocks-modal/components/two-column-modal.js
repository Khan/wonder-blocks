// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";
import {Grid, Row, Cell, FlexCell, GRID_MODAL_SPEC} from "wonder-blocks-grid";

import ModalCloseButton from "./modal-close-button.js";
import ModalFooter from "./modal-footer.js";

/**
 * A two-column modal layout.
 */
export default class TwoColumnModal extends React.Component<{
    /** The sidebar column's content. */
    sidebar: React.Node,

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

    /** The footer to show under the main column's content. */
    footer?: React.Node,

    /** The main column's content. */
    content: React.Node,

    /** Should the sidebar be made smaller? (e.g. 1 column wide) */
    smallSidebar: boolean,
}> {
    static defaultProps = {
        onClickCloseButton: () => {},
        smallSidebar: false,
    };

    renderSidebar(sidebar: React.Node, smallSidebar: boolean) {
        if (smallSidebar) {
            return (
                <Cell
                    smCols={4}
                    largeCols={1}
                    style={[
                        styles.column,
                        styles.bgSidebar,
                        styles.bgSidebarSmall,
                    ]}
                >
                    {sidebar}
                </Cell>
            );
        }

        return (
            <FlexCell style={[styles.column, styles.bgSidebar]}>
                <View style={styles.sidebar}>{sidebar}</View>
            </FlexCell>
        );
    }

    render() {
        const {sidebar, footer, content, smallSidebar} = this.props;

        return (
            <View style={styles.container}>
                <Grid spec={GRID_MODAL_SPEC}>
                    <Row flush>
                        {this.renderSidebar(sidebar, smallSidebar)}
                        <FlexCell style={[styles.column, styles.bgContents]}>
                            <View
                                style={[
                                    styles.contents,
                                    smallSidebar && styles.contentsSmall,
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
                        color="light"
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

        width: "86.72%",

        borderRadius: 4,
        overflow: "hidden",

        // For sidebar
        minHeight: 464,
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

        // For sidebar
        minHeight: 464,
    },

    bgSidebar: {
        background: Color.darkBlue,
        color: Color.white,
    },

    bgSidebarSmall: {
        flex: "0",
    },

    bgContents: {
        background: Color.white,
        position: "relative",
        flexDirection: "column",

        // For sidebar
        display: "flex",
    },

    sidebar: {
        marginRight: 32,
    },

    contents: {
        overflow: "auto",
        flex: "1 0 0",

        // For sidebar
        marginLeft: 64,
        maxWidth: 472,
    },

    contentsHasFooter: {
        paddingBottom: 48,
    },

    contentsSmall: {
        // Center the contents when the sidebar is small
        margin: "0 auto",

        // Add in some extra padding to the contents to
        // simulate the extra gutters used for spacing
        paddingLeft: 64,
        paddingRight: 32,
    },

    footer: {
        position: "absolute",
        left: 0,
        bottom: 0,
    },
});
