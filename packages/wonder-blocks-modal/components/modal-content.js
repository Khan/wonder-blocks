// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {|
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

    static __IS_MODAL_CONTENT__ = true;
    static isClassOf(instance: any) {
        return instance && instance.type && instance.type.__IS_MODAL_CONTENT__;
    }

    render() {
        const {scrollOverflow, style, children} = this.props;

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <View
                        style={[
                            styles.wrapper,
                            scrollOverflow && styles.scrollOverflow,
                        ]}
                    >
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
            padding: Spacing.xLarge,
            boxSizing: "border-box",
        },
    }),

    small: StyleSheet.create({
        content: {
            padding: `${Spacing.xLarge}px ${Spacing.medium}px`,
        },
    }),
};
