import {font, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    root: {
        layout: {
            paddingBlockEnd: {
                labelWithDescription: sizing.size_040,
                labelWithNoDescription: sizing.size_120,
                description: sizing.size_120,
                errorSectionWithContent: sizing.size_120,
            },
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
        font: {
            size: font.body.size.small,
            lineHeight: font.body.lineHeight.small,
        },
        color: {
            foreground: semanticColor.core.foreground.neutral.default,
        },
    },
    error: {
        color: {
            foreground: semanticColor.core.foreground.critical.subtle,
        },
        font: {
            size: font.body.size.small,
            weight: font.weight.regular,
            lineHeight: font.body.lineHeight.small,
        },
        layout: {
            marginBlockStart: sizing.size_0,
        },
    },
    requiredIndicator: {
        color: {
            foreground: semanticColor.core.foreground.critical.subtle,
        },
    },
};

export default theme;
