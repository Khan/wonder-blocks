// primitive tokens
import {color} from "./tokens/color";
import {font} from "./tokens/font";
import {spacing} from "./tokens/spacing";

// media queries
import {breakpoint} from "./tokens/media-queries";

// utils
import {mix, fade} from "./util/utils";

// theme
import theme from "./tokens/theme";

const {border, semanticColor, sizing} = theme;

export {
    /**
     * Primitive tokens for the Wonder Blocks design system.
     */
    border,
    color,
    font,
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
};
