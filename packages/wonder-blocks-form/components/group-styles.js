// @flow
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

const styles = StyleSheet.create({
    fieldset: {
        border: "none",
        padding: 0,
        margin: 0,
    },

    legend: {
        padding: 0,
    },

    description: {
        marginTop: Spacing.xxxSmall,
        color: Color.offBlack64,
    },

    error: {
        marginTop: Spacing.xxxSmall,
        color: Color.red,
    },

    defaultLineGap: {
        marginTop: 8,
    },
});

export default styles;
