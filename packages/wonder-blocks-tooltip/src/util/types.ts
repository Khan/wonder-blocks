import type {CSSProperties} from "aphrodite";

export type Placement = "top" | "bottom" | "right" | "left";

/**
 * The visual style of the tooltip.
 *
 * - `subtle`: the default, standard tooltip styling.
 * - `strong`: a higher-emphasis tooltip that uses an inverse/knockout
 *   treatment. Its colors are defined with semantic tokens, so they adapt to
 *   the active theme.
 */
export type TooltipVariant = "subtle" | "strong";

/**
 * Subset of CSS properties to allow overriding some of the default styles
 */
export type ContentStyle = {
    color?: CSSProperties["color"];
    padding?: CSSProperties["padding"];
};
