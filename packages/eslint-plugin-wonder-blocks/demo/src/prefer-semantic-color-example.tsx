/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/prefer-semantic-color`
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
export const validStyles = StyleSheet.create({
    card: {backgroundColor: semanticColor.core.background.base.default},
});

// ✅ Valid: attributes of SVG elements (static artwork)
export function ValidIllustrationExample() {
    return (
        <svg viewBox="0 0 24 24">
            <path fill={graphicsPalette.gray_30} d="M12 2L2 22h20L12 2z" />
            <circle stroke={graphicsPalette.red_50} cx="12" cy="12" r="10" />
        </svg>
    );
}

// ✅ Valid: outside SVG, disabled with a reason
// eslint-disable-next-line @khanacademy/wonder-blocks/prefer-semantic-color -- Exported PNG chart colors must not change with the theme
export const exportLineColor = graphicsPalette.blue_30;

// ❌ Invalid: graphicsPalette in StyleSheet.create
export const invalidStyles = StyleSheet.create({
    card: {backgroundColor: graphicsPalette.blue_80},
});

// ❌ Invalid: graphicsPalette on a component prop
export function InvalidIconExample() {
    return <PhosphorIcon icon={starIcon} color={graphicsPalette.yellow_30} />;
}

// ❌ Invalid: an SVG attribute on an HTML element
export function InvalidHtmlFillExample() {
    return <div style={{fill: graphicsPalette.red_50}} />;
}

// ❌ Invalid: destructuring from graphicsPalette (reported once)
export const {green_30: successColor} = graphicsPalette;

// ❌ Invalid: passing the whole palette
export const chartConfig = {colors: graphicsPalette};

// ❌ Invalid: a palette CSS variable written out by hand
export const invalidCssVarStyles = StyleSheet.create({
    card: {border: `2px solid var(--wb-graphicsPalette-red_20)`},
});
