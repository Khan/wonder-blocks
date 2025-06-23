import {font, semanticColor} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    label: {
        color: {
            error: {
                foreground: semanticColor.core.foreground.neutral.strong,
            },
        },
    },
    errorIcon: {
        layout: {
            display: "block",
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
    },
    requiredIndicator: {
        color: {
            foreground: semanticColor.core.foreground.critical.subtle,
        },
    },
};

export default theme;
