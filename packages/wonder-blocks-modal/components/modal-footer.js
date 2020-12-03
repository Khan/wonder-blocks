// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";

type Props = {|
    children: React.Node,
|};

/**
 * Modal footer included after the content.
 *
 * **Implementation notes**:
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to include it as part of [ModalPanel](/#modalpanel) by using the `footer` prop.
 * - The footer is completely flexible. Meaning the developer needs to add its own custom layout to match design specs.
 */
export default class ModalFooter extends React.Component<Props> {
    static isClassOf(instance: any) {
        return instance && instance.type && instance.type.__IS_MODAL_FOOTER__;
    }
    static __IS_MODAL_FOOTER__ = true;

    render() {
        const {children} = this.props;
        return <View style={styles.footer}>{children}</View>;
    }
}

const styles = StyleSheet.create({
    footer: {
        flex: "0 0 auto",
        boxSizing: "border-box",
        minHeight: Spacing.xxxLarge_64,
        paddingLeft: Spacing.medium_16,
        paddingRight: Spacing.medium_16,
        paddingTop: Spacing.xSmall_8,
        paddingBottom: Spacing.xSmall_8,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",

        boxShadow: `0px -1px 0px ${Color.offBlack16}`,
    },
});
