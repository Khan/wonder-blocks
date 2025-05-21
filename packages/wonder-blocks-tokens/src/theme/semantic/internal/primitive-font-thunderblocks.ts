import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
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
});
