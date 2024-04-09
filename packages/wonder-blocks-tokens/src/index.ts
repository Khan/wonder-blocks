// TODO(WB-1643): Move wonder-blocks-spacing to tokens
import spacing from "@khanacademy/wonder-blocks-spacing";

import {border} from "./tokens/border";
import {color} from "./tokens/color";
import {font} from "./tokens/font";

import {mix, fade} from "./util/utils";

export {
    /**
     * Core tokens for the Wonder Blocks design system.
     */
    border,
    color,
    font,
    spacing,
    /**
     * Utility functions for working with colors.
     */
    mix,
    fade,
};
