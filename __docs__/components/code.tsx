import * as React from "react";
import {StyleSheet} from "aphrodite";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {font, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {CopyButton} from "./copy-button";

const StyledCode = addStyle("code");

type Props = {
    children: string;
};
export const Code = (props: Props) => {
    return (
        <View style={styles.codeContainer}>
            <StyledCode {...props} style={[styles.code]} />
            <CopyButton value={props.children} />
        </View>
    );
};

const styles = StyleSheet.create({
    codeContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_040,
    },
    code: {
        backgroundColor: semanticColor.surface.secondary,
        padding: sizing.size_040,
        fontSize: font.body.size.xsmall,
    },
});
