import {
    border,
    boxShadow,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

export default {
    listbox: {
        border: {
            radius: border.radius.radius_040,
        },
        layout: {
            padding: {
                inline: sizing.size_0,
                block: sizing.size_040,
            },
        },
        shadow: {
            default: boxShadow.mid,
        },
    },
    opener: {
        border: {
            width: {
                error: border.width.thin,
            },
            radius: {
                rest: border.radius.radius_040,
            },
        },
        color: {
            icon: semanticColor.core.foreground.neutral.default,
        },
        layout: {
            padding: {
                // used by combobox
                inline: sizing.size_160,
                // used by select-opener
                inlineStart: sizing.size_160,
                inlineEnd: sizing.size_120,
            },
        },
    },
    item: {
        border: {
            radius: {
                default: border.radius.radius_040,
                press: border.radius.radius_040,
            },
        },
        layout: {
            padding: {
                block: sizing.size_100,
                inlineStart: sizing.size_080,
                inlineEnd: sizing.size_160,
            },
        },
        font: {
            weight: font.weight.regular,
        },
    },
};
