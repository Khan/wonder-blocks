import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    border,
    boxShadow,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

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

type DefaultProps = {
    closeButtonLight: Props["closeButtonLight"];
    closeButtonVisible: Props["closeButtonVisible"];
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
export default class PopoverContentCore extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        closeButtonLight: false,
        closeButtonVisible: false,
    };

    render(): React.ReactNode {
        const {
            "aria-label": ariaLabel,
            children,
            closeButtonLight,
            closeButtonLabel,
            closeButtonVisible,
            style,
            testId,
        } = this.props;

        return (
            <View
                testId={testId}
                style={[styles.content, style]}
                aria-label={ariaLabel}
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
    }
}

const styles = StyleSheet.create({
    content: {
        borderRadius: border.radius.radius_040,
        border: `solid 1px ${semanticColor.core.border.neutral.subtle}`,
        backgroundColor: semanticColor.core.background.base.default,
        boxShadow: boxShadow.mid,
        margin: 0,
        maxWidth: `calc(${sizing.size_160} * 18)`, // 288px
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
