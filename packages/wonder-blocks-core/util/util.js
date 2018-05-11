// @flow
import {css} from "aphrodite";

import type {StyleType} from "./types.js";

export type GridSize = "small" | "medium" | "large";

function flatten<T: Object>(list?: StyleType<T>, gridSize: GridSize): Array<T> {
    const result: Array<T> = [];

    if (typeof list === "function") {
        list = list(gridSize);
    }

    if (!list) {
        return result;
    } else if (Array.isArray(list)) {
        for (const item of list) {
            result.push(...flatten(item, gridSize));
        }
    } else {
        result.push(list);
    }

    return result;
}

export function processStyleList<T: Object>(
    style?: StyleType<T>,
    gridSize: GridSize = "large",
) {
    const stylesheetStyles = [];
    const inlineStyles = [];

    if (!style) {
        return {
            style: {},
            className: "",
        };
    }

    flatten(style, gridSize).forEach((child: T) => {
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
