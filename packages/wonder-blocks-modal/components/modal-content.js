// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";

import ModalHeader from "./modal-header.js";

type Props = {
    header?: React.Element<typeof ModalHeader> | React.Node,
    scrollOverflow: boolean,
    children: React.Node,
    style?: any,
};

export default class ModalContent extends React.Component<Props> {
    static defaultProps = {
        scrollOverflow: true,
    };

    render() {
        const {header, scrollOverflow, style, children} = this.props;

        return (
            <View
                style={[
                    styles.wrapper,
                    scrollOverflow && styles.scrollOverflow,
                ]}
            >
                {!header || header.type === ModalHeader ? (
                    header
                ) : (
                    <ModalHeader>{header}</ModalHeader>
                )}
                <View
                    style={[
                        styles.content,
                        (gridSize) => gridSize === "small" && styles.small,
                        style,
                    ]}
                >
                    {children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

        // This helps to ensure that the paddingBottom is preserved when
        // the contents start to overflow, this goes away on display: flex
        display: "block",
    },

    scrollOverflow: {
        overflow: "auto",
    },

    content: {
        flex: 1,
        padding: 64,
        boxSizing: "border-box",
    },

    small: {
        padding: "32px 16px",
    },
});
