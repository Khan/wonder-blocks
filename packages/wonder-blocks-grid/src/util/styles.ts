import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";

const WIDE_SCREEN = "@media (min-width: 1168px)";

const styles: StyleDeclaration = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },

    rowMaxWidth: {
        [WIDE_SCREEN]: {
            marginBlock: "0",
            marginInline: "auto",
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
