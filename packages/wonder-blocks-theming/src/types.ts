import {StyleDeclaration} from "aphrodite";
// export type ThemeContract = {
//     [key: string]: string | number | ThemeContract;
// };

export type ThemeContract = {
    // Colors
    color: {
        primary: string;
        secondary: string;
        tertiary: string;
        background: string;
        text: string;
        textInverted: string;
    };
    // Dimensions
    spacing: {
        small: number | string;
        medium: number | string;
        large: number | string;
    };
    // Text style
    fontSize: {
        small: string;
        medium: string;
        large: string;
    };
    font: {
        primary: string;
        secondary: string;
    };
    fontWeight: {
        light: number;
        regular: number;
        bold: number;
    };
    lineHeight: {
        small: string;
        medium: string;
        large: string;
    };
};

export type ThemedStylesFn = (theme: ThemeContract) => StyleDeclaration;
