import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    ThemedStylesFn,
    useScopedTheme,
    useStyles,
} from "@khanacademy/wonder-blocks-theming";
import {
    ModalDialogThemeContext,
    ModalDialogThemeContract,
} from "../themes/themed-modal-dialog";

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
    const {theme} = useScopedTheme(ModalDialogThemeContext);
    const styles = useStyles(themedStylesFn, theme);

    return <View style={styles.footer}>{children}</View>;
}

ModalFooter.__IS_MODAL_FOOTER__ = true;

ModalFooter.isComponentOf = (instance: any): boolean => {
    return instance && instance.type && instance.type.__IS_MODAL_FOOTER__;
};

const themedStylesFn: ThemedStylesFn<ModalDialogThemeContract> = (theme) => ({
    footer: {
        flex: "0 0 auto",
        boxSizing: "border-box",
        minHeight: spacing.xxxLarge_64,
        paddingLeft: spacing.medium_16,
        paddingRight: spacing.medium_16,
        paddingTop: spacing.xSmall_8,
        paddingBottom: spacing.xSmall_8,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",

        boxShadow: `0px -1px 0px ${theme.footer.color.border}`,
    },
});
