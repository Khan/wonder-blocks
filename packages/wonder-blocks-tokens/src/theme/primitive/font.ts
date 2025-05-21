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
};
