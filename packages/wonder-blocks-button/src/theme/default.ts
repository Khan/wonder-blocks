import {border, font, sizing} from "@khanacademy/wonder-blocks-tokens";

// The underline-offset is the distance between the text baseline and the
// bottom of the underline. This is necessary to prevent the underline from
// breaking with descenders.
const textUnderlineOffset = sizing.size_040;

const theme = {
    root: {
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
                    hover: border.width.none,
                    press: border.width.none,
                },
            },
            offset: {
                primary: border.width.medium,
                // Only primary buttons have an offset.
                secondary: 0,
                tertiary: 0,
            },
            radius: {
                default: border.radius.radius_040,
                hover: border.radius.radius_040,
                press: border.radius.radius_040,
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
        layout: {
            padding: {
                inline: {
                    primary: {
                        small: sizing.size_160,
                        medium: sizing.size_160,
                        large: sizing.size_320,
                    },
                    secondary: {
                        small: sizing.size_120,
                        medium: sizing.size_160, // default
                        large: sizing.size_180,
                    },
                    // Special case for tertiary kind buttons.
                    tertiary: {
                        small: sizing.size_0,
                        medium: sizing.size_0, // default
                        large: sizing.size_0,
                    },
                },
            },
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
            decoration: {
                hover: "underline",
                press: "underline",
            },
            offset: {
                default: textUnderlineOffset,
            },
        },
    },

    icon: {
        margin: {
            inline: {
                inner: sizing.size_060,
                outer: `calc(-1 * ${border.width.medium})`,
            },
        },
        padding: sizing.size_020,
        sizing: {
            small: sizing.size_120,
            medium: sizing.size_180,
            large: sizing.size_200,
        },
    },
};

export default theme;
