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
            gap: sizing.size_120,
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
    accessory: {
        color: {
            default: {
                foreground: semanticColor.core.foreground.neutral.default,
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
});
