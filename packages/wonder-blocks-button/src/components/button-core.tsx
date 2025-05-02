import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link, useInRouterContext} from "react-router-dom-v5-compat";

import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
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
import type {
    ButtonActionType,
    ButtonKind,
    ButtonSize,
    SharedProps,
} from "./button";
import {ButtonThemeContext, ButtonThemeContract} from "../themes/themed-button";
import {ButtonIcon} from "./button-icon";

type Props = SharedProps & ChildrenProps & ClickableState;

const StyledA = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

const ButtonCore: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function ButtonCore(props: Props, ref) {
    const {theme, themeName} = useScopedTheme(ButtonThemeContext);
    const sharedStyles = useStyles(themedSharedStyles, theme);
    const inRouterContext = useInRouterContext();

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
        disabled && sharedStyles.disabled,
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

    const commonProps = {
        "data-testid": testId,
        id: id,
        role: "button",
        style: [defaultStyle, style],
        ...restProps,
    } as const;

    const Label = size === "small" ? LabelSmall : LabelLarge;

    const label = (
        <Label
            style={[
                sharedStyles.text,
                size === "small" && sharedStyles.smallText,
                size === "large" && sharedStyles.largeText,
                labelStyle,
                spinner && sharedStyles.hiddenText,
                kind === "tertiary" && sharedStyles.textWithFocus,
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

    if (href && !disabled) {
        return inRouterContext && !skipClientNav && isClientSideUrl(href) ? (
            <StyledLink
                {...commonProps}
                to={href}
                ref={ref as React.Ref<typeof Link>}
            >
                {contents}
            </StyledLink>
        ) : (
            <StyledA
                {...commonProps}
                href={href}
                ref={ref as React.Ref<HTMLAnchorElement>}
            >
                {contents}
            </StyledA>
        );
    } else {
        return (
            <StyledButton
                type={type || "button"}
                {...commonProps}
                aria-disabled={disabled}
                ref={ref as React.Ref<HTMLButtonElement>}
            >
                {contents}
            </StyledButton>
        );
    }
});

export default ButtonCore;

const themedSharedStyles: ThemedStylesFn<ButtonThemeContract> = (theme) => ({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: theme.root.sizing.height.medium,
        paddingBlock: 0,
        paddingInline: theme.root.padding.medium,
        border: "none",
        cursor: "pointer",
        outline: "none",
        textDecoration: "none",
        boxSizing: "border-box",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
        userSelect: "none",
        ":focus": {
            // Mobile: Removes a blue highlight style shown when the user clicks a button
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
        },
    },
    disabled: {
        cursor: "auto",
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
    textWithFocus: {
        position: "relative", // allows the tertiary button border to use the label width
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
        marginLeft: 0,
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
        marginRight: 0,
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
            ":hover": {
                background: themeVariant.hover.background,
                color: themeVariant.hover.foreground,
                marginInline: theme.root.margin[kind].hover,
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

            ":active": {
                marginInline: theme.root.margin[kind].press,
                // primary
                outline:
                    kind === "primary"
                        ? `${borderWidthKind.press} solid ${themeVariant.press.border}`
                        : undefined,
                outlineOffset:
                    kind === "primary" ? outlineOffsetKind : undefined,
                // secondary, tertiary
                border:
                    kind !== "primary"
                        ? `${borderWidthKind.press} solid ${themeVariant.press.border}`
                        : undefined,
                background: themeVariant.press.background,
                color: themeVariant.press.foreground,
            },

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
        iconWrapperHovered: {
            backgroundColor:
                kind === "secondary"
                    ? theme.icon.color[kind][actionType].hover.background
                    : undefined,
            color:
                kind === "secondary"
                    ? theme.icon.color[kind][actionType].hover.foreground
                    : undefined,
        },
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
