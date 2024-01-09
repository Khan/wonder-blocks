import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

/**
 * The overrides for the Khanmigo theme.
 */
const theme = mergeTheme(defaultTheme, {
    color: {
        bg: {
            hovered: tokens.color.white,
            active: tokens.color.white64,
            // Filled icon buttons (secondary, tertiary)
            filled: {
                action: {
                    hovered: tokens.color.blue,
                    active: tokens.color.activeBlue,
                },
                critical: {
                    hovered: tokens.color.red,
                    active: tokens.color.activeRed,
                },
            },
        },
        stroke: {
            /**
             * Color
             */
            action: {
                inverse: tokens.color.eggplant,
            },
            critical: {
                inverse: tokens.color.eggplant,
            },
            /**
             * Kind
             */
            primary: {
                // primary + action
                action: {
                    hovered: tokens.color.eggplant,
                    active: tokens.color.eggplant,
                },
                // primary + critical
                critical: {
                    hovered: tokens.color.eggplant,
                    active: tokens.color.eggplant,
                },
                // on dark background
                inverse: {
                    hovered: tokens.color.eggplant,
                },
            },
            // Filled icon buttons (secondary, tertiary)
            filled: {
                // filled + action
                action: {
                    hovered: tokens.color.white,
                    active: tokens.color.white,
                },
                // filled + critical
                critical: {
                    hovered: tokens.color.white,
                    active: tokens.color.white,
                },
            },
        },
    },
    border: {
        width: {
            hovered: tokens.border.width.none,
            hoveredInverse: tokens.border.width.none,
        },
    },
});

export default theme;
