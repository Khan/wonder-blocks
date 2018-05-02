// @flow
import {StyleSheet} from "aphrodite";

const WIDE_SCREEN = "@media (min-width: 1168px)";

const styles = StyleSheet.create({
    rowWrap: {
        display: "flex",
        alignItems: "center",
    },

    row: {
        display: "flex",
        width: "100%",
        height: "100%",
    },

    rowMaxWidth: {
        // TODO(jeresig): Compute this dynamically rather than using a static
        // width, make it specified inside sizes.js.
        maxWidth: 1120,

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
