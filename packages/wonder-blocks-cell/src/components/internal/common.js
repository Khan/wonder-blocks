// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {AccessoryStyle} from "../../util/types.js";

type Accessory = React.Node;

/**
 * Shared elements
 */
export const renderLeftAccessory = (
    leftAccessory: Accessory,
    leftAccessoryStyle?: AccessoryStyle,
): React.Node => {
    return (
        <>
            <View style={[styles.left, {...leftAccessoryStyle}]}>
                {leftAccessory}
            </View>
            <Strut size={CellMeasurements.accessoryHorizontalSpacing} />
        </>
    );
};

export const renderRightAccessory = (
    rightAccessory: Accessory,
    rightAccessoryStyle?: AccessoryStyle,
): React.Node => {
    return (
        <>
            <Strut size={CellMeasurements.accessoryHorizontalSpacing} />
            <View style={[styles.right, {...rightAccessoryStyle}]}>
                {rightAccessory}
            </View>
        </>
    );
};

export const CellMeasurements = {
    /**
     * The cell wrapper's gap.
     */
    cellPadding: Spacing.medium_16,

    /**
     * The horizontal spacing between the left and right accessory.
     */
    accessoryHorizontalSpacing: Spacing.medium_16,
};

const styles = StyleSheet.create({
    left: {
        minWidth: "auto",
        alignItems: "center",
        alignSelf: "center",
    },

    right: {
        alignItems: "center",
        alignSelf: "center",
        color: Color.offBlack64,
    },
});
