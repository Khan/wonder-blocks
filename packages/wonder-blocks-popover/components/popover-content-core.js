// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import Colors from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import type {Placement} from "@khanacademy/wonder-blocks-tooltip";

type Props = {|
    ...AriaProps,

    /**
     * The content to render inside the popover.
     */
    children: React.Node,

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
     * The placement of the popover window with respect to the anchor.
     */
    placement: Placement,

    /**
     * Called when the popover closes
     */
    onClose?: () => mixed,

    style?: StyleType,
|};

/**
 * This is the base popover container. It’s used internally by all the variants.
 * Also, It can be used to create flexible popovers.
 */
export default class PopoverContentCore extends React.Component<Props> {
    static defaultProps = {
        color: "light",
        placement: "bottom",
        closeButtonVisible: true,
        "aria-label": "Close Popover",
    };

    render() {
        const {
            children,
            closeButtonVisible,
            color,
            style,
            onClose,
            "aria-label": ariaLabel,
        } = this.props;

        return (
            <View
                style={[
                    styles.content,
                    color !== "light" && styles[color],
                    style,
                ]}
            >
                {closeButtonVisible && (
                    <IconButton
                        icon={icons.dismiss}
                        aria-label={ariaLabel}
                        onClick={onClose}
                        kind={color !== "light" ? "primary" : "tertiary"}
                        light={color !== "light"}
                        style={styles.closeButton}
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

    closeButton: {
        position: "absolute",
        right: Spacing.xSmall,
        top: Spacing.xSmall,
        // Allows the button to be above the title and/or custom content
        zIndex: 1,
    },
});
