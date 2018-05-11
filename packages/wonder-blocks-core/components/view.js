// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle} from "../util/add-style.js";

import type {Props} from "../util/types.js";

const styles = StyleSheet.create({
    default: {
        display: "flex",
        flexDirection: "column",
    },
});

const StyledDiv = addStyle("div", styles.default);

export default class View extends React.Component<Props> {
    props: Props;

    render() {
        return <StyledDiv {...this.props} />;
    }
}
