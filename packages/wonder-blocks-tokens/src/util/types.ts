export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]> | string | number | boolean;
};

type BaseFontWeights = {
    light: number;
    semi: number;
    bold: number;
    black: number;
};

type OGFontWeights = {
    regular: number;
    medium?: never;
};

type TBFontWeights = {
    medium: number;
    regular?: never;
};

export type FontWeights = BaseFontWeights & (OGFontWeights | TBFontWeights);

// export type FontWeights = {
//     light: number;
//     regular: number;
//     medium: number;
//     semi: number;
//     bold: number;
//     black: number;
// };
