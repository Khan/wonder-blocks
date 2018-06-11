// @flow
import * as React from "react";
import propTypes from "prop-types";

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
        const {className, style: inlineStyles} = processStyleList(
            [defaultStyle, style],
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
