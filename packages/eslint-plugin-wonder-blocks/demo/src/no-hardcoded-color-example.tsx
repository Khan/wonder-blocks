/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/no-hardcoded-color`
 * Run `pnpm lint` in this directory to see the errors.
 */

import * as React from "react";

import {StyleSheet} from "aphrodite";

// ✅ Valid: using CSS keywords and variable references
export function ValidExample() {
    return (
        <div style={{color: "inherit", backgroundColor: "transparent"}}>
            <span className="example">Valid usage</span>
        </div>
    );
}

// ❌ Invalid: hardcoded hex color in StyleSheet.create
// eslint-disable-next-line @khanacademy/wonder-blocks/no-hardcoded-color
const invalidHexStyles = StyleSheet.create({
    root: {
        // @khanacademy/wonder-blocks/no-hardcoded-color: '#333333' is hardcoded
        color: "#333333",
        // @khanacademy/wonder-blocks/no-hardcoded-color: '#ffffff' is hardcoded
        backgroundColor: "#ffffff",
    },
});

// ❌ Invalid: hardcoded RGB color in StyleSheet.create
// eslint-disable-next-line @khanacademy/wonder-blocks/no-hardcoded-color
const invalidRgbStyles = StyleSheet.create({
    root: {
        // @khanacademy/wonder-blocks/no-hardcoded-color: rgba is hardcoded
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        // @khanacademy/wonder-blocks/no-hardcoded-color: named color is hardcoded
        borderColor: "red",
    },
});

// ❌ Invalid: hardcoded color in inline style prop
export function InvalidExample() {
    return (
        // @khanacademy/wonder-blocks/no-hardcoded-color: '#fff' is hardcoded
        // eslint-disable-next-line @khanacademy/wonder-blocks/no-hardcoded-color
        <div style={{color: "#fff", backgroundColor: "hsl(200, 100%, 50%)"}}>
            <span>Invalid usage</span>
        </div>
    );
}

// Suppress unused variable warnings for the invalid style objects above
void invalidHexStyles;
void invalidRgbStyles;
