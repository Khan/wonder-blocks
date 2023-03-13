import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import Colors from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";

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
     * Whether we should use the default light color scheme or switch to a
     * different color scheme.
     */
    color: "blue" | "darkBlue" | "white";
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
    color: Props["color"];
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
        color: "white",
        closeButtonLight: false,
        closeButtonVisible: false,
    };

    render(): React.ReactNode {
        const {
            children,
            closeButtonLight,
            closeButtonLabel,
            closeButtonVisible,
            color,
            style,
            testId,
        } = this.props;

        return (
            <View
                testId={testId}
                style={[
                    styles.content,
                    color !== "white" && styles[color],
                    style,
                ]}
            >
                {closeButtonVisible && (
                    <CloseButton
                        aria-label={closeButtonLabel}
                        light={closeButtonLight || color !== "white"}
                        style={styles.closeButton}
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
        borderRadius: Spacing.xxxSmall_4,
        border: `solid 1px ${Colors.offBlack16}`,
        backgroundColor: Colors.white,
        boxShadow: `0 ${Spacing.xSmall_8}px ${Spacing.xSmall_8}px 0 ${Colors.offBlack8}`,
        margin: 0,
        maxWidth: Spacing.medium_16 * 18, // 288px
        padding: Spacing.large_24,
        overflow: "hidden",
        justifyContent: "center",
    },
    /**
     * Theming
     */
    blue: {
        backgroundColor: Colors.blue,
        color: Colors.white,
    },

    darkBlue: {
        backgroundColor: Colors.darkBlue,
        color: Colors.white,
    },

    /**
     * elements
     */
    closeButton: {
        position: "absolute",
        right: Spacing.xSmall_8,
        top: Spacing.xSmall_8,
        // Allows the button to be above the title and/or custom content
        zIndex: 1,
    },
});
