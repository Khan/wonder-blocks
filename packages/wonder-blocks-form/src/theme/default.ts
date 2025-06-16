import {
    border,
    color,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

const {core, surface} = semanticColor;

export default {
    inputWrapper: {
        padding: sizing.size_0,
        margin: sizing.size_0,
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
            background: color.offWhite,
            foreground: core.foreground.neutral.default,
        },
        disabledChecked: {
            border: core.border.disabled.default,
            background: color.offWhite,
            foreground: core.border.neutral.subtle,
        },
        // hover: {
        //     border: core.border.instructive.default,
        //     background: surface.primary,
        //     foreground: core.foreground.inverse.strong,
        // },
        // press: {
        //     border: core.border.instructive.strong,
        //     background: core.background.instructive.strong,
        //     foreground: core.foreground.inverse.strong,
        // },
    },
    checkbox: {
        border: {
            radius: {
                default: "3px",
            },
            width: {
                default: border.width.thin,
            },
        },
    },
    radio: {
        border: {
            radius: {
                default: border.radius.radius_full,
            },
            width: {
                default: border.width.thin,
            },
        },
    },
    icon: {
        default: {
            foreground: color.offWhite,
        },
        disabled: {
            foreground: core.foreground.disabled.default,
        },
    },
};
