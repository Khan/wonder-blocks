import * as React from "react";
import {StyleSheet} from "aphrodite";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import type {
    ActivityIconButtonActionType,
    BaseIconButtonProps,
    IconButtonKind,
    IconButtonRef,
} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";

type Props = BaseIconButtonProps & {
    /**
     * The action type of the button. This determines the visual style of the
     * button.
     *
     * - `progressive` is used for actions that move the user forward in a flow.
     * - `neutral` is used for buttons that indicate a neutral action.
     */
    actionType?: ActivityIconButtonActionType;
    /**
     * The alternative text for the icon button. Use `aria-label` for when
     * there's no visible label for the button, such as when the button only
     * contains an icon.
     */
    "aria-label": string;
};

/**
 * `ConversationIconButton` is an icon button that is used in the context of
 * conversations, such as sending a message or performing an action related to a
 * conversation. This is useful in chat widgets, like the one used in Khanmigo.
 *
 * ```tsx
 * import microphone from "@phosphor-icons/core/bold/microphone-bold.svg";
 * import {ConversationIconButton} from "@khanacademy/wonder-blocks-icon-button";
 *
 * <ConversationIconButton
 *     icon={microphone}
 *     aria-label="Start a conversation"
 *     onClick={(e) => console.log("Hello, world!")}
 * />
 * ```
 */
export const ConversationIconButton: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<IconButtonRef>
> = React.forwardRef<IconButtonRef, Props>(function ConversationIconButton(
    props: Props,
    ref,
) {
    const {
        actionType = "progressive",
        disabled = false,
        icon,
        kind = "primary",
        style,
        type = "button",
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    const buttonStyles = _generateStyles(actionType, !!disabled, kind);

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
            {/* If the icon is not a string, it is a custom icon that can be
            rendered directly with the corresponding styles */}
            {typeof icon !== "string" ? (
                React.cloneElement(icon, {style: [staticStyles.icon]})
            ) : (
                <PhosphorIcon size="small" color="currentColor" icon={icon} />
            )}
        </IconButtonUnstyled>
    );
});

const staticStyles = StyleSheet.create({
    icon: {
        width: sizing.size_160,
        height: sizing.size_160,
    },
});

const styles: Record<string, any> = {};

const theme = {
    root: {
        border: {
            radius: border.radius.radius_full,
            width: {
                primary: {
                    default: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.medium,
                },
                secondary: {
                    default: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.medium,
                },
                tertiary: {
                    default: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.medium,
                },
            },
        },
        layout: {
            padding: sizing.size_100,
        },
        sizing: {
            default: sizing.size_360,
        },
    },
};

const _generateStyles = (
    actionType: ActivityIconButtonActionType = "progressive",
    disabled: boolean,
    kind: IconButtonKind,
) => {
    const buttonType = `${actionType}-d_${disabled}-${kind}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const borderWidthKind = theme.root.border.width[kind];
    const themeVariant = semanticColor.action[kind][actionType];
    const disabledState = semanticColor.action[kind].disabled;

    const disabledStatesStyles = {
        padding: theme.root.layout.padding,
        // theming
        borderColor: disabledState.border,
        borderWidth: borderWidthKind.default,
        background: disabledState.background,
        color: disabledState.foreground,
    };

    const pressStyles = {
        border: `${borderWidthKind.press} solid ${themeVariant.press.border}`,
        background: themeVariant.press.background,
        color: themeVariant.press.foreground,
        // Adjust padding to account for border width
        padding: `calc(${theme.root.layout.padding} - 1px)`,
    };

    const newStyles = {
        default: {
            // layout
            borderRadius: theme.root.border.radius,
            padding: theme.root.layout.padding,
            alignSelf: "center",
            justifySelf: "center",
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
                // layout
                padding: theme.root.layout.padding,
                // theming
                background: themeVariant.hover.background,
                color: themeVariant.hover.foreground,
                border: `${borderWidthKind.hover} solid ${themeVariant.hover.border}`,
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
            ":hover": {
                ...disabledStatesStyles,
                outline: "none",
            },
            ":active": {
                ...disabledStatesStyles,
                outline: "none",
            },
            ":focus-visible": disabledStatesStyles,
        },
        // Enable keyboard support for press styles.
        pressed: pressStyles,
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
