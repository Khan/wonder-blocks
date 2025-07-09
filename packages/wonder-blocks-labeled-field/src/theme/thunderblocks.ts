import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {font, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        layout: {
            paddingBlockEnd: {
                labelWithDescription: sizing.size_040,
                labelWithNoDescription: sizing.size_080,
            },
            spacingBetweenHelperText: sizing.size_080,
        },
    },
    label: {
        color: {
            error: {
                foreground: semanticColor.core.foreground.critical.default,
            },
        },
    },
    error: {
        color: {
            foreground: semanticColor.core.foreground.critical.default,
        },
        font: {
            weight: font.weight.bold,
        },
    },
    requiredIndicator: {
        color: {
            foreground: semanticColor.core.foreground.critical.default,
        },
    },
    helperText: {
        layout: {
            gap: sizing.size_040,
            // This aligns the error message with the error icon
            marginBlockStart: sizing.size_010,
        },
        font: {
            size: font.body.size.xsmall,
            lineHeight: font.body.lineHeight.xsmall,
        },
        color: {
            foreground: semanticColor.core.foreground.neutral.strong,
        },
    },
});
