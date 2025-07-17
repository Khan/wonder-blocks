import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import theme from "../theme";

type Props = {
    /** Should the content scroll on overflow, or just expand. */
    scrollOverflow: boolean;
    /** The contents of the FlexibleContent */
    children: React.ReactNode;
    /** Optional styling to apply to the contents. */
    style?: StyleType;
    /** Optional id reference to apply to the first heading for labeling the dialog. */
    titleId?: string;
};

/**
 * The FlexibleDialog main content
 */
function FlexibleContent(props: Props) {
    const {scrollOverflow, style, children} = props;

    return (
        <View style={[styles.wrapper, scrollOverflow && styles.scrollOverflow]}>
            <View style={[styles.content, style]}>{children}</View>
        </View>
    );
}

FlexibleContent.__IS_MODAL_CONTENT__ = true;

FlexibleContent.isComponentOf = (instance: any): boolean => {
    return instance && instance.type && instance.type.__IS_MODAL_CONTENT__;
};

/**
 * Media query for small screens.
 * TODO(WB-1655): Change this to use the theme instead (inside themedStylesFn).
 * e.g. `[theme.breakpoints.small]: {...}`
 */
const small = "@media (max-width: 767px)" as any;

const styles = StyleSheet.create({
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
        padding: theme.panel.layout.gap.default,
        boxSizing: "border-box",
        [small]: {
            paddingInline: theme.panel.layout.gap.small,
        },
    },
});

FlexibleContent.defaultProps = {
    scrollOverflow: true,
};

export default FlexibleContent;
