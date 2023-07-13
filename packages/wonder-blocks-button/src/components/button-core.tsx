import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import Color, {
    SemanticColor,
    mix,
    fade,
} from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import Icon from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import type {SharedProps} from "./button";
import {
    ThemeContract,
    ThemedStylesFn,
    useStyles,
    useTheme,
} from "@khanacademy/wonder-blocks-theming";

type Props = SharedProps & ChildrenProps & ClickableState;

const StyledAnchor = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

function ButtonCore(props: Props) {
    const theme = useTheme();
    const sharedStyles = useStyles(wbThemeStyles);

    const renderInner = (router: any): React.ReactNode => {
        const {
            children,
            skipClientNav,
            color,
            disabled: disabledProp,
            focused,
            hovered,
            href = undefined,
            kind,
            light,
            pressed,
            size,
            style,
            testId,
            type = undefined,
            spinner,
            icon,
            id,
            waiting: _,
            ...restProps
        } = props;

        const buttonColor =
            color === "destructive"
                ? theme.color.bg.critical
                : theme.color.bg.action;

        const iconWidth = icon ? (size === "small" ? 16 : 24) + 8 : 0;
        const buttonStyles = _generateStyles(
            buttonColor,
            kind,
            light,
            iconWidth,
            size,
            theme,
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
                    icon && sharedStyles.textWithIcon,
                    spinner && sharedStyles.hiddenText,
                    kind === "tertiary" && sharedStyles.textWithFocus,
                    // apply focus effect on the label instead
                    kind === "tertiary" &&
                        !disabled &&
                        (pressed
                            ? buttonStyles.active
                            : (hovered || focused) && buttonStyles.focus),
                ]}
            >
                {icon && (
                    <Icon
                        size={iconSize}
                        color="currentColor"
                        icon={icon}
                        style={sharedStyles.icon}
                    />
                )}
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
                <StyledLink {...commonProps} to={href}>
                    {contents}
                </StyledLink>
            ) : (
                <StyledAnchor {...commonProps} href={href}>
                    {contents}
                </StyledAnchor>
            );
        } else {
            return (
                <StyledButton
                    type={type || "button"}
                    {...commonProps}
                    aria-disabled={disabled}
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
}

const wbThemeStyles: ThemedStylesFn = (theme: ThemeContract) => ({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: theme.spacing.medium,
        paddingRight: theme.spacing.medium,
        border: "none",
        borderRadius: 4,
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
        paddingLeft: 12,
    },
    disabled: {
        cursor: "auto",
    },
    small: {
        height: 32,
    },
    large: {
        borderRadius: Spacing.xxSmall_6,
        height: 56,
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
        fontSize: 18,
        lineHeight: "20px",
    },
    textWithIcon: {
        display: "flex", // allows the text and icon to sit nicely together
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
        paddingRight: Spacing.xSmall_8,
    },
});

const styles: Record<string, any> = {};

