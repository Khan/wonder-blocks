// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import ModalHeader from "./modal-header.js";

type Props = {|
    /** An optional header to display above the content. */
    header?: React.Element<typeof ModalHeader> | React.Node,
    /** Should the content scroll on overflow, or just expand. */
    scrollOverflow: boolean,
    /** The contents of the ModalContent */
    children: React.Node,
    /** Optional styling to apply to the contents. */
    style?: StyleType,
|};

export default class ModalContent extends React.Component<Props> {
    static defaultProps = {
        scrollOverflow: true,
    };

    render() {
        const {header, scrollOverflow, style, children} = this.props;

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <View
                        style={[
                            styles.wrapper,
                            scrollOverflow && styles.scrollOverflow,
                        ]}
                    >
                        {!header ||
                        (typeof header === "object" &&
                            header.type === ModalHeader) ? (
                            header
                        ) : (
                            <ModalHeader>{header}</ModalHeader>
                        )}
                        <View style={[styles.content, style]}>{children}</View>
                    </View>
                )}
            </MediaLayout>
        );
    }
}

const styleSheets = {
    all: StyleSheet.create({
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
            minHeight: "100%",
            padding: 64,
            boxSizing: "border-box",
        },
    }),

    small: StyleSheet.create({
        content: {
            padding: "32px 16px",
        },
    }),
};
