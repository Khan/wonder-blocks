// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import {
    CellMeasurements,
    renderLeftAccessory,
    renderRightAccessory,
} from "./common.js";

import type {CellProps, HorizontalRuleVariant} from "../../util/types.js";

/**
 * Gets the horizontalRule style based on the variant.
 * @param {HorizontalRuleVariant} horizontalRule The variant of the horizontal
 * rule.
 * @returns A styled horizontal rule.
 */
const getHorizontalRuleStyles = (horizontalRule: HorizontalRuleVariant) => {
    switch (horizontalRule) {
        case "inset":
            return [styles.horizontalRule, styles.horizontalRuleInset];
        case "full-width":
            return styles.horizontalRule;
        case "none":
            return {};
    }
};

type CellCoreProps = {|
    ...CellProps,

    /**
     * The content of the cell.
     */
    children: React.Node,
|};

/**
 * CellCore is the base cell wrapper. It's used as the skeleton/layout that is
 * used by BasicCell and DetailCell (and any other variants).
 *
 * Both variants share how they render their accessories, and the main
 * responsibility of this component is to render the contents that are passed in
 * (using the `children` prop).
 */
const CellCore = (props: CellCoreProps): React.Node => {
    const {
        children,
        horizontalRule = "inset",
        leftAccessory = undefined,
        leftAccessoryStyle = undefined,
        rightAccessory = undefined,
        rightAccessoryStyle = undefined,
        style,
        testId,
    } = props;

    const horizontalRuleStyles = getHorizontalRuleStyles(horizontalRule);

    return (
        <View style={[styles.wrapper, style, horizontalRuleStyles]}>
            {/* Left accessory */}
            {leftAccessory &&
                renderLeftAccessory(leftAccessory, leftAccessoryStyle)}
            {/* Cell contents */}
            <View testId={testId} style={styles.content}>
                {children}
            </View>

            {/* Right accessory */}
            {rightAccessory &&
                renderRightAccessory(rightAccessory, rightAccessoryStyle)}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        background: Color.white,
        padding: CellMeasurements.cellPadding,
        flexDirection: "row",
        alignItems: "stretch",
        textAlign: "left",
    },

    content: {
        alignSelf: "center",
        color: Color.offBlack,
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

export default CellCore;
