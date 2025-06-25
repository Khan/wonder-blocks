import * as React from "react";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import ModalContent from "./modal-content";
import ModalHeader from "./modal-header";
import ModalFooter from "./modal-footer";
import CloseButton from "./close-button";
import theme from "../theme";

type Props = {
    /**
     * The main contents of the ModalPanel. All other parts of the panel
     * are positioned around it.
     */
    content:
        | React.ReactElement<PropsFor<typeof ModalContent>>
        | React.ReactNode;
    /**
     * The modal header to show at the top of the panel.
     */
    header?: React.ReactElement<PropsFor<typeof ModalHeader>> | React.ReactNode;
    /**
     * A footer to show beneath the contents.
     */
    footer?: React.ReactElement<PropsFor<typeof ModalFooter>> | React.ReactNode;
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
 * ModalPanel is the content container.
 *
 * **Implementation notes:**
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to add this component inside the [ModalDialog](/#modaldialog).
 * - If needed, you can also add a [ModalHeader](/#modalheader) using the
 *   `header` prop. Same goes for [ModalFooter](/#modalfooter).
 * - If you need to create e2e tests, make sure to pass a `testId` prop. This
 *   will be passed down to this component using a sufix: e.g.
 *   `some-random-id-ModalPanel`. This scope will be propagated to the
 *   CloseButton element as well: e.g. `some-random-id-CloseButton`.
 *
 * ```js
 * <ModalDialog>
 *      <ModalPanel content={"custom content goes here"} />
 * </ModalDialog>
 * ```
 */
export default function ModalPanel({
    closeButtonVisible = true,
    scrollOverflow = true,
    content,
    footer,
    header,
    onClose,
    style,
    testId,
}: Props) {
    const renderMainContent = React.useCallback((): React.ReactNode => {
        const mainContent = ModalContent.isComponentOf(content) ? (
            (content as React.ReactElement<PropsFor<typeof ModalContent>>)
        ) : (
            <ModalContent>{content}</ModalContent>
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
    }, [content, footer, scrollOverflow]);

    const mainContent = renderMainContent();

    return (
        <View
            style={[styles.wrapper, style]}
            testId={testId && `${testId}-panel`}
        >
            {closeButtonVisible && (
                <CloseButton
                    onClick={onClose}
                    style={[styles.closeButton]}
                    testId={testId && `${testId}-close`}
                />
            )}
            {header}
            {mainContent}
            {!footer || ModalFooter.isComponentOf(footer) ? (
                footer
            ) : (
                <ModalFooter>{footer}</ModalFooter>
            )}
        </View>
    );
}

ModalPanel.defaultProps = {
    closeButtonVisible: true,
    scrollOverflow: true,
};

const styles = StyleSheet.create({
    wrapper: {
        // Allows propagating the text color to all the children.
        color: semanticColor.core.foreground.neutral.strong,
        flex: "1 1 auto",
        flexDirection: "column",
        background: semanticColor.surface.primary,
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
