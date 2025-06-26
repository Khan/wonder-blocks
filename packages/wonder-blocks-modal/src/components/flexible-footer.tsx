import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import theme from "../theme";

type Props = {
    children: React.ReactNode;
};

/**
 * Modal footer included after the flexible dialog content.
 *
 * **Implementation notes**:
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to include it as part of [ModalPanel](/#modalpanel) by using the `footer` prop.
 * - The footer is completely flexible. Meaning the developer needs to add its own custom layout to match design specs.
 *
 * **Usage**
 *
 * ```js
 * <FlexibleFooter>
 *     <Button onClick={() => {}}>Submit</Button>
 * </FlexibleFooter>
 * ```
 */
export default function FlexibleFooter({children}: Props) {
    return <View style={styles.footer}>{children}</View>;
}

FlexibleFooter.__IS_MODAL_FOOTER__ = true;

FlexibleFooter.isComponentOf = (instance: any): boolean => {
    return instance && instance.type && instance.type.__IS_MODAL_FOOTER__;
};

const styles = StyleSheet.create({
    footer: {
        flex: "0 0 auto",
        boxSizing: "border-box",
        minHeight: sizing.size_640,
        paddingInline: theme.footer.layout.padding.inline,
        paddingBlock: theme.footer.layout.padding.block,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
});
