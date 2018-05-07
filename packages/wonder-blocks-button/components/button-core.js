// @flow
import React from "react";
import {StyleSheet, css} from "aphrodite";

import {LabelLarge} from "wonder-blocks-typography";
import Color, {mix, fade} from "wonder-blocks-color";
import type {SharedProps} from "./button.js";
import type {Handlers} from "./clickable-behavior.js";

type Props = SharedProps &
    Handlers & {
        hovered: boolean,
        focused: boolean,
        pressed: boolean,
        href?: string,
    };

export default class ButtonCore extends React.Component<Props> {
    render() {
        const {
            children,
            icon,
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
            ...handlers
        } = this.props;

        const buttonStyles = _generateStyles(color, kind, light);
        const Tag = href ? "a" : "button";
        return (
            <Tag
                className={css(
                    sharedStyles.shared,
                    disabled && sharedStyles.disabled,
                    buttonStyles.default,
                    disabled && buttonStyles.disabled,
                    !disabled &&
                        (pressed
                            ? buttonStyles.active
                            : (hovered || focused) && buttonStyles.focus),
                    size === "small" && sharedStyles.small,
                )}
                href={href}
                disabled={disabled}
                data-test-id={testId}
                {...handlers}
            >
                <LabelLarge>{children}</LabelLarge>
            </Tag>
        );
    }
}

const sharedStyles = StyleSheet.create({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: 40,
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
                background: light ? white64 : offBlack32,
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
                background: light ? color : white,
                borderColor: light ? white : color,
                borderWidth: 2,
                paddingLeft: 14,
                paddingRight: 14,
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
                color: light ? mix(white, fade(color, 0.32)) : offBlack32,
                borderColor: light ? mix(white, fade(color, 0.32)) : offBlack32,
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
                borderColor: light ? white : color,
                borderStyle: "solid",
                borderWidth: 2,
            },
            active: {
                color: light
                    ? mix(fade(color, 0.32), white)
                    : mix(offBlack32, color),
            },
            disabled: {
                color: light ? mix(Color.white, fade(color, 0.32)) : offBlack32,
            },
        };
    } else {
        throw "Button kind not recognized";
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
