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

type AllowedStyleProps = {
    /**
     * The background color of the card, as a string identifier that matches a semanticColor token.
     * This can be one of:
     * - `"subtle"`, matching `semanticColor.core.background.base.subtle`: a light gray background, useful for cards that need to stand out from the page background.
     * - `"default"`, matching `semanticColor.core.background.base.default`: a white background, useful for cards that are placed on a light gray page background.
     *
     * Default: `"default"`
     */
    backgroundColor?: "subtle" | "default";
    /**
     * The border radius of the card, as a string identifier that matches a border.radius token.
     * This can be one of:
     * - `"radius_080"`, matching `border.radius.radius_080`: a moderate border radius, useful for cards that need to have a slightly rounded appearance.
     * - `"radius_120"`, matching `border.radius.radius_120`: a more pronounced border radius, useful for cards that need to have a more rounded appearance.
     *
     * Default: `"radius_080"`
     */
    borderRadius?: "radius_080" | "radius_120";
    /**
     * The padding inside the card, as a string identifier that matches a sizing token.
     * This can be one of:
     * - `"size_0"`, matching `sizing.size_0`: no padding, useful for cards that need to have content flush with the edges.
     * - `"size_160"`, matching `sizing.size_160`: moderate padding, useful for cards that need to have some space between the content and the edges.
     * - `"size_240"`, matching `sizing.size_240`: more padding, useful for cards that need to have more space between the content and the edges.
     *
     * Default: `"size_160"`
     */
    padding?: "size_0" | "size_160" | "size_240";
};
type Props = {
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
    ref?: React.Ref<any>;
    /**
     * The HTML tag to use for the card container. By default, this is a `<div>`, but
     * if the card is being used as a landmark region, you may want to set this to
     * `<section>` and provide an appropriate `aria-label` via the `labels` prop.
     */
    tag?: keyof JSX.IntrinsicElements;
    /**
     * The content for the card.
     */
    children: React.ReactNode;
    /**
     * A set of localizable labels for this component, including a dismiss button
     * and the card itself, if marked as an HTML region.
     */
    labels?: {
        dismissButtonAriaLabel?: string;
        cardAriaLabel?: string;
    };
    /**
     * A callback function to handle dismissing the card. When this prop is present,
     * a dismiss button with an X icon will be rendered.
     */
    onDismiss?: (e?: React.SyntheticEvent) => void;
    /**
     * An optional attribute to remove this component from the accessibility tree
     * and keyboard tab order, such as for inactive cards in a stack.
     */
    inert?: boolean;
    /**
     * The test ID used to locate this component in automated tests.
     */
    testId?: string;
} & AllowedStyleProps;

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
 * with the `styles.root` prop.
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
        backgroundColor = "default",
        borderRadius = "radius_080",
        padding = "size_160",
        children,
        onDismiss,
        inert,
    } = props;

    const componentStyles = getComponentStyles({
        backgroundColor,
        borderRadius,
        padding,
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

const getComponentStyles = ({
    backgroundColor,
    borderRadius,
    padding,
}: AllowedStyleProps) => {
    const backgroundColorStyle =
        (backgroundColor && backgroundColor === "subtle") ||
        backgroundColor === "default"
            ? semanticColor.core.background.base[backgroundColor]
            : undefined;
    return StyleSheet.create({
        root: {
            backgroundColor: backgroundColorStyle,
            borderColor: semanticColor.core.border.neutral.subtle,
            borderStyle: "solid",
            borderRadius: borderRadius && border.radius[borderRadius],
            borderWidth: border.width.thin,
            boxShadow: boxShadow.low,
            padding: padding && sizing[padding], // TODO[WB-2094]: figure out conversion to px
            minInlineSize: sizing.size_280,
            position: "relative",
        },
    });
};

export default Card;
