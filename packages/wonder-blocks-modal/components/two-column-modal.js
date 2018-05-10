// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

import ModalCloseButton from "./modal-close-button.js";

type Props = {
    /** The left-hand column's content. */
    leftContent: React.Node,

    /** The right-hand column's content. */
    rightContent: React.Node,

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

/**
 * A two-column modal layout.
 */
export default class TwoColumnModal extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    render() {
        return (
            <View
                style={styles.container}
                // TODO(mdr): How can we identify an appropriate aria-labelledby
                //     node, if it's somewhere in the monolith of modal content?
                role="dialog"
            >
                <View style={styles.closeButton}>
                    <ModalCloseButton
                        color="light"
                        onClick={this.props.onClickCloseButton}
                    />
                </View>
                <View style={[styles.column, styles.leftColumn]}>
                    {this.props.leftContent}
                </View>
                <View style={[styles.column, styles.rightColumn]}>
                    {this.props.rightContent}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "stretch",
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

    column: {
        boxSizing: "border-box",
        flex: "0 0 50%",

        // TODO(mdr): Some call sites probably won't want built-in padding. How
        //     should we handle that possibility?
        paddingTop: 64,
        paddingBottom: 64,
    },

    leftColumn: {
        background: Color.darkBlue,
        color: Color.white,

        // TODO(mdr): Some call sites probably won't want built-in padding. How
        //     should we handle that possibility?
        paddingLeft: 64,
        paddingRight: 52,
    },

    rightColumn: {
        background: Color.white,

        // TODO(mdr): Some call sites probably won't want built-in padding. How
        //     should we handle that possibility?
        paddingLeft: 52,
        paddingRight: 64,
    },
});
