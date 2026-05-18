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

// ❌ Invalid: hardcoded hex colors in StyleSheet.create
const invalidHexStyles = StyleSheet.create({
    root: {
        color: "#333333",
        backgroundColor: "#ffffff",
    },
});

// ❌ Invalid: hardcoded RGB color and named color in StyleSheet.create
const invalidRgbStyles = StyleSheet.create({
    root: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        borderColor: "red",
    },
});

// ❌ Invalid: hardcoded color in inline style prop
export function InvalidExample() {
    return (
        <div style={{color: "#fff", backgroundColor: "hsl(200, 100%, 50%)"}}>
            <span>Invalid usage</span>
        </div>
    );
}

// ❌ Invalid: hardcoded color in WB multi-part styles prop
export function InvalidStylesPropExample() {
    // @ts-expect-error — simplified for demo purposes
    return <div styles={{root: {backgroundColor: "lavender"}}} />;
}

// Suppress unused variable warnings for the invalid style objects above
void invalidHexStyles;
void invalidRgbStyles;
