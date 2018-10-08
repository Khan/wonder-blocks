// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import {addStyle, getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

const StyledButton = addStyle("button");

const {
    blue,
    white,
    white50,
    offBlack,
    offBlack16,
    offBlack32,
    offBlack64,
} = Color;

type SelectOpenerProps = {|
    /**
     * Display text in the SelectOpener.
     */
    children: string,

    /**
     * Whether the SelectOpener is disabled. If disabled, disallows interaction.
     * Default false.
     */
    disabled: boolean,

    //TODO: error state
    // error: boolean,

    /**
     * Whether the displayed text is a placeholder, determined by the creator
     * of this component. A placeholder has more faded text colors and styles.
     */
    isPlaceholder: boolean,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light: boolean,

    /**
     * Callback for when the SelectOpener is pressed.
     */
    onOpenChanged: (open: boolean, keyboard: boolean) => void,

    /**
     * Whether the dropdown is open.
     */
    open: boolean,
|};

/**
 * An opener that opens select boxes.
 */
export default class SelectOpener extends React.Component<SelectOpenerProps> {
    static defaultProps = {
        disabled: false,
        light: false,
        isPlaceholder: false,
    };

    static contextTypes = {router: PropTypes.any};

    handleClick = (e: SyntheticEvent<>) => {
        const {open} = this.props;
        this.props.onOpenChanged(!open, e.type === "keyup");
    };

    render() {
        const {children, disabled, isPlaceholder, light} = this.props;

        const ClickableBehavior = getClickableBehavior(this.context.router);

        return (
            <ClickableBehavior
                disabled={disabled}
                onClick={this.handleClick}
                role="listbox"
            >
                {(state, handlers) => {
                    const stateStyles = _generateStyles(light, isPlaceholder);
                    const {hovered, focused, pressed} = state;

                    // The icon colors are kind of fickle. This is just logic
                    // based on the zeplin design.
                    const iconColor = light
                        ? disabled || pressed
                            ? "currentColor"
                            : white
                        : disabled
                            ? offBlack32
                            : offBlack64;

                    return (
                        <StyledButton
                            disabled={disabled}
                            role="listbox"
                            type="button"
                            style={[
                                styles.shared,
                                stateStyles.default,
                                disabled && stateStyles.disabled,
                                !disabled &&
                                    (pressed
                                        ? stateStyles.active
                                        : (hovered || focused) &&
                                          stateStyles.focus),
                            ]}
                            {...handlers}
                        >
                            <LabelMedium style={styles.text}>
                                {children}
                            </LabelMedium>
                            <Icon
                                icon={icons.caretDown}
                                color={iconColor}
                                size="small"
                                style={styles.caret}
                            />
                        </StyledButton>
                    );
                }}
            </ClickableBehavior>
        );
    }
}

const buttonRadius = 4;

const styles = StyleSheet.create({
    // TODO: Dedupe with Button styles
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: offBlack,
        height: 40,
        // This asymmetry arises from the Icon on the right side, which has
        // extra padding built in. To have the component look more balanced,
        // we need to take off some paddingRight here.
        paddingLeft: 16,
        paddingRight: 12,
        borderWidth: 0,
        borderRadius: buttonRadius,
        borderStyle: "solid",
        outline: "none",
        textDecoration: "none",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
    },

    text: {
        marginRight: Spacing.xSmall,
        whiteSpace: "nowrap",
        userSelect: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    caret: {
        minWidth: 16,
    },
});

// These values are default padding (16 and 12) minus 1, because
// changing the borderWidth to 2 messes up the button width
// and causes it to move a couple pixels. This fixes that.
const adjustedPaddingLeft = 16 - 1;
const adjustedPaddingRight = 12 - 1;

const stateStyles = {};

const _generateStyles = (light, placeholder) => {
    // "hash" the parameters
    const styleKey = `${String(light)}-${String(placeholder)}`;
    if (stateStyles[styleKey]) {
        return stateStyles[styleKey];
    }

    let newStyles = {};
    if (light) {
        newStyles = {
            default: {
                backgroundColor: "transparent",
                color: placeholder ? white50 : white,
                borderColor: white50,
                borderWidth: 1,
            },
            focus: {
                borderColor: white,
                borderWidth: 2,
                paddingLeft: adjustedPaddingLeft,
                paddingRight: adjustedPaddingRight,
            },
            active: {
                paddingLeft: adjustedPaddingLeft,
                paddingRight: adjustedPaddingRight,
                borderColor: mix(fade(blue, 0.32), white),
                borderWidth: 2,
                color: placeholder
                    ? mix(fade(white, 0.32), blue)
                    : mix(fade(blue, 0.32), white),
                backgroundColor: mix(offBlack32, blue),
            },
            disabled: {
                borderColor: mix(fade(white, 0.32), blue),
                color: mix(fade(white, 0.32), blue),
                cursor: "auto",
            },
        };
    } else {
        newStyles = {
            default: {
                backgroundColor: white,
                borderColor: offBlack16,
                borderWidth: 1,
                color: placeholder ? offBlack64 : offBlack,
            },
            focus: {
                borderColor: blue,
                borderWidth: 2,
                paddingLeft: adjustedPaddingLeft,
                paddingRight: adjustedPaddingRight,
            },
            active: {
                background: mix(fade(blue, 0.32), white),
                borderColor: mix(offBlack32, blue),
                borderWidth: 2,
                paddingLeft: adjustedPaddingLeft,
                paddingRight: adjustedPaddingRight,
            },
            disabled: {
                backgroundColor: "transparent",
                borderColor: offBlack16,
                color: offBlack64,
                cursor: "auto",
            },
        };
    }

    stateStyles[styleKey] = StyleSheet.create(newStyles);
    return stateStyles[styleKey];
};
