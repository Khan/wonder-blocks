import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import Icon from "@khanacademy/wonder-blocks-icon";
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

type Props = SharedProps & ChildrenProps & ClickableState;

const StyledAnchor = addStyle("a");
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

    const renderInner = (router: any): React.ReactNode => {
        const {
            children,
            skipClientNav,
            color,
            disabled: disabledProp,
            focused,
            hovered,
            href = undefined,
            kind = "primary",
            light = false,
            pressed,
            size = "medium",
            style,
            testId,
            type = undefined,
            spinner,
            icon,
            id,
            waiting: _,
            ...restProps
        } = props;

        const iconWidth = icon
            ? size === "small"
                ? theme.size.width.medium
                : theme.size.width.large
            : 0;
        const buttonStyles = _generateStyles(
            color,
            kind,
            light,
            iconWidth,
            size,
            theme,
            themeName,
        );

        const disabled = spinner || disabledProp;

        const defaultStyle = [
            sharedStyles.shared,
            disabled && sharedStyles.disabled,
            icon && sharedStyles.withIcon,
            buttonStyles.default,
            disabled && buttonStyles.disabled,
            // apply focus effect only to default and secondary buttons
            kind !== "tertiary" &&
                !disabled &&
                (pressed
                    ? buttonStyles.active
                    : (hovered || focused) && buttonStyles.focus),
            kind === "tertiary" &&
                !pressed &&
                focused && [
                    buttonStyles.focus,
                    disabled && buttonStyles.disabledFocus,
                ],
            size === "small" && sharedStyles.small,
            size === "large" && sharedStyles.large,
        ];

        const commonProps = {
            "data-test-id": testId,
            id: id,
            role: "button",
            style: [defaultStyle, style],
            ...restProps,
        } as const;

        const Label = size === "small" ? LabelSmall : LabelLarge;

        // We have to use `medium` for both md and lg buttons so we can fit the
        // icons in large buttons.
        const iconSize = size === "small" ? "small" : "medium";

        const label = (
            <Label
                style={[
                    sharedStyles.text,
                    size === "large" && sharedStyles.largeText,
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

        const contents = (
            <React.Fragment>
                {icon && (
                    <Icon
                        size={iconSize}
                        color="currentColor"
                        icon={icon}
                        style={sharedStyles.icon}
                        aria-hidden="true"
                        testId={testId ? `${testId}-icon` : undefined}
                    />
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
            </React.Fragment>
        );

        if (href && !disabled) {
            return router && !skipClientNav && isClientSideUrl(href) ? (
                <StyledLink
                    {...commonProps}
                    to={href}
                    ref={ref as React.Ref<typeof Link>}
                >
                    {contents}
                </StyledLink>
            ) : (
                <StyledAnchor
                    {...commonProps}
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {contents}
                </StyledAnchor>
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
    };

    return (
        <__RouterContext.Consumer>
            {(router) => renderInner(router)}
        </__RouterContext.Consumer>
    );
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
    withIcon: {
        // The left padding for the button with icon should have 4px less padding
        paddingLeft: theme.padding.medium,
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
        fontWeight: "bold",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "inline-block", // allows the button text to truncate
        pointerEvents: "none", // fix Safari bug where the browser was eating mouse events
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
    icon: {
        paddingRight: theme.padding.small,
    },
});

const styles: Record<string, any> = {};

const _generateStyles = (
    buttonColor = "default",
    kind: "primary" | "secondary" | "tertiary",
    light: boolean,
    iconWidth: number,
    size: "large" | "medium" | "small",
    theme: ButtonThemeContract,
    themeName: string,
) => {
    const color =
        buttonColor === "destructive"
            ? theme.color.bg.critical
            : theme.color.bg.action;

    const buttonType = `${color}-${kind}-${light}-${iconWidth}-${size}-${themeName}`;

    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const fadedColor =
        buttonColor === "destructive"
            ? theme.color.bg.criticalInverse
            : theme.color.bg.actionInverse;
    const activeColor =
        buttonColor === "destructive"
            ? theme.color.bg.criticalActive
            : theme.color.bg.actionActive;
    const padding =
        size === "large" ? theme.padding.xLarge : theme.padding.large;

    let newStyles: Record<string, any> = {};
    if (kind === "primary") {
        newStyles = {
            default: {
                background: light ? theme.color.bg.primary : color,
                color: light ? color : theme.color.text.inverse,
                paddingLeft: padding,
                paddingRight: padding,
            },
            focus: {
                // This assumes a background of white for the regular button and
                // a background of darkBlue for the light version. The inner
                // box shadow/ring is also small enough for a slight variation
                // in the background color not to matter too much.
                boxShadow: `0 0 0 1px ${
                    light ? theme.color.bg.inverse : theme.color.bg.primary
                }, 0 0 0 3px ${light ? theme.color.bg.primary : color}`,
            },
            active: {
                boxShadow: `0 0 0 1px ${
                    light ? theme.color.bg.inverse : theme.color.bg.primary
                }, 0 0 0 3px ${light ? fadedColor : activeColor}`,
                background: light ? fadedColor : activeColor,
                color: light ? activeColor : fadedColor,
            },
            disabled: {
                background: light ? fadedColor : theme.color.bg.disabled,
                color: light ? color : theme.color.text.primaryDisabled,
                cursor: "default",
                ":focus": {
                    boxShadow: `0 0 0 1px ${
                        light ? theme.color.bg.disabled : theme.color.bg.primary
                    }, 0 0 0 3px ${
                        light ? fadedColor : theme.color.bg.disabled
                    }`,
                },
            },
        };
    } else if (kind === "secondary") {
        const horizontalPadding = padding - (theme.border.width.focused - 1);
        const secondaryBorderColor =
            buttonColor === "destructive"
                ? theme.color.border.secondaryCritical
                : theme.color.border.secondaryAction;

        newStyles = {
            default: {
                background: light
                    ? theme.color.bg.secondaryInverse
                    : theme.color.bg.secondary,
                color: light ? theme.color.text.inverse : color,
                borderColor: light
                    ? theme.color.border.secondaryInverse
                    : secondaryBorderColor,
                borderStyle: "solid",
                borderWidth: theme.border.width.secondary,
                paddingLeft: padding,
                paddingRight: padding,
            },
            focus: {
                background: light
                    ? theme.color.bg.secondaryInverse
                    : theme.color.bg.secondaryFocus,
                borderColor: light ? theme.color.border.primaryInverse : color,
                borderWidth: theme.border.width.focused,
                paddingLeft: horizontalPadding,
                paddingRight: horizontalPadding,
            },

            active: {
                background: light
                    ? activeColor
                    : theme.color.bg.secondaryActive,
                color: light ? fadedColor : activeColor,
                borderColor: light ? fadedColor : activeColor,
                borderWidth: theme.border.width.focused,
                // We need to reduce padding to offset the difference
                // caused by the border becoming thicker on focus.
                paddingLeft: horizontalPadding,
                paddingRight: horizontalPadding,
            },
            disabled: {
                color: light
                    ? theme.color.text.secondaryInverse
                    : theme.color.text.disabled,
                borderColor: light ? fadedColor : theme.color.border.disabled,
                cursor: "default",
                ":focus": {
                    borderColor: light
                        ? theme.color.border.secondaryInverse
                        : theme.color.border.disabled,
                    borderWidth: theme.border.width.disabled,
                    // We need to reduce padding to offset the difference
                    // caused by the border becoming thicker on focus.
                    paddingLeft: padding - 1,
                    paddingRight: padding - 1,
                },
            },
        };
    } else if (kind === "tertiary") {
        newStyles = {
            default: {
                background: "none",
                color: light ? theme.color.text.inverse : color,
                paddingLeft: 0,
                paddingRight: 0,
            },
            hover: {
                ":after": {
                    content: "''",
                    position: "absolute",
                    height: theme.size.height.tertiaryHover,
                    width: "100%",
                    right: 0,
                    bottom: 0,
                    background: light ? theme.color.bg.primary : color,
                    borderRadius: theme.border.radius.tertiary,
                },
            },
            focus: {
                ":after": {
                    content: "''",
                    // Since we are using a pseudo element, we need to manually
                    // calculate the width/height and use absolute position to
                    // prevent other elements from being shifted around.
                    position: "absolute",
                    width: `calc(100% + ${theme.border.width.focused * 2}px)`,
                    height: `calc(100% - ${theme.border.width.focused * 2}px)`,
                    borderStyle: "solid",
                    borderColor: light
                        ? theme.color.border.tertiaryInverse
                        : color,
                    borderWidth: theme.border.width.focused,
                    borderRadius: theme.border.radius.default,
                },
            },
            active: {
                color: light ? fadedColor : activeColor,
                ":after": {
                    height: 1,
                    background: light ? fadedColor : activeColor,
                },
            },
            disabled: {
                color: light ? fadedColor : theme.color.text.disabled,
                cursor: "default",
            },
            disabledFocus: {
                ":after": {
                    borderColor: light
                        ? theme.color.bg.primary
                        : theme.color.bg.disabled,
                },
            },
        };
    } else {
        throw new Error("Button kind not recognized");
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
