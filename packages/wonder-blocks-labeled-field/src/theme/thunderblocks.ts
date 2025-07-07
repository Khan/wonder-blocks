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
                helperTextSectionWithContent: sizing.size_100,
            },
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
    description: {
        font: {
            size: font.body.size.xsmall,
            lineHeight: font.body.lineHeight.xsmall,
        },
        color: {
            foreground: semanticColor.core.foreground.neutral.strong,
            disabled: {
                foreground: semanticColor.core.foreground.disabled.strong,
            },
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
        layout: {
            // This aligns the error message with the error icon
            marginBlockStart: sizing.size_010,
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
        },
    },
});
