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
            disabled: {
                foreground: semanticColor.core.foreground.disabled.strong,
            },
        },
    },
    contextLabel: {
        color: {
            error: {
                foreground: semanticColor.core.foreground.critical.default,
            },
        },
    },
    error: {
        font: {
            weight: font.weight.bold,
        },
        layout: {
            // This aligns the error message with the error icon
            marginBlockStart: sizing.size_010,
        },
    },
    helperText: {
        layout: {
            gap: sizing.size_040,
        },
        font: {
            size: font.body.size.xsmall,
            lineHeight: font.body.lineHeight.xsmall,
        },
        color: {
            default: {
                foreground: semanticColor.core.foreground.neutral.strong,
            },
            disabled: {
                foreground: semanticColor.core.foreground.disabled.strong,
            },
        },
    },
});
