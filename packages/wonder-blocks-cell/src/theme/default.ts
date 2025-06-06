import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    root: {
        border: {
            width: {
                default: border.width.medium,
                selected: border.width.thick,
            },
            radius: border.radius.radius_040,
        },
        // NOTE: These colors will change in TB.
        color: {
            press: {
                border: semanticColor.core.border.instructive.default,
            },
            selected: {
                foreground: semanticColor.core.foreground.instructive.default,
                border: semanticColor.core.border.instructive.default,
            },
        },
        layout: {
            gap: sizing.size_160,
            padding: {
                block: {
                    default: sizing.size_120,
                    detail: sizing.size_160,
                },
                inline: {
                    default: sizing.size_160,
                    detail: sizing.size_160,
                },
            },
        },
        sizing: {
            minHeight: sizing.size_480,
        },
    },
    accessory: {
        // NOTE: These colors will change in TB.
        color: {
            default: {
                foreground: semanticColor.core.foreground.neutral.default,
            },
            selected: {
                foreground: semanticColor.core.foreground.instructive.subtle,
            },
            disabled: {
                // Using neutral.strong for disabled state because opacity is
                // also applied to the accessory. Opacity is used so it is
                // applied to images also.
                foreground: semanticColor.core.foreground.neutral.strong,
            },
        },
    },
    rule: {
        sizing: {
            height: sizing.size_020,
        },
        shadow: `inset 0px -1px 0px ${semanticColor.core.border.inverse.default}`,
    },
};
