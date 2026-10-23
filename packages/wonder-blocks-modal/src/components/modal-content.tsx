import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import styles from "./modal-content.module.css";

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
                styles.root,
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

ModalContent.defaultProps = {
    scrollOverflow: true,
    applySmallHeightStyles: true,
};

export default ModalContent;
