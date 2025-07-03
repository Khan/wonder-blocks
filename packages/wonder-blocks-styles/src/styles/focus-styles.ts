import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";

/**
 * A global focus style that can be applied to interactive elements.
 *
 * This style injects a combination of `outline` and `box-shadow` to indicate
 * the element is focused. This is used for accessibility purposes as it allows
 * the element to present a focus state on Windows High Contrast mode.
 */
export const focus = {
    ":focus-visible": {
        boxShadow: `0 0 0 ${border.width.medium} ${semanticColor.focus.inner}`,
        outline: `${border.width.medium} solid ${semanticColor.focus.outer}`,
        outlineOffset: border.width.medium,
    },
};
