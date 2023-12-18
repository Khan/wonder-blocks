import {tokens} from "@khanacademy/wonder-blocks-theming";

const theme = {
    color: {
        bg: {
            inverse: tokens.color.darkBlue,
        },
        text: {
            inverse: tokens.color.white,
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
    },
};

export default theme;
