// @flow
import React from "react";
import {StyleSheet, css} from "aphrodite";

import {LabelLarge} from "wonder-blocks-typography";
import {processStyleList} from "../../wonder-blocks-core/util/util.js";
import Color, {mix, fade} from "wonder-blocks-color";
import type {ValidTints} from "wonder-blocks-color";
import type {SharedProps} from "../types.js";

type Props = SharedProps & {
    hovered?: boolean,
    focused?: boolean,
    pressed?: boolean,
};

export default class ButtonCore extends React.Component<Props> {
    render() {
        const {
            color,
            kind,
            light,
            size,
            disabled,
            hovered,
            focused,
            pressed,
        } = this.props;

        const buttonStyles = _generateStyles(
            color || Color.blue,
            kind || "primary",
            !!light,
        );

        if (disabled) {
            return (
                <button
                    className={css(
                        sharedStyles.shared,
                        sharedStyles.disabled,
                        size === "small" && sharedStyles.small,
                        buttonStyles.default,
                        buttonStyles.disabled,
                    )}
                    disabled
                >
                    <LabelLarge>{this.props.children}</LabelLarge>
                </button>
            );
        }
        return (
            <button
                className={css(
                    sharedStyles.shared,
                    size === "small" && sharedStyles.small,
                    buttonStyles.default,
                    pressed && buttonStyles.active,
                    (hovered || focused) && !pressed && buttonStyles.focus,
                )}
            >
                <LabelLarge>{this.props.children}</LabelLarge>
                {(hovered || focused) &&
                    !pressed &&
                    (!kind || kind === "primary") && (
                        <span
                            className={css(
                                sharedStyles.focusRing,
                                color === Color.red &&
                                    sharedStyles.focusRingRed,
                                light && sharedStyles.focusRingLight,
                            )}
                        />
                    )}
            </button>
        );
    }
}

const sharedStyles = StyleSheet.create({
    shared: {
        position: "relative",
        height: 40,
        margin: 0,
        paddingLeft: 16,
        paddingRight: 16,
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        outline: "none",
    },
    disabled: {
        cursor: "auto",
    },
    focusRing: {
        position: "absolute",
        boxSizing: "border-box",
        top: -3,
        left: -3,
        width: "calc(100% + 6px)",
        height: "calc(100% + 6px)",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: Color.blue,
        borderRadius: 7,
    },
    focusRingRed: {
        borderColor: Color.red,
    },
    focusRingLight: {
        borderColor: Color.white,
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

    let newStyles = {};

    if (kind === "primary" && !light) {
        newStyles = {
            default: {
                background: color,
                color: Color.white,
            },
            focus: {},
            active: {
                background: mix(Color.offBlack32, color),
                color: mix(fade(color, 0.32), Color.white),
            },
            disabled: {
                background: Color.offBlack32,
                color: Color.white64,
            },
        };
    } else if (kind === "primary" && light) {
        newStyles = {
            default: {
                background: Color.white,
                color: color,
            },
            focus: {},
            active: {
                background: mix(fade(color, 0.32), Color.white),
                color: mix(Color.offBlack32, color),
            },
            disabled: {
                background: Color.white64,
                color: color,
            },
        };
    } else if (kind === "secondary" && !light) {
        newStyles = {
            default: {
                background: "none",
                color: color,
                borderColor: Color.offBlack50,
                borderStyle: "solid",
                borderWidth: 1,
            },
            focus: {
                background: Color.white,
                borderColor: color,
                borderWidth: 2,
                paddingLeft: 14,
                paddingRight: 14,
            },
            active: {
                background: mix(fade(color, 0.32), Color.white),
                color: mix(Color.offBlack32, color),
                borderColor: mix(Color.offBlack32, color),
            },
            disabled: {
                color: Color.offBlack32,
                borderColor: Color.offBlack32,
            },
        };
    } else if (kind === "secondary" && light) {
        newStyles = {
            default: {
                background: "none",
                color: Color.white,
                borderColor: Color.white64,
                borderStyle: "solid",
                borderWidth: 1,
            },
            focus: {
                color: Color.white,
                borderColor: Color.white,
                borderWidth: 2,
                paddingLeft: 14,
                paddingRight: 14,
            },
            active: {
                background: mix(Color.offBlack32, color),
                color: mix(fade(color, 0.32), Color.white),
                borderColor: mix(fade(color, 0.32), Color.white),
            },
            disabled: {
                color: mix(Color.white, fade(color, 0.32)),
                borderColor: mix(Color.white, fade(color, 0.32)),
            },
        };
    } else if (kind === "tertiary" && !light) {
        newStyles = {
            default: {
                background: "none",
                color: color,
                paddingLeft: 4,
                paddingRight: 4,
            },
            focus: {
                borderColor: color,
                borderStyle: "solid",
                borderWidth: 2,
            },
            active: {
                color: mix(Color.offBlack32, color),
            },
            disabled: {
                color: Color.offBlack32,
            },
        };
    } else if (kind === "tertiary" && light) {
        newStyles = {
            default: {
                background: "none",
                color: Color.white,
                paddingLeft: 4,
                paddingRight: 4,
            },
            focus: {
                color: Color.white,
                borderColor: Color.white,
                borderStyle: "solid",
                borderWidth: 2,
            },
            active: {
                color: mix(fade(color, 0.32), Color.white),
            },
            disabled: {
                color: mix(Color.white, fade(color, 0.32)),
            },
        };
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
