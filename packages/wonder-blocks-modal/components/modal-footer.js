// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

type Props = {|
    children: React.Node,
|};

export default class ModalFooter extends React.Component<Props> {
    static __IS_MODAL_FOOTER__ = true;
    static isClassOf(instance: any) {
        return instance && instance.type && instance.type.__IS_MODAL_FOOTER__;
    }

    render() {
        const {children} = this.props;
        return <View style={styles.footer}>{children}</View>;
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

        boxShadow: "0px -1px 0px rgba(33, 36, 44, 0.16)",
    },
});
