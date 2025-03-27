import {
    border,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    /**
     * Shared tokens
     */
    root: {
        // TODO(WB-1852): Remove light variant.
        color: {
            inverse: {
                background: semanticColor.surface.inverse,
                foreground: semanticColor.text.inverse,
            },
        },
        border: {
            radius: border.radius.medium_4,
            width: border.width.thin,
        },
    },
    /**
     * Building blocks
     */
    backdrop: {
        color: {
            background: semanticColor.surface.overlay,
        },
    },
    dialog: {
        spacing: {
            padding: spacing.medium_16,
        },
    },
    footer: {
        color: {
            border: semanticColor.border.primary,
        },
    },
    header: {
        color: {
            border: semanticColor.border.primary,
            secondary: semanticColor.text.secondary,
        },
        spacing: {
            paddingBlockMd: spacing.large_24,
            paddingInlineMd: spacing.xLarge_32,
            paddingInlineSm: spacing.medium_16,
            gap: spacing.xSmall_8,
            // The space between the title and dismiss button.
            titleGapMd: spacing.medium_16,
            titleGapSm: spacing.xLarge_32,
        },
    },
    panel: {
        color: {
            border: semanticColor.focus.outer,
        },
        spacing: {
            gap: spacing.xLarge_32,
        },
    },
    closeButton: {
        spacing: {
            gap: spacing.xSmall_8,
        },
    },
};

export default theme;