const _generateStyles = (
    color: string,
    kind: "primary" | "secondary" | "tertiary",
    light: boolean,
    iconWidth: number,
    size: "large" | "medium" | "small",
    theme: ThemeContract,
) => {
    const buttonType =
        color + kind + light.toString() + iconWidth.toString() + size;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const {white, white50, white64, offBlack32, offBlack50, darkBlue} = Color;
    const fadedColor = mix(fade(color, 0.32), white);
    const activeColor = mix(offBlack32, color);
    const padding = (
        size === "large" ? Spacing.xLarge_32 : Spacing.medium_16
    ) as number;

    let newStyles: Record<string, any> = {};
    if (kind === "primary") {
        newStyles = {
            default: {
                background: light ? white : color,
                color: light ? color : white,
                paddingLeft: padding,
                paddingRight: padding,
            },
            focus: {
                // This assumes a background of white for the regular button and
                // a background of darkBlue for the light version. The inner
                // box shadow/ring is also small enough for a slight variation
                // in the background color not to matter too much.
                boxShadow: `0 0 0 1px ${light ? darkBlue : white}, 0 0 0 3px ${
                    light ? white : color
                }`,
            },
            active: {
                boxShadow: `0 0 0 1px ${light ? darkBlue : white}, 0 0 0 3px ${
                    light ? fadedColor : activeColor
                }`,
                background: light ? fadedColor : activeColor,
                color: light ? activeColor : fadedColor,
            },
            disabled: {
                background: light ? fadedColor : offBlack32,
                color: light ? color : white50,
                cursor: "default",
                ":focus": {
                    boxShadow: `0 0 0 1px ${
                        light ? offBlack32 : white
                    }, 0 0 0 3px ${light ? fadedColor : offBlack32}`,
                },
            },
        };
    } else if (kind === "secondary") {
        newStyles = {
            default: {
                background: "none",
                color: light ? white : color,
                borderColor: light ? white50 : offBlack50,
                borderStyle: "solid",
                borderWidth: 1,
                paddingLeft: iconWidth ? padding - 4 : padding,
                paddingRight: padding,
            },
            focus: {
                background: light ? "transparent" : white,
                borderColor: light ? white : color,
                borderWidth: 2,
                // The left padding for the button with icon should have 4px
                // less padding
                paddingLeft: iconWidth ? padding - 5 : padding - 1,
                paddingRight: padding - 1,
            },
            active: {
                background: light ? activeColor : fadedColor,
                color: light ? fadedColor : activeColor,
                borderColor: light ? fadedColor : activeColor,
                borderWidth: 2,
                // We need to reduce padding to offset the difference
                // caused by the border becoming thicker on focus.
                // The left padding for the button with icon should have 4px
                // less padding
                paddingLeft: iconWidth ? padding - 5 : padding - 1,
                paddingRight: padding - 1,
            },
            disabled: {
                color: light ? white50 : offBlack32,
                borderColor: light ? fadedColor : offBlack32,
                cursor: "default",
                ":focus": {
                    borderColor: light ? white50 : offBlack32,
                    borderWidth: 2,
                    // We need to reduce padding to offset the difference
                    // caused by the border becoming thicker on focus.
                    // The left padding for the button with icon should have 4px
                    // less padding
                    paddingLeft: iconWidth ? padding - 5 : padding - 1,
                    paddingRight: padding - 1,
                },
            },
        };
    } else if (kind === "tertiary") {
        newStyles = {
            default: {
                background: "none",
                color: light ? white : color,
                paddingLeft: 0,
                paddingRight: 0,
            },
            focus: {
                ":after": {
                    content: "''",
                    position: "absolute",
                    height: 2,
                    width: `calc(100% - ${iconWidth}px)`,
                    right: 0,
                    bottom: 0,
                    background: light ? white : color,
                    borderRadius: 2,
                },
            },
            active: {
                color: light ? fadedColor : activeColor,
                ":after": {
                    content: "''",
                    position: "absolute",
                    height: 2,
                    width: `calc(100% - ${iconWidth}px)`,
                    right: 0,
                    bottom: -1,
                    background: light ? fadedColor : activeColor,
                    borderRadius: 2,
                },
            },
            disabled: {
                color: light ? fadedColor : offBlack32,
                cursor: "default",
                ":focus": {
                    ":after": {
                        content: "''",
                        position: "absolute",
                        height: 2,
                        width: `calc(100% - ${iconWidth}px)`,
                        right: 0,
                        /**
                         * For tertiary buttons, underline is applied to the
                         * internal `span` element, So we need to calculate the
                         * offset to center the line in the button (right after
                         * the span).
                         */
                        bottom: `calc(50% - 11px)`,
                        background: light ? white : offBlack32,
                        borderRadius: 2,
                    },
                },
            },
        };
    } else {
        throw new Error("Button kind not recognized");
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};

export default ButtonCore;
