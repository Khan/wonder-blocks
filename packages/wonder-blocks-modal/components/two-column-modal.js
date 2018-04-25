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

        // This minimum height is a fixed number from the spec.
        minHeight: 464,
    },

    column: {
        boxSizing: "border-box",
        flex: "0 0 50%",
        paddingTop: 64,
        paddingBottom: 64,
    },

    leftColumn: {
        background: Color.darkBlue,
        color: Color.white,
        paddingLeft: 64,
        paddingRight: 52,
    },

    rightColumn: {
        background: Color.white,
        paddingLeft: 52,
        paddingRight: 64,
    },
});
