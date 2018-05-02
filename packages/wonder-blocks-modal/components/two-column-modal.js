// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";
import {Grid, Row, Cell, FlexCell, GRID_MODAL_SPEC} from "wonder-blocks-grid";

import ModalCloseButton from "./modal-close-button.js";

type Props = {
    /** The sidebar column's content. */
    sidebar?: React.Node,

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
    contents: React.Node,

    /** Should the sidebar be made smaller? (e.g. 1 column wide) */
    smallSidebar: boolean,
};

/**
 * A two-column modal layout.
 */
export default class TwoColumnModal extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
        smallSidebar: false,
    };

    render() {
        const {sidebar, footer, contents, smallSidebar} = this.props;

        const sidebarView = smallSidebar ? (
            <Cell
                smCols={4}
                largeCols={1}
                style={[styles.column, styles.bgSidebar, styles.bgSidebarSmall]}
            >
                {sidebar}
            </Cell>
        ) : (
            <FlexCell style={[styles.column, styles.bgSidebar]}>
                <View style={styles.sidebar}>{sidebar}</View>
            </FlexCell>
        );

        return (
            <View
                style={[
                    styles.container,
                    !sidebar && styles.containerNoSidebar,
                ]}
            >
                <Grid spec={GRID_MODAL_SPEC}>
                    <Row flush>
                        {sidebar && sidebarView}
                        <FlexCell
                            style={[
                                styles.column,
                                styles.bgContents,
                                !sidebar && styles.bgContentsNoSidebar,
                            ]}
                        >
                            <View
                                style={[
                                    styles.contents,
                                    smallSidebar && styles.contentsSmall,
                                    !!footer && styles.contentsHasFooter,
                                    !sidebar && styles.contentsNoSidebar,
                                ]}
                            >
                                {contents}
                            </View>
                            {footer && (
                                <View style={styles.footer}>{footer}</View>
                            )}
                        </FlexCell>
                    </Row>
                </Grid>
                <View style={styles.closeButton}>
                    <ModalCloseButton
                        color={sidebar ? "light" : "dark"}
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
        height: "60.42%",
        minHeight: 464,

        borderRadius: 4,
        overflow: "hidden",
    },

    closeButton: {
        position: "absolute",
        left: 4,
        top: 8,
    },

    containerNoSidebar: {
        minHeight: "auto",
    },

    column: {
        paddingTop: 64,
        paddingBottom: 64,
        minHeight: 464,
        flex: "1 1 50%",
        boxSizing: "border-box",
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
        display: "flex",
        flexDirection: "column",
    },

    bgContentsNoSidebar: {
        minHeight: "auto",
        display: "block",
    },

    sidebar: {
        marginRight: 32,
    },

    contents: {
        marginLeft: 64,
        overflow: "auto",
        flex: "1 0 0",
        maxWidth: 472,
    },

    contentsHasFooter: {
        paddingBottom: 48,
    },

    contentsNoSidebar: {
        marginLeft: 0,
        maxWidth: "auto",
    },

    contentsSmall: {
        margin: "0 auto",
    },

    footer: {
        flex: "0 0 auto",
        boxSizing: "border-box",
        minHeight: 64,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",

        borderTopStyle: "solid",
        borderTopColor: Color.offBlack16,
        borderTopWidth: 1,

        backgroundColor: Color.white,
        width: "100%",
        position: "absolute",
        left: 0,
        bottom: 0,
    },
});
