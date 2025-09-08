import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View, type StyleType} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import theme from "../theme";

type Props = {
    /**
     * Optional custom styles.
     */
    styles?: FlexibleFooterStyles;
    /**
     * Content for the footer.
     */
    children: React.ReactNode;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

// Style contract for FlexibleFooter
export type FlexibleFooterStyles = {
    footer?: StyleType;
    button?: StyleType;
};

/**
 * A footer to be used with DrawerDialog, to make styling easier.
 */
const FlexibleFooter = (props: Props) => {
    const {styles, children} = props;

    return (
        <View
            {...props}
            style={[componentStyles.footer, styles?.footer].filter(Boolean)}
        >
            {children}
        </View>
    );
};

const componentStyles = StyleSheet.create({
    footer: {
        flex: "0 0 auto",
        boxSizing: "border-box",
        minHeight: sizing.size_640,
        paddingInline: theme.footer.layout.padding.inline,
        paddingBlock: theme.footer.layout.padding.block,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default FlexibleFooter;
