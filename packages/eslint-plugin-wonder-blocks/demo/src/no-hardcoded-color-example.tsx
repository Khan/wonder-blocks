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

// ❌ Invalid: hardcoded color in backgroundImage gradient
const invalidGradientStyles = StyleSheet.create({
    root: {
        backgroundImage:
            "linear-gradient(180deg, #b8bdc4 0%, #8b93a0 50%, #717883 100%)",
    },
});

// ❌ Invalid: hardcoded color as SVG presentation attribute
export function InvalidSvgFillExample() {
    return (
        <svg viewBox="0 0 24 24">
            <path fill="#ff0000" d="M12 2L2 22h20L12 2z" />
            <circle stroke="blue" cx="12" cy="12" r="10" />
        </svg>
    );
}

// ❌ Invalid: hardcoded color on PhosphorIcon's color prop
export function InvalidPhosphorIconExample() {
    // @ts-expect-error — simplified for demo purposes
    return <PhosphorIcon color="#3C6D4A" />;
}

// Suppress unused variable warnings for the invalid style objects above
void invalidHexStyles;
void invalidRgbStyles;
void invalidGradientStyles;
