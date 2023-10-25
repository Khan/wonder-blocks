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
                active: {
                    action: tokens.color.fadedBlue8,
                    critical: tokens.color.fadedRed8,
                },
                focus: tokens.color.offWhite,
            },
            icon: {
                primary: tokens.color.white,
                secondary: tokens.color.fadedBlue16,
                secondaryHover: tokens.color.blue,
            },
        },
        border: {
            secondary: {
                action: tokens.color.fadedBlue,
                critical: tokens.color.fadedRed,
            },
        },
        text: {
            icon: {
                primary: tokens.color.blue,
                secondary: tokens.color.blue,
                secondaryHover: tokens.color.white,
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
    font: {
        weight: {
            default: tokens.font.weight.regular,
        },
    },
});

export default theme;
