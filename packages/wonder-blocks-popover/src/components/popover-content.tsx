import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";

import type {PopoverContextType} from "./popover-context";

import PopoverContentCore from "./popover-content-core";
import PopoverContext from "./popover-context";

type CommonProps = AriaProps & {
    /**
     * The content to render inside the popover.
     */
    content: string;
    /**
     * The popover title
     */
    title: string;
    /**
     * User-defined actions.
     *
     * It can be either a Node or a function using the children-as-function
     * pattern to pass a close function for use anywhere within the actions.
     * This provides a lot of flexibility in terms of what actions may trigger
     * the Popover to close the popover dialog.
     */
    actions?:
        | React.ReactNode
        | ((arg1: {close: () => unknown}) => React.ReactElement);
    /**
     * Close button label for use in screen readers
     */
    closeButtonLabel?: string;
    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible?: boolean;
    /**
     * Custom styles to be injected to the popover content container
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Unique ID for the popover. This is used as a prefix to the IDs of the
     * popover's elements.
     * @ignore
     */
    uniqueId?: string;
};

type Props = CommonProps & {
    /**
     * Decorate the popover with an illustrated icon. It cannot be used at the
     * same time with image.
     */
    icon?:
        | string
        | React.ReactElement<React.ComponentProps<"img">>
        | React.ReactElement<React.ComponentProps<"svg">>;
    /**
     * Alt text for the icon. This prop is only used if the `icon` prop
     * is passed a url (instead of a svg or img element).
     */
    iconAlt?: string;
    /**
     * Decorate the popover with a full-bleed illustration. It cannot be used at
     * the same time with icon.
     */
    image?:
        | React.ReactElement<React.ComponentProps<"img">>
        | React.ReactElement<React.ComponentProps<"svg">>;
};

// Created to add custom styles to the icon or image elements
const StyledImg = addStyle("img");

/**
 * This is the container that is consumed by all the predefined variations. Its
 * main responsibility is populate the contents depending on the variation used.
 *
 * ### Usage
 *
 * ```jsx
 * import {PopoverContent} from "@khanacademy/wonder-blocks-popover";
 *
 * <PopoverContent
 *  closeButtonVisible
 *  content="Some content for the popover"
 *  title="Popover with text only"
 * />
 * ```
 */
const PopoverContent = React.forwardRef<HTMLElement, Props>(
    function PopoverContent(props, ref): React.ReactElement {
        const {
            actions,
            closeButtonLabel,
            closeButtonVisible = false,
            content,
            icon,
            iconAlt,
            image,
            style,
            title,
            testId,
            uniqueId,
        } = props;

        const {close, placement} = React.useContext(PopoverContext);

        // Runtime check for mutually exclusive props
        React.useEffect(() => {
            if (image && icon) {
                throw new Error(
                    "'image' and 'icon' cannot be used at the same time. You can fix this by either removing 'image' or 'icon' from your instance.",
                );
            }
        }, [image, icon]);

        /**
         * Runtime validation in case we try to use an invalid shape
         */
        const validateProps = React.useCallback(
            ({placement}: PopoverContextType) => {
                // illustration popover can't be placed horizontally
                if (image && (placement === "left" || placement === "right")) {
                    throw new Error(
                        "'image' can only be vertically placed. You can fix this by either changing `placement` to `top` or `bottom` or removing the `image` prop inside `content`.",
                    );
                }
            },
            [image],
        );

        const maybeRenderImage = (
            context: PopoverContextType,
        ): React.ReactElement | null => {
            if (!image) {
                return null;
            }

            return (
                <View
                    style={[
                        styles.image,
                        context.placement === "bottom" && styles.imageToBottom,
                    ]}
                >
                    {image}
                </View>
            );
        };

        const maybeRenderIcon = (): React.ReactElement | null => {
            if (!icon) {
                return null;
            }

            return (
                <View style={styles.iconContainer}>
                    {typeof icon !== "string" ? (
                        icon
                    ) : (
                        <StyledImg
                            src={icon}
                            style={styles.icon}
                            alt={iconAlt || ""}
                        />
                    )}
                </View>
            );
        };

        const maybeRenderActions = (
            close: () => unknown,
        ): React.ReactElement | null => {
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

        // Verify if the props are correct
        validateProps({close, placement});

        return (
            <PopoverContentCore
                closeButtonLight={!!image && placement === "top"}
                closeButtonLabel={closeButtonLabel}
                closeButtonVisible={closeButtonVisible}
                style={style}
                testId={testId}
                ref={ref}
            >
                <View style={!!icon && styles.withIcon}>
                    {maybeRenderImage({placement})}

                    {maybeRenderIcon()}

                    <View style={styles.text}>
                        <HeadingSmall
                            id={`${uniqueId}-title`}
                            style={styles.title}
                        >
                            {title}
                        </HeadingSmall>
                        <Body id={`${uniqueId}-content`}>{content}</Body>
                    </View>
                </View>

                {maybeRenderActions(close as () => unknown)}
            </PopoverContentCore>
        );
    },
);

PopoverContent.displayName = "PopoverContent";

export default PopoverContent;

const styles = StyleSheet.create({
    /**
     * Shared styles
     */
    actions: {
        marginTop: spacing.large_24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    text: {
        justifyContent: "center",
    },

    title: {
        marginBottom: spacing.xSmall_8,
    },

    /**
     * Icon styles
     */
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: spacing.xxxLarge_64,
        width: spacing.xxxLarge_64,
        minWidth: spacing.xxxLarge_64,
        marginRight: spacing.medium_16,
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
        marginBottom: spacing.large_24,
        marginLeft: -spacing.large_24,
        marginRight: -spacing.large_24,
        marginTop: -spacing.large_24,
        width: `calc(100% + ${spacing.large_24 * 2}px)`,
    },

    imageToBottom: {
        marginBottom: -spacing.large_24,
        marginTop: spacing.large_24,
        order: 1,
    },
});
