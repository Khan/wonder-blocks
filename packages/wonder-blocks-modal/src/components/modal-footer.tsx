import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";

type Props = {
    children: React.ReactNode;
};

/**
 * Modal footer included after the content.
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
 * <ModalFooter>
 *     <Button onClick={() => {}}>Submit</Button>
 * </ModalFooter>
 * ```
 */
export default function ModalFooter({children}: Props) {
    return <View style={styles.footer}>{children}</View>;
}

ModalFooter.__IS_MODAL_FOOTER__ = true;

ModalFooter.isComponentOf = (instance: any): boolean => {
    return instance && instance.type && instance.type.__IS_MODAL_FOOTER__;
};

const styles = StyleSheet.create({
    footer: {
        flex: "0 0 auto",
        boxSizing: "border-box",
        minHeight: sizing.size_640,
        paddingInline: sizing.size_160,
        paddingBlock: sizing.size_080,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",

        boxShadow: `0px -1px 0px ${semanticColor.core.border.neutral.subtle}`,
    },
});
