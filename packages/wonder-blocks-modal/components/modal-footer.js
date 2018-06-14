// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";

type Props = {
    children: React.Node,
    style?: any,
};

export default class ModalFooter extends React.Component<Props> {
    render() {
        const {style, children} = this.props;
        return <View style={[styles.footer, style]}>{children}</View>;
    }
}

const styles = StyleSheet.create({
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
    },
});
