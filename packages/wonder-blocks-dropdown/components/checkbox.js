// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix} from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon from "@khanacademy/wonder-blocks-icon";

import type {IconAsset} from "@khanacademy/wonder-blocks-icon";

// NOTE(sophie): This is a smaller check specifically for use in checkboxes.
// Please don't copy it automatically and check with designers before using.
// If the intended icon is a check without a checkbox, you should be using
// icons.check from the Wonder Blocks Icon package.
const checkboxCheck: IconAsset = {
    small:
        "M11.263 4.324a1 1 0 1 1 1.474 1.352l-5.5 6a1 1 0 0 1-1.505-.036l-2.5-3a1 1 0 1 1 1.536-1.28L6.536 9.48l4.727-5.157z",
};
const {blue, white, offBlack16, offBlack32, offBlack50, offWhite} = Color;

/**
 * Props describing the state of the OptionItem, shared by the check
 * component,
 */
type CheckProps = {|
    /** Whether option item is disabled. */
    disabled: boolean,
    /** Whether option item is selected. */
    selected: boolean,
    /** Whether option item is pressed. */
    pressed: boolean,
    /** Whether option item is hovered. */
    hovered: boolean,
    /** Whether option item is focused. */
    focused: boolean,
|};

/**
 * The checkbox component used by OptionItem.
 */
export default function Checkbox(props: CheckProps) {
    const {disabled, selected, pressed, hovered, focused} = props;
    const activeBlue = mix(offBlack32, blue);
    const clickInteraction = pressed || hovered || focused;

    const bgColor = disabled
        ? offWhite
        : selected && !clickInteraction
        ? blue
        : white;
    const checkColor = disabled
        ? offBlack32
        : clickInteraction
        ? pressed
            ? activeBlue
            : blue
        : white;

    return (
        <View
            style={[
                styles.checkbox,
                (clickInteraction || (selected && !disabled)) &&
                    styles.noBorder,
                disabled && styles.disabledCheckbox,
                {backgroundColor: bgColor},
            ]}
        >
            {selected && (
                <Icon
                    icon={checkboxCheck}
                    size="small"
                    color={checkColor}
                    style={[
                        disabled && selected && styles.disabledCheckFormatting,
                    ]}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        // Semantically, this are the constants for a small-sized icon
        minHeight: 16,
        minWidth: 16,
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: offBlack50,
    },

    noBorder: {
        borderWidth: 0,
    },

    disabledCheckbox: {
        borderColor: offBlack16,
        backgroundColor: offWhite,
    },

    // The border of 1px on the selected, disabled checkbox pushes the check out
    // of place. Move it back.
    disabledCheckFormatting: {
        position: "absolute",
        top: -1,
        left: -1,
    },
});
