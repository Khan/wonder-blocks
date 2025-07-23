import {font, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    root: {
        layout: {
            paddingBlockEnd: {
                labelWithDescription: sizing.size_040,
                labelWithNoDescription: sizing.size_120,
            },
            spacingBetweenHelperText: sizing.size_120,
        },
    },
    label: {
        color: {
            error: {
                foreground: semanticColor.core.foreground.neutral.strong,
            },
            disabled: {
                foreground: semanticColor.core.foreground.neutral.strong,
            },
        },
    },
    error: {
        color: {
            foreground: semanticColor.core.foreground.critical.subtle,
        },
        font: {
            weight: font.weight.regular,
        },
    },
    helperText: {
        layout: {
            gap: sizing.size_080,
            marginBlockStart: sizing.size_0,
        },
        font: {
            size: font.body.size.small,
            lineHeight: font.body.lineHeight.small,
        },
        color: {
            default: {
                foreground: semanticColor.core.foreground.neutral.default,
            },
            disabled: {
                foreground: semanticColor.core.foreground.neutral.default,
            },
        },
    },
};

export default theme;
