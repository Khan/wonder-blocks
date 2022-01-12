// @flow
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {HorizontalRuleVariant} from "../../util/types.js";

export const CellMeasurements = {
    cellMinHeight: Spacing.xxLarge_48,

    /**
     * The cell wrapper's gap.
     */
    cellPadding: {
        paddingVertical: Spacing.xSmall_8,
        paddingHorizontal: Spacing.medium_16,
    },

    /**
     * The extra vertical spacing added to the title/content wrapper.
     */
    contentVerticalSpacing: Spacing.xxxSmall_4,

    /**
     * The horizontal spacing between the left and right accessory.
     */
    accessoryHorizontalSpacing: Spacing.medium_16,
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

const styles = StyleSheet.create({
    horizontalRule: {
        position: "relative",
        ":after": {
            width: "100%",
            content: "''",
            position: "absolute",
            // align to the bottom of the cell
            bottom: 0,
            // align border to the right of the cell
            right: 0,
            height: Spacing.xxxxSmall_2,
            boxShadow: `inset 0px -1px 0px ${Color.offBlack8}`,
        },
    },

    horizontalRuleInset: {
        ":after": {
            // Inset doesn't include the left padding of the cell.
            width: `calc(100% - ${CellMeasurements.cellPadding}px)`,
        },
    },
});
