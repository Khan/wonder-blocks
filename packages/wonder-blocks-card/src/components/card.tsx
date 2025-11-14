import * as React from "react";

import {StyleSheet} from "aphrodite";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import type {AriaAttributes} from "@khanacademy/wonder-blocks-core";

import {
    boxShadow,
    border,
    semanticColor,
    sizing,
    font,
} from "@khanacademy/wonder-blocks-tokens";

import {DismissButton} from "./dismiss-button";

/**
 * Base props that are shared across all Card configurations
 */
type BaseCardProps = {
    /**
     * Optional styles to be applied to the root element and the dismiss button.
     */
    styles?: {
        root?: StyleType;
        dismissButton?: StyleType;
    };
    /**
     * A ref that will be passed to the root element (i.e. the card container).
     */
    ref?: React.Ref<HTMLElement>;
    /**
     * The content for the card.
     */
    children: React.ReactNode;
    /**
     * An optional attribute to remove this component from the accessibility tree
     * and keyboard tab order, such as for inactive cards in a stack.
     */
    inert?: boolean;
    /**
     * The test ID used to locate this component in automated tests.
     *
     * The test ID will also be passed to the dismiss button as
     * `{testId}-dismiss-button` if the `onDismiss` prop is provided.
     */
    testId?: string;
} & StyleProps;

/**
 * A callback function to handle dismissing the card. When this prop is present,
 * a dismiss button with an X icon will be rendered.
 *
 * When `onDismiss` is provided, `labels.dismissButtonAriaLabel` must also be
 * provided for accessibility and localization.
 */
type DismissProps =
    | {
          onDismiss: (e?: React.SyntheticEvent) => void;
          labels: {dismissButtonAriaLabel: string} & Record<string, any>;
      }
    | {
          onDismiss?: never;
          labels?: Record<string, any>;
      };

/**
 * Valid HTML tags for the Card component.
 * Excludes button and anchor tags which should use Wonder Blocks Button and Link components instead.
 */

/**
 * Accessibility props for the Card.
 *
 * Labeling methods (in order of preference):
 * 1. `labels.cardAriaLabel` - For translatable strings (preferred)
 * 2. `aria-labelledby` - For ID references
 * 3. `aria-label` - also allowed as a fallback. `labels.cardAriaLabel` automatically
 * applies this attribute.
 *
 * Multiple methods can be provided for consumer simplicity, but only one will win
 * based on standard Accessible Name Computation rules.
 */
type AccessibilityProps = {
    labels?: {
        cardAriaLabel?: string;
        dismissButtonAriaLabel?: string;
    };
    "aria-labelledby"?: string;
    "aria-label"?: string;
    "aria-busy"?: AriaAttributes["aria-busy"];
    "aria-roledescription"?: AriaAttributes["aria-roledescription"];
};

/**
 * Tag and accessibility props combined.
 */
type TagProps = {
    tag?: Exclude<keyof JSX.IntrinsicElements, "button" | "a">;
} & AccessibilityProps;

type StyleProps = {
    /**
     * The background style of the card, as a string identifier that matches a semanticColor token.
     * This can be one of:
     * - `"base-subtle"` (color), `semanticColor.core.background.base.subtle`: a light gray background.
     * - `"base-default"` (color), `semanticColor.core.background.base.default`: a white background.
     * - `Image` (image), a URL string for a background image. Can be an imported image file or a URL string.
     *
     * For additional background styling such as repeat or size, use the `styles.root` prop to pass in custom styles.
     *
     * Default: `"base-default"`
     */
    background?: "base-subtle" | "base-default" | typeof Image | null;
    /**
     * The border radius of the card, as a string identifier that matches a border.radius token.
     * This can be one of:
     * - `"radius_080"`, matching `border.radius.radius_080`.
     * - `"radius_120"`, matching `border.radius.radius_120`.
     *
     * Default: `"radius_080"`
     */
    borderRadius?: "small" | "medium";
    /**
     * The padding inside the card, as a string identifier that matches a sizing token.
     * This can be one of:
     * - `"none"`: no padding.
     * - `"small"`, matching `sizing.size_160`.
     * - `"medium"`, matching `sizing.size_240`.
     *
     * Default: `"size_160"`
     */
    paddingSize?: "none" | "small" | "medium";
    /**
     * The box-shadow for the card, as a string identifier that matches a sizing token.
     * This can be one of:
     * - `"none"`: no elevation.
     * - `"low"`, matching `boxShadow.low`.
     *
     * Default: `"none"`
     */
    elevation?: "none" | "low";
};

