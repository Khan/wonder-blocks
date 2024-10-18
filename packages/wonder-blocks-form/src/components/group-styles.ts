import {StyleSheet} from "aphrodite";

import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

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
    },

    description: {
        marginTop: spacing.xxxSmall_4,
        color: color.offBlack64,
    },

    error: {
        marginTop: spacing.xxxSmall_4,
        color: color.red,
    },

    defaultLineGap: {
        marginTop: spacing.xSmall_8,
    },
});

export default styles;
