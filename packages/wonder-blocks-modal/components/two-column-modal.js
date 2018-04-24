// @flow
/**
 * A two-column modal layout.
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";

type Props = {
    leftContent: React.Node,
    rightContent: React.Node,
};

export default class TwoColumnModal extends React.Component<Props> {
    render() {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.column, styles.leftColumn)}>
                    {this.props.leftContent}
                </div>
                <div className={css(styles.column, styles.rightColumn)}>
                    {this.props.rightContent}
                </div>
            </div>
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
