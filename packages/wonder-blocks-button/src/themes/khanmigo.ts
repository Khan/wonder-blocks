import {mergeTheme, tokens} from "@khanacademy/wonder-blocks-theming";
import defaultTheme from "./default";

/**
 * The overrides for the Khanmigo theme.
 */
const theme = mergeTheme(defaultTheme, {
    color: {
        bg: {
            secondary: {
                default: tokens.color.offWhite,
                active: tokens.color.fadedBlue8,
                focus: tokens.color.offWhite,
            },
        },
        border: {
            secondary: {
                action: tokens.color.fadedBlue,
                critical: tokens.color.fadedRed,
            },
        },
    },
    border: {
        radius: {
            default: tokens.border.radius.xLarge_12,
            small: tokens.border.radius.large_6,
            large: tokens.border.radius.xLarge_12,
        },
        width: {
            focused: tokens.border.width.hairline,
        },
    },
});

export default theme;