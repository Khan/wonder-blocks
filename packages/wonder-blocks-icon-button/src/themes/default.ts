import {tokens} from "@khanacademy/wonder-blocks-theming";

const theme = {
    color: {
        // Shared colors for icon and borders
        stroke: {
            /**
             * Default
             */
            disabled: tokens.color.offBlack32,
            disabledInverse: tokens.color.white50,
            // focus, hover
            inverse: tokens.color.white,

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
    },
    border: {
        width: {
            default: tokens.border.width.thin,
        },
        radius: {
            default: tokens.border.radius.medium_4,
        },
    },
};

export default theme;
