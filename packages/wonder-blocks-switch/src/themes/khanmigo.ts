import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

/**
 * The overrides for khanmigo theme for a switch.
 */
const theme = mergeTheme(defaultTheme, {
    color: {
        bg: {
            switch: {
                off: tokens.color.white50,
                disabledOff: tokens.color.white32,
                activeOff: tokens.color.white50,
                disabledOn: tokens.color.activeBlue,
            },
            slider: {
                off: tokens.color.eggplant,
            },
            icon: {
                off: tokens.color.white,
                disabledOff: tokens.color.white50,
                disabledOn: tokens.color.activeBlue,
            },
        },
    },
});

export default theme;
