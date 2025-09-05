import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import {
    border,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    listbox: {
        border: {
            radius: border.radius.radius_080,
        },
        layout: {
            padding: {
                inline: sizing.size_080,
                block: sizing.size_080,
            },
        },
        shadow: {
            default: `0 ${sizing.size_020} ${sizing.size_020} 0 ${semanticColor.core.shadow.transparent.low}`,
        },
    },
    opener: {
        border: {
            width: {
                error: border.width.medium,
            },
            radius: {
                rest: border.radius.radius_080,
            },
        },
        color: {
            icon: semanticColor.core.foreground.instructive.default,
        },
        layout: {
            padding: {
                // used by combobox
                inline: sizing.size_120,
                // used by select-opener
                inlineStart: sizing.size_120,
                inlineEnd: sizing.size_120,
            },
        },
    },
    item: {
        border: {
            radius: {
                default: border.radius.radius_080,
                press: border.radius.radius_120,
            },
        },
        layout: {
            padding: {
                block: sizing.size_120,
                inlineStart: sizing.size_120,
                inlineEnd: sizing.size_120,
            },
        },
        font: {
            weight: font.weight.semi,
        },
    },
});
