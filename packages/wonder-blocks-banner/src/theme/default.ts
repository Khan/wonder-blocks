import {
    border,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    root: {
        border: {
            radius: border.radius.radius_040,
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
        layout: {
            // Classic has smaller inline start padding because it has a inline start border
            paddingInlineStart: sizing.size_080,
            gap: sizing.size_160,
        },
    },
    icon: {
        color: {
            info: semanticColor.core.foreground.neutral.default,
            success: semanticColor.core.foreground.neutral.default,
            warning: semanticColor.core.foreground.neutral.default,
            critical: semanticColor.core.foreground.neutral.default,
        },
        sizing: {
            height: sizing.size_240,
            width: sizing.size_240,
        },
    },
    button: {
        layout: {
            marginInline: sizing.size_0,
        },
    },
    link: {
        font: {
            decoration: "none",
            underlineOffset: "0%",
        },
    },
    label: {
        font: {
            size: font.body.size.small,
        },
    },
    dismiss: {
        layout: {
            marginBlock: sizing.size_0,
        },
    },
};

export default theme;
