import * as React from "react";
import {StyleSheet} from "aphrodite";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
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
            color={semanticColor.core.foreground.instructive.default}
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
        height: sizing.size_160,
        // Semantically, this are the constants for a small-sized icon
        minHeight: sizing.size_160,
        minWidth: sizing.size_160,
    },

    hide: {
        visibility: "hidden",
    },
});
