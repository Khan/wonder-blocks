import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

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
    },
    requiredIndicator: {
        color: {
            foreground: semanticColor.core.foreground.critical.subtle,
        },
    },
};

export default theme;
