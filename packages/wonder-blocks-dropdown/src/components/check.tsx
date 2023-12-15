import * as React from "react";
import {StyleSheet} from "aphrodite";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
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
        height: Spacing.medium_16,
        // Semantically, this are the constants for a small-sized icon
        minHeight: Spacing.medium_16,
        minWidth: Spacing.medium_16,
    },

    hide: {
        visibility: "hidden",
    },
});
