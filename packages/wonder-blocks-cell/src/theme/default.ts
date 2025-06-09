import {
    border,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

export default {
    root: {
        border: {
            width: {
                default: border.width.medium,
                selected: border.width.thick,
            },
            radius: {
                default: border.radius.radius_0,
                focus: border.radius.radius_040,
                press: border.radius.radius_0,
            },
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
            gap: {
                default: sizing.size_160,
                detail: sizing.size_020,
            },
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
    title: {
        font: {
            lineHeight: font.body.lineHeight.medium,
        },
    },
    subtitle: {
        color: {
            foreground: semanticColor.core.foreground.neutral.default,
        },
        font: {
            size: font.body.size.small,
            lineHeight: font.body.lineHeight.small,
        },
    },
};
