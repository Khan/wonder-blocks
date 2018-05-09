// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";

export default class ModalContent extends React.Component<{
    children: React.Node,
    style?: any,
}> {
    render() {
        const {style, children} = this.props;
        return <View style={[styles.content, style]}>{children}</View>;
    }
}

const styles = StyleSheet.create({
    content: {
        flex: "1",
        padding: 64,
        overflow: "auto",
        boxSizing: "border-box",
    },
});
