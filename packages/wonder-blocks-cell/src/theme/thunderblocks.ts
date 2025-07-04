import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {
    border,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    root: {
        border: {
            radius: {
                default: border.radius.radius_080,
                focus: border.radius.radius_080,
                press: border.radius.radius_120,
                focusPress: border.radius.radius_120,
            },
        },
        color: {
            press: {
                border: semanticColor.core.transparent,
            },
            selected: {
                foreground: semanticColor.core.foreground.neutral.strong,
                border: semanticColor.core.transparent,
            },
        },
        layout: {
            gap: {
                default: sizing.size_120,
                detail: sizing.size_040,
            },
            padding: {
                block: {
                    default: sizing.size_120,
                    detail: sizing.size_120,
                },
                inline: {
                    default: sizing.size_120,
                    detail: sizing.size_120,
                },
            },
        },
        sizing: {
            minHeight: sizing.size_440,
        },
    },
    accessoryLeft: {
        color: {
            default: {
                foreground: semanticColor.core.foreground.neutral.subtle,
            },
        },
    },
    accessoryRight: {
        color: {
            default: {
                foreground: semanticColor.core.foreground.neutral.subtle,
            },
            selected: {
                foreground: semanticColor.core.foreground.instructive.default,
            },
        },
    },
    // Hide the horizontal rule in Thunderblocks.
    rule: {
        sizing: {
            height: sizing.size_0,
        },
        shadow: "none",
    },
    title: {
        font: {
            // NOTE: This is to match designs.
            lineHeight: font.heading.lineHeight.small,
        },
    },
    subtitle: {
        color: {
            foreground: semanticColor.core.foreground.neutral.subtle,
        },
        font: {
            size: font.body.size.xsmall,
            lineHeight: font.body.lineHeight.xsmall,
        },
    },
});
