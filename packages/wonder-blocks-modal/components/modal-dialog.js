// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";

import typeof ModalContentPane from "./modal-content-pane.js";

export default class ModalDialog extends React.Component<{
    children: React.ChildrenArray<React.Element<
        ModalContentPane,
    > | null | void>,
    style?: any,
}> {
    render() {
        const {style, children} = this.props;
        return (
            <View
                style={[styles.wrapper, style]}
                role="dialog"
                aria-labelledby="wb-modal-title"
            >
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        position: "relative",

        borderRadius: 4,
        overflow: "hidden",

        /*
		// On mobile, we consume the full screen size.
		[smOrSmaller]: {
		    width: "100%",
		    height: "100%",
		    borderRadius: 0,
		},
		*/
    },
});
