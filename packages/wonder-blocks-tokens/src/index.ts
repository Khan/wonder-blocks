// primitive tokens
// This use is valid while we still have color token instances in consumers.
/* eslint-disable import/no-deprecated */
import {color} from "./tokens/color";
import {spacing} from "./tokens/spacing";

// media queries
import {breakpoint} from "./tokens/media-queries";

// utils
import {mix, fade, pxToRem, remToPx} from "./util";

import {mapValuesToCssVars} from "./internal/map-values-to-css-vars";

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
     * Utility functions for working with colors.
     */
    mix,
    fade,
    /**
     * Allows converting regular JS tokens to CSS variables.
     */
    mapValuesToCssVars,
};
