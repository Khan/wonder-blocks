// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

/**
 * A modal footer.
 */
export default class ModalFooter extends React.Component<{
    /** The footer to show under the content. */
    children: React.Node,

    /** Styles to apply to the footer */
    style?: any,
}> {
    render() {
        const {children, style} = this.props;

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

        backgroundColor: Color.white,
        width: "100%",
    },
});
