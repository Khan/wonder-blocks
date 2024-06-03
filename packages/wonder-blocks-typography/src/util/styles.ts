import {css} from "@/styled-system/css";
import {SystemStyleObject} from "@/styled-system/types";
// import {StyleSheet} from "aphrodite";
// import type {StyleDeclaration} from "aphrodite";

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

const styles: Record<string, SystemStyleObject> = {
    Title: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Black,
        [desktop]: {
            fontSize: 36,
            lineHeight: "40px",
        },
        [mobile]: {
            fontSize: 28,
            lineHeight: "32px",
        },
    }),
    Tagline: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: 20,
        lineHeight: "24px",
    }),
    HeadingLarge: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        [desktop]: {
            fontSize: 28,
            lineHeight: "32px",
        },
        [mobile]: {
            fontSize: 24,
            lineHeight: "28px",
        },
    }),
    HeadingMedium: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        [desktop]: {
            fontSize: 24,
            lineHeight: "28px",
        },
        [mobile]: {
            fontSize: 22,
            lineHeight: "26px",
        },
    }),
    HeadingSmall: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        fontSize: 20,
        lineHeight: "24px",
    }),
    HeadingXSmall: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        fontSize: 12,
        lineHeight: "16px",
        letterSpacing: 0.6,
        textTransform: "uppercase",
    }),
    BodySerifBlock: css.raw({
        ...common,
        fontFamily: SerifFamily,
        fontWeight: Regular,
        fontSize: 22,
        lineHeight: "28px",
    }),
    BodySerif: css.raw({
        ...common,
        fontFamily: SerifFamily,
        fontWeight: Regular,
        fontSize: 18,
        lineHeight: "22px",
    }),
    BodyMonospace: css.raw({
        ...common,
        fontFamily: InconsolataFamily,
        fontWeight: Regular,
        fontSize: 17,
        lineHeight: "22px",
    }),
    Body: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: 16,
        lineHeight: "22px",
    }),
    LabelLarge: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Bold,
        fontSize: 16,
        lineHeight: "20px",
    }),
    LabelMedium: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: 16,
        lineHeight: "20px",
    }),
    LabelSmall: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: 14,
        lineHeight: "18px",
    }),
    LabelXSmall: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: 12,
        lineHeight: "16px",
    }),
    Caption: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: 14,
        lineHeight: "20px",
    }),
    Footnote: css.raw({
        ...common,
        fontFamily: SansFamily,
        fontWeight: Regular,
        fontSize: 12,
        lineHeight: "18px",
    }),
};

export {styles as default};
