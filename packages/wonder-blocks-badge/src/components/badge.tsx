import {addStyle} from "@khanacademy/wonder-blocks-core";
import {
    border,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {BaseBadgeProps, IconLabelProps} from "../types";

type Props = IconLabelProps & BaseBadgeProps;

const StyledSpan = addStyle("span");

/**
 * Badges are visual indicators used to display concise information, such as
 * a status, label, or count.
 */
const Badge = React.forwardRef<HTMLDivElement, Props>(function Badge(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        icon,
        label,
        id,
        testId,
        styles: stylesProp,
        tag = "div",
        ...otherProps
    } = props;
    const StyledTag = React.useMemo(() => addStyle(tag, styles.default), [tag]);
    if (!label && !icon) {
        return <React.Fragment />;
    }
    return (
        <StyledTag
            id={id}
            data-testid={testId}
            ref={ref}
            style={[
                styles.badge,
                styles.badgeTypography,
                styles.defaultBadgeStyling,
                icon && !label ? styles.iconOnly : {},
                stylesProp?.root,
            ]}
            {...otherProps}
        >
            {icon && (
                <StyledSpan
                    style={[
                        styles.icon,
                        styles.defaultIconStyling,
                        stylesProp?.icon,
                    ]}
                >
                    {icon}
                </StyledSpan>
            )}
            {label && (
                <StyledSpan style={[styles.label, stylesProp?.label]}>
                    {label}
                </StyledSpan>
            )}
        </StyledTag>
    );
});

export {Badge};

const badgeTokens = {
    root: {
        layout: {
            default: {
                paddingBlock: sizing.size_040,
                paddingInline: sizing.size_080,
                gap: sizing.size_040,
            },
            iconOnly: {
                padding: sizing.size_040,
            },
        },
        border: {
            width: border.width.thin,
            style: "solid",
            radius: border.radius.radius_080,
        },
        color: {
            background: semanticColor.surface.secondary,
            foreground: semanticColor.core.foreground.neutral.strong,
            border: semanticColor.core.border.neutral.subtle,
        },
    },
    icon: {
        sizing: {
            width: sizing.size_160,
            height: sizing.size_160,
        },
        color: {
            foreground: semanticColor.core.foreground.neutral.default,
        },
    },
};

const styles = StyleSheet.create({
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: badgeTokens.root.layout.default.gap,
        // Make sure badge container fits the content
        width: "fit-content",
        // Make sure the badge text doesn't wrap
        textWrap: "nowrap",
        borderWidth: badgeTokens.root.border.width,
        borderStyle: badgeTokens.root.border.style,
        paddingBlock: badgeTokens.root.layout.default.paddingBlock,
        paddingInline: badgeTokens.root.layout.default.paddingInline,
        borderRadius: badgeTokens.root.border.radius,
        // Include focus styles in case the badge is made interactive by using
        // it with another component like `Tooltip`
        ...focusStyles.focus,
    },
    label: {
        // Truncate the label after ~30 characters
        maxWidth: "30ch",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    badgeTypography: {
        fontFamily: font.family.sans,
        fontSize: font.body.size.xsmall,
        fontWeight: font.weight.bold,
        lineHeight: font.body.lineHeight.xsmall,
    },
    defaultBadgeStyling: {
        backgroundColor: badgeTokens.root.color.background,
        borderColor: badgeTokens.root.color.border,
        color: badgeTokens.root.color.foreground,
    },
    icon: {
        // Use minWidth and minHeight to ensure custom sized icons don't
        // overflow the badge
        minWidth: badgeTokens.icon.sizing.width,
        minHeight: badgeTokens.icon.sizing.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    defaultIconStyling: {
        color: badgeTokens.icon.color.foreground,
    },
    iconOnly: {
        padding: badgeTokens.root.layout.iconOnly.padding,
    },
});
