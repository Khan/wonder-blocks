import * as tokens from "@khanacademy/wonder-blocks-tokens";

const theme = {
    color: {
        bg: {
            inverse: tokens.color.darkBlue,
        },
        text: {
            inverse: tokens.color.white,
            secondary: tokens.color.offBlack64,
        },
        shadow: {
            default: tokens.color.offBlack16,
        },
    },
    border: {
        radius: tokens.border.radius.medium_4,
    },
    spacing: {
        dialog: {
            small: tokens.spacing.medium_16,
        },
        panel: {
            closeButton: tokens.spacing.medium_16,
            footer: tokens.spacing.xLarge_32,
        },
        header: {
            xsmall: tokens.spacing.xSmall_8,
            small: tokens.spacing.medium_16,
            medium: tokens.spacing.large_24,
            large: tokens.spacing.xLarge_32,
        },
    },
};

export default theme;
