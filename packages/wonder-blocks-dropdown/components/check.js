// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

const {offBlack, offBlack32, white} = Color;

/**
 * Props describing the state of the OptionItem, shared by the checkbox
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
 * The check component used by OptionItem.
 */
export default function Check(props: CheckProps) {
    const {disabled, selected, pressed, hovered, focused} = props;
    return (
        <Icon
            icon={icons.check}
            size="small"
            color={
                disabled
                    ? offBlack32
                    : pressed || hovered || focused
                        ? white
                        : offBlack
            }
            style={!selected && styles.hide}
        />
    );
}

const styles = StyleSheet.create({
    hide: {
        visibility: "hidden",
    },
});
