import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {focus} from "./focus-styles";

const pressColor = `color-mix(in srgb, ${semanticColor.core.border.neutral.default} 55%, ${semanticColor.core.border.inverse.strong})`;

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
    ":not([aria-disabled=true])": {
        borderColor: semanticColor.core.border.inverse.strong,
        color: semanticColor.core.foreground.inverse.strong,
    },

    ":hover:not([aria-disabled=true])": {
        color: semanticColor.core.foreground.inverse.strong,
        // Overriding borderColor only to preserve the visual integrity of the
        // button, as there might be some cases where the interactive element
        // already includes a border.
        borderColor: semanticColor.core.border.inverse.strong,
    },

    // Use the global focus styles to ensure that the focus state is consistent
    ...focus,

    ":active:not([aria-disabled=true])": {
        borderRadius: border.radius.radius_080,
        // This is a slightly darker color than the inverse color.
        borderColor: pressColor,
        background: `color-mix(in srgb, ${semanticColor.surface.primary} 5%, transparent)`,
    },
};
