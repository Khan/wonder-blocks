/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/no-graphics-palette`
 * Run `pnpm lint` in this directory to see the errors.
 */

import * as React from "react";

import {StyleSheet} from "aphrodite";
import starIcon from "@phosphor-icons/core/regular/star.svg";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {
    graphicsPalette,
    semanticColor,
} from "@khanacademy/wonder-blocks-tokens";

// ✅ Valid: semanticColor tokens adapt to the current theme
const validStyles = StyleSheet.create({
    card: {backgroundColor: semanticColor.core.background.base.default},
});

// ✅ Valid: static artwork that must stay the same in every theme, disabled
// with a reason
export function ValidIllustrationExample() {
    return (
        <svg viewBox="0 0 24 24">
            {/* eslint-disable @khanacademy/wonder-blocks/no-graphics-palette -- Spider illustration artwork; colors stay the same in every theme */}
            <path fill={graphicsPalette.gray_30} d="M12 2L2 22h20L12 2z" />
            {/* eslint-enable @khanacademy/wonder-blocks/no-graphics-palette */}
        </svg>
    );
}

// ❌ Invalid: graphicsPalette in StyleSheet.create
const invalidStyles = StyleSheet.create({
    card: {backgroundColor: graphicsPalette.blue_80},
});

// ❌ Invalid: graphicsPalette on a component prop
export function InvalidIconExample() {
    return <PhosphorIcon icon={starIcon} color={graphicsPalette.yellow_30} />;
}

// ❌ Invalid: graphicsPalette as an SVG attribute, without a disable comment
export function InvalidSvgFillExample() {
    return (
        <svg viewBox="0 0 24 24">
            <circle stroke={graphicsPalette.red_50} cx="12" cy="12" r="10" />
        </svg>
    );
}

// ❌ Invalid: destructuring from graphicsPalette (reported once)
const {green_30: successColor} = graphicsPalette;

// ❌ Invalid: passing the whole palette
const chartConfig = {colors: graphicsPalette};

// ❌ Invalid: a palette CSS variable written out by hand
const invalidCssVarStyles = StyleSheet.create({
    card: {border: `2px solid var(--wb-graphicsPalette-red_20)`},
});

// Suppress unused variable warnings for the examples above
void validStyles;
void invalidStyles;
void successColor;
void chartConfig;
void invalidCssVarStyles;
