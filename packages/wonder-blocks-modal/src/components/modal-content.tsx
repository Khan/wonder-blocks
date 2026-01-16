import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
// TODO [WB-2137]: standardize media query breakpoint tokens
import {modalMediaQuery} from "../util/constants";
import theme from "../theme";

type Props = {
    /** Should the content scroll on overflow, or just expand. */
    scrollOverflow: boolean;
    /** The contents of the ModalContent */
    children: React.ReactNode;
    /** Optional styling to apply to the contents. */
    style?: StyleType;
    /**
     * When true, allows the small-height media query to unset overflow/flex behavior.
     * This fixes layout issues in OnePaneDialog on small screens, but should be
     * disabled for FlexibleDialog/DrawerDialog which need scrolling at all times.
     * @defaultValue true
     */
    applySmallHeightStyles?: boolean;
};

/**
 * The Modal content included after the header
 */
function ModalContent(props: Props) {
    const {
        scrollOverflow,
        style,
        children,
        applySmallHeightStyles = true,
    } = props;

    return (
        <View
            style={[
                styles.wrapper,
                scrollOverflow && styles.scrollOverflow,
                applySmallHeightStyles && styles.wrapperSmallHeight,
            ]}
        >
            <View
                style={[
                    styles.content,
                    applySmallHeightStyles && styles.contentSmallHeight,
                    style,
                ]}
            >
                {children}
            </View>
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
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

        // This helps to ensure that the paddingBottom is preserved when
        // the contents start to overflow, this goes away on display: flex
        display: "block",
    },

    // Media query styles for small height - applied conditionally via applySmallHeightStyles prop
    wrapperSmallHeight: {
        [modalMediaQuery.smMinOrSmallerHeight as any]: {
            flex: "unset",
            minHeight: "unset",
            overflow: "unset",
        },
    },

    scrollOverflow: {
        overflow: "auto",
    },

    content: {
        flex: 1,
        minHeight: "100%",
        padding: theme.panel.layout.gap.default,
        boxSizing: "border-box",
        [modalMediaQuery.midOrSmaller as any]: {
            paddingInline: theme.panel.layout.gap.small,
        },
    },

    // Media query styles for small height - applied conditionally via applySmallHeightStyles prop
    contentSmallHeight: {
        [modalMediaQuery.smMinOrSmallerHeight as any]: {
            flex: "unset",
            minHeight: "unset",
            overflow: "unset",
        },
    },
});

ModalContent.defaultProps = {
    scrollOverflow: true,
    applySmallHeightStyles: true,
};

export default ModalContent;
