// @flow
import React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";

import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import Color, {
    SemanticColor,
    mix,
    fade,
} from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import type {ClickableHandlers} from "@khanacademy/wonder-blocks-core";
import type {SharedProps} from "./button.js";

type Props = {|
    ...SharedProps,
    ...ClickableHandlers,
    hovered: boolean,
    focused: boolean,
    pressed: boolean,
|};

const StyledAnchor = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

export default class ButtonCore extends React.Component<Props> {
    render() {
        const {
            children,
            clientNav,
            color,
            disabled,
            focused,
            hovered,
            href,
            kind,
            light,
            pressed,
            size,
            style,
            testId,
            ...handlers
        } = this.props;

        const buttonColor =
            color === "destructive"
                ? SemanticColor.controlDestructive
                : SemanticColor.controlDefault;

        const buttonStyles = _generateStyles(buttonColor, kind, light);

        const defaultStyle = [
            sharedStyles.shared,
            disabled && sharedStyles.disabled,
            buttonStyles.default,
            disabled && buttonStyles.disabled,
            !disabled &&
                (pressed
                    ? buttonStyles.active
                    : (hovered || focused) && buttonStyles.focus),
            size === "small" && sharedStyles.small,
        ];

        const commonProps = {
            "aria-disabled": disabled ? "true" : undefined,
            "data-test-id": testId,
            style: [defaultStyle, style],
            ...handlers,
        };

        const Label = size === "small" ? LabelSmall : LabelLarge;

        const label = <Label style={sharedStyles.text}>{children}</Label>;

        if (href) {
            return clientNav ? (
                <StyledLink {...commonProps} to={href}>
                    {label}
                </StyledLink>
            ) : (
                <StyledAnchor {...commonProps} href={href}>
                    {label}
                </StyledAnchor>
            );
        } else {
            return (
                <StyledButton {...commonProps} disabled={disabled}>
                    {label}
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
    },
    disabled: {
        cursor: "auto",
    },
    small: {
        height: 32,
    },
    text: {
        fontWeight: "bold",
        pointerEvents: "none", // fix Safari bug where the browser was eating mouse events
    },
});

const styles = {};

const _generateStyles = (color, kind, light) => {
    const buttonType = color + kind + light.toString();
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const {white, white64, offBlack32, offBlack50, darkBlue} = Color;

    let newStyles = {};
    if (kind === "primary") {
        newStyles = {
            default: {
                background: light ? white : color,
                color: light ? color : white,
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
                background: light
                    ? mix(fade(color, 0.32), white)
                    : mix(offBlack32, color),
                color: light
                    ? mix(offBlack32, color)
                    : mix(fade(color, 0.32), white),
            },
            disabled: {
                background: light ? mix(fade(white, 0.32), color) : offBlack32,
                color: light ? color : white64,
            },
        };
    } else if (kind === "secondary") {
        newStyles = {
            default: {
                background: "none",
                color: light ? white : color,
                borderColor: light ? white64 : offBlack50,
                borderStyle: "solid",
                borderWidth: 1,
            },
            focus: {
                background: light ? "transparent" : white,
                borderColor: light ? white : color,
                borderWidth: 2,
                paddingLeft: 15,
                paddingRight: 15,
            },
            active: {
                background: light
                    ? mix(offBlack32, color)
                    : mix(fade(color, 0.32), white),
                color: light
                    ? mix(fade(color, 0.32), white)
                    : mix(offBlack32, color),
                borderColor: light
                    ? mix(fade(color, 0.32), white)
                    : mix(offBlack32, color),
            },
            disabled: {
                color: light ? mix(fade(white, 0.32), color) : offBlack32,
                borderColor: light ? mix(fade(white, 0.32), color) : offBlack32,
            },
        };
    } else if (kind === "tertiary") {
        newStyles = {
            default: {
                background: "none",
                color: light ? white : color,
                paddingLeft: 4,
                paddingRight: 4,
            },
            focus: {
                ":after": {
                    content: "''",
                    position: "absolute",
                    height: 2,
                    width: "calc(100% - 8px)",
                    bottom: "calc(50% - 11px)",
                    background: light ? white : color,
                    borderRadius: 2,
                },
            },
            active: {
                color: light
                    ? mix(fade(color, 0.32), white)
                    : mix(offBlack32, color),
            },
            disabled: {
                color: light ? mix(fade(white, 0.32), color) : offBlack32,
            },
        };
    } else {
        throw new Error("Button kind not recognized");
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
