import {tokens} from "@khanacademy/wonder-blocks-theming";

const theme = {
    color: {
        text: {
            /**
             * Default
             */
            disabled: tokens.color.offBlack32,
            focusInverse: tokens.color.white,

            /**
             * Color
             */
            // color="default"
            action: {
                default: tokens.color.blue,
                active: tokens.color.activeBlue,
                inverse: tokens.color.fadedBlue,
            },
            // color="destructive"
            critical: {
                default: tokens.color.red,
                active: tokens.color.activeRed,
                inverse: tokens.color.fadedRed,
            },

            /**
             * Kind
             */
            primary: {
                inverse: tokens.color.white,
            },
            secondary: {
                default: tokens.color.offBlack,
            },
            tertiary: {
                default: tokens.color.offBlack64,
            },
        },
        border: {
            /**
             * Default
             */
            focusInverse: tokens.color.white,
        },
    },
    border: {
        width: {
            active: tokens.border.width.thin,
            focused: tokens.border.width.thin,
        },
        radius: {
            active: tokens.border.radius.medium_4,
            focused: tokens.border.radius.medium_4,
        },
    },
};

export default theme;
