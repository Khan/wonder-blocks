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

import type {CellProps} from "../../util/types.js";

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
        leftAccessory = undefined,
        leftAccessoryStyle = undefined,
        rightAccessory = undefined,
        rightAccessoryStyle = undefined,
    } = props;

    return (
        <View style={[styles.wrapper]}>
            {/* Left accessory */}
            {leftAccessory &&
                renderLeftAccessory(leftAccessory, leftAccessoryStyle)}
            {/* Cell contents */}
            <View style={styles.content}>{children}</View>

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
});

export default CellCore;
