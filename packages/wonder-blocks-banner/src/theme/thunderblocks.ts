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
            radius: border.radius.radius_080,
            width: {
                inlineStart: border.width.thin,
                inlineEnd: border.width.thin,
                blockStart: border.width.thin,
                blockEnd: border.width.thin,
            },
        },
        color: {
            border: {
                info: semanticColor.feedback.info.subtle.border,
                success: semanticColor.feedback.success.subtle.border,
                warning: semanticColor.feedback.warning.subtle.border,
                critical: semanticColor.feedback.critical.subtle.border,
            },
        },
        layout: {
            paddingInline: sizing.size_160,
        },
    },
    icon: {
        color: {
            info: semanticColor.feedback.info.subtle.icon,
            success: semanticColor.feedback.success.subtle.icon,
            warning: semanticColor.feedback.warning.subtle.icon,
            critical: semanticColor.feedback.critical.subtle.icon,
        },
        layout: {
            marginInlineEnd: sizing.size_040,
        },
        sizing: {
            height: sizing.size_180,
            width: sizing.size_180,
        },
    },
    button: {
        layout: {
            // Set the margin to negative to offset the padding of the button
            marginInline: `calc(${sizing.size_080} * -1)`,
        },
    },
    link: {
        font: {
            decoration: "underline",
            underlineOffset: "25%",
        },
    },
    label: {
        font: {
            size: font.body.size.medium,
        },
    },
});
