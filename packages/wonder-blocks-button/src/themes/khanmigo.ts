import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import * as tokens from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

const secondaryBgColor = tokens.color.offWhite;

/**
 * The overrides for the Khanmigo theme.
 */
const theme = mergeTheme(defaultTheme, {
    color: {
        secondary: {
            progressive: {
                default: {
                    border: tokens.color.fadedBlue,
                    background: secondaryBgColor,
                },
                hover: {
                    background: secondaryBgColor,
                    icon: tokens.color.fadedBlue16,
                    foreground:
                        tokens.semanticColor.action.secondary.progressive
                            .default.foreground,
                },
                press: {
                    background: tokens.color.fadedBlue8,
                },
            },
            destructive: {
                default: {
                    border: tokens.color.fadedRed,
                    background: secondaryBgColor,
                },
                hover: {
                    background: secondaryBgColor,
                    icon: tokens.color.fadedRed16,
                    foreground:
                        tokens.semanticColor.action.secondary.destructive
                            .default.foreground,
                },
                press: {
                    background: tokens.color.fadedRed8,
                },
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
    margin: {
        icon: {
            // Bring the icons closer to the edges of the button.
            offset: -tokens.spacing.xSmall_8,
        },
    },
    font: {
        weight: {
            default: tokens.font.weight.regular,
        },
    },
});

export default theme;
