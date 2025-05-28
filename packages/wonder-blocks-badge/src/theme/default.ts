import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    badge: {
        root: {
            color: {
                background: semanticColor.surface.secondary,
                foreground: semanticColor.text.primary,
                border: semanticColor.border.subtle,
            },
            border: {
                width: border.width.thin,
                style: "solid",
                radius: border.radius.radius_080,
            },
            layout: {
                default: {
                    paddingBlock: sizing.size_040,
                    paddingInline: sizing.size_080,
                    gap: sizing.size_040,
                },
                iconOnly: {
                    padding: sizing.size_040,
                },
            },
        },
        icon: {
            sizing: {
                width: sizing.size_160,
                height: sizing.size_160,
            },
            color: {
                foreground: semanticColor.icon.primary,
            },
        },
    },
};
