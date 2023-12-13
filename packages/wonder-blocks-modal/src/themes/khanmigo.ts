import {mergeTheme, tokens} from "@khanacademy/wonder-blocks-theming";
import defaultTheme from "./default";

/**
 * The overrides for the Khanmigo theme.
 */
const theme = mergeTheme(defaultTheme, {
    color: {
        bg: {
            inverse: tokens.color.eggplant,
        },
    },
});

export default theme;
