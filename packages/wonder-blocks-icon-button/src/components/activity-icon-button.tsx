import * as React from "react";
import {CSSProperties, StyleSheet} from "aphrodite";
import {Link} from "react-router-dom-v5-compat";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

import {View} from "@khanacademy/wonder-blocks-core";

import type {
    ActivityIconButtonActionType,
    ActivityIconButtonKind,
    IconButtonProps,
    IconButtonSize,
} from "../util/icon-button.types";

import iconButtonTheme from "../theme/index";
import {IconButtonUnstyled} from "./icon-button-unstyled";

const theme = iconButtonTheme.activity;

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
        width: theme.icon.sizing[size],
        height: theme.icon.sizing[size],
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

type Props = Omit<IconButtonProps, "actionType" | "kind"> & {
    /**
     * The action type of the button. This determines the visual style of the
     * button.
     *
     * - `progressive` is used for actions that move the user forward in a flow.
     * - `neutral` is used for buttons that indicate a neutral action.
     */
    actionType?: ActivityIconButtonActionType;

    /**
     * The `kind` (hierarchy) of the activity icon button.
     */
    kind?: ActivityIconButtonKind;
};

/**
 * `ActivityIconButton` is a button whose contents are an SVG image.
 *
 * ```tsx
 * import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import {ActivityIconButton} from "@khanacademy/wonder-blocks-icon-button";
 *
 * <ActivityIconButton
 *     icon={magnifyingGlassIcon}
 *     aria-label="An Icon"
 *     onClick={(e) => console.log("Hello, world!")}
 * />
 * ```
 */
export const ActivityIconButton: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function ActivityIconButton(props: Props, ref) {
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

    const chonkyStyles = [
        buttonStyles.chonky,
        disabled && buttonStyles.chonkyDisabled,
        pressed && buttonStyles.chonkyPressed,
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
            <View style={chonkyStyles} className="chonky">
                <IconChooser size={size} icon={icon} />
            </View>
        </IconButtonUnstyled>
    );
});

const styles: Record<string, any> = {};

const _generateStyles = (
    actionType: ActivityIconButtonActionType = "progressive",
    disabled: boolean,
    kind: ActivityIconButtonKind,
    size: IconButtonSize,
) => {
    const buttonType = `${actionType}-d_${disabled}-${kind}-${size}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const themeVariant = semanticColor.chonky[actionType];
    const disabledState = semanticColor.chonky.disabled;

    const disabledStatesStyles = {
        outline: "none",
        transform: "none",
    };
    const chonkyDisabled = {
        background: disabledState.background[kind],
        color: disabledState.foreground[kind],
        boxShadow: `${theme.root.shadow.default.x} ${theme.root.shadow.default.y} ${theme.root.shadow.default.blur} ${disabledState.shadow[kind]}`,
        transform: "none",
    };

    const chonkyPressed = {
        background: themeVariant.background[kind].press,
        color: themeVariant.foreground[kind].press,
        // Animation
        boxShadow: `${theme.root.shadow.default.x} ${theme.root.shadow.press.y} ${theme.root.shadow.default.blur} ${themeVariant.shadow[kind].rest}`,
        transition: "all 0.15s cubic-bezier(.4,0,.2,1)",
        transform: `translateY(${theme.root.shadow.default.y})`,
    };

    const newStyles: Record<string, CSSProperties> = {
        default: {
            borderRadius: theme.root.border.radius,
            color: themeVariant.foreground[kind].rest,
            flexDirection: "column",
            paddingBlockEnd: theme.root.shadow.default.y,
            transition: "all 0.15s ease-in-out",
            /**
             * States
             *
             * Defined in the following order: hover, active, focus.
             *
             * This is important as we want to give more priority to the
             * :focus-visible styles.
             */
            ":hover": {
                color: themeVariant.foreground[kind].hover,
                transition: "all 0.15s ease-in-out",
            },
            [":is(:hover) .chonky" as any]: {
                background: themeVariant.background[kind].hover,
                transition: "all 0.15s ease-in-out",
                transform: `translateY(calc((${theme.root.shadow.hover.y} - ${theme.root.shadow.default.y}) * -1))`,
                boxShadow: `${theme.root.shadow.default.x} ${theme.root.shadow.hover.y} ${theme.root.shadow.default.blur} ${themeVariant.shadow[kind].rest}`,
            },

            // Allow hover styles on non-touch devices only. This prevents an
            // issue with hover being sticky on touch devices (e.g. mobile).
            ["@media not (hover: hover)" as any]: {
                ":hover": {
                    // reset hover styles on non-touch devices
                    backgroundColor: "transparent",
                },
            },

            [":is(:active) .chonky" as any]: chonkyPressed,

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
            ":hover": disabledStatesStyles,
            [":is(:hover) .chonky" as any]: chonkyDisabled,
            ":active": disabledStatesStyles,
            [":is(:active) .chonky" as any]: chonkyDisabled,
            ":focus-visible": {
                transform: "none",
            },
        },
        // Enable keyboard support for press styles.
        pressed: {
            [".chonky" as any]: chonkyPressed,
        },

        // Adds the "chonky" look and feel to the button.
        chonky: {
            // layout
            borderRadius: theme.root.border.radius,
            paddingBlock: theme.root.layout.padding.block,
            paddingInline: theme.root.layout.padding.inline,
            // theming
            borderStyle: "solid",
            borderWidth: theme.root.border.width[kind],
            borderColor: themeVariant.border[kind].rest,
            background: themeVariant.background[kind].rest,
            boxShadow: `${theme.root.shadow.default.x} ${theme.root.shadow.default.y} ${theme.root.shadow.default.blur} ${themeVariant.shadow[kind].rest}`,
        },
        chonkyPressed,
        chonkyDisabled,
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
