import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

import type {StyleDeclaration} from "aphrodite";

const styles: StyleDeclaration = StyleSheet.create({
    fieldset: {
        border: "none",
        padding: 0,
        margin: 0,
    },

    legend: {
        padding: 0,
    },

    description: {
        marginTop: spacing.xxxSmall_4,
        color: Color.offBlack64,
    },

    error: {
        marginTop: spacing.xxxSmall_4,
        color: Color.red,
    },

    defaultLineGap: {
        marginTop: spacing.xSmall_8,
    },
});

export default styles;
