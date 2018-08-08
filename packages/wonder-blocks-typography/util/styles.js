// @flow
import {StyleSheet} from "aphrodite";

const Regular = 400;
const Bold = 700;
const Black = 900;

const mobile = "@media (max-width: 1023px)";
const desktop = "@media (min-width: 1024px)";

const common = {
    display: "block",
};

const LatoFamily = "Lato, sans-serif";
const InconsolataFamily = "Inconsolata, monospace";

const styles = StyleSheet.create({
    Title: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Black,
        [desktop]: {
            fontSize: 36,
            lineHeight: "40px",
        },
        [mobile]: {
            fontSize: 28,
            lineHeight: "32px",
        },
    },
    Tagline: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Regular,
        fontSize: 20,
        lineHeight: "24px",
    },
    HeadingLarge: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Bold,
        [desktop]: {
            fontSize: 28,
            lineHeight: "32px",
        },
        [mobile]: {
            fontSize: 24,
            lineHeight: "28px",
        },
    },
    HeadingMedium: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Bold,
        [desktop]: {
            fontSize: 24,
            lineHeight: "28px",
        },
        [mobile]: {
            fontSize: 22,
            lineHeight: "26px",
        },
    },
    HeadingSmall: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Bold,
        fontSize: 20,
        lineHeight: "24px",
    },
    HeadingXSmall: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Bold,
        fontSize: 12,
        lineHeight: "16px",
        letterSpacing: 0.6,
        textTransform: "uppercase",
    },
    BodySerifBlock: {
        // TODO(alex): Use Minion Pro here
        ...common,
        fontFamily: "serif",
        fontWeight: Regular,
        fontSize: 22,
        lineHeight: "28px",
    },
    BodySerif: {
        // TODO(alex): Use Minion Pro here
        ...common,
        fontFamily: "serif",
        fontWeight: Regular,
        fontSize: 18,
        lineHeight: "22px",
    },
    BodyMonospace: {
        ...common,
        fontFamily: InconsolataFamily,
        fontWeight: Regular,
        fontSize: 17,
        lineHeight: "22px",
    },
    Body: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Regular,
        fontSize: 16,
        lineHeight: "22px",
    },
    LabelLarge: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Bold,
        fontSize: 16,
        lineHeight: "20px",
    },
    LabelMedium: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Regular,
        fontSize: 16,
        lineHeight: "20px",
    },
    LabelSmall: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Regular,
        fontSize: 14,
        lineHeight: "18px",
    },
    LabelXSmall: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Regular,
        fontSize: 12,
        lineHeight: "16px",
    },
    Caption: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Regular,
        fontSize: 14,
        lineHeight: "20px",
    },
    Footnote: {
        ...common,
        fontFamily: LatoFamily,
        fontWeight: Regular,
        fontSize: 12,
        lineHeight: "18px",
    },
});

export {styles as default};
