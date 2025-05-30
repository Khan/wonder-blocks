import {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

/**
 * All the possible icon weights.
 */
export type PhosphorIconAsset = PhosphorRegular | PhosphorBold | PhosphorFill;

/**
 * All the possible icon weights.
 */
export type IconSize = "small" | "medium" | "large" | "xlarge";

/**
 * Common props for custom icon components.
 */
export type CustomIconProps = AriaProps & {
    /**
     * The alternative text for the icon. If `aria-label` or `aria-labelledby`
     * is not provided, the icon will be marked with `aria-hidden=true`..
     */
    "aria-label"?: string;

    /**
     * The id of the element that provides the alternative text for the icon.
     * If `aria-label` is not provided, the icon will be marked with
     * `aria-hidden=true`.
     */
    "aria-labelledby"?: string;

    /**
     * The id for the element.
     */
    id?: string;

    /**
     * The test id for the element.
     */
    testId?: string;

    /**
     * The style for the element.
     */
    style?: StyleType;
};
