// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";

import {CellMeasurements, getHorizontalRuleStyles} from "./common.js";

import type {CellProps, TypographyText} from "../../util/types.js";

type LeftAccessoryProps = {|
    leftAccessory?: CellProps["leftAccessory"],
    leftAccessoryStyle?: CellProps["leftAccessoryStyle"],
|};

/**
 * Left Accessories can be defined using WB components such as Icon, IconButton,
 * or it can even be used for a custom node/component if needed.
 */
const LeftAccessory = ({
    leftAccessory,
    leftAccessoryStyle,
}: LeftAccessoryProps): React.Node => {
    if (!leftAccessory) {
        return null;
    }

    return (
        <>
            <View style={[styles.accessory, {...leftAccessoryStyle}]}>
                {leftAccessory}
            </View>
            <Strut size={CellMeasurements.accessoryHorizontalSpacing} />
        </>
    );
};

type RightAccessoryProps = {|
    rightAccessory?: CellProps["rightAccessory"],
    rightAccessoryStyle?: CellProps["rightAccessoryStyle"],
|};

/**
 * Right Accessories can be defined using WB components such as Icon,
 * IconButton, or it can even be used for a custom node/component if needed.
 */
const RightAccessory = ({
    rightAccessory,
    rightAccessoryStyle,
}: RightAccessoryProps): React.Node => {
    if (!rightAccessory) {
        return null;
    }

    return (
        <>
            <Strut size={CellMeasurements.accessoryHorizontalSpacing} />
            <View
                style={[
                    styles.accessory,
                    styles.accessoryRight,
                    {...rightAccessoryStyle},
                ]}
            >
                {rightAccessory}
            </View>
        </>
    );
};

type CellCoreProps = {|
    ...$Rest<CellProps, {|title: TypographyText|}>,

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
        <View style={[styles.wrapper, style]}>
            <View style={[styles.innerWrapper, horizontalRuleStyles]}>
                {/* Left accessory */}
                <LeftAccessory
                    leftAccessory={leftAccessory}
                    leftAccessoryStyle={leftAccessoryStyle}
                />

                {/* Cell contents */}
                <View style={styles.content} testId={testId}>
                    {children}
                </View>

                {/* Right accessory */}
                <RightAccessory
                    rightAccessory={rightAccessory}
                    rightAccessoryStyle={rightAccessoryStyle}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        background: Color.white,
        color: Color.offBlack,
        minHeight: CellMeasurements.cellMinHeight,
    },

    innerWrapper: {
        padding: `${CellMeasurements.cellPadding.paddingVertical}px ${CellMeasurements.cellPadding.paddingHorizontal}px`,
        flexDirection: "row",
        flex: 1,
    },

    content: {
        alignSelf: "center",
        padding: `${CellMeasurements.contentVerticalSpacing}px 0`,
    },

    accessory: {
        // Use content width by default.
        minWidth: "auto",
        // Horizontal alignment of the accessory.
        alignItems: "center",
        // Vertical alignment.
        alignSelf: "center",
    },

    accessoryRight: {
        // The right accessory will have this color by default. Unless the
        // accessory element overrides that color internally.
        color: Color.offBlack64,
        // Align the right accessory to the right side of the cell, so we can
        // prevent the accessory from shifting left, if the content is too
        // short.
        marginLeft: "auto",
    },
});

export default CellCore;
