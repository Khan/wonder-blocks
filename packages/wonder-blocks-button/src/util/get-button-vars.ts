import * as React from "react";

import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";

import theme from "../theme";
import type {ButtonActionType, ButtonKind, ButtonSize} from "./button.types";

type ButtonCSSVars = {
    // Default state
    "--wb-c-button--bg": string;
    "--wb-c-button--color": string;
    "--wb-c-button--border-color": string;
    "--wb-c-button--border-width": string;
    "--wb-c-button--border-radius": string;
    "--wb-c-button--border-style": string;
    "--wb-c-button--padding-inline": string;
    "--wb-c-button--height": string;
    // Hover state
    "--wb-c-button--hover-bg": string;
    "--wb-c-button--hover-color": string;
    "--wb-c-button--hover-border-color": string;
    "--wb-c-button--hover-border-radius": string;
    // Primary hover outline
    "--wb-c-button--hover-outline": string;
    "--wb-c-button--hover-outline-offset": string | number;
    // Secondary hover box-shadow
    "--wb-c-button--hover-box-shadow": string;
    // Tertiary hover text-decoration
    "--wb-c-button--hover-text-underline-offset": string;
    "--wb-c-button--hover-text-decoration": string;
    // Press state
    "--wb-c-button--press-bg": string;
    "--wb-c-button--press-color": string;
    "--wb-c-button--press-border-color": string;
    "--wb-c-button--press-border-radius": string;
    // Primary press outline
    "--wb-c-button--press-outline": string;
    "--wb-c-button--press-outline-offset": string | number;
    // Secondary press box-shadow
    "--wb-c-button--press-box-shadow": string;
    // Tertiary press text-decoration
    "--wb-c-button--press-text-underline-offset": string;
    "--wb-c-button--press-text-decoration": string;
    // Disabled state
    "--wb-c-button--disabled-bg": string;
    "--wb-c-button--disabled-color": string;
    "--wb-c-button--disabled-border-color": string;
    "--wb-c-button--disabled-border-width": string;
    "--wb-c-button--disabled-border-radius": string;
    // Focus state
    "--wb-c-button--focus-box-shadow": string;
    "--wb-c-button--focus-outline": string;
    "--wb-c-button--focus-outline-offset": string;
    // Secondary focus + hover/active combined
    "--wb-c-button--focus-hover-box-shadow": string;
    "--wb-c-button--focus-active-box-shadow": string;
};

const cache: Record<string, React.CSSProperties> = {};

/**
 * Returns CSS custom properties for a button variant.
 * These are set as inline styles on the button element and consumed by
 * the CSS module classes via `var(--wb-c-button--*)`.
 */
export function getButtonVars(
    actionType: ButtonActionType = "progressive",
    kind: ButtonKind,
    size: ButtonSize,
): React.CSSProperties {
    const cacheKey = `${actionType}-${kind}-${size}`;
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    const paddingInline = theme.root.layout.padding.inline[kind][size];
    const borderWidthKind = theme.root.border.width[kind];
    const outlineOffsetKind = theme.root.border.offset[kind];
    const themeVariant = semanticColor.action[kind][actionType];
    const disabledState = semanticColor.action[kind].disabled;
    const focusVisible = focusStyles.focus[":focus-visible"];

    const vars: ButtonCSSVars = {
        // Default state
        "--wb-c-button--bg": themeVariant.default.background,
        "--wb-c-button--color": themeVariant.default.foreground,
        "--wb-c-button--border-color": themeVariant.default.border,
        "--wb-c-button--border-width": borderWidthKind.default,
        "--wb-c-button--border-radius": theme.root.border.radius.default,
        "--wb-c-button--border-style": "solid",
        "--wb-c-button--padding-inline": paddingInline,
        "--wb-c-button--height": theme.root.sizing.height[size],

        // Hover state
        "--wb-c-button--hover-bg": themeVariant.hover.background,
        "--wb-c-button--hover-color": themeVariant.hover.foreground,
        "--wb-c-button--hover-border-color": themeVariant.hover.border,
        "--wb-c-button--hover-border-radius": theme.root.border.radius.hover,
        // Primary hover outline
        "--wb-c-button--hover-outline":
            kind === "primary"
                ? `${borderWidthKind.hover} solid ${themeVariant.hover.border}`
                : "none",
        "--wb-c-button--hover-outline-offset":
            kind === "primary" ? outlineOffsetKind : 0,
        // Secondary hover box-shadow
        "--wb-c-button--hover-box-shadow":
            kind !== "primary"
                ? `inset 0 0 0 ${borderWidthKind.hover} ${themeVariant.hover.border}`
                : "none",
        // Tertiary hover text-decoration
        "--wb-c-button--hover-text-underline-offset":
            kind === "tertiary" ? theme.root.font.offset.default : "auto",
        "--wb-c-button--hover-text-decoration":
            kind === "tertiary"
                ? `${theme.root.font.decoration.hover} ${theme.root.sizing.underline.hover}`
                : "none",

        // Press state
        "--wb-c-button--press-bg": themeVariant.press.background,
        "--wb-c-button--press-color": themeVariant.press.foreground,
        "--wb-c-button--press-border-color": themeVariant.press.border,
        "--wb-c-button--press-border-radius": theme.root.border.radius.press,
        // Primary press outline
        "--wb-c-button--press-outline":
            kind === "primary"
                ? `${borderWidthKind.press} solid ${themeVariant.press.border}`
                : "none",
        "--wb-c-button--press-outline-offset":
            kind === "primary" ? outlineOffsetKind : 0,
        // Secondary press box-shadow
        "--wb-c-button--press-box-shadow":
            kind !== "primary"
                ? `inset 0 0 0 ${borderWidthKind.press} ${themeVariant.press.border}`
                : "none",
        // Tertiary press text-decoration
        "--wb-c-button--press-text-underline-offset":
            kind === "tertiary" ? theme.root.font.offset.default : "auto",
        "--wb-c-button--press-text-decoration":
            kind === "tertiary"
                ? `${theme.root.font.decoration.press} ${theme.root.sizing.underline.press}`
                : "none",

        // Disabled state
        "--wb-c-button--disabled-bg": disabledState.background,
        "--wb-c-button--disabled-color": disabledState.foreground,
        "--wb-c-button--disabled-border-color": disabledState.border,
        "--wb-c-button--disabled-border-width": borderWidthKind.default,
        "--wb-c-button--disabled-border-radius":
            theme.root.border.radius.default,

        // Focus state (from focusStyles)
        "--wb-c-button--focus-box-shadow": focusVisible.boxShadow,
        "--wb-c-button--focus-outline": focusVisible.outline,
        "--wb-c-button--focus-outline-offset": focusVisible.outlineOffset,

        // Secondary focus + hover/active combined box-shadow
        "--wb-c-button--focus-hover-box-shadow":
            kind === "secondary"
                ? `inset 0 0 0 ${borderWidthKind.hover} ${themeVariant.hover.border}, ${focusVisible.boxShadow}`
                : focusVisible.boxShadow,
        "--wb-c-button--focus-active-box-shadow":
            kind === "secondary"
                ? `inset 0 0 0 ${borderWidthKind.press} ${themeVariant.press.border}, ${focusVisible.boxShadow}`
                : focusVisible.boxShadow,
    };

    cache[cacheKey] = vars as unknown as React.CSSProperties;
    return cache[cacheKey];
}
