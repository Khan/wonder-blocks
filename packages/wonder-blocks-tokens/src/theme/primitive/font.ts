import {sizing} from "./sizing";

export const fontFamily = {
    sans: '"Lato", "Noto Sans", "Helvetica", "Corbel", sans-serif',
    serif: '"Noto Serif", serif',
    mono: "Inconsolata, monospace",
};

export const fontWeight = {
    light: 300,
    regular: 400,
    semi: 400,
    bold: 700,
    black: 900,
};

export const font = {
    family: {
        sans: fontFamily.sans,
        serif: fontFamily.serif,
        mono: fontFamily.mono,
    },
    weight: {
        light: fontWeight.light,
        regular: fontWeight.regular, // WB-1964: remove regular at a later date
        medium: fontWeight.regular, //  Lato has regular, Jakarta has medium
        semi: fontWeight.regular, // is no semi in Lato, so this is a fallback
        bold: fontWeight.bold,
        black: fontWeight.black,
    },
    body: {
        size: {
            xsmall: sizing.size_120, // Used by LabelXSmall
            small: sizing.size_140, // Used by LabelSmall
            medium: sizing.size_160, // Used by LabelMedium, LabelLarge and Body
        },
        lineHeight: {
            xsmall: sizing.size_160, // LabelXSmall
            small: sizing.size_180, // LabelSmall
            medium: sizing.size_200, // LabelLarge
            large: sizing.size_220, // Body
        },
    },
    heading: {
        size: {
            small: sizing.size_120, // HeadingXSmall
            medium: sizing.size_200, // HeadingSmall and Tagline
            large: sizing.size_240, // HeadingMedium
            xlarge: sizing.size_280, // HeadingLarge
            xxlarge: sizing.size_360, // Title
        },
        lineHeight: {
            small: sizing.size_160, // HeadingXSmall
            medium: sizing.size_240, // HeadingSmall and Tagline
            large: sizing.size_280, // HeadingMedium
            xlarge: sizing.size_320, // HeadingLarge
            xxlarge: sizing.size_400, // Title
        },
    },
    textDecoration: {
        underlineOffset: sizing.size_020,
        thickness: sizing.size_010,
    },
};
