// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {AccessoryStyle, HorizontalRuleVariant} from "../../util/types.js";

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

/**
 * Gets the horizontalRule style based on the variant.
 * @param {HorizontalRuleVariant} horizontalRule The variant of the horizontal
 * rule.
 * @returns A styled horizontal rule.
 */
export const getHorizontalRuleStyles = (
    horizontalRule: HorizontalRuleVariant,
): StyleType => {
    switch (horizontalRule) {
        case "inset":
            return [styles.horizontalRule, styles.horizontalRuleInset];
        case "full-width":
            return styles.horizontalRule;
        case "none":
            return {};
    }
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

    horizontalRule: {
        position: "relative",
        ":after": {
            width: "100%",
            content: "''",
            position: "absolute",
            bottom: 0,
            right: 0,
            height: 2,
            boxShadow: `inset 0px -1px 0px ${Color.offBlack8}`,
        },
    },

    horizontalRuleInset: {
        ":after": {
            width: `calc(100% - ${CellMeasurements.cellPadding}px)`,
        },
    },
});
