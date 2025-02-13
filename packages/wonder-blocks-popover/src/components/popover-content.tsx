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

type Props =
    | (CommonProps & {
          /**
           * Decorate the popover with an illustrated icon. It cannot be used at the
           * same time with image.
           */
          icon?:
              | string
              | React.ReactElement<React.ComponentProps<"img">>
              | React.ReactElement<React.ComponentProps<"svg">>;
          /**
           * Alt text for the icon.
           */
          iconAlt?: string;
          /**
           * Decorate the popover with a full-bleed illustration. It cannot be used at
           * the same time with icon.
           */
          image?:
              | React.ReactElement<React.ComponentProps<"img">>
              | React.ReactElement<React.ComponentProps<"svg">>;

          emphasized?: never;
      })
    | (CommonProps & {
          /**
           * When true, changes the popover dialog background to blue; otherwise, the
           * popover dialog background is not modified. It can be used only with
           * Text-only popovers. It cannot be used with icon or image.
           */
          emphasized?: boolean;

          icon?: never;
          iconAlt?: never;
          image?: never;
      });

type DefaultProps = {
    closeButtonVisible: Props["closeButtonVisible"];
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
export default class PopoverContent extends React.Component<Props> {
    static defaultProps: DefaultProps = {
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

    // @ts-expect-error [FEI-5019] - TS2322 - Type '({ placement, }: PopoverContextType) => Element | null' is not assignable to type '(context: PopoverContextType) => ReactElement<any, string | JSXElementConstructor<any>>'.
    maybeRenderImage: (context: PopoverContextType) => React.ReactElement = ({
        placement,
    }) => {
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

    // @ts-expect-error [FEI-5019] - TS2322 - Type '() => JSX.Element | null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>>'.
    maybeRenderIcon: () => React.ReactElement = () => {
        const {icon, iconAlt} = this.props;

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

    // @ts-expect-error [FEI-5019] - TS2322 - Type '(close: () => unknown) => Element | null' is not assignable to type '(close: () => unknown) => ReactElement<any, string | JSXElementConstructor<any>>'.
    maybeRenderActions: (close: () => unknown) => React.ReactElement = (
        close,
    ) => {
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

    render(): React.ReactNode {
        const {
            closeButtonLabel,
            closeButtonVisible,
            content,
            emphasized = undefined,
            icon,
            image,
            style,
            title,
            testId,
            uniqueId,
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
                                    <HeadingSmall
                                        id={`${uniqueId}-title`}
                                        style={styles.title}
                                    >
                                        {title}
                                    </HeadingSmall>
                                    <Body id={`${uniqueId}-content`}>
                                        {content}
                                    </Body>
                                </View>
                            </View>

                            {this.maybeRenderActions(close as any)}
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
