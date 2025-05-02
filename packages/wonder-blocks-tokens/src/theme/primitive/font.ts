import {sizing} from "./sizing";

export const fontFamily = {
    sans: 'Lato, "Noto Sans", sans-serif',
    serif: '"Noto Serif", serif',
    mono: "Inconsolata, monospace",
};

export const fontWeight = {
    light: 300,
    regular: 400,
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
        xxxLarge: sizing.size_360,
        xxLarge: sizing.size_280,
        xLarge: sizing.size_240,
        large: sizing.size_200,
        xMedium: sizing.size_180, // only used in TB - do we need it here?
        medium: sizing.size_160,
        small: sizing.size_140,
        xSmall: sizing.size_120,
    },
    lineHeight: {
        xxxLarge: sizing.size_400,
        xxLarge: sizing.size_320,
        xLarge: sizing.size_280,
        large: sizing.size_240,
        xMedium: sizing.size_220,
        medium: sizing.size_200,
        small: sizing.size_180,
        xSmall: sizing.size_160,
    },
    weight: {
        light: fontWeight.light,
        regular: fontWeight.regular,
        semi: fontWeight.regular, // is no semi in Lato, so this is a fallback
        bold: fontWeight.bold,
        black: fontWeight.black,
    },
};
