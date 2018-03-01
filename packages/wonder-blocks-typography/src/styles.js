// @flow
import {StyleSheet} from "aphrodite";

// const Regular = 400;
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
    LabelLarge: {
        fontFamily: "Lato",
        fontWeight: Bold,
        fontSize: 16,
        lineHeight: "20px",
    },
});

export {styles as default};
