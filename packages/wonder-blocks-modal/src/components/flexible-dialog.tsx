import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {Id} from "@khanacademy/wonder-blocks-core";
import {breakpoint} from "@khanacademy/wonder-blocks-tokens";
import ModalDialog from "./modal-dialog";
import FlexiblePanel, {BackgroundStyles} from "./flexible-panel";

type Props = {
    /**
     * The main heading of the modal, for labeling the dialog.
     * If a string, an ID will be generated for the heading for aria-labelleby on the dialog.
     */
    mainHeadingContent: React.ReactNode | string;
    /**
     * An optional id parameter for the main heading. If one is not provided,
     * an ID will be generated.
     */
    titleId?: string;
    /**
     * The content of the modal.
     */
    content: React.ReactNode;
    /**
     * The content of the modal's footer. A great place for buttons!
     *
     * Content is right-aligned by default. To control alignment yourself,
     * provide a container element with 100% width.
     */
    footer?: React.ReactNode;
    /**
     * The background styles for the modal panel.
     * If not provided, defaults to semanticColor.surface.primary background color.
     */
    backgroundStyles?: BackgroundStyles;
    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.  Doing so will result in a console.warn().
     */
    onClose?: () => unknown;
    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible?: boolean;
    /**
     * When set, provides a component that can render content above the top of the modal;
     * when not set, no additional content is shown above the modal.
     * This prop is passed down to the ModalDialog.
     */
    above?: React.ReactNode;
    /**
     * When set, provides a component that will render content below the bottom of the modal;
     * when not set, no additional content is shown below the modal.
     * This prop is passed down to the ModalDialog.
     *
     * NOTE: Devs can customize this content by rendering the component assigned to this prop with custom styles,
     * such as by wrapping it in a View.
     */
    below?: React.ReactNode;
    /**
     * When set, overrides the default role value. Default role is "dialog"
     * Roles other than dialog and alertdialog aren't appropriate for this
     * component
     */
    role?: "dialog" | "alertdialog";
    /**
     * Optional custom styles.
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing. This ID will be passed down to the Dialog.
     */
    testId?: string;
    /**
     * The accessible name of the modal.
     * This is useful when there is no main heading in the dialog. But a visible
     * heading with an id is preferred for automatic matching with aria-labelledby.
     */
    "aria-label"?: string;
    /**
     * The ID of the content describing this dialog, if applicable.
     */
    "aria-describedby"?: string;
};

type DefaultProps = {
    closeButtonVisible: Props["closeButtonVisible"];
};

/**
 * A more flexible modal variant with fewer requirements: no header, optional footer.
 *
 * The content of the dialog itself is fully customizable, but the
 * left/right/top/bottom padding is fixed.
 *
 * ### Usage
 *
 * ```jsx
 * import {FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
 * import {BodyText} from "@khanacademy/wonder-blocks-typography";
 *
 * <FlexibleDialog
 *     content={
 *         <Heading size="xxlarge" id="main-heading">Select mission</Heading>
 *         <BodyText>
 *             {`Lorem ipsum dolor sit amet, consectetur adipiscing
 *             elit, sed do eiusmod tempor incididunt ut labore et
 *             dolore magna aliqua. Ut enim ad minim veniam,
 *             quis nostrud exercitation ullamco laboris nisi ut
 *             aliquip ex ea commodo consequat. Duis aute irure
 *             dolor in reprehenderit in voluptate velit esse
 *             cillum dolore eu fugiat nulla pariatur. Excepteur
 *             sint occaecat cupidatat non proident, sunt in culpa
 *             qui officia deserunt mollit anim id est.`}
 *         </BodyText>
 *     }
 * />
 * ```
 */
export default class FlexibleDialog extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        closeButtonVisible: true,
    };

    render(): React.ReactNode {
        const {
            onClose,
            footer,
            mainHeadingContent,
            content,
            above,
            below,
            style,
            closeButtonVisible,
            testId,
            titleId,
            role,
            backgroundStyles,
            "aria-label": ariaLabel,
            "aria-describedby": ariaDescribedBy,
        } = this.props;

        return (
            <Id id={titleId}>
                {(uniqueId) => (
                    <ModalDialog
                        style={[componentStyles.dialog, style]}
                        above={above}
                        below={below}
                        testId={testId}
                        aria-label={ariaLabel}
                        aria-labelledby={uniqueId}
                        aria-describedby={ariaDescribedBy}
                        role={role}
                    >
                        <FlexiblePanel
                            backgroundStyles={backgroundStyles}
                            onClose={onClose}
                            mainHeadingContent={mainHeadingContent}
                            content={content}
                            footer={footer}
                            closeButtonVisible={closeButtonVisible}
                            testId={testId}
                        />
                    </ModalDialog>
                )}
            </Id>
        );
    }
}

const componentStyles = StyleSheet.create({
    dialog: {
        width: "93.75%",
        maxWidth: 576,
        height: "81.25%",
        maxHeight: 624,

        [breakpoint.mediaQuery.sm]: {
            width: "100%",
            height: "100%",
            overflow: "hidden",
        },
    },
});
