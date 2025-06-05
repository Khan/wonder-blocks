import {StyleSheet} from "aphrodite";

import {sizing} from "@khanacademy/wonder-blocks-tokens";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {HorizontalRuleVariant} from "../../util/types";
import theme from "../../theme";

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
            height: sizing.size_020,
            boxShadow: theme.rule.shadow,
        },
    },

    horizontalRuleInset: {
        ":after": {
            // Inset doesn't include the left padding of the cell.
            width: `calc(100% - ${theme.root.layout.padding.inline})`,
        },
    },
});
