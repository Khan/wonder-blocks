import * as React from "react";
import {StyleSheet} from "aphrodite";

import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";

import {
    ThemedStylesFn,
    useScopedTheme,
    useStyles,
} from "@khanacademy/wonder-blocks-theming";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {Link} from "react-router-dom-v5-compat";
import type {
    ButtonActionType,
    ButtonKind,
    ButtonSize,
    ButtonProps,
} from "../util/button.types";
import {ButtonThemeContext, ButtonThemeContract} from "../themes/themed-button";
import {ButtonIcon} from "./button-icon";

import {ButtonUnstyled} from "./button-unstyled";

type Props = ButtonProps & ChildrenProps & ClickableState;

const ButtonCore: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function ButtonCore(props: Props, ref) {
    const {theme, themeName} = useScopedTheme(ButtonThemeContext);
    const sharedStyles = useStyles(themedSharedStyles, theme);

    const {
        children,
        skipClientNav,
        actionType,
        disabled: disabledProp,
        focused,
        hovered,
        href = undefined,
        kind = "primary",
        labelStyle,
        pressed,
        size = "medium",
        style,
        testId,
        type = undefined,
        spinner,
        startIcon,
        endIcon,
        id,
        waiting: _,
        ...restProps
    } = props;

    const buttonStyles = _generateStyles(
        actionType,
        kind,
        size,
        theme,
        themeName,
    );

    const disabled = spinner || disabledProp;

    const defaultStyle = [
        sharedStyles.shared,
        startIcon && sharedStyles.withStartIcon,
        endIcon && sharedStyles.withEndIcon,
        buttonStyles.default,
        disabled && buttonStyles.disabled,
        // apply focus effect only to default and secondary buttons
        !disabled &&
            (pressed ? buttonStyles.pressed : focused && buttonStyles.focused),
        size === "small" && sharedStyles.small,
        size === "large" && sharedStyles.large,
    ];

    const Label = size === "small" ? LabelSmall : LabelLarge;

    const label = (
        <Label
            style={[
                sharedStyles.text,
                size === "small" && sharedStyles.smallText,
                size === "large" && sharedStyles.largeText,
                labelStyle,
                spinner && sharedStyles.hiddenText,
                // apply press/hover effects on the label
                kind === "tertiary" &&
                    !disabled &&
                    (pressed
                        ? [buttonStyles.hover, buttonStyles.active]
                        : hovered && buttonStyles.hover),
            ]}
            testId={testId ? `${testId}-inner-label` : undefined}
        >
            {children}
        </Label>
    );

    const sizeMapping = {
        medium: "small",
        small: "xsmall",
        large: "medium",
    } as const;

    // We have to use `medium` for both md and lg buttons so we can fit the
    // icons in large buttons.
    const iconSize = size === "small" ? "small" : "medium";

    const contents = (
        <React.Fragment>
            {startIcon && (
                <View
                    // The start icon doesn't have the circle around it
                    // in the Khanmigo theme, but we wrap it with
                    // iconWrapper anyway to give it the same spacing
                    // as the end icon so the button is symmetrical.
                    style={sharedStyles.iconWrapper}
                >
                    <ButtonIcon
                        size={iconSize}
                        icon={startIcon}
                        style={[
                            sharedStyles.startIcon,
                            kind === "tertiary" &&
                                sharedStyles.tertiaryStartIcon,
                        ]}
                        testId={testId ? `${testId}-start-icon` : undefined}
                    />
                </View>
            )}
            {label}
            {spinner && (
                <CircularSpinner
                    style={sharedStyles.spinner}
                    size={sizeMapping[size]}
                    light={kind === "primary"}
                    testId={`${testId || "button"}-spinner`}
                />
            )}
            {endIcon && (
                <View
                    testId={testId ? `${testId}-end-icon-wrapper` : undefined}
                    style={[
                        styles.endIcon,
                        sharedStyles.iconWrapper,
                        sharedStyles.endIconWrapper,
                        kind === "tertiary" &&
                            sharedStyles.endIconWrapperTertiary,
                        !disabled &&
                            (focused || hovered) &&
                            kind !== "primary" &&
                            buttonStyles.iconWrapperHovered,
                    ]}
                >
                    <ButtonIcon
                        size={iconSize}
                        icon={endIcon}
                        testId={testId ? `${testId}-end-icon` : undefined}
                    />
                </View>
            )}
        </React.Fragment>
    );

    return (
        <ButtonUnstyled
            {...restProps}
            disabled={disabled}
            href={href}
            id={id}
            ref={ref}
            skipClientNav={skipClientNav}
            style={[defaultStyle, style]}
            testId={testId}
            tabIndex={props.tabIndex}
            type={type}
        >
            {contents}
        </ButtonUnstyled>
    );
});

