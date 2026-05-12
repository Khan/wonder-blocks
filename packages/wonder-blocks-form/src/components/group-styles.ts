import {StyleSheet} from "aphrodite";

import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

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
        color: theme.description.color.foreground,
        marginBlockStart: sizing.size_040,
    },

    error: {
        color: semanticColor.status.critical.foreground,
        marginBlockStart: sizing.size_040,
    },

    firstChoiceMetaSpacing: {
        marginBlockStart: sizing.size_120,
    },

    choiceLineGap: {
        marginBlockStart: sizing.size_080,
    },
});

export default styles;
