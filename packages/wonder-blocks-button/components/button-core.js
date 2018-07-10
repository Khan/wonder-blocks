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
    getTag() {
        const {href, clientNav} = this.props;
        if (href) {
            if (clientNav) {
                return StyledLink;
            } else {
                return StyledAnchor;
            }
        } else {
            return StyledButton;
        }
    }

    getProps() {
        const {
            icon, // eslint-disable-line no-unused-vars
            color,
            kind,
            light,
            size,
            testId,
            style,
            disabled,
            hovered,
            focused,
            pressed,
            href,
            clientNav,
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

        const props = {
            style: [defaultStyle, style],
            disabled,
            "data-test-id": testId,
            ...handlers,
        };

        if (!disabled && href) {
            if (clientNav) {
                // $FlowFixMe
                props.to = href;
            } else {
                // $FlowFixMe
                props.href = href;
            }
        }

        return props;
    }

    render() {
        const {children, size} = this.props;

        const Tag = this.getTag();
        const props = this.getProps();
        const Label = size === "small" ? LabelSmall : LabelLarge;
        return (
            <Tag {...props}>
                <Label style={sharedStyles.text}>{children}</Label>
            </Tag>
        );
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

    const {white, white64, offBlack32, offBlack50} = Color;

    let newStyles = {};
    if (kind === "primary") {
        newStyles = {
            default: {
                background: light ? white : color,
                color: light ? color : white,
            },
            focus: {
                ":before": {
                    content: "''",
                    position: "absolute",
                    top: -3,
                    left: -3,
                    right: -3,
                    bottom: -3,
                    borderColor: light ? white : color,
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderRadius: 7,
                },
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
