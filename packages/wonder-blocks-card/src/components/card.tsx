import * as React from "react";

import {StyleSheet} from "aphrodite";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";

import {
    boxShadow,
    border,
    semanticColor,
    sizing,
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
 * Provide a specific HTML tag that overrides the default (`div`)
 * When `tag="section"` or `"figure"`, `cardAriaLabel` is required for accessibility.
 */
type TagProps =
    | {
          tag: "section" | "figure";
          labels: {cardAriaLabel: string} & Record<string, any>;
      }
    | {
          tag?: Exclude<keyof JSX.IntrinsicElements, "section" | "figure">;
          labels?: Record<string, any>;
      };

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
    background?: "base-subtle" | "base-default" | typeof Image;
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

type Props = BaseCardProps & TagProps & DismissProps;
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
 * When the `onDismiss` prop is provided, a dismiss button will be rendered. In this case, the `labels.dismissButtonAriaLabel` prop is required to provide an accessible label for the dismiss button.
 *
 * See additional Accessibility docs.
 */

const Card = React.forwardRef(function Card(
    props: Props,
    ref: React.ForwardedRef<any>,
) {
    const {
        styles,
        labels,
        tag,
        testId,
        background = "base-default",
        borderRadius = "small",
        paddingSize = "small",
        elevation = "none",
        children,
        onDismiss,
        inert,
    } = props;

    const componentStyles = getComponentStyles({
        background,
        borderRadius,
        paddingSize,
        elevation,
    });
    return (
        <View
            aria-label={labels?.cardAriaLabel}
            style={[componentStyles.root, styles?.root]}
            ref={ref}
            tag={tag}
            testId={testId}
            {...{inert: inert ? "" : undefined}}
        >
            {onDismiss ? (
                <DismissButton
                    aria-label={labels?.dismissButtonAriaLabel || "Close"}
                    onClick={(e) => onDismiss?.(e)}
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

// Cache for dynamically generated styles
const dynamicStyles: Record<string, any> = {};

/**
 * Generates a unique key for caching styles based on prop combinations
 */
const getStyleKey = ({
    background,
    borderRadius,
    paddingSize,
    elevation,
}: StyleProps): string => {
    return `${background || "default"}-${borderRadius || "small"}-${
        paddingSize || "small"
    }-${elevation || "none"}`;
};

/**
 * Generates the component styles with caching for better performance
 */
const getComponentStyles = (props: StyleProps) => {
    const styleKey = getStyleKey(props);
    // Return cached styles if they exist
    if (dynamicStyles[styleKey]) {
        return dynamicStyles[styleKey];
    }

    const {background, borderRadius, paddingSize, elevation} = props;
    const isBackgroundColorStyle =
        background === "base-subtle" || background === "base-default";

    // Generate new styles
    const newStyles = StyleSheet.create({
        root: {
            // Background styles
            ...(isBackgroundColorStyle && {
                backgroundColor: styleMap.backgroundColor[background],
            }),
            // Background image styles
            ...(!isBackgroundColorStyle &&
                background && {
                    background: `url(${background})`,
                    backgroundSize: "cover",
                }),
            // Common styles
            borderColor: semanticColor.core.border.neutral.subtle,
            borderStyle: "solid",
            borderWidth: border.width.thin,
            minInlineSize: sizing.size_280,
            position: "relative",
            // Optional styles based on props
            borderRadius: borderRadius && styleMap.borderRadius[borderRadius],
            boxShadow: elevation && styleMap.elevation[elevation],
            padding: paddingSize && styleMap.padding[paddingSize],
        },
    });

    // Cache the styles
    dynamicStyles[styleKey] = newStyles;
    return newStyles;
};

export default Card;
