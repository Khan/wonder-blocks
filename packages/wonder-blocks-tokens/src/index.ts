// primitive tokens
import {border} from "./tokens/border";
import {color} from "./tokens/color";
import {font} from "./tokens/font";
import {spacing} from "./tokens/spacing";

// media queries
import {breakpoints, pureWidths} from "./tokens/media-queries";
// semantic tokens
import {semanticColor} from "./tokens/semantic-color";

// utils
import {mix, fade} from "./util/utils";

export {
    /**
     * Primitive tokens for the Wonder Blocks design system.
     */
    border,
    color,
    font,
    spacing,
    /**
     * Media query breakpoints.
     */
    breakpoints,
    pureWidths,
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