export default ButtonCore;

const themedSharedStyles: ThemedStylesFn<ButtonThemeContract> = (theme) => ({
    shared: {
        height: theme.root.sizing.height.medium,
        paddingBlock: 0,
        paddingInline: theme.root.padding.medium,
    },
    small: {
        borderRadius: theme.root.border.radius.small,
        height: theme.root.sizing.height.small,
    },
    large: {
        borderRadius: theme.root.border.radius.large,
        height: theme.root.sizing.height.large,
    },
    text: {
        alignItems: "center",
        fontWeight: theme.root.font.weight.default,
        whiteSpace: "nowrap",
        overflow: "hidden",
        // To account for the underline-offset in tertiary buttons
        lineHeight: theme.root.font.lineHeight.default,
        textOverflow: "ellipsis",
        display: "inline-block", // allows the button text to truncate
        pointerEvents: "none", // fix Safari bug where the browser was eating mouse events
    },
    smallText: {
        lineHeight: theme.root.font.lineHeight.small,
    },
    largeText: {
        fontSize: theme.root.font.size.large,
        lineHeight: theme.root.font.lineHeight.large,
    },
    hiddenText: {
        visibility: "hidden",
    },
    spinner: {
        position: "absolute",
    },
    startIcon: {
        marginInlineStart: theme.icon.margin.inline.outer,
        marginInlineEnd: theme.icon.margin.inline.inner,
    },
    tertiaryStartIcon: {
        // Undo the negative padding from startIcon since tertiary
        // buttons don't have extra padding.
        marginInlineStart: 0,
    },
    endIcon: {
        marginInlineStart: theme.icon.margin.inline.inner,
    },
    iconWrapper: {
        borderRadius: theme.icon.border.radius,
        padding: theme.icon.padding,
        // View has a default minWidth of 0, which causes the label text
        // to encroach on the icon when it needs to truncate. We can fix
        // this by setting the minWidth to auto.
        minWidth: "auto",
    },
    endIconWrapper: {
        marginInlineStart: theme.icon.margin.inline.inner,
        marginInlineEnd: theme.icon.margin.inline.outer,
    },
    endIconWrapperTertiary: {
        marginInlineEnd: 0,
    },
});

const styles: Record<string, any> = {};

