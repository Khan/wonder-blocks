// @flow
// A menu that consists of action items

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {addStyle, getClickableBehavior} from "@khanacademy/wonder-blocks-core";

const StyledButton = addStyle("button");

const {blue, white, offBlack16, offBlack32, offBlack50} = Color;

type Props = {
    /**
     * Display text in the SelectBox.
     */
    children: string,
    /**
     * Whether the SelectBox opener is disabled. If disabled, disallows
     * interaction. Default false.
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
     * Callback for when the SelectBox is pressed.
     */
    onClick: () => void,
};

export default class SelectBox extends React.Component<Props> {
    static defaultProps = {
        disabled: false,
        light: false,
        isPlaceholder: false,
    };

    render() {
        const {children, disabled, isPlaceholder, light, onClick} = this.props;

        const ClickableBehavior = getClickableBehavior(this.context.router);

        // TODO: should ButtonCore be exposed so we can use that to make this
        // custom button-like opener?

        const textStyles = [
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
                // href={href}
            >
                {(state, handlers) => {
                    const stateStyles = _generateStyles(light, {...state});
                    const {hovered, focused, pressed} = state;
                    return (
                        <StyledButton
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
                            // clientNav={clientNav}
                            // href={href}
                        >
                            <LabelMedium style={textStyles}>
                                {children}
                            </LabelMedium>
                        </StyledButton>
                    );
                }}
            </ClickableBehavior>
        );
    }
}

const styles = StyleSheet.create({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        marginTop: Spacing.xxxSmall,
        marginBottom: Spacing.xxxSmall,
        paddingLeft: 16,
        paddingRight: 16,
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        outline: "none",
        textDecoration: "none",
        boxSizing: "border-box",
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
});

const _generateStyles = (light, hovered, focused, pressed) => {
    let newStyles = {};
    if (light) {
        newStyles = {
            focus: {
                ":before": {
                    content: "''",
                    position: "absolute",
                    top: -3,
                    left: -3,
                    right: -3,
                    bottom: -3,
                    borderColor: white,
                    borderStyle: "solid",
                    borderWidth: 2,
                    borderRadius: 7,
                },
            },
            active: {
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
                borderStyle: "solid",
                borderWidth: 2,
                // These values are default padding (16) minus 1, because
                // changing the borderWidth to 2 messes up the button width
                // and causes it to move a couple pixels. This fixes that.
                paddingLeft: 15,
                paddingRight: 15,
            },
            active: {
                background: mix(fade(blue, 0.32), white),
                borderColor: mix(offBlack32, blue),
                borderStyle: "solid",
                borderWidth: 1,
            },
            disabled: {
                borderColor: offBlack16,
                borderStyle: "solid",
                borderWidth: 1,
                cursor: "auto",
            },
        };
    }
    return StyleSheet.create(newStyles);
};
