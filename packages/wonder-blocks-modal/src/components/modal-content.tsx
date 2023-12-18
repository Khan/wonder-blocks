import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
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
    /** Should the content scroll on overflow, or just expand. */
    scrollOverflow: boolean;
    /** The contents of the ModalContent */
    children: React.ReactNode;
    /** Optional styling to apply to the contents. */
    style?: StyleType;
};

/**
 * The Modal content included after the header
 */
function ModalContent(props: Props) {
    const {scrollOverflow, style, children} = props;
    const {theme} = useScopedTheme(ModalDialogThemeContext);
    const styles = useStyles(themedStylesFn, theme);

    return (
        <View style={[styles.wrapper, scrollOverflow && styles.scrollOverflow]}>
            <View style={[styles.content, style]}>{children}</View>
        </View>
    );
}

ModalContent.__IS_MODAL_CONTENT__ = true;

ModalContent.isComponentOf = (instance: any): boolean => {
    return instance && instance.type && instance.type.__IS_MODAL_CONTENT__;
};

/**
 * Media query for small screens.
 * TODO(WB-1655): Change this to use the theme instead (inside themedStylesFn).
 * e.g. `[theme.breakpoints.small]: {...}`
 */
const small = "@media (max-width: 767px)";

const themedStylesFn: ThemedStylesFn<ModalDialogThemeContract> = (theme) => ({
    wrapper: {
        flex: 1,

        // This helps to ensure that the paddingBottom is preserved when
        // the contents start to overflow, this goes away on display: flex
        display: "block",
    },

    scrollOverflow: {
        overflow: "auto",
    },

    content: {
        flex: 1,
        minHeight: "100%",
        padding: Spacing.xLarge_32,
        boxSizing: "border-box",
        [small]: {
            padding: `${Spacing.xLarge_32}px ${Spacing.medium_16}px`,
        },
    },
});

ModalContent.defaultProps = {
    scrollOverflow: true,
};

export default ModalContent;
