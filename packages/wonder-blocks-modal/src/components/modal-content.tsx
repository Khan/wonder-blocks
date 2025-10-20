import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import theme from "../theme";

type Props = {
    /** Should the content scroll on overflow, or just expand.
     *
     * Defaults to true. */
    scrollOverflow: boolean;
    /**
     * Should an outer component wrapped around the content be scrollable instead?
     *
     * Defaults to false.
     * */
    shouldOuterScroll?: boolean;
    /** The contents of the ModalContent */
    children: React.ReactNode;
    /** Optional styling to apply to the contents. */
    style?: StyleType;
};

/**
 * The Modal content included after the header
 */
function ModalContent(props: Props) {
    const {
        style,
        children,
        scrollOverflow = true,
        shouldOuterScroll = false,
    } = props;

    return (
        <View
            style={[
                styles.wrapper,
                // preserve existing optional scroll behavior
                scrollOverflow && !shouldOuterScroll && styles.scrollOverflow,
                // if an outer component should scroll, disable internal scrolling
                shouldOuterScroll ? styles.outerScroll : undefined,
            ]}
        >
            <View
                style={[
                    styles.content,
                    shouldOuterScroll ? styles.outerScroll : undefined,
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
// TODO (WB-2080): Use media query tokens here and in ModalContent
const small = "@media (max-width: 767px)" as any;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

        // This helps to ensure that the paddingBottom is preserved when
        // the contents start to overflow, this goes away on display: flex
        display: "block",
    },

    // Move scrolling to a parent container instead of this internal component
    outerScroll: {
        flex: "unset",
        minHeight: "unset",
        overflow: "unset",
    },

    scrollOverflow: {
        overflow: "auto",
    },

    content: {
        flex: 1,
        minHeight: "100%",
        padding: theme.panel.layout.gap.default,
        boxSizing: "border-box",
        [small]: {
            paddingInline: theme.panel.layout.gap.small,
        },
    },
});

ModalContent.defaultProps = {
    scrollOverflow: true,
};

export default ModalContent;
