// @flow
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

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
        marginTop: Spacing.xxxSmall_4,
        color: Color.offBlack64,
    },

    error: {
        marginTop: Spacing.xxxSmall_4,
        color: Color.red,
    },

    defaultLineGap: {
        marginTop: Spacing.xSmall_8,
    },
});

export default styles;
