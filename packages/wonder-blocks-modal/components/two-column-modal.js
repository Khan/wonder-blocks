// @flow
/**
 * A two-column modal layout.
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

type Props = {
    leftContent: React.Node,
    rightContent: React.Node,
};

export default class TwoColumnModal extends React.Component<Props> {
    render() {
        return (
            <View style={styles.container}>
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
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",

        borderRadius: 4,
        overflow: "hidden",
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
