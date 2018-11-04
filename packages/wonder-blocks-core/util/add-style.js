// @flow
import * as React from "react";
import propTypes from "prop-types";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "./util.js";

import type {StyleType} from "./types.js";

// TODO(kevinb): have an a version which uses exact object types
export default function addStyle<T: React.ComponentType<*> | string>(
    Component: T,
    defaultStyle?: StyleType,
): React.ComponentType<React.ElementProps<T> & {style: StyleType}> {
    function StyleComponent(props: React.ElementProps<T> & {style: StyleType}) {
        const {style, ...otherProps} = props;
        const reset =
            typeof Component === "string" ? overrides[Component] : null;

        const {className, style: inlineStyles} = processStyleList([
            reset,
            defaultStyle,
            style,
        ]);

        return (
            <Component
                {...otherProps}
                className={className}
                style={inlineStyles}
            />
        );
    }

    return StyleComponent;
}

/**
 * These are necessary to override various custom styles that browsers add so that
 * elements have consistent styles across all browsers.  Only add styles here if
 * they appear in https://github.com/necolas/normalize.css/blob/master/normalize.css.
 */
const overrides = StyleSheet.create({
    button: {
        margin: 0, // Safari adds 2px left/right margins
        "::-moz-focus-inner": {
            border: 0, // Firefox adds an inner focus ring around text
        },
    },
});
