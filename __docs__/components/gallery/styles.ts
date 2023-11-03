import {StyleSheet} from "aphrodite";

import {tokens} from "@khanacademy/wonder-blocks-theming";

export const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    sectionLabel: {
        marginTop: tokens.spacing.xLarge_32,
        marginBottom: tokens.spacing.large_24,
    },
    centerContent: {
        width: "fit-content",
        alignSelf: "center",
    },
});
