// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";

import type {PopoverContextType} from "./popover-context.js";

import PopoverContentCore from "./popover-content-core.js";
import PopoverContext from "./popover-context.js";

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
     *
     * It can be either a Node or a function using the children-as-function
     * pattern to pass a close function for use anywhere within the actions.
     * This provides a lot of flexibility in terms of what actions may trigger
     * the Popover to close the popover dialog.
     */
    actions?: React.Node | (({close: () => mixed}) => React.Node),

    /**
     * Close button label for use in screen readers
     */
    closeButtonLabel?: string,

    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible?: boolean,

    /**
     * Custom styles to be injected to the popover content container
     */
    style?: StyleType,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Decorate the popover with an illustrated icon. It cannot be used at the
     * same time with image.
     */
    icon?: string | React.Element<"img"> | React.Element<"svg">,

    /**
     * Decorate the popover with a full-bleed illustration. It cannot be used at
     * the same time with icon.
     */
    image?: React.Element<"img"> | React.Element<"svg">,

    /**
     * Without this, flow complains about emphasized not being available on
     * props at all b/c these are exact object types.
     */
    emphasized?: void,
|};

type WithEmphasized = {|
    ...CommonProps,

    /**
     * When true, changes the popover dialog background to blue; otherwise, the
     * popover dialog background is not modified. It can be used only with
     * Text-only popovers. It cannot be used with icon or image.
     */
    emphasized: boolean,
|};

type Props = CommonProps | WithEmphasized;

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

    componentDidMount() {
        const {icon, image} = this.props;

        // this runtime check is added to support <svg> and <img> elements
        // inside the image prop
        if (image && icon) {
            throw new Error(
                "'image' and 'icon' cannot be used at the same time. You can fix this by either removing 'image' or 'icon' from your instance.",
            );
        }
    }

    /**
     * Runtime validation in case we try to use an invalid shape
     */
    validateProps({placement}: PopoverContextType) {
        // illustration popover can't be placed horizontally
        if (
            this.props.image &&
            (placement === "left" || placement === "right")
        ) {
            throw new Error(
                "'image' can only be vertically placed. You can fix this by either changing `placement` to `top` or `bottom` or removing the `image` prop inside `content`.",
            );
        }
    }

    maybeRenderImage = ({placement}: PopoverContextType) => {
        const {image} = this.props;

        if (!image) {
            return null;
        }

        return (
            <View
                style={[
                    styles.image,
                    placement === "bottom" && styles.imageToBottom,
                ]}
            >
                {image}
            </View>
        );
    };

    maybeRenderIcon = () => {
        const {icon} = this.props;

        if (!icon) {
            return null;
        }

        return (
            <View style={styles.iconContainer}>
                {typeof icon !== "string" ? (
                    icon
                ) : (
                    <StyledImage src={icon} style={styles.icon} />
                )}
            </View>
        );
    };

    maybeRenderActions = (close: () => mixed) => {
        const {actions} = this.props;

        if (!actions) {
            return null;
        }

        return (
            <View style={styles.actions}>
                {typeof actions === "function"
                    ? actions({
                          close: close,
                      })
                    : actions}
            </View>
        );
    };

    render() {
        const {
            closeButtonLabel,
            closeButtonVisible,
            content,
            emphasized,
            icon,
            image,
            style,
            title,
            testId,
        } = this.props;

        return (
            <PopoverContext.Consumer>
                {({close, placement}) => {
                    // verify if the props are correct
                    this.validateProps({close, placement});

                    return (
                        <PopoverContentCore
                            color={emphasized ? "blue" : "white"}
                            closeButtonLight={image && placement === "top"}
                            closeButtonLabel={closeButtonLabel}
                            closeButtonVisible={closeButtonVisible}
                            style={style}
                            testId={testId}
                        >
                            <View style={!!icon && styles.withIcon}>
                                {this.maybeRenderImage({placement})}

                                {this.maybeRenderIcon()}

                                <View style={styles.text}>
                                    <HeadingSmall style={styles.title}>
                                        {title}
                                    </HeadingSmall>
                                    <Body>{content}</Body>
                                </View>
                            </View>

                            {this.maybeRenderActions((close: any))}
                        </PopoverContentCore>
                    );
                }}
            </PopoverContext.Consumer>
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
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: Spacing.xxxLarge,
        width: Spacing.xxxLarge,
        minWidth: Spacing.xxxLarge,
        marginRight: Spacing.medium,
        overflow: "hidden",
    },

    icon: {
        width: "100%",
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

    imageToBottom: {
        marginBottom: -Spacing.large,
        marginTop: Spacing.large,
        order: 1,
    },
});
