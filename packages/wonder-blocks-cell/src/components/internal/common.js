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
): React.Element<typeof View> => {
    return (
        <View style={[styles.left, {...leftAccessoryStyle}]}>
            {leftAccessory}
        </View>
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
    cellPadding: Spacing.medium_16,
    accessoryHorizontalSpacing: Spacing.medium_16,
    leftAccessoryWidth: Spacing.large_24,
    rightAccessoryWidth: Spacing.xLarge_32,
    textHorizontalSpacing: Spacing.large_24,
    textVerticalSpacing: Spacing.xxxxSmall_2,
};

const styles = StyleSheet.create({
    left: {
        minWidth: "auto",
        alignItems: "center",
        alignSelf: "center",
        paddingLeft: CellMeasurements.cellPadding,
    },

    right: {
        alignItems: "center",
        alignSelf: "center",
        color: Color.offBlack64,
    },
});
