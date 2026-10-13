import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";

import styles from "./option-item.module.css";

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
                selected && !disabled && styles.checkboxSelected,
                disabled && styles.checkboxDisabled,
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
                        disabled && selected && styles.checkboxCheckDisabled,
                    ]}
                />
            )}
        </View>
    );
};

export default Checkbox;
