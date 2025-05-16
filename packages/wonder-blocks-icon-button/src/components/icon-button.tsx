import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom-v5-compat";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

import type {
    IconButtonActionType,
    IconButtonKind,
    IconButtonProps,
    IconButtonSize,
} from "../util/icon-button.types";

import iconButtonTheme from "../theme/index";
import {IconButtonUnstyled} from "./icon-button-unstyled";

const theme = iconButtonTheme.iconButton;

/**
 * Returns the phosphor icon component based on the size. This is necessary
 * so we can cast the icon to the correct type.
 */
function IconChooser({
    icon,
    size,
}: {
    icon: IconButtonProps["icon"];
    size: IconButtonSize;
}) {
    // We set the icon size based on the theme object. This is necessary
    // because the icon size could change based on the theme.
    const iconStyle = {
        width: theme.icon.size[size],
        height: theme.icon.size[size],
    };

    switch (size) {
        case "small":
            return (
                <PhosphorIcon
                    size="small"
                    color="currentColor"
                    icon={icon as PhosphorBold | PhosphorFill}
                    style={iconStyle}
                />
            );
        case "medium":
        default:
            return (
                <PhosphorIcon
                    size="medium"
                    color="currentColor"
                    icon={icon as PhosphorRegular | PhosphorFill}
                    style={iconStyle}
                />
            );
    }
}

/**
 * An `IconButton` is a button whose contents are an SVG image.
 *
 * To use, supply an `onClick` function, a Phosphor icon asset (see the
 * `Icon>PhosphorIcon` section) and an `aria-label` to describe the button
 * functionality. Optionally specify href (URL), clientSideNav, color (Wonder
 * Blocks Blue or Red), kind ("primary", "secondary", or "tertiary"), light
 * (whether the IconButton will be rendered on a dark background), disabled ,
 * test ID, and custom styling.
 *
 * The size of an `IconButton` is based on how the `size` prop is defined (see
 * `Sizes` below for more details). The focus ring which is displayed on hover
 * and focus is much larger but does not affect its size. This matches the
 * behavior of Button.
 *
 * IconButtons require a certain amount of space between them to ensure the
 * focus rings don't overlap. The minimum amount of spacing is 16px, but you
 * should refer to the mocks provided by design.  Using a Strut in between
 * IconButtons is the preferred way to for adding this spacing.
 *
 * Many layouts require alignment of visual left (or right) side of an
 * `IconButton`. This requires a little bit of pixel nudging since each icon as
 * a different amount of internal padding.
 *
 * See the Toolbar documentation for examples of `IconButton` use that follow
 * the best practices described above.
 *
 * ```js
 * import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import IconButton from "@khanacademy/wonder-blocks-icon-button";
 *
 * <IconButton
 *     icon={magnifyingGlassIcon}
 *     aria-label="An Icon"
 *     onClick={(e) => console.log("Hello, world!")}
 *     size="medium"
 * />
 * ```
 */
export const IconButton: React.ForwardRefExoticComponent<
    IconButtonProps &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    IconButtonProps
>(function IconButton(props: IconButtonProps, ref) {
    const {
        actionType = "progressive",
        disabled = false,
        icon,
        kind = "primary",
        size = "medium",
        style,
        type = "button",
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    const buttonStyles = _generateStyles(actionType, !!disabled, kind, size);

    const styles = [
        buttonStyles.default,
        disabled && buttonStyles.disabled,
        pressed && buttonStyles.pressed,
        style,
    ];

    const handlePress = React.useCallback((isPressing: boolean) => {
        setPressed(isPressing);
    }, []);

    return (
        <IconButtonUnstyled
            {...restProps}
            disabled={disabled}
            onPress={handlePress}
            ref={ref}
            style={styles}
            type={type}
        >
            <IconChooser size={size} icon={icon} />
        </IconButtonUnstyled>
    );
});

const styles: Record<string, any> = {};

const _generateStyles = (
    actionType: IconButtonActionType = "progressive",
    disabled: boolean,
    kind: IconButtonKind,
    size: IconButtonSize,
) => {
    const buttonType = `${actionType}-d_${disabled}-${kind}-${size}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const borderWidthKind = theme.root.border.width[kind];
    const outlineOffsetKind = theme.root.border.offset[kind];
    const themeVariant = semanticColor.action[kind][actionType];
    const disabledState = semanticColor.action[kind].disabled;

    const disabledStatesStyles = {
        borderColor: disabledState.border,
        borderWidth: borderWidthKind.default,
        background: disabledState.background,
        color: disabledState.foreground,
    };

    const pressStyles = {
        // primary
        outline:
            kind === "primary"
                ? `${borderWidthKind.press} solid ${themeVariant.press.border}`
                : "none",
        outlineOffset: kind === "primary" ? outlineOffsetKind : undefined,
        // secondary, tertiary
        border:
            kind !== "primary"
                ? `${borderWidthKind.press} solid ${themeVariant.press.border}`
                : "none",
        background: themeVariant.press.background,
        borderRadius: theme.root.border.radius.press,
        color: themeVariant.press.foreground,
        // Animation
        transition: "border-radius 0.1s ease-in-out",
    };

    const newStyles = {
        default: {
            // Define button sizes per theme.
            height: theme.root.size[size],
            width: theme.root.size[size],
            borderRadius: theme.root.border.radius.default,
            // theming
            borderStyle: "solid",
            borderWidth: borderWidthKind.default,
            borderColor: themeVariant.default.border,
            background: themeVariant.default.background,
            color: themeVariant.default.foreground,

            /**
             * States
             *
             * Defined in the following order: hover, active, focus.
             *
             * This is important as we want to give more priority to the
             * :focus-visible styles.
             */
            ":hover": {
                background: themeVariant.hover.background,
                borderRadius: theme.root.border.radius.hover,
                color: themeVariant.hover.foreground,
                outline:
                    kind === "primary"
                        ? `${borderWidthKind.hover} solid ${themeVariant.hover.border}`
                        : undefined,
                outlineOffset:
                    kind === "primary" ? outlineOffsetKind : undefined,
                border:
                    kind !== "primary"
                        ? `${borderWidthKind.hover} solid ${themeVariant.hover.border}`
                        : undefined,
            },
            // Allow hover styles on non-touch devices only. This prevents an
            // issue with hover being sticky on touch devices (e.g. mobile).
            ["@media not (hover: hover)"]: {
                ":hover": {
                    // reset hover styles on non-touch devices
                    backgroundColor: "transparent",
                },
            },

            ":active": pressStyles,

            // :focus-visible -> Provide focus styles for keyboard users only.
            ...focusStyles.focus,
        },
        disabled: {
            cursor: "not-allowed",
            ...disabledStatesStyles,
            // NOTE: Even that browsers recommend to specify pseudo-classes in
            // this order: link, visited, focus, hover, active, we need to
            // specify focus after hover to override hover styles. By doing this
            // we are able to reset the border/outline styles to the default
            // ones (rest state).
            // For order reference: https://css-tricks.com/snippets/css/link-pseudo-classes-in-order/
            ":hover": {...disabledStatesStyles, outline: "none"},
            ":active": {...disabledStatesStyles, outline: "none"},
            ":focus-visible": disabledStatesStyles,
        },
        // Enable keyboard support for press styles.
        pressed: pressStyles,
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
