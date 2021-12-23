// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";

import {CellMeasurements, getHorizontalRuleStyles} from "./common.js";

import type {CellProps, TypographyText} from "../../util/types.js";

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

    const maybeRenderLeftAccessory = (): React.Node => {
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

    const maybeRenderRightAccessory = (): React.Node => {
        if (!rightAccessory) {
            return null;
        }

        return (
            <>
                <Strut size={CellMeasurements.accessoryHorizontalSpacing} />
                <View style={[styles.accessory, {...rightAccessoryStyle}]}>
                    {rightAccessory}
                </View>
            </>
        );
    };

    const horizontalRuleStyles = getHorizontalRuleStyles(horizontalRule);

    return (
        <View style={[styles.wrapper, style]}>
            <View style={[styles.innerWrapper, horizontalRuleStyles]}>
                {/* Left accessory */}
                {maybeRenderLeftAccessory()}
                {/* Cell contents */}
                <View style={styles.content} testId={testId}>
                    {children}
                </View>

                {/* Right accessory */}
                {maybeRenderRightAccessory()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        background: Color.white,
        color: Color.offBlack,
    },

    innerWrapper: {
        padding: CellMeasurements.cellPadding,
        flexDirection: "row",
    },

    content: {
        alignSelf: "center",
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
        // prevent to display the accessory on the left side of the cell if the
        // content is too short.
        marginLeft: "auto",
    },
});

export default CellCore;
