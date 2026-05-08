import {StyleSheet} from "aphrodite";

import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";

import type {StyleDeclaration} from "aphrodite";
import theme from "../theme";

const styles: StyleDeclaration = StyleSheet.create({
    fieldset: {
        display: "flex",
        flexDirection: "column",
        border: "none",
        padding: 0,
        margin: 0,
    },

    legend: {
        padding: 0,
        // Let the legend use the size defined by the parent.
        // NOTE: This applies to `RadioGroup` and `CheckboxGroup`.
        width: "100%",
    },

    description: {
        marginBlockStart: spacing.xxxSmall_4,
        color: theme.description.color.foreground,
    },

    error: {
        marginBlockStart: spacing.xxxSmall_4,
        color: semanticColor.status.critical.foreground,
    },

    defaultLineGap: {
        marginBlockStart: spacing.xSmall_8,
    },
});

export default styles;
