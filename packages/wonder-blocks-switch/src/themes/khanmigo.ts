import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

/**
 * The overrides for khanmigo theme for a switch.
 *
 * NOTE: Leaving `color` tokens as is for now, as this theme is not currently
 * used in webapp. Also, this most likely change once we migrate to the new
 * theme.
 */
const theme = mergeTheme(defaultTheme, {
    color: {
        bg: {
            switch: {
                off: tokens.color.white50,
                disabledOff: tokens.color.white32,
                activeOff: tokens.color.white64,
                disabledOn: tokens.color.white32,
                on: tokens.color.white,
                activeOn: tokens.color.offWhite,
            },
            slider: {
                off: tokens.color.eggplant,
                on: tokens.color.eggplant,
            },
            icon: {
                on: tokens.color.white,
                off: tokens.color.white,
                disabledOff: tokens.color.white50,
                disabledOn: tokens.color.white50,
            },
        },
        outline: {
            default: tokens.color.white,
        },
    },
});

export default theme;
