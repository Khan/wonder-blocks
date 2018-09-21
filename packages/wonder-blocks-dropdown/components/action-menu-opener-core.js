// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";

import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import Color, {SemanticColor, mix} from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {ClickableHandlers} from "@khanacademy/wonder-blocks-core";
import type {SharedProps} from "./action-menu-opener.js";

type Props = {|
    ...SharedProps,
    ...ClickableHandlers,
    hovered: boolean,
    focused: boolean,
    pressed: boolean,
|};

const StyledButton = addStyle("button");

export default class ButtonCore extends React.Component<Props> {
    static contextTypes = {router: PropTypes.any};

    render() {
        const {
            children,
            disabled: disabledProp,
            focused,
            hovered,
            pressed,
            "aria-label": ariaLabel,
            ...handlers
        } = this.props;

        const buttonColor = SemanticColor.controlDefault;
        const buttonStyles = _generateStyles(buttonColor);
        const disabled = disabledProp;

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

        const commonProps = {
            "aria-disabled": disabled ? "true" : undefined,
            "aria-label": ariaLabel,
            "data-test-id": "foo-bar",
            role: "button",
            style: [defaultStyle],
            ...handlers,
        };

        const label = (
            <LabelLarge style={sharedStyles.text}>
                {children}
                <Icon
                    size="small"
                    color="currentColor"
                    icon={icons.caretDown}
                    style={sharedStyles.icon}
                />
            </LabelLarge>
        );

        const contents = <React.Fragment>{label}</React.Fragment>;

        return (
            <StyledButton type="button" {...commonProps} disabled={disabled}>
                {contents}
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
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        userSelect: "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        pointerEvents: "none", // fix Safari bug where the browser was eating mouse events
    },
    hiddenText: {
        visibility: "hidden",
    },
    spinner: {
        position: "absolute",
    },
    icon: {
        paddingLeft: Spacing.xxxSmall,
    },
});

const styles = {};

const _generateStyles = (color) => {
    const buttonType = color;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const {offBlack32} = Color;
    const activeColor = mix(offBlack32, color);

    let newStyles = {};

    newStyles = {
        default: {
            background: "none",
            color: color,
            paddingLeft: 0,
            paddingRight: 0,
        },
        focus: {
            ":after": {
                content: "''",
                position: "absolute",
                height: 2,
                width: `calc(100% - 20px)`,
                left: 0,
                bottom: "calc(50% - 11px)",
                background: color,
                borderRadius: 2,
            },
        },
        active: {
            color: activeColor,
            ":after": {
                content: "''",
                position: "absolute",
                height: 2,
                width: `calc(100% - 20px)`,
                left: 0,
                bottom: "calc(50% - 11px)",
                background: activeColor,
                borderRadius: 2,
            },
        },
        disabled: {
            color: offBlack32,
            cursor: "default",
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
