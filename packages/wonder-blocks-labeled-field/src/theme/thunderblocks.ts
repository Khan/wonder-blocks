import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {font, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        layout: {
            paddingBlockEnd: {
                labelWithDescription: sizing.size_100,
                labelWithNoDescription: sizing.size_100,
                description: sizing.size_100,
                errorSectionWithContent: sizing.size_100,
            },
        },
    },
    label: {
        color: {
            error: {
                foreground: semanticColor.core.foreground.critical.default,
            },
        },
    },
    description: {
        font: {
            size: font.body.size.xsmall,
            lineHeight: font.body.lineHeight.xsmall,
        },
        color: {
            foreground: semanticColor.core.foreground.neutral.strong,
        },
    },
    errorIcon: {
        layout: {
            // Error icon is hidden in TB because it is shown in the field instead
            display: "none",
        },
    },
    error: {
        color: {
            foreground: semanticColor.core.foreground.critical.default,
        },
        font: {
            size: font.body.size.xsmall,
            weight: font.weight.bold,
            lineHeight: font.body.lineHeight.xsmall,
        },
    },
    requiredIndicator: {
        color: {
            foreground: semanticColor.core.foreground.critical.default,
        },
    },
});