// export for testing only
export const _generateStyles = (
    actionType: ButtonActionType = "progressive",
    kind: ButtonKind,
    size: ButtonSize,
    theme: ButtonThemeContract,
    themeName: string,
) => {
    const buttonType = `${actionType}-${kind}-${size}-${themeName}`;

    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const padding =
        size === "large" ? theme.root.padding.large : theme.root.padding.medium;

    const borderWidthKind = theme.root.border.width[kind];
    const outlineOffsetKind = theme.root.border.offset[kind];
    const themeVariant = theme.root.color[kind][actionType];
    const disabledState = theme.root.color[kind].disabled;

    const disabledStatesStyles = {
        borderColor: disabledState.border,
        borderWidth: borderWidthKind.default,
        background: disabledState.background,
        color: disabledState.foreground,
    };

    const disabledStatesOverrides = {
        ...disabledStatesStyles,
        // primary overrides
        outline: "none",
        // secondary overrides
        boxShadow: "none",
        // tertiary overrides
        textDecoration: "none",
        textDecorationThickness: "unset",
        textUnderlineOffset: "unset",
    };

    const newStyles = {
        default: {
            borderRadius: theme.root.border.radius[size],
            paddingInline: kind === "tertiary" ? 0 : padding,
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
            // :focus-visible -> Provide focus styles for keyboard users only.

            ":hover": {
                // shared
                background: themeVariant.hover.background,
                color: themeVariant.hover.foreground,
                ...(kind === "primary"
                    ? {
                          outline: `${borderWidthKind.hover} solid ${themeVariant.hover.border}`,
                          outlineOffset: outlineOffsetKind,
                      }
                    : undefined),
                // secondary-specific styles
                ...(kind === "secondary"
                    ? {
                          borderColor: themeVariant.hover.border,
                          boxShadow: `inset 0 0 0 ${borderWidthKind.hover} ${themeVariant.hover.border}`,
                      }
                    : undefined),

                // tertiary-specific styles
                ...(kind === "tertiary"
                    ? {
                          textDecoration: "underline",
                          textUnderlineOffset: theme.root.font.offset.default,
                          textDecorationThickness:
                              theme.root.sizing.underline.hover,
                      }
                    : undefined),
            },
            // Allow hover styles on non-touch devices only. This prevents an
            // issue with hover being sticky on touch devices (e.g. mobile).
            ["@media not (hover: hover)"]: {
                ":hover": {
                    // reset hover styles on non-touch devices
                    backgroundColor: "transparent",
                },
            },

            ":active": {
                // shared
                background: themeVariant.press.background,
                color: themeVariant.press.foreground,
                // primary
                ...(kind === "primary"
                    ? {
                          outline: `${borderWidthKind.press} solid ${themeVariant.press.border}`,
                          outlineOffset: outlineOffsetKind,
                      }
                    : undefined),
                // secondary
                ...(kind === "secondary"
                    ? {
                          borderColor: themeVariant.press.border,
                          boxShadow: `inset 0 0 0 ${borderWidthKind.press} ${themeVariant.press.border}`,
                      }
                    : undefined),

                // tertiary-specific styles
                ...(kind === "tertiary"
                    ? {
                          textDecoration: "underline",
                          textUnderlineOffset: theme.root.font.offset.default,
                          textDecorationThickness:
                              theme.root.sizing.underline.press,
                      }
                    : undefined),
            },

            ...focusStyles.focus,
            // These overrides are needed to ensure that the boxShadow is
            // properly applied to the button when it is focused +
            // hovered/pressed.
            ...(kind === "secondary"
                ? {
                      ":focus-visible:hover": {
                          ...focusStyles.focus[":focus-visible"],
                          boxShadow: `inset 0 0 0 ${borderWidthKind.hover} ${themeVariant.hover.border}, ${focusStyles.focus[":focus-visible"].boxShadow}`,
                      },
                      ":focus-visible:active": {
                          ...focusStyles.focus[":focus-visible"],
                          boxShadow: `inset 0 0 0 ${borderWidthKind.press} ${themeVariant.press.border}, ${focusStyles.focus[":focus-visible"].boxShadow}`,
                      },
                  }
                : {}),
        },
        disabled: {
            cursor: "not-allowed",
            ...disabledStatesStyles,
            // NOTE: Even that browsers recommend to specify pseudo-classes in
            // this order: link, visited, hover, focus, active, we need to
            // specify focus after hover to override hover styles. By doing this
            // we are able to reset the border/outline styles to the default
            // ones (rest state).
            // For order reference: https://css-tricks.com/snippets/css/link-pseudo-classes-in-order/
            ":hover": disabledStatesOverrides,
            ":active": disabledStatesOverrides,
            ":focus-visible": disabledStatesStyles,
        },
        iconWrapperHovered: {
            // Only applies to secondary buttons (khanmigo theme)
            ...(kind === "secondary"
                ? {
                      backgroundColor:
                          theme.icon.color[kind][actionType].hover.background,

                      color: theme.icon.color[kind][actionType].hover
                          .foreground,
                  }
                : undefined),
        },
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
