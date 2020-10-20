// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "./util.js";

import type {StyleType} from "./types.js";

// TODO(kevinb): have an a version which uses exact object types
export default function addStyle<T: React.AbstractComponent<any> | string>(
    Component: T,
    defaultStyle?: StyleType,
): React.AbstractComponent<{
    ...React.ElementConfig<T>,
    style?: StyleType,
    ...
}> {
    function StyleComponent(props: {
        ...React.ElementConfig<T>,
        style: StyleType,
        ...
    }) {
        const {className, style, ...tmpOtherProps} = props;
        // NOTE(jeresig): We need to cast the remaining props to be the right
        // value to ensure that they're typed properly.
        const otherProps: React.ElementConfig<T> = (tmpOtherProps: any);
        const reset =
            typeof Component === "string" ? overrides[Component] : null;

        const {
            className: aphroditeClassName,
            style: inlineStyles,
        } = processStyleList([reset, defaultStyle, style]);

        return (
            <Component
                {...otherProps}
                className={[aphroditeClassName, className]
                    .filter(Boolean)
                    .join(" ")}
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