type CardProps = BaseCardProps & TagProps & DismissProps;
/**
 * The Card component is a flexible, reusable UI building block designed to
 * encapsulate content within a structured, visually distinct container.
 * Its primary goal is to present grouped or related information in a way that
 * is visually consistent, easily scannable, and modular across different
 * parts of the application.
 *
 * Cards provide a defined surface area with clear visual boundaries
 * (via border-radius and box-shadow elevation tokens), making them ideal for
 * use cases that involve displaying comparable content items side-by-side or
 * in structured layouts such as grids, lists, or dashboards.
 *
 * Note: cards do not set a default width. Width styles should be set by the consumer
 * with the `styles.root` prop, or a parent flex or grid container.
 *
 * ### Usage
 *
 * ```jsx
 * import {Card} from "@khanacademy/wonder-blocks-card";
 *
 * <Card>
 *   <Heading>This is a basic card.</Heading>
 * </Card>
 * ```
 *
 * ### Accessibility
 *
 * When the `onDismiss` prop is provided, a dismiss button will be rendered.
 * In this case, the `labels.dismissButtonAriaLabel` prop is required to provide
 * a translatable screen reader label for the dismiss button.
 *
 * See additional Accessibility docs.
 */

const Card = React.forwardRef(function Card(
    props: CardProps,
    ref: React.ForwardedRef<HTMLElement>,
) {
    const {
        styles,
        labels,
        tag,
        testId = "card",
        background = "base-default",
        borderRadius = "small",
        paddingSize = "small",
        elevation = "none",
        children,
        onDismiss,
        inert,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-busy": ariaBusy,
    } = props;

    const isBackgroundToken =
        background === "base-default" || background === "base-subtle";
    const componentStyles = getComponentStyles({
        background: isBackgroundToken ? background : null,
        borderRadius,
        paddingSize,
        elevation,
    });

    // Determine the aria-label value with proper precedence:
    // 1. labels.cardAriaLabel (preferred for translatable strings)
    // 2. aria-labelledby (if provided, don't set aria-label)
    // 3. aria-label (fallback)
    const ariaLabelValue = labels?.cardAriaLabel
        ? labels.cardAriaLabel
        : ariaLabelledBy
          ? undefined
          : ariaLabel;

    return (
        <View
            aria-busy={ariaBusy}
            aria-label={ariaLabelValue}
            aria-labelledby={ariaLabelledBy}
            style={[
                componentStyles.root,
                !isBackgroundToken && {
                    background: `url(${background})`,
                    backgroundSize: "cover",
                },
                styles?.root,
            ]}
            ref={ref}
            tag={tag}
            testId={testId}
            {...{inert: inert ? "" : undefined}}
        >
            {onDismiss ? (
                <DismissButton
                    aria-label={labels?.dismissButtonAriaLabel || "Close"}
                    onClick={(e) => onDismiss?.(e)}
                    testId={`${testId}-dismiss-button`}
                />
            ) : null}
            {children}
        </View>
    );
});

// Map prop values to tokens
const styleMap = {
    backgroundColor: {
        "base-subtle": semanticColor.core.background.base.subtle,
        "base-default": semanticColor.core.background.base.default,
    },
    borderRadius: {
        small: border.radius.radius_080,
        medium: border.radius.radius_120,
    },
    padding: {
        none: sizing.size_0,
        small: sizing.size_160,
        medium: sizing.size_240,
    },
    elevation: {
        none: "none",
        low: boxShadow.low,
    },
} as const;

/**
 * Gets the styles for the card based on its props
 */
const getComponentStyles = ({
    background = "base-default",
    borderRadius = "small",
    paddingSize = "small",
    elevation = "none",
}: StyleProps) => {
    const bgColor = background as keyof typeof styleMap.backgroundColor;
    return StyleSheet.create({
        root: {
            backgroundColor: bgColor && styleMap.backgroundColor[bgColor],
            // Common styles
            borderColor: semanticColor.core.border.neutral.subtle,
            borderStyle: "solid",
            borderWidth: border.width.thin,
            // Apply the system font to cards by default
            fontFamily: font.family.sans,
            minInlineSize: sizing.size_280,
            position: "relative",
            // Optional styles based on props
            borderRadius: styleMap.borderRadius[borderRadius],
            boxShadow: styleMap.elevation[elevation],
            padding: styleMap.padding[paddingSize],
        },
    });
};

export default Card;
