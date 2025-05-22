import {sizing} from "./sizing";

export const fontFamily = {
    sans: 'Lato, "Noto Sans", sans-serif',
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
    size: {
        xxxlarge: sizing.size_360,
        xxlarge: sizing.size_280,
        xlarge: sizing.size_240,
        large: sizing.size_200,
        medium: sizing.size_160,
        small: sizing.size_140,
        xsmall: sizing.size_120,
    },
    lineHeight: {
        xxxlarge: sizing.size_400,
        xxlarge: sizing.size_320,
        xlarge: sizing.size_280,
        large: sizing.size_240,
        xmedium: sizing.size_220,
        medium: sizing.size_200,
        small: sizing.size_180,
        xsmall: sizing.size_160,
    },
    weight: {
        light: fontWeight.light,
        medium: fontWeight.regular, // called medium to support theming across fonts
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
            small: sizing.size_200, // HeadingXSmall
            medium: sizing.size_240, // HeadingSmall and Tagline
            large: sizing.size_280, // HeadingMedium
            xlarge: sizing.size_320, // HeadingLarge
            xxlarge: sizing.size_400, // Title
        },
    },
};
