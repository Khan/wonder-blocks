// @flow
// For menu items that can be selected, selection denoted either with a
// check ✔️ or a checkbox ☑️

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing, {Strut} from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {
    View,
    addStyle,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-core";

const checkIcon = `M10,3.8C10,4,9.9,4.2,9.8,4.3L5.1,8.9L4.3,9.8C4.2,9.9,4,10,
3.8,10S3.5,9.9,3.4,9.8L2.5,8.9L0.2,6.6C0.1,6.5,0,6.3,0,6.2s0.1-0.3,0.2-0.4
l0.9-0.9c0.1-0.1,0.3-0.2,0.4-0.2s0.3,0.1,0.4,0.2l1.9,1.9l4.2-4.2c0.1-0.1,
0.3-0.2,0.4-0.2c0.2,0,0.3,0.1,0.4,0.2l0.9,0.9C9.9,3.5,10,3.7,10,3.8z`;

const {blue, white, offBlack, offBlack32} = Color;

type SelectProps = {
    /**
     * Display text of the menu item.
     */
    label: string,
    /**
     * Callback for when this item is pressed. Passes value of the item.
     */
    // TODO: maybe pass new state value as well
    onToggle: (value: string) => void,
    /**
     * Whether this item is selected.
     */
    selected: boolean,
    /**
     * Value of the item, used as a key of sorts for the parent menu to manage
     * its menu items, because label/display text may be identical in some
     * menus. This is the value passed back when the item is pressed.
     */
    value: string,
    /**
     * Whether the item should show a check or checkbox to indicate selection
     * state.
     */
    variant: "check" | "checkbox",
    /**
     * Whether this menu item is disabled. A disabled item may not be selected.
     */
    disabled?: boolean,
    // TODO: figure out href, clientNav, onClick stuff
    // onClick?: () => void,
    /**
     * Custom styles.
     */
    style?: any,
};

const StyledLink = addStyle("a");

type CheckProps = {
    selected: boolean,
    pressed: boolean,
    hovered: boolean,
    focused: boolean,
};

// TODO: return with Icon once it's been made!
const Check = (props: CheckProps) => {
    const {selected, pressed, hovered, focused} = props;

    return (
        <svg
            role="img"
            width="16px"
            height="16px"
            viewBox="0 0 9.8 9.8"
            aria-hidden="true"
        >
            {selected && (
                <path
                    fill={pressed || hovered || focused ? white : offBlack}
                    d={checkIcon}
                />
            )}
        </svg>
    );
};

// TODO: getting replaced with a variant from Choice
const Checkbox = (props: CheckProps) => {
    const {selected, pressed, hovered, focused} = props;

    const activeBlue = mix(offBlack32, blue);

    const bgColor = selected && !(pressed || hovered || focused) ? blue : white;

    return (
        <svg
            role="img"
            width="16px"
            height="16px"
            viewBox="0 0 11.8 11.8"
            aria-hidden="true"
            style={{backgroundColor: bgColor}}
        >
            {selected && (
                <path
                    fill={
                        hovered || focused ? blue : pressed ? activeBlue : white
                    }
                    d={checkIcon}
                />
            )}
        </svg>
    );
};

export default class SelectItem extends React.Component<SelectProps> {
    static defaultProps = {
        disabled: false,
        onClick: () => void 0,
    };

    render() {
        const {
            disabled,
            label,
            // onClick,
            onToggle,
            selected,
            style,
            value,
            variant,
        } = this.props;

        const ClickableBehavior = getClickableBehavior(this.context.router);

        return (
            <ClickableBehavior
                disabled={disabled}
                onClick={() => onToggle(value)}
            >
                {(state, handlers) => {
                    const {pressed, hovered, focused} = state;

                    const defaultStyle = [
                        styles.shared,
                        disabled && styles.disabled,
                        !disabled &&
                            (pressed
                                ? styles.active
                                : (hovered || focused) && styles.focus),
                    ];

                    const allStyles = [defaultStyle, style];

                    return (
                        <StyledLink style={allStyles} {...handlers}>
                            <View style={[styles.itemContainer]}>
                                {variant === "check" ? (
                                    <Check selected={selected} {...state} />
                                ) : (
                                    <Checkbox selected={selected} {...state} />
                                )}
                                {false && <Strut size={Spacing.xSmall} />}
                                <LabelLarge>{label}</LabelLarge>
                            </View>
                        </StyledLink>
                    );
                }}
            </ClickableBehavior>
        );
    }
}

const styles = StyleSheet.create({
    shared: {
        color: offBlack,
        cursor: "pointer",
    },

    // hover and focus states
    focus: {
        color: white,
        background: blue,
    },

    // active and pressed states
    active: {
        color: mix(fade(blue, 0.32), white),
        background: mix(offBlack32, blue),
    },

    // disabled state
    disabled: {
        color: offBlack32,
        cursor: "auto",
    },

    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        padding: 8,
    },
});
