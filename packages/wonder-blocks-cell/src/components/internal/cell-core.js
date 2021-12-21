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

    return (
        <View style={[styles.wrapper, style]}>
            <View
                style={[
                    styles.innerWrapper,
                    horizontalRule === "full-width" && styles.horizontalRule,
                ]}
            >
                {/* Left accessory */}
                {leftAccessory &&
                    renderLeftAccessory(leftAccessory, leftAccessoryStyle)}
            </View>
            <View
                style={[
                    styles.innerWrapper,
                    styles.cellBody,
                    horizontalRule !== "none" && styles.horizontalRule,
                ]}
            >
                {/* Cell contents */}
                <View testId={testId} style={styles.content}>
                    {children}
                </View>

                {/* Right accessory */}
                {rightAccessory &&
                    renderRightAccessory(rightAccessory, rightAccessoryStyle)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        background: Color.white,
        flexDirection: "row",
        alignItems: "stretch",
        textAlign: "left",
    },

    innerWrapper: {
        minWidth: "auto",
        padding: CellMeasurements.cellPadding,
        paddingLeft: 0,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    cellBody: {
        width: "100%",
    },

    content: {
        alignSelf: "center",
    },

    horizontalRule: {
        boxShadow: `inset 0px -1px 0px ${Color.offBlack16}`,
    },
});

export default CellCore;
