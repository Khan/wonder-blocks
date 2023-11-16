import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix} from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";

const {blue, white, offBlack16, offBlack32, offBlack50, offWhite} = Color;

/**
 * Props describing the state of the OptionItem, shared by the check
 * component,
 */
type CheckProps = {
    /** Whether option item is disabled. */
    disabled: boolean;
    /** Whether option item is selected. */
    selected: boolean;
    /** Whether option item is pressed. */
    pressed: boolean;
    /** Whether option item is hovered. */
    hovered: boolean;
    /** Whether option item is focused. */
    focused: boolean;
};

/**
 * The checkbox component used by OptionItem.
 */
const Checkbox = function (props: CheckProps): React.ReactElement {
    const {disabled, selected, pressed, hovered, focused} = props;
    const activeBlue = mix(offBlack32, blue);
    const clickInteraction = pressed || hovered || focused;

    const bgColor = disabled
        ? offWhite
        : selected && !clickInteraction
        ? blue
        : white;
    // const checkColor = disabled
    //     ? offBlack32
    //     : clickInteraction
    //     ? pressed
    //         ? activeBlue
    //         : blue
    //     : white;

    return (
        <View
            style={[
                styles.checkbox,
                (clickInteraction || (selected && !disabled)) &&
                    styles.noBorder,
                disabled && styles.disabledCheckbox,
                // {backgroundColor: bgColor},
            ]}
        >
            {selected && (
                <PhosphorIcon
                    icon={checkIcon}
                    size="small"
                    // color={checkColor}
                    style={[
                        {
                            // The check icon is smaller than the checkbox, as
                            // per design.
                            width: Spacing.small_12,
                            height: Spacing.small_12,
                            // This margin is to center the check icon in the
                            // checkbox.
                            margin: Spacing.xxxxSmall_2,
                        },
                        disabled && selected && styles.disabledCheckFormatting,
                    ]}
                />
            )}
        </View>
    );
};

export default Checkbox;

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
