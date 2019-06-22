// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";

import PopoverContentCore from "./popover-content-core.js";

type CommonProps = {|
    ...AriaProps,

    /**
     * The content to render inside the popover.
     */
    content: string,

    /**
     * The popover title
     */
    title: string,

    /**
     * User-defined actions.
     */
    actions?: React.Node,

    /**
     * Close button label for use in screen readers
     */
    closeButtonLabel?: string,

    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible?: boolean,

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

    /**
     * Without these, flow complains about icon, image and emphasized not being
     * available on props at all b/c these are exact object types.
     */
    icon?: void,
    image?: void,
    emphasized?: void,
|};

type WithEmphasized = {|
    ...CommonProps,

    /**
     * When true, changes the popover window background to blue; otherwise, the
     * popover window background is not modified. It can be used only with
     * Text-only popovers. It cannot be used with icon or image.
     */
    emphasized: boolean,
|};

type WithIcon = {|
    ...CommonProps,

    /**
     * Decorate the popover with an illustrated icon. It cannot be used at the
     * same time with image.
     */
    icon?: string,
|};

type WithImage = {|
    ...CommonProps,

    /**
     * Decorate the popover with a full-bleed illustration. It cannot be used at
     * the same time with icon.
     */
    image?: string,
|};

type Props = CommonProps | WithEmphasized | WithIcon | WithImage;

// Created to add custom styles to the icon or image elements
const StyledImage = addStyle("img");

/**
 * This is the container that is consumed by all the predefined variations. Its
 * main responsibility is populate the contents depending on the variation used.
 */
export default class PopoverContent extends React.Component<Props> {
    static defaultProps = {
        closeButtonVisible: false,
    };

    render() {
        const {
            actions,
            closeButtonLabel,
            closeButtonVisible,
            content,
            emphasized,
            icon,
            image,
            onClose,
            style,
            title,
            testId,
        } = this.props;

        return (
            <PopoverContentCore
                color={emphasized ? "blue" : "light"}
                closeButtonLabel={closeButtonLabel}
                closeButtonVisible={closeButtonVisible}
                onClose={onClose}
                style={style}
                testId={testId}
            >
                <View style={!!icon && styles.withIcon}>
                    {image && <StyledImage style={styles.image} src={image} />}

                    {icon && <StyledImage style={styles.icon} src={icon} />}

                    <View style={styles.text}>
                        <HeadingSmall style={styles.title}>
                            {title}
                        </HeadingSmall>
                        <Body>{content}</Body>
                    </View>
                </View>

                {actions && <View style={styles.actions}>{actions}</View>}
            </PopoverContentCore>
        );
    }
}

const styles = StyleSheet.create({
    /**
     * Shared styles
     */
    actions: {
        marginTop: Spacing.large,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    text: {
        justifyContent: "center",
    },

    title: {
        marginBottom: Spacing.xSmall,
    },

    /**
     * Icon styles
     */
    icon: {
        marginRight: Spacing.medium,
        width: 64,
    },

    withIcon: {
        flexDirection: "row",
    },

    /**
     * Illustration styles
     */
    image: {
        marginBottom: Spacing.large,
        marginLeft: -Spacing.large,
        marginRight: -Spacing.large,
        marginTop: -Spacing.large,
        width: `calc(100% + ${Spacing.large * 2}px)`,
    },
});
