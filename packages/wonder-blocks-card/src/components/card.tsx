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
    backgroundColor?: "subtle" | "default" | "transparent";
    borderRadius?: "radius_080" | "radius_120";
    padding?: "size_0" | "size_160" | "size_240";
};
type Props = {
    styles?: {
        root?: StyleType;
        dismissButton?: StyleType;
    };
    ref?: React.Ref<any>;
    tag?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
    labels?: {
        dismissButtonAriaLabel?: string;
        cardAriaLabel?: string;
    };
    onDismiss?: (e?: React.SyntheticEvent) => void;
    inert?: boolean;
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
        backgroundColor = "default",
        borderRadius = "radius_080",
        padding = "size_160", // TODO: figure out conversion to px
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
            style={[componentStyles.root, styles?.root]}
            ref={ref}
            tag={tag}
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
            : "transparent"; // fall back to transparent
    return StyleSheet.create({
        root: {
            backgroundColor: backgroundColorStyle,
            borderColor: semanticColor.core.border.neutral.subtle,
            borderStyle: "solid",
            borderRadius: borderRadius && border.radius[borderRadius],
            borderWidth: border.width.thin,
            boxShadow: boxShadow.low,
            padding: padding && sizing[padding], // TODO: figure out conversion to px
            maxWidth: "295px", // TODO: figure out max/min widths
            position: "relative",
            width: "100%",
        },
    });
};

export default Card;
