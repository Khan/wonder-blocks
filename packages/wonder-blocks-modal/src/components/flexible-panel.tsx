import * as React from "react";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import ModalContent from "./modal-content";
import FlexibleFooter from "./flexible-footer";
import CloseButton from "./close-button";
import theme from "../theme";

export type BackgroundStyles = {
    /**
     * The background color of the panel. Defaults to semanticColor.surface.primary.
     */
    backgroundColor?: string;
    /**
     * The background image URL or gradient.
     */
    backgroundImage?: string;
    /**
     * How the background image should be repeated.
     */
    backgroundRepeat?: "repeat" | "no-repeat" | "repeat-x" | "repeat-y";
    /**
     * How the background image should be positioned.
     */
    backgroundPosition?: string;
    /**
     * How the background image should be sized.
     */
    backgroundSize?: string;
    /**
     * How the background image should fit within its container.
     */
    objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
};

type RenderProps = {
    title: React.ReactNode | string;
};

type Props = {
    /**
     * The main heading of the FlexiblePanel. Used to label the dialog.
     */
    title?: React.ReactNode | string;
    /**
     * Optional id reference for the main heading to label the parent dialog via aria-labelledby.
     */
    titleId?: string;
    /**
     * The main contents of the FlexiblePanel. All other parts of the panel
     * are positioned around it.
     */
    content:
        | React.ReactElement<PropsFor<typeof ModalContent>>
        | ((slots: RenderProps) => React.ReactNode)
        | React.ReactNode;
    /**
     * The optional background styles for the panel.
     * If not provided, defaults to semanticColor.surface.primary background color.
     */
    backgroundStyles?: BackgroundStyles;
    /**
     * A footer to show beneath the contents.
     */
    footer?:
        | React.ReactElement<PropsFor<typeof FlexibleFooter>>
        | React.ReactNode;
    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible: boolean;
    /**
     * Should the contents of the panel become scrollable should they
     * become too tall?
     */
    scrollOverflow: boolean;
    /**
     * Any optional styling to apply to the panel.
     */
    style?: StyleType;
    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you should not use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.  Doing so will throw an error.
     */
    onClose?: () => unknown;
    /**
     * Test ID used for e2e testing.
     *
     * In this case, this `testId` comes from the `testId` prop defined in the
     * Dialog variant (e.g. OnePaneDialog).
     */
    testId?: string;
};

/**
 * FlexiblePanel is the content container.
 *
 * **Implementation notes:**
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to add this component inside the [ModalDialog](/#modaldialog).
 * - If you need to create e2e tests, make sure to pass a `testId` prop. This
 *   will be passed down to this component using a sufix: e.g.
 *   `some-random-id-FlexiblePanel`. This scope will be propagated to the
 *   CloseButton element as well: e.g. `some-random-id-CloseButton`.
 *
 * ```js
 * <ModalDialog>
 *      <FlexiblePanel content={"custom content goes here"} />
 * </ModalDialog>
 * ```
 */
export default function FlexiblePanel({
    backgroundStyles,
    closeButtonVisible = true,
    scrollOverflow = true,
    content,
    titleId,
    title,
    footer,
    onClose,
    style,
    testId,
}: Props) {
    const renderMainContent = React.useCallback((): React.ReactNode => {
        const contentNode =
            typeof content === "function" ? (
                content({title})
            ) : (
                <>
                    {title}
                    {content}
                </>
            );
        const mainContent = ModalContent.isComponentOf(contentNode) ? (
            (contentNode as React.ReactElement<PropsFor<typeof ModalContent>>)
        ) : (
            <ModalContent>{contentNode}</ModalContent>
        );

        if (!mainContent) {
            return mainContent;
        }

        return React.cloneElement(mainContent, {
            // Pass the scrollOverflow and header in to the main content
            scrollOverflow,
            // We override the styling of the main content to help position
            // it if there is a footer or close button being
            // shown. We have to do this here as the ModalContent doesn't
            // know about things being positioned around it.
            style: [!!footer && styles.hasFooter, mainContent.props.style],
        });
    }, [title, content, footer, scrollOverflow]);

    const mainContent = renderMainContent();

    const defaultBackgroundStyle = {
        backgroundColor: semanticColor.surface.primary,
    };

    const combinedBackgroundStyles = {
        ...defaultBackgroundStyle,
        ...backgroundStyles,
    };

    return (
        <View
            style={[styles.wrapper, combinedBackgroundStyles, style]}
            testId={testId && `${testId}-panel`}
        >
            {closeButtonVisible && (
                <CloseButton
                    onClick={onClose}
                    style={[styles.closeButton]}
                    testId={testId && `${testId}-close`}
                />
            )}
            {mainContent}
            {!footer || FlexibleFooter.isComponentOf(footer) ? (
                footer
            ) : (
                <FlexibleFooter>{footer}</FlexibleFooter>
            )}
        </View>
    );
}

FlexiblePanel.defaultProps = {
    closeButtonVisible: true,
    scrollOverflow: true,
};

const styles = StyleSheet.create({
    wrapper: {
        flex: "1 1 auto",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
        height: "100%",
        width: "100%",
    },

    closeButton: {
        position: "absolute",
        right: theme.closeButton.layout.gapRight,
        top: theme.closeButton.layout.gapTop,
        // This is to allow the button to be tab-ordered before the modal
        // content but still be above the header and content.
        zIndex: 1,

        // NOTE: IconButton uses :focus-visible, which is not supported for
        // programmatic focus. This is a workaround to make sure the focus
        // outline is visible when this control is focused.
        ":focus": focusStyles.focus[":focus-visible"],
    },

    hasFooter: {
        // The space between the content and the footer
        paddingBlockEnd: theme.panel.layout.gap.default,
    },
});
