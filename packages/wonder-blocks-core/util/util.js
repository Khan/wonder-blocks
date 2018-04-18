// @flow
import {css} from "aphrodite";

import type {StyleType} from "./types.js";

function flatten<T: Object>(list?: StyleType<T>): Array<T> {
    const result: Array<T> = [];

    if (!list) {
        return result;
    } else if (Array.isArray(list)) {
        for (const item of list) {
            result.push(...flatten(item));
        }
    } else {
        result.push(list);
    }

    return result;
}

export function processStyleList<T: Object>(style?: StyleType<T>) {
    const stylesheetStyles = [];
    const inlineStyles = [];

    if (!style) {
        return {
            style: {},
            className: "",
        };
    }

    flatten(style).forEach((child: T) => {
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
