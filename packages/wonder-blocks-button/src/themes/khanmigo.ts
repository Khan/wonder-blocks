import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {
    border,
    color,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

const secondaryBgColor = color.offWhite;

/**
 * The overrides for the Khanmigo theme.
 */
const theme = mergeTheme(defaultTheme, {
    root: {
        color: {
            secondary: {
                progressive: {
                    default: {
                        border: color.fadedBlue,
                        background: secondaryBgColor,
                    },
                    hover: {
                        background: secondaryBgColor,
                        foreground:
                            semanticColor.action.secondary.progressive.default
                                .foreground,
                    },
                    press: {
                        background: color.fadedBlue8,
                    },
                },
                destructive: {
                    default: {
                        border: color.fadedRed,
                        background: secondaryBgColor,
                    },
                    hover: {
                        background: secondaryBgColor,
                        foreground:
                            semanticColor.action.secondary.destructive.default
                                .foreground,
                    },
                    press: {
                        background: color.fadedRed8,
                    },
                },
            },
        },

        border: {
            radius: {
                medium: border.radius.radius_120,
                small: border.radius.radius_080,
                large: border.radius.radius_120,
            },
        },
        font: {
            weight: {
                default: font.weight.medium,
            },
        },
    },

    icon: {
        color: {
            secondary: {
                progressive: {
                    hover: {
                        background: color.fadedBlue16,
                        foreground:
                            semanticColor.action.secondary.progressive.default
                                .foreground,
                    },
                },
                destructive: {
                    hover: {
                        background: color.fadedRed16,
                        foreground:
                            semanticColor.action.secondary.destructive.default
                                .foreground,
                    },
                },
            },
        },
        border: {
            radius: border.radius.radius_full,
        },
        margin: {
            inline: {
                // Bring the icons closer to the edges of the button.
                outer: `calc(-1 * ${sizing.size_080})`,
            },
        },
        padding: sizing.size_020,
    },
});

export default theme;
