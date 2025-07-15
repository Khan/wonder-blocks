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
    description: {
        color: {
            foreground: semanticColor.core.foreground.neutral.default,
            disabled: {
                foreground: semanticColor.core.foreground.neutral.default,
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
    requiredIndicator: {
        color: {
            foreground: semanticColor.core.foreground.critical.subtle,
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
            disabled: {
                foreground: semanticColor.core.foreground.neutral.strong,
            },
        },
    },
};

export default theme;
