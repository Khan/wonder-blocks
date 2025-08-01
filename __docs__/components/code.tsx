import * as React from "react";
import {StyleSheet} from "aphrodite";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {font, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

const StyledCode = addStyle("code");

export const Code = (props: React.HTMLAttributes<HTMLElement>) => {
    return <StyledCode {...props} style={[styles.code]} />;
};

const styles = StyleSheet.create({
    code: {
        backgroundColor: semanticColor.core.background.neutral.subtle,
        padding: sizing.size_040,
        fontSize: font.body.size.xsmall,
    },
});
