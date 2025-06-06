import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    root: {
        border: {
            radius: {
                default: border.radius.radius_0,
                floating: border.radius.radius_040,
            },
            width: {
                inlineStart: sizing.size_060, // uses rem so the border indicator scales to font size
                inlineEnd: border.width.none,
                blockStart: border.width.none,
                blockEnd: border.width.none,
            },
        },
        color: {
            border: {
                info: semanticColor.core.border.instructive.default,
                success: semanticColor.core.border.success.default,
                warning: semanticColor.core.border.warning.default,
                critical: semanticColor.core.border.critical.default,
            },
        },
    },
    icon: {
        color: {
            info: semanticColor.icon.primary,
            success: semanticColor.icon.primary,
            warning: semanticColor.icon.primary,
            critical: semanticColor.icon.primary,
        },
    },
};

export default theme;
