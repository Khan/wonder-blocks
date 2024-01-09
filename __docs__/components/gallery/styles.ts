import {StyleSheet} from "aphrodite";

import {spacing} from "@khanacademy/wonder-blocks-tokens";

export const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    sectionLabel: {
        marginTop: spacing.xLarge_32,
        marginBottom: spacing.large_24,
    },
    centerContent: {
        width: "fit-content",
        alignSelf: "center",
    },
});
