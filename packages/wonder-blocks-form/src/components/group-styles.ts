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
        marginTop: sizing.size_040,
        color: theme.description.color.foreground,
    },

    error: {
        marginTop: sizing.size_040,
        color: semanticColor.status.critical.foreground,
    },

    defaultLineGap: {
        marginTop: sizing.size_080,
    },

    firstChoiceMetaSpacing: {
        marginTop: sizing.size_120,
    },
});

export default styles;
