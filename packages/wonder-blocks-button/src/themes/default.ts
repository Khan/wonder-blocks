import {
    border,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

// The underline-offset is the distance between the text baseline and the
// bottom of the underline. This is necessary to prevent the underline from
// breaking with descenders.
const textUnderlineOffset = sizing.size_040;

const theme = {
    root: {
        color: semanticColor.action,
        border: {
            width: {
                primary: {
                    default: border.width.none,
                    hover: border.width.medium,
                    press: border.width.medium,
                },
                secondary: {
                    default: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.thin,
                },
                tertiary: {
                    default: border.width.none,
                    hover: border.width.medium,
                    press: border.width.medium,
                },
            },
            offset: {
                primary: border.width.medium,
                // Only primary buttons have an offset.
                secondary: 0,
                tertiary: 0,
            },
            radius: {
                small: border.radius.radius_040,
                medium: border.radius.radius_040, // default
                large: border.radius.radius_040,
            },
        },
        sizing: {
            height: {
                small: sizing.size_320,
                medium: sizing.size_400,
                large: sizing.size_560,
            },
            underline: {
                hover: sizing.size_020,
                press: sizing.size_010,
            },
        },
        padding: {
            medium: sizing.size_160,
            large: sizing.size_320,
        },
        font: {
            size: {
                // NOTE: This token is specific to this button size.
                large: "1.8rem",
            },
            lineHeight: {
                small: font.lineHeight.xMedium,
                default: font.lineHeight.large,
                // NOTE: this token is specific to this button size.
                large: "2.6rem",
            },
            weight: {
                default: font.weight.bold,
            },
            offset: {
                default: textUnderlineOffset,
            },
        },
    },

    icon: {
        color: {
            secondary: {
                progressive: {
                    hover: {
                        background: "transparent",
                        foreground:
                            semanticColor.action.secondary.progressive.hover
                                .foreground,
                    },
                },
                destructive: {
                    hover: {
                        background: "transparent",
                        foreground:
                            semanticColor.action.secondary.destructive.hover
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
                inner: sizing.size_060,
                outer: `calc(-1 * ${border.width.medium})`,
            },
        },
        padding: sizing.size_020,
    },
};

export default theme;
