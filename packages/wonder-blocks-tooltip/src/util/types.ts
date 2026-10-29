import type {CSSProperties} from "aphrodite";
import type {FloatingReferenceProps} from "@khanacademy/wonder-blocks-core";

export type Placement = "top" | "bottom" | "right" | "left";

/**
 * The props that `Tooltip` injects into its anchored content (`children`).
 *
 * A custom component used as a tooltip anchor should include these in its
 * props and pass them along to its root element (unless it attaches the ref it
 * is given to that element instead), e.g.:
 *
 * ```tsx
 * type Props = TooltipAnchorProps & {label: string};
 *
 * function Badge({label, ...anchorProps}: Props) {
 *     return <View {...anchorProps}>{label}</View>;
 * }
 * ```
 *
 * Declaring them (rather than spreading untyped props) documents that the
 * component can be used as an anchor, and lets TypeScript check that only
 * these props are passed along.
 */
export type TooltipAnchorProps = FloatingReferenceProps & {
    /**
     * Links the anchored element to the tooltip bubble for screen readers.
     */
    "aria-describedby"?: string;
};

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
