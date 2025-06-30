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
            paddingInlineStart: sizing.size_160,
            gap: sizing.size_120,
        },
    },
    icon: {
        color: {
            info: semanticColor.feedback.info.subtle.icon,
            success: semanticColor.feedback.success.subtle.icon,
            warning: semanticColor.feedback.warning.subtle.icon,
            critical: semanticColor.feedback.critical.subtle.icon,
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
    dismiss: {
        layout: {
            // Negative margin to offset the height of the dismiss button
            // We divide by 2 because the margin is split between the top and bottom
            // 6px is the difference between the banner content height (18px) and the
            // dismiss icon button (24px).
            marginBlock: `calc(${sizing.size_060} / 2 * -1)`,
        },
    },
});
