import * as React from "react";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";

import styles from "./check.module.css";

/**
 * Props describing the state of the OptionItem, shared by the checkbox
 * component,
 */
type CheckProps = {
    /** Whether option item is disabled. */
    disabled: boolean;
    /** Whether option item is selected. */
    selected: boolean;
};

/**
 * The check component used by OptionItem.
 */
const Check = function (props: CheckProps): React.ReactElement {
    const {selected, disabled} = props;

    // Using `strong` for disabled as we are applying an alpha to the listbox.
    const iconColor = disabled
        ? semanticColor.core.foreground.disabled.strong
        : semanticColor.core.foreground.instructive.default;
    return (
        <PhosphorIcon
            color={iconColor}
            icon={checkIcon}
            size="small"
            style={[styles.root, styles.check, !selected && styles.hidden]}
        />
    );
};

export default Check;
