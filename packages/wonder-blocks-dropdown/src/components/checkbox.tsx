import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
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
                selected && !disabled && styles.selected,
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
                            width: sizing.size_120,
                            height: sizing.size_120,
                            // This margin is to center the check icon in the
                            // checkbox.
                            margin: sizing.size_020,
                        },
                        disabled && selected && styles.disabledCheckFormatting,
                    ]}
                />
            )}
        </View>
    );
};

export default Checkbox;

const checkboxTokens = {
    color: {
        default: {
            border: semanticColor.input.default.border,
            background: semanticColor.input.default.background,
        },
        disabled: {
            border: semanticColor.input.disabled.border,
            background: semanticColor.input.disabled.background,
        },
        selected: {
            background: semanticColor.input.checked.background,
            foreground: semanticColor.input.checked.foreground,
        },
    },
};

const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
        // Semantically, this are the constants for a small-sized icon
        minHeight: sizing.size_160,
        minWidth: sizing.size_160,
        height: sizing.size_160,
        background: checkboxTokens.color.default.background,
        // TODO(WB-1864): Use the correct token once TB is updated.
        borderRadius: 3,
        borderWidth: border.width.thin,
        borderStyle: "solid",
        borderColor: checkboxTokens.color.default.border,
    },

    selected: {
        borderWidth: 0,
        background: checkboxTokens.color.selected.background,
        color: checkboxTokens.color.selected.foreground,
    },

    disabledCheckbox: {
        borderColor: checkboxTokens.color.disabled.border,
        backgroundColor: checkboxTokens.color.disabled.background,
    },

    // The border of 1px on the selected, disabled checkbox pushes the check out
    // of place. Move it back.
    disabledCheckFormatting: {
        position: "absolute",
        top: -1,
        left: -1,
    },
});
