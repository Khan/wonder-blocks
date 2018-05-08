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
            // TODO(kevinb): figure out how to test this with
            // process.env.SNAPSHOT_INLINE_APHRODITE=0
            if (
                typeof process !== "undefined" &&
                process.env.SNAPSHOT_INLINE_APHRODITE
            ) {
                inlineStyles.push(child._definition);
            } else {
                stylesheetStyles.push(child);
            }
        } else {
            // All of our aphrodite styles use !important so we need to add
            // !important to all of our inline styles so that they can actually
            // override aphrodite styles.
            Object.keys(child).forEach((key) => {
                const value = child[key];
                if (typeof value === "string" && value.endsWith("!important")) {
                    // skip
                } else {
                    child[key] = stringifyAndImportantifyValue(key, value);
                }
            });

            inlineStyles.push(child);
        }
    });

    return {
        style: Object.assign({}, ...inlineStyles),
        className: css(...stylesheetStyles),
    };
}

// TODO(kevinb): extract into a separate file

/**
 * CSS properties which accept numbers but are not in units of "px".
 * Taken from React's CSSProperty.js
 */
const isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridColumn: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,

    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
};

/**
 * Taken from React's CSSProperty.js
 *
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 * Taken from React's CSSProperty.js
 */
const prefixes = ["Webkit", "ms", "Moz", "O"];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
// Taken from React's CSSProperty.js
Object.keys(isUnitlessNumber).forEach(function(prop) {
    prefixes.forEach(function(prefix) {
        isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
});

export const stringifyValue = (
    key /*: string */,
    prop /*: any */,
) /*: string */ => {
    if (typeof prop === "number") {
        if (isUnitlessNumber[key]) {
            return "" + prop;
        } else {
            return prop + "px";
        }
    } else {
        return "" + prop;
    }
};

export const stringifyAndImportantifyValue = (
    key /*: string */,
    prop /*: any */,
) /*: string */ => importantify(stringifyValue(key, prop));

// Given a single style value string like the "b" from "a: b;", adds !important
// to generate "b !important".
const importantify = (string /*: string */) /*: string */ =>
    // Bracket string character access is very fast, and in the default case we
    // normally don't expect there to be "!important" at the end of the string
    // so we can use this simple check to take an optimized path. If there
    // happens to be a "!" in this position, we follow up with a more thorough
    // check.
    string[string.length - 10] === "!" && string.slice(-11) === " !important"
        ? string
        : `${string} !important`;
