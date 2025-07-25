import * as React from "react";
import {CSSProperties, StyleSheet} from "aphrodite";

import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import type {
    ButtonActionType,
    ButtonKind,
    ButtonSize,
    ButtonProps,
    ButtonRef,
} from "../util/button.types";
import {ButtonIcon} from "./button-icon";

import theme from "../theme";
import {ButtonUnstyled} from "./button-unstyled";

type Props = ButtonProps & ChildrenProps & ClickableState;

const ButtonCore: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<ButtonRef>
> = React.forwardRef<ButtonRef, Props>(function ButtonCore(props: Props, ref) {
    const {
        children,
        skipClientNav,
        actionType,
        disabled: disabledProp,
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

    const buttonStyles = _generateStyles(actionType, kind, size);

    const disabled = spinner || disabledProp;

    const defaultStyle = [
        sharedStyles.shared,
        startIcon && sharedStyles.withStartIcon,
        endIcon && sharedStyles.withEndIcon,
        buttonStyles.default,
        disabled && buttonStyles.disabled,
        !disabled && pressed && buttonStyles.pressed,
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
                        sharedStyles.endIcon,
                        sharedStyles.iconWrapper,
                        sharedStyles.endIconWrapper,
                        kind === "tertiary" &&
                            sharedStyles.endIconWrapperTertiary,
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

const sharedStyles = StyleSheet.create({
    shared: {
        height: theme.root.sizing.height.medium,
        paddingBlock: 0,
    },
    small: {
        height: theme.root.sizing.height.small,
    },
    large: {
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

type ButtonStylesKey = "default" | "pressed" | "disabled";

const styles: Record<string, Record<ButtonStylesKey, object>> = {};

// export for testing only
export const _generateStyles = (
    actionType: ButtonActionType = "progressive",
    kind: ButtonKind,
    size: ButtonSize,
): Record<ButtonStylesKey, object> => {
    const buttonType = `${actionType}-${kind}-${size}`;

    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const paddingInline = theme.root.layout.padding.inline[kind][size];

    const borderWidthKind = theme.root.border.width[kind];
    const outlineOffsetKind = theme.root.border.offset[kind];
    const themeVariant = semanticColor.action[kind][actionType];
    const disabledState = semanticColor.action[kind].disabled;

    const disabledStatesStyles = {
        borderColor: disabledState.border,
        borderWidth: borderWidthKind.default,
        borderRadius: theme.root.border.radius.default,
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

    const pressStyles = {
        // shared
        background: themeVariant.press.background,
        borderRadius: theme.root.border.radius.press,
        color: themeVariant.press.foreground,
        // primary
        ...(kind === "primary"
            ? {
                  outline: `${borderWidthKind.press} solid ${themeVariant.press.border}`,
                  outlineOffset: outlineOffsetKind,
              }
            : undefined),
        // secondary
        ...(kind !== "primary"
            ? {
                  borderColor: themeVariant.press.border,
                  boxShadow: `inset 0 0 0 ${borderWidthKind.press} ${themeVariant.press.border}`,
              }
            : undefined),

        // tertiary-specific styles
        ...(kind === "tertiary"
            ? {
                  textUnderlineOffset: theme.root.font.offset.default,
                  textDecoration: `${theme.root.font.decoration.press} ${theme.root.sizing.underline.press}`,
              }
            : undefined),
    };

    const newStyles: Record<ButtonStylesKey, CSSProperties> = {
        default: {
            borderRadius: theme.root.border.radius.default,
            paddingInline: paddingInline,
            // theming
            borderStyle: "solid",
            borderWidth: borderWidthKind.default,
            borderColor: themeVariant.default.border,
            background: themeVariant.default.background,
            color: themeVariant.default.foreground,
            // animation
            transition: "border-radius 0.1s ease-in-out",

            /**
             * States
             *
             * Defined in the following order: hover, active, focus.
             *
             * This is important as we want to give more priority to the
             * :focus-visible styles.
             */
            // :focus-visible -> Provide focus styles for keyboard users only.

            // Allow hover styles on non-touch devices only. This prevents an
            // issue with hover being sticky on touch devices (e.g. mobile).
            // @ts-expect-error - TS2353 - aphrodite doesn't recognize this, but it's valid and works
            ["@media (hover: hover)"]: {
                ":hover": {
                    // shared
                    background: themeVariant.hover.background,
                    borderRadius: theme.root.border.radius.hover,
                    color: themeVariant.hover.foreground,
                    ...(kind === "primary"
                        ? {
                              outline: `${borderWidthKind.hover} solid ${themeVariant.hover.border}`,
                              outlineOffset: outlineOffsetKind,
                          }
                        : undefined),
                    ...(kind !== "primary"
                        ? {
                              borderColor: themeVariant.hover.border,
                              boxShadow: `inset 0 0 0 ${borderWidthKind.hover} ${themeVariant.hover.border}`,
                          }
                        : undefined),

                    // tertiary-specific styles
                    ...(kind === "tertiary"
                        ? {
                              textUnderlineOffset:
                                  theme.root.font.offset.default,
                              textDecoration: `${theme.root.font.decoration.hover} ${theme.root.sizing.underline.hover}`,
                          }
                        : undefined),
                },
            },

            ":active": pressStyles,

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
        pressed: pressStyles,
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
    };

    // aphrodite v1 doesn't support generics, so we need to cast the result
    // to the correct type. we can trust this cast because we typed the input
    // correctly above, and aphrodite will return whatever keys we passed in.
    styles[buttonType] = StyleSheet.create(newStyles) as Record<
        ButtonStylesKey,
        object
    >;
    return styles[buttonType];
};
