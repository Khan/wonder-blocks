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
        color: {
            rest: {
                background: semanticColor.surface.primary,
                foreground: semanticColor.text.primary,
            },
            hover: {
                background: semanticColor.core.background.instructive.subtle,
            },
            press: {
                background: semanticColor.core.background.instructive.subtle,
                border: semanticColor.core.border.instructive.default,
            },
            selected: {
                background: semanticColor.core.background.instructive.subtle,
                foreground: semanticColor.core.foreground.instructive.default,
                border: semanticColor.core.border.instructive.default,
            },
            focus: {
                border: semanticColor.focus.outer,
            },
            disabled: {
                background: semanticColor.surface.primary,
                foreground: semanticColor.text.disabled,
                border: semanticColor.focus.outer,
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
        color: {
            default: {
                foreground: semanticColor.icon.primary,
            },
            selected: {
                foreground: semanticColor.icon.action,
            },
            disabled: {
                // Use secondary icon color for disabled state because opacity
                // is also applied to the accessory. Opacity is used so it is
                // applied to images also
                foreground: semanticColor.icon.secondary,
            },
        },
    },
    rule: {
        shadow: `inset 0px -1px 0px ${semanticColor.core.border.inverse.default}`,
    },
};
