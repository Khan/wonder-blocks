import {StyleSheet} from "aphrodite";

import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {HorizontalRuleVariant} from "../../util/types";

export const CellMeasurements = {
    cellMinHeight: spacing.xxLarge_48,

    /**
     * The cell wrapper's gap.
     */
    cellPadding: {
        paddingVertical: spacing.small_12,
        paddingHorizontal: spacing.medium_16,
    },

    /**
     * The DetailCell wrapper's gap.
     */
    detailCellPadding: {
        paddingVertical: spacing.medium_16,
        paddingHorizontal: spacing.medium_16,
    },

    /**
     * The horizontal spacing between the left and right accessory.
     */
    accessoryHorizontalSpacing: spacing.medium_16,
} as const;

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
            height: spacing.xxxxSmall_2,
            boxShadow: `inset 0px -1px 0px ${color.offBlack8}`,
        },
    },

    horizontalRuleInset: {
        ":after": {
            // Inset doesn't include the left padding of the cell.
            width: `calc(100% - ${CellMeasurements.cellPadding.paddingHorizontal}px)`,
        },
    },
});
