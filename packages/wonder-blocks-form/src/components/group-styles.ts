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
        gap: sizing.size_040,
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

    // Lifts the first choice 8px below the last meta element. Combined with
    // the 4px fieldset gap, this restores the original 12px Strut spacing
    // between the meta block and the first choice.
    firstChoiceMetaSpacing: {
        marginBlockStart: sizing.size_080,
    },

    // Tops up the 4px fieldset gap to the original 8px between choices.
    choiceLineGap: {
        marginBlockStart: sizing.size_040,
    },
});

export default styles;
