import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";

/**
 * Props describing the state of the OptionItem, shared by the check
 * component,
 */
type CheckProps = {
    /** Whether option item is disabled. */
    disabled: boolean;
    /** Whether option item is selected. */
    selected: boolean;
};

/**
 * The checkbox component used by OptionItem.
 */
const Checkbox = function (props: CheckProps): React.ReactElement {
    const {disabled, selected} = props;

    return (
        <View
            className="checkbox"
            style={[
                styles.checkbox,
                selected && !disabled && styles.noBorder,
                disabled && styles.disabledCheckbox,
            ]}
        >
            {selected && (
                <PhosphorIcon
                    icon={checkIcon}
                    size="small"
                    className="check"
                    style={[
                        {
                            // The check icon is smaller than the checkbox, as
                            // per design.
                            width: spacing.small_12,
                            height: spacing.small_12,
                            // This margin is to center the check icon in the
                            // checkbox.
                            margin: spacing.xxxxSmall_2,
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
        alignSelf: "center",
        // Semantically, this are the constants for a small-sized icon
        minHeight: spacing.medium_16,
        minWidth: spacing.medium_16,
        height: spacing.medium_16,
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: semanticColor.border.strong,
    },

    noBorder: {
        borderWidth: 0,
    },

    disabledCheckbox: {
        borderColor: semanticColor.border.primary,
        backgroundColor: semanticColor.action.disabled.secondary,
    },

    // The border of 1px on the selected, disabled checkbox pushes the check out
    // of place. Move it back.
    disabledCheckFormatting: {
        position: "absolute",
        top: -1,
        left: -1,
    },
});
