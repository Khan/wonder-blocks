import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

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
            default: `0 ${sizing.size_080} ${sizing.size_080} 0 ${semanticColor.core.shadow.transparent}`,
        },
    },
    combobox: {
        border: {
            radius: {
                rest: border.radius.radius_040,
                press: border.radius.radius_040,
            },
        },
        color: {
            icon: semanticColor.core.foreground.neutral.default,
        },
        layout: {
            padding: {
                inline: sizing.size_160,
            },
        },
    },
};
