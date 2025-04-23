import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {focus} from "./focus-styles";

const pressColor = `color-mix(in srgb, ${semanticColor.border.strong} 55%, ${semanticColor.border.inverse})`;

/**
 * The inverse styles for an interactive control.
 *
 * This is used for special cases where the element is on a dark background.
 *
 * NOTE: This will be deprecated in the future.
 */
export const inverse = {
    // Overriding borderColor only to preserve the visual integrity of the
    // button, as there might be some cases where the interactive element
    // already includes a border.
    borderColor: semanticColor.border.inverse,
    color: semanticColor.text.inverse,

    ":hover": {
        color: semanticColor.text.inverse,
        // Overriding borderColor only to preserve the visual integrity of the
        // button, as there might be some cases where the interactive element
        // already includes a border.
        borderColor: semanticColor.border.inverse,
    },

    // Use the global focus styles to ensure that the focus state is consistent
    ...focus,

    ":active:not([aria-disabled=true])": {
        borderRadius: border.radius.radius_080,
        // This is a slightly darker color than the inverse color.
        borderColor: pressColor,
        background: `color-mix(in srgb, ${semanticColor.surface.primary} 5%, transparent)`,
        color: semanticColor.text.inverse,
    },
};
