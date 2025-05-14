import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {border, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

export type BadgeProps = AriaProps & {
    /**
     * The label to display in the badge.
     */
    label?: string;
    /**
     * The icon to display in the badge. It can be a PhosphorIcon, a custom svg,
     * or `img` element.
     * Considerations:
     * - If the icon conveys meaning, set the alt text on the icon being used
     * - If the icon is an `img` element, it may need width: 100% and height: 100%
     *   to render properly in the badge.
     */
    icon?: React.ReactElement;
    /**
     * The id for the badge.
     */
    id?: string;
    /**
     * The test id for the badge.
     */
    testId?: string;
    /**
     * Custom styles for the elements in the Badge component.
     * - `root`: Styles the root element
     * - `icon`: Styles the icon element
     */
    styles?: {
        root?: StyleType;
        icon?: StyleType;
    };
};

const StyledDiv = addStyle("div");
const StyledSpan = addStyle("span");

/**
 * Badges are visual indicators used to display concise information, such as
 * a status, label, or count.
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(function Badge(
    props: BadgeProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {icon, label, id, testId, styles: stylesProp, ...otherProps} = props;
    if (!label && !icon) {
        return <React.Fragment />;
    }
    return (
        <StyledDiv
            id={id}
            data-testid={testId}
            ref={ref}
            style={[
                typographyStyles.LabelXSmall,
                styles.badge,
                icon && !label ? styles.iconOnly : {},
                stylesProp?.root,
            ]}
            {...otherProps}
        >
            {icon && (
                <StyledSpan style={[styles.icon, stylesProp?.icon]}>
                    {icon}
                </StyledSpan>
            )}
            {label}
        </StyledDiv>
    );
});

export {Badge};

const badgeTokens = {
    root: {
        sizing: {
            paddingBlock: sizing.size_040,
            paddingInline: sizing.size_080,
            gap: sizing.size_040,
        },
        border: {
            width: border.width.thin,
            style: "solid",
            radius: border.radius.radius_080,
        },
    },
    icon: {
        sizing: {
            width: sizing.size_160,
            height: sizing.size_160,
        },
    },
    iconOnly: {
        sizing: {
            padding: sizing.size_040,
        },
    },
};

const styles = StyleSheet.create({
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: badgeTokens.root.sizing.gap,
        width: "fit-content",
        borderWidth: badgeTokens.root.border.width,
        borderStyle: badgeTokens.root.border.style,
        paddingBlock: badgeTokens.root.sizing.paddingBlock,
        paddingInline: badgeTokens.root.sizing.paddingInline,
        borderRadius: badgeTokens.root.border.radius,
    },
    icon: {
        width: badgeTokens.icon.sizing.width,
        height: badgeTokens.icon.sizing.height,
    },
    iconOnly: {
        padding: badgeTokens.iconOnly.sizing.padding,
    },
});
