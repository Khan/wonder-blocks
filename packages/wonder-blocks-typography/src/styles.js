// @flow
import {StyleSheet} from "aphrodite";

const Regular = 400;
const Bold = 700;
const Black = 900;

const mobile = "@media (max-width: 1023px)";
const desktop = "@media (min-width: 1024px)";

const styles = StyleSheet.create({
    Title: {
        fontFamily: "Lato",
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
        fontFamily: "Lato",
        fontWeight: Regular,
        fontSize: 20,
        lineHeight: "24px",
    },
    HeadingLarge: {
        fontFamily: "Lato",
        fontWeight: Bold,
        [desktop]: {
            fontSize: 28,
            lineHeight: "32px",
        },
        [mobile]: {
            fontSize: 22,
            lineHeight: "26px",
        },
    },
    HeadingMedium: {
        fontFamily: "Lato",
        fontWeight: Bold,
        fontSize: 24,
        lineHeight: "28px",
    },
    HeadingSmall: {
        fontFamily: "Lato",
        fontWeight: Bold,
        fontSize: 20,
        lineHeight: "24px",
    },
    HeadingXSmall: {
        fontFamily: "Lato",
        fontWeight: Bold,
        fontSize: 12,
        lineHeight: "16px",
    },
    BodySerifBlock: {
        // TODO(alex): Use Minion Pro here
        fontFamily: "serif",
        fontWeight: Regular,
        fontSize: 22,
        lineHeight: "28px",
    },
    BodySerif: {
        // TODO(alex): Use Minion Pro here
        fontFamily: "serif",
        fontWeight: Regular,
        fontSize: 18,
        lineHeight: "22px",
    },
    BodyMonospace: {
        fontFamily: "Inconsolata",
        fontWeight: Regular,
        fontSize: 17,
        lineHeight: "22px",
    },
    Body: {
        fontFamily: "Lato",
        fontWeight: Regular,
        fontSize: 16,
        lineHeight: "22px",
    },
    LabelLarge: {
        fontFamily: "Lato",
        fontWeight: Bold,
        fontSize: 16,
        lineHeight: "20px",
    },
    LabelMedium: {
        fontFamily: "Lato",
        fontWeight: Regular,
        fontSize: 16,
        lineHeight: "20px",
    },
    LabelSmall: {
        fontFamily: "Lato",
        fontWeight: Regular,
        fontSize: 14,
        lineHeight: "18px",
    },
    LabelXSmall: {
        fontFamily: "Lato",
        fontWeight: Regular,
        fontSize: 12,
        lineHeight: "16px",
    },
    Caption: {
        fontFamily: "Lato",
        fontWeight: Regular,
        fontSize: 14,
        lineHeight: "20px",
    },
    Footnote: {
        fontFamily: "Lato",
        fontWeight: Regular,
        fontSize: 12,
        lineHeight: "18px",
    },
});

export {styles as default};
