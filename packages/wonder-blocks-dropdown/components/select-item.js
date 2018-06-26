// @flow
// For menu items that can be selected, selection denoted either with a
// check ✔️ or a checkbox ☑️

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
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
     * Callback for when this item is pressed to change its selection state.
     * Passes value of the item and the new selection state of the item. Should
     * be handled by an implementation of Menu.
     */
    onToggle: (value: string, selectionState: boolean) => void,

    /**
     * Whether this menu item is disabled. A disabled item may not be selected.
     */
    disabled?: boolean,

    /**
     * Optional client-supplied callback when this item is called.
     */
    onClick?: (selectionState: boolean) => void,
};

const StyledButton = addStyle("button");

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
        <View>
            <svg
                role="img"
                width="16px"
                height="16px"
                viewBox="-1 0 12 12"
                aria-hidden="true"
            >
                {selected && (
                    <path
                        fill={pressed || hovered || focused ? white : offBlack}
                        d={checkIcon}
                    />
                )}
            </svg>
        </View>
    );
};

// TODO: replace with Choice component once it's implemented
const Checkbox = (props: CheckProps) => {
    const {selected, pressed, hovered, focused} = props;

    const activeBlue = mix(offBlack32, blue);

    const bgColor = selected && !(pressed || hovered || focused) ? blue : white;

    return (
        <View
            style={[
                styles.checkbox,
                !selected && styles.borderedCheckbox,
                !selected &&
                    (pressed || hovered || focused) &&
                    styles.invertBackground,
            ]}
        >
            {selected && (
                <svg
                    role="img"
                    width="16px"
                    height="16px"
                    viewBox="-2 -1 14 14"
                    aria-hidden="true"
                    style={{backgroundColor: bgColor, borderRadius: 3}}
                >
                    <path
                        fill={
                            hovered || focused
                                ? blue
                                : pressed
                                    ? activeBlue
                                    : white
                        }
                        d={checkIcon}
                    />
                </svg>
            )}
        </View>
    );
};

export default class SelectItem extends React.Component<SelectProps> {
    render() {
        const {
            disabled,
            label,
            onClick,
            onToggle,
            selected,
            value,
            variant,
        } = this.props;

        const ClickableBehavior = getClickableBehavior(this.context.router);

        return (
            <ClickableBehavior
                disabled={disabled}
                onClick={() => {
                    onToggle(value, !selected);
                    if (onClick) {
                        onClick(!selected);
                    }
                }}
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

                    return (
                        <StyledButton style={[defaultStyle]} {...handlers}>
                            <View
                                style={[styles.itemContainer]}
                                role="menuitemcheckbox"
                                aria-checked={selected ? "true" : "false"}
                            >
                                {variant === "check" ? (
                                    <Check selected={selected} {...state} />
                                ) : (
                                    <Checkbox selected={selected} {...state} />
                                )}
                                <LabelLarge style={styles.label}>
                                    {label}
                                </LabelLarge>
                            </View>
                        </StyledButton>
                    );
                }}
            </ClickableBehavior>
        );
    }
}

const styles = StyleSheet.create({
    shared: {
        background: white,
        color: offBlack,
        cursor: "pointer",
        border: "none",
    },

    label: {
        paddingLeft: Spacing.xSmall,
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
        cursor: "default",
    },

    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        paddingLeft: 8,
        paddingRight: 16,
        whiteSpace: "nowrap",
    },

    checkbox: {
        height: 16,
        width: 16,
        borderRadius: 3,
    },

    borderedCheckbox: {
        borderColor: offBlack32,
        borderStyle: "solid",
        borderWidth: 1,
    },

    invertBackground: {
        backgroundColor: white,
        borderColor: mix(fade(blue, 0.32), white),
    },
});
