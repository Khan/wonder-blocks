// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import Colors from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import CloseButton from "./close-button.js";

type Props = {|
    ...AriaProps,

    /**
     * The content to render inside the popover.
     */
    children: React.Node,

    /**
     * Close button label for use in screen readers
     */
    closeButtonLabel?: string,

    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible?: boolean,

    /**
     * Whether we should use the default light color scheme or switch to a
     * different color scheme.
     */
    color: "blue" | "dark" | "light",

    /**
     * Called when the popover closes
     */
    onClose?: () => mixed,

    /**
     * Custom styles
     */
    style?: StyleType,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

/**
 * This is the base popover container. It’s used internally by all the variants.
 * Also, It can be used to create flexible popovers.
 */
export default class PopoverContentCore extends React.Component<Props> {
    static defaultProps = {
        color: "light",
        closeButtonVisible: true,
    };

    render() {
        const {
            children,
            closeButtonLabel,
            closeButtonVisible,
            color,
            style,
            onClose,
            testId,
        } = this.props;

        return (
            <View
                data-test-id={testId}
                style={[
                    styles.content,
                    color !== "light" && styles[color],
                    style,
                ]}
            >
                {closeButtonVisible && (
                    <CloseButton
                        aria-label={closeButtonLabel}
                        light={color !== "light"}
                        onClose={onClose}
                    />
                )}
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        borderRadius: Spacing.xxxSmall,
        border: `solid 1px ${Colors.offBlack16}`,
        backgroundColor: Colors.white,
        boxShadow: `0 ${Spacing.xSmall}px ${Spacing.xSmall}px 0 ${
            Colors.offBlack8
        }`,
        margin: 0,
        maxWidth: 280,
        padding: Spacing.large,
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
    dark: {
        backgroundColor: Colors.darkBlue,
        color: Colors.white,
    },
});
