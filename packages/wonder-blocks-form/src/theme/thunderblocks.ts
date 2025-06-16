import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

const {core, surface} = semanticColor;

export default {
    inputWrapper: {
        padding: sizing.size_040,
        margin: `calc(${sizing.size_040} * -1)`,
    },
    choice: {
        default: {
            border: core.border.neutral.default,
            background: surface.primary,
            foreground: core.foreground.neutral.strong,
        },
        error: {
            border: core.border.critical.default,
            background: core.background.critical.subtle,
            foreground: core.foreground.neutral.strong,
        },
        checked: {
            border: core.border.instructive.default,
            background: core.background.instructive.default,
            foreground: core.foreground.inverse.strong,
        },
        disabled: {
            border: core.border.disabled.default,
            foreground: core.foreground.neutral.default,
        },
        disabledChecked: {
            border: core.border.disabled.default,
            background: core.border.disabled.default,
            foreground: core.border.neutral.subtle,
        },
    },
    checkbox: {
        border: {
            radius: {
                default: border.radius.radius_040,
            },
        },
    },
    icon: {
        default: {
            foreground: core.foreground.inverse.strong,
        },
        disabled: {
            foreground: core.border.neutral.subtle,
        },
    },
};
