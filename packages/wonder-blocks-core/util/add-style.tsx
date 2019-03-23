// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import {processStyleList} from "./util";
import {StyleType} from "./types";

interface WithLoadingProps {
    style?: StyleType;
}

const addStyle = <P extends object>(
    Component: React.ComponentType<P>,
    defaultStyle?: StyleType,
) => {
    return class WithLoading extends React.Component<P & WithLoadingProps> {
        render() {
            const { style, ...otherProps } = this.props;

            const reset =
                typeof Component === "string" ? overrides[Component] : null;

            const {className, style: inlineStyles} = processStyleList([
                reset,
                defaultStyle,
                style,
            ]);

            return <Component
                className={className}
                style={inlineStyles}
                {...otherProps as P}
            />;
        }
    };
};

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

export default addStyle;
