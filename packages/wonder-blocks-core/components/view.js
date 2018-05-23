// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import addStyle from "../util/add-style.js";

import type {Props} from "../util/types.js";

const styles = StyleSheet.create({
    // https://github.com/facebook/css-layout#default-values
    default: {
        alignItems: "stretch",
        borderWidth: 0,
        borderStyle: "solid",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        position: "relative",
        zIndex: 0,
        // fix flexbox bugs
        minHeight: 0,
        minWidth: 0,
    },
});

const StyledDiv = addStyle("div", styles.default);

export default class View extends React.Component<Props> {
    props: Props;

    render() {
        return <StyledDiv {...this.props} />;
    }
}
