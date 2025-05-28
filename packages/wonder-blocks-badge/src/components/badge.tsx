import {addStyle} from "@khanacademy/wonder-blocks-core";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {BaseBadgeProps, IconLabelProps} from "../types";
import theme from "../theme";

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
                typographyStyles.LabelXSmall,
                styles.badge,
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
            {label}
        </StyledTag>
    );
});

export {Badge};

const styles = StyleSheet.create({
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: theme.badge.root.layout.default.gap,
        // Make sure badge container fits the content
        width: "fit-content",
        // Make sure the badge text doesn't wrap
        textWrap: "nowrap",
        borderWidth: theme.badge.root.border.width,
        borderStyle: theme.badge.root.border.style,
        paddingBlock: theme.badge.root.layout.default.paddingBlock,
        paddingInline: theme.badge.root.layout.default.paddingInline,
        borderRadius: theme.badge.root.border.radius,
        // Include focus styles in case the badge is made interactive by using
        // it with another component like `Tooltip`
        ...focusStyles.focus,
    },
    defaultBadgeStyling: {
        backgroundColor: theme.badge.root.color.background,
        borderColor: theme.badge.root.color.border,
        color: theme.badge.root.color.foreground,
    },
    icon: {
        // Use minWidth and minHeight to ensure custom sized icons don't
        // overflow the badge
        minWidth: theme.badge.icon.sizing.width,
        minHeight: theme.badge.icon.sizing.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    defaultIconStyling: {
        color: theme.badge.icon.color.foreground,
    },
    iconOnly: {
        padding: theme.badge.root.layout.iconOnly.padding,
    },
});
