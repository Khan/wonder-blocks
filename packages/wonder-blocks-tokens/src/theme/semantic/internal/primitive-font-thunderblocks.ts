import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {font as defaultFont} from "../../primitive/font";

export const fontFamily = {
    sans: "Plus Jakarta Sans, serif",
};

export const fontWeight = {
    light: 300,
    medium: 500, // 'regular' in OG
    semi: 600, // only used in TB
    bold: 700,
    black: 900,
};

export const font = mergeTheme(defaultFont, {
    family: {
        sans: fontFamily.sans,
    },
    weight: {
        light: fontWeight.light,
        medium: fontWeight.medium,
        semi: fontWeight.semi,
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
            medium: sizing.size_240,
        },
    },
    heading: {
        size: {
            small: sizing.size_160,
            medium: sizing.size_180,
            large: sizing.size_200,
            xlarge: sizing.size_240,
            xxlarge: sizing.size_320,
        },
        lineHeight: {
            small: sizing.size_200,
            medium: sizing.size_240,
            large: sizing.size_280,
            xlarge: sizing.size_320,
            xxlarge: sizing.size_400,
        },
    },
});
