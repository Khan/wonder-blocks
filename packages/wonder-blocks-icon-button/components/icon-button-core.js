// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import Color, {SemanticColor, mix, fade} from "wonder-blocks-color";
import {addStyle} from "wonder-blocks-core";
import type {ClickableHandlers} from "wonder-blocks-core";
import type {SharedProps} from "./icon-button.js";

type Props = SharedProps &
    ClickableHandlers & {
        /**
         * Whether the IconButton is hovered.
         *
         * Same styling as focused. Refer to `ClickableBehavior` for more
         * information on when this prop should be `true`.
         */
        hovered: boolean,

        /**
         * Whether the IconButton is focused.
         *
         * Same styling as hvoered. Refer to `ClickableBehavior` for more
         * information on when this prop should be `true`.
         */
        focused: boolean,

        /**
         * Whether the IconButton is pressed.
         *
         * Refer to `ClickableBehavior` for more information on when this prop
         * should be `true`.
         */
        pressed: boolean,

        /**
         * URL to navigate to.
         *
         * Used to determine whether to render an `<a>` or `<button>` tag. Also
         * passed in as the `<a>` tag's `href` if present.
         */
        href?: string,
    };

const StyledAnchor = addStyle("a");
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
            href,
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
        ];

        const Tag = href ? StyledAnchor : StyledButton;

        // TODO: Replace the SVG with an Icon component once that's done
        return (
            <Tag
                data-test-id={testId}
                href={href}
                disabled={disabled}
                aria-label={alt}
                style={[defaultStyle, style]}
                {...handlers}
            >
                <svg
                    role="img"
                    width="20px"
                    height="20px"
                    viewBox="0 0 9.8 9.8"
                    aria-hidden="true"
                >
                    <path fill="currentColor" d={icon} />
                </svg>
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
