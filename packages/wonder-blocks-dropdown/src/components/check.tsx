import * as React from "react";
import {StyleSheet} from "aphrodite";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";

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
    const {selected} = props;
    return (
        <PhosphorIcon
            icon={checkIcon}
            size="small"
            style={[styles.bounds, !selected && styles.hide]}
        />
    );
};

export default Check;

const styles = StyleSheet.create({
    bounds: {
        alignSelf: "center",
        height: spacing.medium_16,
        // Semantically, this are the constants for a small-sized icon
        minHeight: spacing.medium_16,
        minWidth: spacing.medium_16,
    },

    hide: {
        visibility: "hidden",
    },
});
