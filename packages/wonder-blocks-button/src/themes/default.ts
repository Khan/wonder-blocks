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
                hover: border.width.medium,
                press: border.width.medium,
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
            icon: border.radius.radius_full,
        },
    },
    size: {
        height: {
            small: sizing.size_320,
            medium: sizing.size_400,
            large: sizing.size_560,
        },
    },
    margin: {
        // NOTE: These margin tokens reference border.width tokens to account
        // for the border width changes in between states.
        primary: {
            default: border.width.none,
            hover: border.width.none,
            press: border.width.none,
        },
        secondary: {
            default: border.width.none,
            hover: `calc(-1 * ${border.width.thin})`,
            press: `calc(-1 * ${border.width.thin})`,
        },
        tertiary: {
            default: border.width.none,
            hover: `calc(-1 * ${border.width.medium})`,
            press: `calc(-1 * ${border.width.medium})`,
        },
        icon: {
            offset: `calc(-1 * ${border.width.medium})`,
        },
    },
    padding: {
        xsmall: sizing.size_020,
        small: sizing.size_060,
        medium: sizing.size_120,
        large: sizing.size_160,
        xLarge: sizing.size_320,
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
};

export default theme;
