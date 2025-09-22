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

type Props = {
    styles?: {
        root?: StyleType;
        dismissButton?: StyleType;
    };
    ref?: React.Ref<any>;
    children: React.ReactNode;
    showDismissButton?: boolean;
    dismissButtonLabel?: string;
    onDismiss?: (e?: React.SyntheticEvent) => void;
};

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
    const {styles, children, showDismissButton, dismissButtonLabel, onDismiss} =
        props;
    return (
        <View style={[componentStyles.root, styles?.root]} ref={ref}>
            {showDismissButton ? (
                <DismissButton
                    aria-label={dismissButtonLabel}
                    onClick={(e) => onDismiss?.(e)}
                />
            ) : null}
            {children}
        </View>
    );
});

const componentStyles = StyleSheet.create({
    root: {
        backgroundColor: semanticColor.core.background.base.subtle,
        borderColor: semanticColor.core.border.neutral.subtle,
        borderRadius: border.radius.radius_080,
        borderStyle: "solid",
        borderWidth: border.width.thin,
        boxShadow: boxShadow.low,
        padding: sizing.size_160, // TODO: figure out conversion to px
        maxWidth: "295px", // TODO: figure out max/min widths
        position: "relative",
        width: "100%",
    },
});

export default Card;
