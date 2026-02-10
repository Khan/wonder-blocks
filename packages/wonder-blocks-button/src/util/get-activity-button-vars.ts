import * as React from "react";

import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";

import type {ActivityButtonActionType, ButtonKind} from "./button.types";

// NOTE: Theme is defined here directly to avoid generating CSS variables
// as we are reusing the following tokens in all themes.
const actTheme = {
    root: {
        border: {
            width: {
                primary: {
                    rest: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.thin,
                },
                secondary: {
                    rest: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.thin,
                },
                tertiary: {
                    rest: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.thin,
                },
            },
            radius: border.radius.radius_120,
        },
        layout: {
            padding: {
                block: sizing.size_140,
                inline: sizing.size_480,
            },
        },
        shadow: {
            y: {
                // NOTE: We use px units to prevent a bug in Safari where the
                // shadow animation flickers when using rem units.
                rest: "6px",
                hover: "8px",
                press: sizing.size_0,
            },
        },
    },
    label: {
        color: {
            progressive: semanticColor.core.foreground.instructive.default,
            neutral: semanticColor.core.foreground.neutral.default,
            disabled: semanticColor.core.foreground.disabled.default,
        },
    },
};

const cache: Record<string, React.CSSProperties> = {};

/**
 * Returns CSS custom properties for an ActivityButton variant.
 * These are set as inline styles and consumed by the CSS module via
 * `var(--wb-c-activity-button--*)`.
 */
export function getActivityButtonVars(
    actionType: ActivityButtonActionType = "progressive",
    kind: ButtonKind,
    disabled: boolean,
): React.CSSProperties {
    const cacheKey = `${actionType}-${kind}-${disabled}`;
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    const borderWidthKind = actTheme.root.border.width[kind];
    const themeVariant = semanticColor.chonky[actionType];
    const disabledState = semanticColor.chonky.disabled;
    const focusVisible = focusStyles.focus[":focus-visible"];

    const vars = {
        // Button (outer) colors
        "--wb-c-activity-button--color": actTheme.label.color[actionType],
        "--wb-c-activity-button--disabled-color": actTheme.label.color.disabled,
        "--wb-c-activity-button--border-radius": actTheme.root.border.radius,

        // Focus ring
        "--wb-c-activity-button--focus-box-shadow": focusVisible.boxShadow,
        "--wb-c-activity-button--focus-outline": focusVisible.outline,
        "--wb-c-activity-button--focus-outline-offset":
            focusVisible.outlineOffset,

        // Gap between chonky and label
        "--wb-c-activity-button--gap": sizing.size_020,

        // Chonky box - rest state
        "--wb-c-activity-button--chonky-bg": themeVariant.background[kind].rest,
        "--wb-c-activity-button--chonky-border": `${borderWidthKind.rest} solid ${themeVariant.border[kind].rest}`,
        "--wb-c-activity-button--chonky-border-radius":
            actTheme.root.border.radius,
        "--wb-c-activity-button--chonky-color":
            themeVariant.foreground[kind].rest,
        "--wb-c-activity-button--chonky-shadow": `0 ${actTheme.root.shadow.y.rest} 0 0 ${themeVariant.shadow[kind].rest}`,
        "--wb-c-activity-button--chonky-margin-block-end":
            actTheme.root.shadow.y.rest,
        "--wb-c-activity-button--chonky-padding-block":
            actTheme.root.layout.padding.block,
        "--wb-c-activity-button--chonky-padding-inline":
            actTheme.root.layout.padding.inline,
        "--wb-c-activity-button--chonky-gap": sizing.size_080,

        // Chonky box - hover state
        "--wb-c-activity-button--chonky-hover-bg":
            themeVariant.background[kind].hover,
        "--wb-c-activity-button--chonky-hover-border": `${borderWidthKind.hover} solid ${themeVariant.border[kind].hover}`,
        "--wb-c-activity-button--chonky-hover-shadow": `0 ${actTheme.root.shadow.y.hover} 0 0 ${themeVariant.shadow[kind].hover}`,
        "--wb-c-activity-button--chonky-hover-color":
            themeVariant.foreground[kind].hover,
        "--wb-c-activity-button--chonky-hover-transform": `translateY(calc((${actTheme.root.shadow.y.hover} - ${actTheme.root.shadow.y.rest}) * -1))`,

        // Chonky box - press state
        "--wb-c-activity-button--chonky-press-bg":
            themeVariant.background[kind].press,
        "--wb-c-activity-button--chonky-press-border": `${borderWidthKind.press} solid ${themeVariant.border[kind].press}`,
        "--wb-c-activity-button--chonky-press-shadow": `0 ${actTheme.root.shadow.y.press} 0 0 ${themeVariant.shadow[kind].press}`,
        "--wb-c-activity-button--chonky-press-color":
            themeVariant.foreground[kind].press,
        "--wb-c-activity-button--chonky-press-transform": `translateY(${actTheme.root.shadow.y.rest})`,

        // Chonky box - disabled state
        "--wb-c-activity-button--chonky-disabled-bg":
            disabledState.background[kind],
        "--wb-c-activity-button--chonky-disabled-border": `${borderWidthKind.rest} solid ${disabledState.border[kind]}`,
        "--wb-c-activity-button--chonky-disabled-color":
            disabledState.foreground[kind],
        "--wb-c-activity-button--chonky-disabled-shadow": `0 ${actTheme.root.shadow.y.rest} 0 0 ${disabledState.shadow[kind]}`,
    };

    cache[cacheKey] = vars as unknown as React.CSSProperties;
    return cache[cacheKey];
}
