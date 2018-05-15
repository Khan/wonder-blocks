// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "wonder-blocks-color";
import {addStyle} from "wonder-blocks-core";
import type {ClickableHandlers} from "wonder-blocks-core";
import type {SharedProps} from "./icon-button.js";

type Props = SharedProps &
    ClickableHandlers & {
        hovered: boolean,
        focused: boolean,
        pressed: boolean,
    };

const StyledButton = addStyle("button");

export default class IconButtonCore extends React.Component<Props> {
    render() {
        const {
            icon,
            alt,
            color,
            kind,
            light,
            disabled,
            testId,
            style,
            hovered,
            focused,
            pressed,
            ...handlers
        } = this.props;

        const buttonStyles = _generateStyles(color, kind, light);

        const defaultStyle = [
            sharedStyles.shared,
            disabled && sharedStyles.disabled,
            buttonStyles.default,
            disabled && buttonStyles.disabled,
            !disabled &&
                (pressed
                    ? buttonStyles.active
                    : (hovered || focused) && buttonStyles.focus),
        ];

        // TODO: Replace the SVG with an Icon component once that's done
        return (
            <StyledButton
                style={[sharedStyles.shared, defaultStyle, style]}
                disabled={disabled}
                data-test-id={testId}
                {...handlers}
            >
                <svg
                    role="img"
                    aria-label={alt}
                    width="20px"
                    height="20px"
                    viewBox="0 0 9.8 9.8"
                >
                    <title>{alt}</title>
                    <path fill="currentColor" d={icon} />
                </svg>
            </StyledButton>
        );
    }
}

const sharedStyles = StyleSheet.create({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        height: 40,
        width: 40,
        padding: 0,
        cursor: "pointer",
        border: "none",
        outline: "none",
        textDecoration: "none",
        background: "none",
    },
    disabled: {
        cursor: "auto",
    },
});

const styles = {};

const _generateStyles = (color, kind, light) => {
    const buttonType = color + kind + light.toString();
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (light && kind !== "primary") {
        throw new Error("Light is only supported for primary IconButtons");
    }

    const {white, offBlack32, offBlack64, offBlack} = Color;

    const newStyles = {
        default: {},
        focus: {
            color: light ? white : color,
            borderWidth: 2,
            borderColor: light ? white : color,
            borderStyle: "solid",
            borderRadius: 4,
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
    if (kind === "primary") {
        newStyles["default"] = {
            color: light ? white : color,
        };
    } else if (kind === "secondary") {
        newStyles["default"] = {
            color: offBlack,
        };
    } else if (kind === "tertiary") {
        newStyles["default"] = {
            color: offBlack64,
        };
    } else {
        throw new Error("IconButton kind not recognized");
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
