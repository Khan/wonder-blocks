// primitive tokens
import {border} from "./tokens/border";
import {color} from "./tokens/color";
import {font} from "./tokens/font";
import {spacing} from "./tokens/spacing";

// semantic tokens
import {semanticColor} from "./tokens/semantic-color";

// media queries
import {mediaQueries} from "./tokens/media-queries";

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
    mediaQueries,
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
