import * as React from "react";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {StyleSheet} from "aphrodite";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import ModalContent from "./modal-content";
import CloseButton from "./close-button";
import theme from "../theme";

type RenderProps = {
    title: React.ReactNode | string;
};

type Props = {
    /**
     * The main heading of the FlexiblePanel. Used to label the dialog.
     */
    title?: React.ReactNode | string;
    /**
     * The main contents of the FlexiblePanel. All other parts of the panel
     * are positioned around it.
     */
    content:
        | React.ReactElement<PropsFor<typeof ModalContent>>
        | ((slots: RenderProps) => React.ReactElement)
        | React.ReactElement;
    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible: boolean;
    /**
     * Any optional styling to apply to the root (panel background) and close button.
     */
    styles?: {
        panel?: StyleType;
        content?: StyleType;
        closeButton?: StyleType;
    };
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
     * Dialog variant (e.g. FlexibleDialog).
     */
    testId?: string;
};

/**
 * FlexiblePanel is the content container.
 *
 * **Implementation notes:**
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to add this component inside the [FlexibleDialog](/#flexibledialog).
 * - If you need to create e2e tests, make sure to pass a `testId` prop. This
 *   will be passed down to this component using a sufix: e.g.
 *   `some-random-id-FlexiblePanel`. This scope will be propagated to the
 *   CloseButton element as well: e.g. `some-random-id-CloseButton`.
 *
 * ```js
 * <FlexibleDialog>
 *      <FlexiblePanel content={"custom content goes here"} />
 * </FlexibleDialog>
 * ```
 */
export default function FlexiblePanel({
    closeButtonVisible = true,
    content,
    title,
    onClose,
    styles,
    testId,
}: Props) {
    const panelRef = React.useRef<HTMLButtonElement>(null);

    const renderMainContent = React.useCallback((): React.ReactElement => {
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
            <ModalContent
                style={styles?.content}
                applySmallHeightStyles={false}
            >
                {contentNode}
            </ModalContent>
        );
        if (!mainContent) {
            return mainContent;
        }

        return React.cloneElement(mainContent, {
            // FlexibleDialog/DrawerDialog need scrolling at all times,
            // so we disable the small-height media query override
            applySmallHeightStyles: false,
            style: [mainContent.props.style],
        });
    }, [title, content, styles?.content]);

    const mainContent = renderMainContent();

    const defaultBackgroundStyle = {
        backgroundColor: semanticColor.core.background.base.default,
    };

    const combinedBackgroundStyles = {
        ...defaultBackgroundStyle,
        ...styles?.panel,
    };

    return (
        <View
            style={[componentStyles.wrapper, combinedBackgroundStyles]}
            testId={testId && `${testId}-panel`}
            ref={panelRef}
        >
            {closeButtonVisible && (
                <CloseButton
                    onClick={onClose}
                    style={[componentStyles.closeButton, styles?.closeButton]}
                    testId={testId && `${testId}-close`}
                />
            )}
            {mainContent}
        </View>
    );
}

FlexiblePanel.defaultProps = {
    closeButtonVisible: true,
};

const componentStyles = StyleSheet.create({
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
        // insetInlineEnd supports both RTL and LTR layouts
        insetInlineEnd: theme.closeButton.layout.gapRight,
        top: theme.closeButton.layout.gapTop,
        // This is to allow the button to be tab-ordered before the modal
        // content but still be above the header and content.
        zIndex: 1,

        // NOTE: IconButton uses :focus-visible, which is not supported for
        // programmatic focus. This is a workaround to make sure the focus
        // outline is visible when this control is focused.
        ":focus": focusStyles.focus[":focus-visible"],
    },
});
