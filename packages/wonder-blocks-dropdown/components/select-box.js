// @flow
// A menu opener

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {
    View,
    addStyle,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-core";

const StyledButton = addStyle("button");

const {blue, white, offBlack, offBlack16, offBlack32, offBlack50} = Color;

const caretDown = `M8 8.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0
1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 8.586z`;

type SelectBoxProps = {|
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

    /**
     * Custom style. Mostly used for preferred width of this select box.
     */
    style?: any,
|};

export default class SelectBox extends React.Component<SelectBoxProps> {
    static defaultProps = {
        disabled: false,
        light: false,
        isPlaceholder: false,
    };

    // TODO(sophie): replace with Icon component
    renderCaret() {
        return (
            <svg
                role="img"
                aria-hidden={true}
                width={16}
                height={16}
                viewBox={`0 0 16 16`}
            >
                <path d={caretDown} />
            </svg>
        );
    }

    render() {
        const {
            children,
            disabled,
            isPlaceholder,
            light,
            onClick,
            style,
        } = this.props;

        const ClickableBehavior = getClickableBehavior(this.context.router);

        // TODO(sophie): should ButtonCore be public so we can use that to make
        // this custom button-like opener?

        const textStyles = [
            styles.text,
            isPlaceholder
                ? disabled
                    ? styles.placeholderDisabled
                    : styles.placeholder
                : disabled && styles.textDisabled,
        ];

        return (
            <ClickableBehavior disabled={disabled} onClick={onClick}>
                {(state, handlers) => {
                    const stateStyles = _generateStyles(light, {...state});
                    const {hovered, focused, pressed} = state;
                    return (
                        <StyledButton
                            disabled={disabled}
                            role="menu"
                            style={[
                                styles.shared,
                                stateStyles.default,
                                disabled && stateStyles.disabled,
                                !disabled &&
                                    (pressed
                                        ? stateStyles.active
                                        : (hovered || focused) &&
                                          stateStyles.focus),
                                style,
                            ]}
                            {...handlers}
                        >
                            <LabelMedium style={[textStyles]}>
                                {children}
                            </LabelMedium>
                            <View style={[styles.spacing]} />
                            <View style={[styles.caretWrapper]}>
                                {this.renderCaret()}
                            </View>
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
        marginTop: Spacing.xxxSmall,
        marginBottom: Spacing.xxxSmall,
        // This asymmetry arises from the Icon on the right side, which has
        // extra padding built in. To have the component look more balanced,
        // we need to take off some paddingRight here.
        paddingLeft: 16,
        paddingRight: 12,
        border: "none",
        borderRadius: buttonRadius,
        cursor: "pointer",
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
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    caretWrapper: {
        minWidth: 16,
    },

    spacing: {
        minWidth: Spacing.xSmall,
    },
});

const _generateStyles = (light, hovered, focused, pressed) => {
    const focusRingGap = 1;
    const focusRingWidth = 2;
    const focusRingOutset = focusRingGap + focusRingWidth;
    const focusRingRadius = buttonRadius + focusRingOutset;

    let newStyles = {};
    if (light) {
        newStyles = {
            focus: {
                ":before": {
                    content: "''",
                    position: "absolute",
                    top: -focusRingOutset,
                    left: -focusRingOutset,
                    right: -focusRingOutset,
                    bottom: -focusRingOutset,
                    borderColor: white,
                    borderStyle: "solid",
                    borderWidth: focusRingWidth,
                    borderRadius: focusRingRadius,
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
                borderWidth: focusRingWidth,
                // These values are default padding (16 and 12) minus 1, because
                // changing the borderWidth to 2 messes up the button width
                // and causes it to move a couple pixels. This fixes that.
                paddingLeft: 15,
                paddingRight: 11,
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
