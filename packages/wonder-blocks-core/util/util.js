// @flow
import {css} from "aphrodite";
import * as React from "react";
import propTypes from "prop-types";

import type {MediaSize, MediaSpec} from "./types.js";
import type {StyleType} from "./types.js";

function flatten<T: Object>(
    list?: StyleType<T>,
    mediaSize: MediaSize,
): Array<T> {
    const result: Array<T> = [];

    if (typeof list === "function") {
        list = list(mediaSize);
    }

    if (!list) {
        return result;
    } else if (Array.isArray(list)) {
        for (const item of list) {
            result.push(...flatten(item, mediaSize));
        }
    } else {
        result.push(list);
    }

    return result;
}

export function processStyleList<T: Object>(
    style?: StyleType<T>,
    mediaSize: MediaSize = "large",
) {
    const stylesheetStyles = [];
    const inlineStyles = [];

    if (!style) {
        return {
            style: {},
            className: "",
        };
    }

    flatten(style, mediaSize).forEach((child: T) => {
        // Check for aphrodite internal property
        if ((child: any)._definition) {
            if (
                typeof process !== "undefined" &&
                process.env.SNAPSHOT_INLINE_APHRODITE
            ) {
                inlineStyles.push(child._definition);
            } else {
                stylesheetStyles.push(child);
            }
        } else {
            inlineStyles.push(child);
        }
    });

    return {
        style: Object.assign({}, ...inlineStyles),
        className: css(...stylesheetStyles),
    };
}

export const mediaContextTypes = {
    mediaSize: propTypes.string,
    mediaSpec: propTypes.object,
};

export function MediaLayoutWrapper<Props: {}>(
    Component: React.ComponentType<Props>,
): React.ComponentType<
    $Diff<Props, {mediaSize: MediaSize | void, mediaSpec: MediaSpec | void}>,
> {
    const WrappedComponent = (
        props: Props,
        {
            mediaSize,
            mediaSpec,
        }: {
            mediaSize: MediaSize,
            mediaSpec: MediaSpec,
        },
    ) => {
        return (
            <Component {...props} mediaSize={mediaSize} mediaSpec={mediaSpec} />
        );
    };

    WrappedComponent.contextTypes = mediaContextTypes;

    return WrappedComponent;
}
