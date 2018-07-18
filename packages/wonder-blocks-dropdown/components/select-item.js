// @flow
// For menu items that can be selected, selection denoted either with a
// check ✔️ or a checkbox ☑️

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {
    View,
    addStyle,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-core";
import type {IconAsset} from "@khanacademy/wonder-blocks-icon";

const {
    blue,
    white,
    offBlack,
    offBlack16,
    offBlack32,
    offBlack50,
    offWhite,
} = Color;

type SelectProps = {|
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
     * Passes value of the item and its old selection state. Should be handled
     * by an implementation of Menu.
     */
    onToggle: (value: string, oldSelectionState: boolean) => void,

    /**
     * Whether this menu item is disabled. A disabled item may not be selected.
     */
    disabled: boolean,

    /**
     * Optional client-supplied callback when this item is called.
     */
    onClick?: (oldSelectionState: boolean) => void,
|};

const StyledButton = addStyle("button");

type CheckProps = {|
    disabled: boolean,
    selected: boolean,
    pressed: boolean,
    hovered: boolean,
    focused: boolean,
|};

const Check = (props: CheckProps) => {
    const {selected, pressed, hovered, focused} = props;
    return (
        <View style={[styles.check, !selected && styles.hide]}>
            <Icon
                icon={icons.check}
                size="small"
                color={pressed || hovered || focused ? white : offBlack}
            />
        </View>
    );
};

// NOTE(sophie): This is a smaller check specifically for use in checkboxes.
// Please don't copy it automatically and check with designers before using.
// If the intended icon is a check without a checkbox, you should be using
// icons.check from the Wonder Blocks Icon package.
const checkboxCheck: IconAsset = {
    small:
        "M11.263 4.324a1 1 0 1 1 1.474 1.352l-5.5 6a1 1 0 0 1-1.505-.036l-2.5-3a1 1 0 1 1 1.536-1.28L6.536 9.48l4.727-5.157z",
};

const Checkbox = (props: CheckProps) => {
    const {disabled, selected, pressed, hovered, focused} = props;
    const activeBlue = mix(offBlack32, blue);
    const bgColor = disabled
        ? offWhite
        : selected && !(pressed || hovered || focused)
            ? blue
            : white;

    return (
        <View
            style={[
                styles.check,
                styles.checkbox,
                !selected &&
                    !(pressed || hovered || focused) &&
                    styles.borderedCheckbox,
                !selected &&
                    (pressed || hovered || focused) &&
                    styles.invertBackground,
                disabled && styles.disabledCheckbox,
                {backgroundColor: bgColor},
            ]}
        >
            {selected && (
                <Icon
                    icon={checkboxCheck}
                    size="small"
                    color={
                        disabled
                            ? offBlack32
                            : hovered || focused
                                ? blue
                                : pressed
                                    ? activeBlue
                                    : white
                    }
                    style={[
                        disabled && selected && styles.disabledCheckFormatting,
                    ]}
                />
            )}
        </View>
    );
};

export default class SelectItem extends React.Component<SelectProps> {
    static defaultProps = {
        disabled: false,
    };
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
                    onToggle(value, selected);
                    if (onClick) {
                        onClick(selected);
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
                                    <Check
                                        disabled={disabled}
                                        selected={selected}
                                        {...state}
                                    />
                                ) : (
                                    <Checkbox
                                        disabled={disabled}
                                        selected={selected}
                                        {...state}
                                    />
                                )}
                                <View style={[styles.spacing]} />
                                <LabelLarge style={[styles.label]}>
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
        outline: "none",
        margin: 0,
        padding: 0,
    },

    label: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
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
        paddingLeft: Spacing.xSmall,
        paddingRight: Spacing.medium,
        whiteSpace: "nowrap",
    },

    check: {
        // Semantically, this are the constants for a small-sized icon
        minHeight: 16,
        minWidth: 16,
    },

    checkbox: {
        borderRadius: 3,
    },

    borderedCheckbox: {
        borderColor: offBlack50,
        borderStyle: "solid",
        borderWidth: 1,
    },

    invertBackground: {
        borderColor: white,
    },

    disabledCheckbox: {
        borderColor: offBlack16,
        borderWidth: 1,
        backgroundColor: offWhite,
    },

    // The border of 1px on the selected, disabled checkbox pushes the check out
    // of place. Move it back.
    disabledCheckFormatting: {
        position: "absolute",
        top: -1,
        left: -1,
    },

    spacing: {
        minWidth: 8,
    },

    hide: {
        visibility: "hidden",
    },
});
