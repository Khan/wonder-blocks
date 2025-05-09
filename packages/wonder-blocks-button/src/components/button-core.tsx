import * as React from "react";
import {CSSProperties, StyleSheet} from "aphrodite";
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
import type {SharedProps} from "./button";
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
        color,
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

    const buttonStyles = _generateStyles(color, kind, size, theme, themeName);

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
        height: theme.size.height.medium,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: theme.padding.large,
        paddingRight: theme.padding.large,
        border: "none",
        borderRadius: theme.border.radius.default,
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
        borderRadius: theme.border.radius.small,
        height: theme.size.height.small,
    },
    large: {
        borderRadius: theme.border.radius.large,
        height: theme.size.height.large,
    },
    text: {
        alignItems: "center",
        fontWeight: theme.font.weight.default,
        whiteSpace: "nowrap",
        overflow: "hidden",
        // To account for the underline-offset in tertiary buttons
        lineHeight: theme.font.lineHeight.default,
        textOverflow: "ellipsis",
        display: "inline-block", // allows the button text to truncate
        pointerEvents: "none", // fix Safari bug where the browser was eating mouse events
    },
    smallText: {
        lineHeight: theme.font.lineHeight.small,
    },
    largeText: {
        fontSize: theme.font.size.large,
        lineHeight: theme.font.lineHeight.large,
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
        marginRight: theme.padding.small,
        marginLeft: theme.margin.icon.offset,
    },
    tertiaryStartIcon: {
        // Undo the negative padding from startIcon since tertiary
        // buttons don't have extra padding.
        marginLeft: 0,
    },
    endIcon: {
        marginLeft: theme.padding.small,
    },
    iconWrapper: {
        borderRadius: theme.border.radius.icon,
        padding: theme.padding.xsmall,
        // View has a default minWidth of 0, which causes the label text
        // to encroach on the icon when it needs to truncate. We can fix
        // this by setting the minWidth to auto.
        minWidth: "auto",
    },
    endIconWrapper: {
        marginLeft: theme.padding.small,
        marginRight: theme.margin.icon.offset,
    },
    endIconWrapperTertiary: {
        marginRight: 0,
    },
});

const styles: Record<string, any> = {};

// export for testing only
export const _generateStyles = (
    buttonColor = "default",
    kind: "primary" | "secondary" | "tertiary",
    size: "large" | "medium" | "small",
    theme: ButtonThemeContract,
    themeName: string,
) => {
    const buttonType = `${buttonColor}-${kind}-${size}-${themeName}`;

    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const padding =
        size === "large" ? theme.padding.xLarge : theme.padding.large;

    const colorToAction =
        buttonColor === "destructive" ? "destructive" : "progressive";

    const disabledState = theme.color[kind].disabled;

    const disabledStateStyles = {
        borderColor: disabledState.border,
        background: disabledState.background,
        color: disabledState.foreground,
    };

    let newStyles: Record<string, CSSProperties> = {};
    if (kind === "primary") {
        const themeColorAction = theme.color.primary[colorToAction];

        const sharedFocusHoverStyling = {
            outlineOffset: theme.border.offset.primary,
            outlineStyle: "solid",
            outlineWidth: theme.border.width.focused,
        };

        const focusStyling = {
            ...sharedFocusHoverStyling,
            outlineColor: themeColorAction.focus.border,
        };

        const hoverStyling = {
            ...sharedFocusHoverStyling,
            outlineColor: themeColorAction.hover.border,
        };

        const activePressedStyling = {
            background: themeColorAction.press.background,
            outlineColor: themeColorAction.press.border,
            outlineOffset: theme.border.offset.primary,
            outlineStyle: "solid",
            outlineWidth: theme.border.width.focused,
        };

        newStyles = {
            default: {
                background: themeColorAction.default.background,
                color: themeColorAction.default.foreground,
                paddingInline: padding,
                ":hover": hoverStyling,
                ":focus-visible": focusStyling,
                ":active": activePressedStyling,
            },
            focused: focusStyling,
            pressed: activePressedStyling,
            disabled: {
                ...disabledStateStyles,
                cursor: "not-allowed",
                ":hover": {...disabledStateStyles, outline: "none"},
                ":active": {...disabledStateStyles, outline: "none"},
                ":focus-visible": focusStyling,
            },
        };
    } else if (kind === "secondary") {
        const themeColorAction = theme.color.secondary[colorToAction];

        const sharedFocusHoverStyling = {
            background: themeColorAction.hover.background,
            outlineStyle: "solid",
            outlineOffset: theme.border.offset.secondary,
            outlineWidth: theme.border.width.focused,
        };

        const focusStyling = {
            ...sharedFocusHoverStyling,
            outlineColor: themeColorAction.focus.border,
        };

        const hoverStyling = {
            ...sharedFocusHoverStyling,
            borderColor: themeColorAction.hover.border,
        };

        const activePressedStyling = {
            background: themeColorAction.press.background,
            color: themeColorAction.press.foreground,
            outlineColor: themeColorAction.press.border,
            outlineStyle: "solid",
            outlineWidth: theme.border.width.focused,
        };

        newStyles = {
            default: {
                background: themeColorAction.default.background,
                color: themeColorAction.default.foreground,
                borderColor: themeColorAction.default.border,
                borderStyle: "solid",
                borderWidth: theme.border.width.secondary,
                paddingInline: padding,
                ":hover": hoverStyling,
                ":focus-visible": focusStyling,
                ":active": activePressedStyling,
            },
            focused: focusStyling,
            pressed: activePressedStyling,
            disabled: {
                ...disabledStateStyles,
                cursor: "not-allowed",
                // Reset hover/press styles when disabled
                ":hover": {...disabledStateStyles, outline: "none"},
                ":active": {...disabledStateStyles, outline: "none"},
                ":focus-visible": focusStyling,
            },
            iconWrapperHovered: {
                backgroundColor: themeColorAction.hover.icon,
                color: themeColorAction.hover.foreground,
            },
        };
    } else if (kind === "tertiary") {
        const themeColorAction = theme.color.tertiary[colorToAction];

        const focusStyling = {
            outlineStyle: "solid",
            borderColor: "transparent",
            outlineColor: themeColorAction.focus.border,
            outlineWidth: theme.border.width.focused,
            borderRadius: theme.border.radius.default,
        };
        const activePressedStyling = {
            color: themeColorAction.press.foreground,
            textDecoration: "underline",
            textDecorationThickness: theme.size.underline.active,
            textUnderlineOffset: theme.font.offset.default,
        };

        const sharedDisabledStyling = {
            ...disabledStateStyles,
            textDecoration: "none",
            textDecorationThickness: "unset",
            textUnderlineOffset: "unset",
            outline: "none",
        };

        newStyles = {
            default: {
                background: themeColorAction.default.background,
                color: themeColorAction.default.foreground,
                paddingInline: 0,
                ":hover": {
                    textUnderlineOffset: theme.font.offset.default,
                    textDecoration: "underline",
                    textDecorationThickness: theme.size.underline.hover,
                },
                ":focus-visible": focusStyling,
                ":active": activePressedStyling,
            },
            focused: focusStyling,
            pressed: activePressedStyling,
            disabled: {
                ...disabledStateStyles,
                cursor: "not-allowed",
                // Reset hover/press styles when disabled
                ":hover": sharedDisabledStyling,
                ":active": sharedDisabledStyling,
                ":focus-visible": focusStyling,
            },
        };
    } else {
        throw new Error("Button kind not recognized");
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
