// @flow
// A select opener

import * as React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {
    View,
    addStyle,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-core";

const StyledButton = addStyle("button");

const {
    blue,
    darkBlue,
    white,
    offBlack,
    offBlack16,
    offBlack32,
    offBlack50,
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
    disabled?: boolean,

    /**
     * Whether the displayed text is a placeholder, determined by the creator
     * of this component. A placeholder has more faded text colors and styles.
     */
    isPlaceholder?: boolean,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light?: boolean,

    /**
     * Callback for when the SelectOpener is pressed.
     */
    onClick: () => void,
|};

/**
 * An opener that opens selects.
 */
export default class SelectOpener extends React.Component<SelectOpenerProps> {
    static defaultProps = {
        disabled: false,
        light: false,
        isPlaceholder: false,
    };

    static contextTypes = {router: PropTypes.any};

    render() {
        const {children, disabled, isPlaceholder, light, onClick} = this.props;

        const ClickableBehavior = getClickableBehavior(this.context.router);

        const textStyles = [
            styles.text,
            isPlaceholder
                ? disabled
                    ? styles.placeholderDisabled
                    : styles.placeholder
                : disabled && styles.textDisabled,
        ];

        return (
            <ClickableBehavior
                disabled={disabled}
                onClick={onClick}
                triggerOnEnter={false}
            >
                {(state, handlers) => {
                    const stateStyles = _generateStyles(light, {...state});
                    const {hovered, focused, pressed} = state;
                    return (
                        <StyledButton
                            disabled={disabled}
                            role="button"
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
                            <LabelMedium style={textStyles}>
                                {children}
                            </LabelMedium>
                            <View style={styles.spacing} />
                            <Icon
                                icon={icons.caretDown}
                                size="small"
                                style={[styles.caret, textStyles]}
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
        backgroundColor: white,
        height: 40,
        // This asymmetry arises from the Icon on the right side, which has
        // extra padding built in. To have the component look more balanced,
        // we need to take off some paddingRight here.
        paddingLeft: 16,
        paddingRight: 12,
        border: "none",
        borderRadius: buttonRadius,
        outline: "none",
        textDecoration: "none",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
    },

    textDisabled: {
        color: offBlack32,
    },

    placeholder: {
        color: offBlack50,
    },

    placeholderDisabled: {
        color: offBlack16,
    },

    text: {
        whiteSpace: "nowrap",
        userSelect: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    caret: {
        minWidth: 16,
    },

    spacing: {
        minWidth: Spacing.xSmall,
    },
});

const _generateStyles = (light, hovered, focused, pressed) => {
    let newStyles = {};
    if (light) {
        newStyles = {
            default: {},
            focus: {
                boxShadow: `0 0 0 1px ${darkBlue}, 0 0 0 3px ${white}`,
            },
            active: {
                boxShadow: `0 0 0 1px ${darkBlue}, 0 0 0 3px ${mix(
                    fade(blue, 0.32),
                    white,
                )}`,
                background: mix(fade(blue, 0.32), white),
            },
            disabled: {
                cursor: "auto",
            },
        };
    } else {
        newStyles = {
            default: {
                borderColor: offBlack50,
                borderStyle: "solid",
                borderWidth: 1,
            },
            focus: {
                borderColor: blue,
                borderWidth: 2,
                // These values are default padding (16 and 12) minus 1, because
                // changing the borderWidth to 2 messes up the button width
                // and causes it to move a couple pixels. This fixes that.
                paddingLeft: 16 - 1,
                paddingRight: 12 - 1,
            },
            active: {
                background: mix(fade(blue, 0.32), white),
                borderColor: mix(offBlack32, blue),
                borderWidth: 2,
                // These values are default padding (16 and 12) minus 1, because
                // changing the borderWidth to 2 messes up the button width
                // and causes it to move a couple pixels. This fixes that.
                paddingLeft: 16 - 1,
                paddingRight: 12 - 1,
            },
            disabled: {
                borderColor: offBlack16,
                cursor: "auto",
            },
        };
    }
    return StyleSheet.create(newStyles);
};
