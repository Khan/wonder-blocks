// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";

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
import {isExternalUrl} from "@khanacademy/wonder-blocks-clickable";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import type {SharedProps} from "./button.js";

type Props = {|
    ...SharedProps,
    ...ChildrenProps,
    ...ClickableState,
    href?: string,
    type?: "submit",
|};

type ContextTypes = {|
    router: $FlowFixMe,
|};

const StyledAnchor = addStyle<"a">("a");
const StyledButton = addStyle<"button">("button");
const StyledLink = addStyle<typeof Link>(Link);

export default class ButtonCore extends React.Component<Props> {
    static contextTypes: ContextTypes = {router: PropTypes.any};

    render(): React.Node {
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
        } = this.props;
        const {router} = this.context;

        const buttonColor =
            color === "destructive"
                ? SemanticColor.controlDestructive
                : SemanticColor.controlDefault;

        const iconWidth = icon ? (size === "small" ? 16 : 24) + 8 : 0;
        const buttonStyles = _generateStyles(
            buttonColor,
            kind,
            light,
            iconWidth,
            size,
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
            size === "xlarge" && sharedStyles.xlarge,
        ];

        const commonProps = {
            "data-test-id": testId,
            id: id,
            role: "button",
            style: [defaultStyle, style],
            ...restProps,
        };

        const Label = size === "small" ? LabelSmall : LabelLarge;

        const label = (
            <Label
                style={[
                    sharedStyles.text,
                    size === "xlarge" && sharedStyles.xlargeText,
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
                        size={size}
                        color="currentColor"
                        icon={icon}
                        style={sharedStyles.icon}
                    />
                )}
                {children}
            </Label>
        );

        const contents = (
            <React.Fragment>
                {label}
                {spinner && (
                    <CircularSpinner
                        style={sharedStyles.spinner}
                        size={
                            {
                                medium: "small",
                                small: "xsmall",
                                xlarge: "medium",
                            }[size]
                        }
                        light={kind === "primary"}
                    />
                )}
            </React.Fragment>
        );

        if (href && !disabled) {
            return router && !skipClientNav && !isExternalUrl(href) ? (
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
                    disabled={disabled}
                >
                    {contents}
                </StyledButton>
            );
        }
    }
}

const sharedStyles = StyleSheet.create({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 16,
        paddingRight: 16,
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
    xlarge: {
        height: 60,
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
    xlargeText: {
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

const styles = {};

const _generateStyles = (color, kind, light, iconWidth, size) => {
    const buttonType =
        color + kind + light.toString() + iconWidth.toString() + size;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const {white, white50, white64, offBlack32, offBlack50, darkBlue} = Color;
    const fadedColor = mix(fade(color, 0.32), white);
    const activeColor = mix(offBlack32, color);
    const padding = size === "xlarge" ? Spacing.xLarge_32 : Spacing.medium_16;

    let newStyles = {};
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
                color: light ? color : white64,
                cursor: "default",
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
                // The left padding for the button with icon should have 4px
                // less padding
                paddingLeft: iconWidth ? padding - 5 : padding - 1,
                paddingRight: padding - 1,
            },
            disabled: {
                color: light ? white50 : offBlack32,
                borderColor: light ? fadedColor : offBlack32,
                cursor: "default",
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
                    bottom: "calc(50% - 11px)",
                    background: light ? fadedColor : activeColor,
                    borderRadius: 2,
                },
            },
            disabled: {
                color: light ? fadedColor : offBlack32,
                cursor: "default",
            },
        };
    } else {
        throw new Error("Button kind not recognized");
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
