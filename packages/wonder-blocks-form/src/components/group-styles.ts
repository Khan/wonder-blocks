import {StyleSheet} from "aphrodite";

import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";

import type {StyleDeclaration} from "aphrodite";

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
        marginTop: spacing.xxxSmall_4,
        color: semanticColor.text.secondary,
    },

    error: {
        marginTop: spacing.xxxSmall_4,
        color: semanticColor.status.critical.foreground,
    },

    defaultLineGap: {
        marginTop: spacing.xSmall_8,
    },
});

export default styles;
