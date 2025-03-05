import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

/**
 * The overrides for the Khanmigo theme.
 */
const theme = mergeTheme(defaultTheme, {
    root: {
        color: {
            inverse: {
                background: semanticColor.khanmigo.primary,
            },
        },
    },
});

export default theme;
