import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

const Regular = 400;
const Bold = 700;
const Black = 900;

const mobile = "@media (max-width: 1023px)";
const desktop = "@media (min-width: 1024px)";

const common = {
    display: "block",
} as const;

const SansFamily = 'Lato, "Noto Sans", sans-serif';
// TODO(kevinb): Use Minion Pro here
const SerifFamily = '"Noto Serif", serif';
const InconsolataFamily = "Inconsolata, monospace";

const styles: StyleDeclaration = StyleSheet.create({
    Title: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Black,
        [desktop]: {
            fontSize: sizing.size_360,
            lineHeight: sizing.size_400,
        },
        [mobile]: {
            fontSize: sizing.size_280,
            lineHeight: sizing.size_320,
        },
    },
    Tagline: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: sizing.size_200,
        lineHeight: sizing.size_240,
    },
    HeadingLarge: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        [desktop]: {
            fontSize: sizing.size_280,
            lineHeight: sizing.size_320,
        },
        [mobile]: {
            fontSize: sizing.size_240,
            lineHeight: sizing.size_280,
        },
    },
    HeadingMedium: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        [desktop]: {
            fontSize: sizing.size_240,
            lineHeight: sizing.size_280,
        },
        [mobile]: {
            fontSize: sizing.size_220,
            lineHeight: sizing.size_260,
        },
    },
    HeadingSmall: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        fontSize: sizing.size_200,
        lineHeight: sizing.size_240,
    },
    HeadingXSmall: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        fontSize: sizing.size_120,
        lineHeight: sizing.size_160,
        letterSpacing: 0.6,
        textTransform: "uppercase",
    },
    BodySerifBlock: {
        ...common,
        fontFamily: SerifFamily,
        fontWeight: Regular,
        fontSize: sizing.size_220,
        lineHeight: sizing.size_280,
    },
    BodySerif: {
        ...common,
        fontFamily: SerifFamily,
        fontWeight: Regular,
        fontSize: sizing.size_180,
        lineHeight: sizing.size_220,
    },
    BodyMonospace: {
        ...common,
        fontFamily: InconsolataFamily,
        fontWeight: Regular,
        fontSize: sizing.size_170,
        lineHeight: sizing.size_220,
    },
    Body: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: sizing.size_160,
        lineHeight: sizing.size_220,
    },
    LabelLarge: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        fontSize: sizing.size_160,
        lineHeight: sizing.size_200,
    },
    LabelMedium: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: sizing.size_160,
        lineHeight: sizing.size_200,
    },
    LabelSmall: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: sizing.size_140,
        lineHeight: sizing.size_180,
    },
    LabelXSmall: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: sizing.size_120,
        lineHeight: sizing.size_160,
    },
    Caption: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: sizing.size_140,
        lineHeight: sizing.size_200,
    },
    Footnote: {
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: sizing.size_120,
        lineHeight: sizing.size_180,
    },
});

export {styles as default};
