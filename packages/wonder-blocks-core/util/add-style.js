// @flow
import * as React from "react";
import propTypes from "prop-types";
import {StyleSheet} from "aphrodite";

import {processStyleList, MediaLayoutWrapper} from "./util.js";

import type {MediaSize, MediaSpec} from "./types.js";

export default function addStyle<T: Object>(
    Component: React.ComponentType<T> | string,
    defaultStyle?: any,
): React.ComponentType<T & {style: any}> {
    function StyleComponent(
        props: T & {style: any, mediaSize: MediaSize, mediaSpec: MediaSpec},
    ) {
        const {style, mediaSize, mediaSpec, ...otherProps} = props;
        const reset = typeof Component === "string" ? styles[Component] : null;

        const {className, style: inlineStyles} = processStyleList(
            [reset, defaultStyle, style],
            mediaSize,
        );

        return (
            <Component
                {...otherProps}
                className={className}
                style={inlineStyles}
            />
        );
    }

    return MediaLayoutWrapper(StyleComponent);
}

// TODO(kevinb): add more style resets
const styles = StyleSheet.create({
    button: {
        margin: 0, // Safari adds 2px left/right margins
    },
});
