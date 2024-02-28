import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {color} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

/**
 * The overrides for the Khanmigo theme.
 */
const theme = mergeTheme(defaultTheme, {
    color: {
        bg: {
            inverse: color.eggplant,
        },
    },
});

export default theme;
