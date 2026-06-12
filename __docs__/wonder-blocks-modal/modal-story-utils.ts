import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

/**
 * Shared Aphrodite style for the checkerboard background used as a decorator
 * in modal stories. Spread this into a `modalPositioner` key inside
 * `StyleSheet.create(...)`.
 *
 * The checkerboard uses two tones — `semanticColor.core.background.neutral.subtle`
 * and `semanticColor.core.transparent` — so it adapts automatically to light
 * and dark mode.
 */
export const modalPositionerStyle = {
    // Checkerboard background
    backgroundImage: `linear-gradient(45deg, ${semanticColor.core.background.neutral.subtle} 25%, ${semanticColor.core.transparent} 25%), linear-gradient(-45deg, ${semanticColor.core.background.neutral.subtle} 25%, ${semanticColor.core.transparent} 25%), linear-gradient(45deg, ${semanticColor.core.transparent} 75%, ${semanticColor.core.background.neutral.subtle} 75%), linear-gradient(-45deg, ${semanticColor.core.transparent} 75%, ${semanticColor.core.background.neutral.subtle} 75%)`,
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    insetInlineStart: 0,
    insetInlineEnd: 0,
    insetBlockStart: 0,
    insetBlockEnd: 0,
} as const;
