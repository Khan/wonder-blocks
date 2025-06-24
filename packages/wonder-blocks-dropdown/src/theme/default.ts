import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    selectOpener: {
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
                inlineStart: sizing.size_160,
                inlineEnd: sizing.size_120,
            },
        },
    },
};
