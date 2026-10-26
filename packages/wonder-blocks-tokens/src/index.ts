// primitive tokens
// These re-exports are valid while we still have color and spacing token
// instances in consumers.
/* eslint-disable import/no-deprecated */
import {color} from "./tokens/color";
import {spacing} from "./tokens/spacing";

// media queries
import {breakpoint} from "./tokens/media-queries";

// utils
import {mix, fade, pxToRem, remToPx, tokenValue} from "./util";

import {mapValuesToCssVars} from "./internal/map-values-to-css-vars";

// graphics palette
import graphicsPalette from "./tokens/graphics-palette";

// theme
import theme from "./tokens/theme";

const {border, boxShadow, semanticColor, sizing, font} = theme;

export {
    /**
     * Primitive tokens for the Wonder Blocks design system.
     */
    border,
    boxShadow,
    // TODO(WB-1989): Remove this export once all consumers have migrated to
    // using semanticColor.
    color,
    font,
    pxToRem,
    remToPx,
    sizing,
    spacing,
    /**
     * Media query breakpoints.
     */
    breakpoint,
    /**
     * Semantic tokens.
     */
    semanticColor,
    /**
     * The graphics palette. These colors are CSS variables that don't change
     * based on the theme.
     *
     * NOTE: Prefer `semanticColor` tokens (e.g. `semanticColor.graphics`),
     * which support themes. Only use `graphicsPalette` when a color must stay
     * the same in every theme (e.g. illustrations), and explain why. To get a
     * literal color value (e.g. for canvas), call `tokenValue()` at use time.
     */
    graphicsPalette,
    /**
     * Utility functions for working with colors.
     */
    mix,
    fade,
    /**
     * Allows converting regular JS tokens to CSS variables.
     */
    mapValuesToCssVars,
    /**
     * Resolves the raw value of a Wonder Blocks token at runtime by reading
     * the computed value of its underlying CSS custom property.
     */
    tokenValue,
};
