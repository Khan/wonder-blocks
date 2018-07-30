// @flow
import React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";

import Color, {
    SemanticColor,
    mix,
    fade,
} from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import type {ClickableHandlers} from "@khanacademy/wonder-blocks-core";
import Icon from "@khanacademy/wonder-blocks-icon";
import type {SharedProps} from "./icon-button.js";

type Props = {|
    ...SharedProps,
    ...ClickableHandlers,

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
|};

const StyledAnchor = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

export default class IconButtonCore extends React.Component<Props> {
    handleClick = (e: SyntheticEvent<>) => {
        if (this.props.disabled) {
            e.preventDefault();
        }
    };

    render() {
        const {
            clientNav,
            color,
            disabled,
            focused,
            hovered,
            href,
            icon,
            kind,
            light,
            pressed,
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
        ];

        const child = <Icon size="medium" color="currentColor" icon={icon} />;

        const commonProps = {
            // TODO(kevinb): figure out a better way of forward ARIA props
            "aria-disabled": disabled ? "true" : undefined,
            "aria-label": this.props["aria-label"],
            "data-test-id": testId,
            style: [defaultStyle, style],
            ...handlers,
        };

        if (href) {
            const actualHref = !disabled ? href : undefined;
            return clientNav ? (
                <StyledLink
                    {...commonProps}
                    onClick={this.handleClick}
                    to={actualHref}
                >
                    {child}
                </StyledLink>
            ) : (
                <StyledAnchor
                    {...commonProps}
                    onClick={this.handleClick}
                    href={actualHref}
                >
                    {child}
                </StyledAnchor>
            );
        } else {
            return (
                <StyledButton {...commonProps} disabled={disabled}>
                    {child}
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
        cursor: "default",
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
            cursor: "default",
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
