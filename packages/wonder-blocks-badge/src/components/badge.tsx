import {addStyle, AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type IconOnly = {
    icon: React.ReactElement;
    label?: never;
};

type LabelOnly = {
    icon?: never;
    label: string;
};

type IconAndLabel = {
    icon: React.ReactElement;
    label: string;
};

/**
 * The props for the icon and label in the badge.
 * - Icon: The icon to display in the badge. It can be a PhosphorIcon, a custom svg,
 *   or `img` element. Considerations:
 *   - If the icon conveys meaning, set the alt text on the icon being used
 *   - If the icon is an `img` element, it may need width: 100% and height: 100%
 *     to render properly in the badge.
 * - Label: The label to display in the badge.
 */
type IconLabelProps = IconOnly | LabelOnly | IconAndLabel;

export type BadgeProps = AriaProps &
    IconLabelProps & {
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
        /**
         * The HTML tag to render. Defaults to `div`.
         */
        tag?: keyof JSX.IntrinsicElements;
    };

const StyledSpan = addStyle("span");

/**
 * Badges are visual indicators used to display concise information, such as
 * a status, label, or count.
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(function Badge(
    props: BadgeProps,
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

const badgeTokens = {
    root: {
        layout: {
            paddingBlock: sizing.size_040,
            paddingInline: sizing.size_080,
            gap: sizing.size_040,
        },
        border: {
            width: border.width.thin,
            style: "solid",
            radius: border.radius.radius_080,
        },
        color: {
            background: semanticColor.surface.secondary,
            foreground: semanticColor.text.primary,
            border: semanticColor.border.subtle,
        },
    },
    icon: {
        sizing: {
            width: sizing.size_160,
            height: sizing.size_160,
        },
        color: {
            foreground: semanticColor.icon.primary,
        },
    },
    iconOnly: {
        layout: {
            padding: sizing.size_040,
        },
    },
};

const styles = StyleSheet.create({
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: badgeTokens.root.layout.gap,
        // Make sure badge container fits the content
        width: "fit-content",
        // Make sure the badge text doesn't wrap
        textWrap: "nowrap",
        borderWidth: badgeTokens.root.border.width,
        borderStyle: badgeTokens.root.border.style,
        paddingBlock: badgeTokens.root.layout.paddingBlock,
        paddingInline: badgeTokens.root.layout.paddingInline,
        borderRadius: badgeTokens.root.border.radius,
    },
    defaultBadgeStyling: {
        backgroundColor: badgeTokens.root.color.background,
        borderColor: badgeTokens.root.color.border,
        color: badgeTokens.root.color.foreground,
    },
    icon: {
        width: badgeTokens.icon.sizing.width,
        height: badgeTokens.icon.sizing.height,
    },
    defaultIconStyling: {
        color: badgeTokens.icon.color.foreground,
    },
    iconOnly: {
        padding: badgeTokens.iconOnly.layout.padding,
    },
});
