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
            xsmall: sizing.size_120,
            small: sizing.size_140,
            medium: sizing.size_160,
        },
        lineHeight: {
            xsmall: sizing.size_160,
            small: sizing.size_180,
            medium: sizing.size_200,
            large: sizing.size_220,
        },
    },
    heading: {
        size: {
            small: sizing.size_120,
            medium: sizing.size_200,
            large: sizing.size_240,
            xlarge: sizing.size_280,
            xxlarge: sizing.size_360,
        },
        lineHeight: {
            small: sizing.size_160,
            medium: sizing.size_240,
            large: sizing.size_280,
            xlarge: sizing.size_320,
            xxlarge: sizing.size_400,
        },
    },
    textDecoration: {
        underlineOffset: sizing.size_020,
        thickness: sizing.size_010,
    },
};
