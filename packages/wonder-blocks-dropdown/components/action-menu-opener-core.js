// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";

import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import Color, {SemanticColor, mix} from "@khanacademy/wonder-blocks-color";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import type {AriaProps, ClickableState} from "@khanacademy/wonder-blocks-core";

type Props = {|
    ...$Rest<AriaProps, {|"aria-disabled": "true" | "false" | void|}>,

    ...ClickableState,
    /**
     * Display text for the opener.
     */
    children: string,

    /**
     * Whether the opener is disabled. If disabled, disallows interaction.
     */
    disabled?: boolean,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Whether the dropdown is open.
     */
    opened: boolean,
|};

const StyledButton = addStyle<"button">("button");

/**
 * Although this component shares a lot with ButtonCore there are a couple
 * of differences:
 * - the down caret icon appears on the right instead of the left
 * - the down caret icon is smaller that the one that would be used by ButtonCore
 */
export default class ActionMenuOpenerCore extends React.Component<Props> {
    static contextTypes = {router: PropTypes.any};

    render() {
        const {
            children,
            disabled: disabledProp,
            focused,
            hovered,
            pressed,
            testId,
            opened,
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
            !disabled && pressed && buttonStyles.active,
        ];

        const label = (
            <LabelLarge style={sharedStyles.text}>{children}</LabelLarge>
        );

        return (
            <StyledButton
                aria-expanded={opened ? "true" : "false"}
                aria-haspopup="menu"
                aria-label={ariaLabel}
                disabled={disabled}
                style={defaultStyle}
                type="button"
                {...handlers}
                data-test-id={testId}
            >
                <View
                    style={
                        !disabled && (hovered || focused) && buttonStyles.focus
                    }
                >
                    {label}
                </View>
                <Strut size={Spacing.xxxSmall} />
                <Icon
                    size="small"
                    color="currentColor"
                    icon={icons.caretDown}
                />
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
        border: "none",
        borderRadius: Spacing.xxxSmall,
        cursor: "pointer",
        outline: "none",
        textDecoration: "none",
        boxSizing: "border-box",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
        ":focus": {
            // Mobile: Removes a blue highlight style shown when the user clicks a button
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
        },
    },
    disabled: {
        cursor: "auto",
    },
    small: {
        height: Spacing.xLarge,
    },
    text: {
        textAlign: "left",
        display: "inline-block",
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
        },
        focus: {
            ":after": {
                content: "''",
                position: "absolute",
                height: 2,
                left: 0,
                right: 0,
                bottom: -1,
                background: "currentColor",
                borderRadius: 2,
            },
        },
        active: {
            color: activeColor,
        },
        disabled: {
            color: offBlack32,
            cursor: "default",
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
