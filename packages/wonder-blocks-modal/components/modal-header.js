// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

type Props = {
    children: React.Node,
    style?: any,
    color: "light" | "dark",
};

export default class ModalHeader extends React.Component<Props> {
    static defaultProps = {
        color: "dark",
    };

    render() {
        const {style, color, children} = this.props;
        return (
            <View
                style={[
                    styles.header,
                    color === "dark" && styles.dark,
                    (gridSize) => gridSize === "small" && styles.small,
                    style,
                ]}
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
    },

    dark: {
        background: Color.darkBlue,
        color: Color.white,
    },

    small: {
        paddingLeft: 16,
        paddingRight: 16,
    },
});
