import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import {actionStyles} from "@khanacademy/wonder-blocks-styles";
import CloseButton from "./close-button";

type Props = AriaProps & {
    /**
     * The content to render inside the popover.
     */
    children: React.ReactNode;
    /**
     * Close button color
     */
    closeButtonLight?: boolean;
    /**
     * Close button label for use in screen readers
     */
    closeButtonLabel?: string;
    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible?: boolean;
    /**
     * Custom styles applied to the content container
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

/**
 * This is the base popover container. It’s used internally by all the variants.
 * Also, it can be used to create flexible popovers.
 *
 * ### Usage
 *
 * ```jsx
 * import {PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
 *
 * <PopoverContentCore>
 *  <>
 *      Some custom layout
 *  </>
 * </PopoverContentCore>
 * ```
 */
const PopoverContentCore = React.forwardRef<HTMLElement, Props>(
    function PopoverContentCore(
        {
            "aria-label": ariaLabel,
            children,
            closeButtonLight = false,
            closeButtonLabel,
            closeButtonVisible = false,
            style,
            testId,
        }: Props,
        ref,
    ): React.ReactElement {
        return (
            <View
                testId={testId}
                style={[styles.content, style]}
                aria-label={ariaLabel}
                ref={ref}
            >
                {closeButtonVisible && (
                    <CloseButton
                        aria-label={closeButtonLabel}
                        style={[
                            styles.closeButton,
                            closeButtonLight && actionStyles.inverse,
                        ]}
                        testId={`${testId || "popover"}-close-btn`}
                    />
                )}
                {children}
            </View>
        );
    },
);

PopoverContentCore.displayName = "PopoverContentCore";

export default PopoverContentCore;

const styles = StyleSheet.create({
    content: {
        margin: 0,
        maxInlineSize: `calc(${sizing.size_160} * 18)`, // 288px
        padding: sizing.size_240,
        overflow: "hidden",
        justifyContent: "center",
    },

    /**
     * elements
     */
    closeButton: {
        margin: 0,
        position: "absolute",
        insetInlineEnd: sizing.size_040,
        insetBlockStart: sizing.size_040,
        // Allows the button to be above the title and/or custom content
        zIndex: 1,
    },
});
