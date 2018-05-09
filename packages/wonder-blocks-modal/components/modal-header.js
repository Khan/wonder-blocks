// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

export default class ModalHeader extends React.Component<{
    children: React.Node,
    style?: any,
    color: "light" | "dark",
}> {
    static defaultProps = {
        color: "dark",
    };

    render() {
        const {style, color, children} = this.props;
        return (
            <View
                style={[styles.header, color === "dark" && styles.dark, style]}
            >
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: "0 0 auto",
        boxSizing: "border-box",
        maxHeight: 108,
        paddingLeft: 64,
        paddingRight: 64,
        paddingTop: 8,
        paddingBottom: 8,

        display: "flex",
        flexDirection: "row",
        overflow: "auto",
    },

    dark: {
        background: Color.darkBlue,
        color: Color.white,
    },
});
