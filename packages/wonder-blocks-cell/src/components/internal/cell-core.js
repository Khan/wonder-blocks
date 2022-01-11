// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";

import {CellMeasurements} from "./common.js";

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
        leftAccessory = undefined,
        leftAccessoryStyle = undefined,
        rightAccessory = undefined,
        rightAccessoryStyle = undefined,
    } = props;

    return (
        <View style={[styles.wrapper]}>
            <View style={styles.innerWrapper}>
                {/* Left accessory */}
                {leftAccessory && (
                    <>
                        <View
                            style={[styles.accessory, {...leftAccessoryStyle}]}
                        >
                            {leftAccessory}
                        </View>
                        <Strut
                            size={CellMeasurements.accessoryHorizontalSpacing}
                        />
                    </>
                )}
                {/* Cell contents */}
                <View style={styles.content}>{children}</View>

                {/* Right accessory */}
                {rightAccessory && (
                    <>
                        <Strut
                            size={CellMeasurements.accessoryHorizontalSpacing}
                        />
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
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        background: Color.white,
        minHeight: CellMeasurements.cellMinHeight,
    },

    innerWrapper: {
        padding: `${CellMeasurements.cellPadding.paddingVertical}px ${CellMeasurements.cellPadding.paddingHorizontal}px`,
        flexDirection: "row",
        flex: 1,
    },

    content: {
        alignSelf: "center",
        color: Color.offBlack,
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
