// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";

import ModalHeader from "./modal-header.js";

type Props = {
    header?: React.Element<typeof ModalHeader> | React.Node,
    children: React.Node,
    style?: any,
};

export default class ModalContent extends React.Component<Props> {
    render() {
        const {header, style, children} = this.props;

        return (
            <View style={styles.wrapper}>
                {!header || header.type === ModalHeader ? (
                    header
                ) : (
                    <ModalHeader>{header}</ModalHeader>
                )}
                <View style={[styles.content, style]}>{children}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        overflow: "auto",
    },

    content: {
        flex: 1,
        padding: 64,
        overflow: "auto",
        boxSizing: "border-box",
    },
});
