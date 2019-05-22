// @flow
import {StyleSheet} from "aphrodite";

const WIDE_SCREEN = "@media (min-width: 1168px)";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },

    rowMaxWidth: {
        [WIDE_SCREEN]: {
            margin: "0 auto",
        },
    },

    cellGrow: {
        flexGrow: 1,
    },

    cellFixed: {
        flexShrink: 0,
    },
});

export default styles;
