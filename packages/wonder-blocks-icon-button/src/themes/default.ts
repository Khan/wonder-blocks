import {tokens} from "@khanacademy/wonder-blocks-theming";

const theme = {
    color: {
        bg: {
            /**
             * Default
             */
            hovered: "transparent",
            active: "transparent",
            disabled: "transparent",
            /**
             * Kind
             */
            // Filled icon buttons (secondary, tertiary)
            // NOTE: Transparent in the default theme, but we want to use the
            // filled colors for Khanmigo.
            filled: {
                action: {
                    hovered: "transparent",
                    active: "transparent",
                },
                critical: {
                    hovered: "transparent",
                    active: "transparent",
                },
            },
        },
        // Shared colors for icon and borders
        stroke: {
            /**
             * Default
             */
            disabled: {
                default: tokens.color.offBlack32,
                inverse: tokens.color.white50,
            },
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
                // primary + action
                action: {
                    hovered: tokens.color.blue,
                    active: tokens.color.activeBlue,
                },
                // primary + critical
                critical: {
                    hovered: tokens.color.red,
                    active: tokens.color.activeRed,
                },
                // on dark background
                inverse: {
                    default: tokens.color.white,
                    hovered: tokens.color.white,
                },
            },
            secondary: {
                default: tokens.color.offBlack,
            },
            tertiary: {
                default: tokens.color.offBlack64,
            },
            // Filled icon buttons (secondary, tertiary)
            filled: {
                // filled + action
                action: {
                    hovered: tokens.color.blue,
                    active: tokens.color.activeBlue,
                },
                // filled + critical
                critical: {
                    hovered: tokens.color.red,
                    active: tokens.color.activeRed,
                },
            },
        },
    },
    border: {
        width: {
            default: tokens.border.width.thin,
            active: tokens.border.width.none,
            hovered: tokens.border.width.thin,
            hoveredInverse: tokens.border.width.thin,
        },
        radius: {
            default: tokens.border.radius.medium_4,
        },
    },
};

export default theme;
