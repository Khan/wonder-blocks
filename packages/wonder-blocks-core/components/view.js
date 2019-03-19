// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import addStyle from "../util/add-style.js";

import type {TextViewSharedProps} from "../util/types.js";

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

const StyledDiv = addStyle<"div">("div", styles.default);

/**
 * View is a building block for constructing other components. `View` roughly
 * maps to `div` and `Text` roughly maps to `span`. You can override which tag
 * is used to render the component (for semantic purposes) by specifying the
 * `tag` prop.
 *
 * These components can take styles (via the `style` prop) in a variety of
 * manners:
 *
 * - An inline style object
 * - An `aphrodite` StyleSheet style
 * - An array combining the above
 */
export default class View extends React.Component<TextViewSharedProps> {
    render() {
        const {testId, ...restProps} = this.props;
        return <StyledDiv data-test-id={testId} {...restProps} />;
    }
}
