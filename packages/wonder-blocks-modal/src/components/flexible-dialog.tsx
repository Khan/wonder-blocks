import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {PropsFor, StyleType} from "@khanacademy/wonder-blocks-core";

import {Id, View} from "@khanacademy/wonder-blocks-core";
import {breakpoint} from "@khanacademy/wonder-blocks-tokens";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import ModalDialog from "./modal-dialog";
import FlexiblePanel, {BackgroundStyles} from "./flexible-panel";

/**
 * The visible title content for the dialog. An ID will be automatically applied
 * for aria-labelledby on the dialog to the heading content or a div wrapper.
 */
type TitleOnly = {
    title: React.ReactNode;
    "aria-label"?: never;
    "aria-labelledby"?: never;
};
/**
 * The optional accessible name of the modal.
 * This is useful when there is no main heading in the dialog. A visible
 * heading with an id is preferred for automatic matching with aria-labelledby.
 */
type AriaLabelOnly = {
    title?: never;
    "aria-label": string;
    "aria-labelledby"?: never;
};
/**
 * The optional ID of the content describing this dialog, if applicable.
 */
type AriaLabelledByOnly = {
    title?: never;
    "aria-label"?: never;
    "aria-labelledby": string;
};

/**
 * One of the labeling methods is required:
 */
type AccessibleLabelProps = TitleOnly | AriaLabelOnly | AriaLabelledByOnly;

type Props = AccessibleLabelProps & {
    /**
     * The main heading of the modal, for labeling the dialog.
     * If string content, an ID will be generated for the heading for aria-labelledby on the dialog.
     * If a node, an ID will be applied to a DIV wrapping the node.
     */
    title?: React.ReactNode | string;
    /**
     * An optional id parameter for the main heading. If one is not provided,
     * an ID will be generated.
     */
    titleId?: string;
    /**
     * The content of the modal. Supports a render prop for placing the title in a slot.
     */
    content:
        | React.ReactElement<PropsFor<typeof FlexiblePanel>>
        | ((slots: RenderProps) => React.ReactNode);
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
     * The ID of the content describing this dialog, if applicable.
     */
    "aria-describedby"?: string;
};

type RenderProps = {
    title: React.ReactNode | string;
};
/**
 * A more flexible modal variant with fewer layout constraints. It can receive
 * a custom background (image or color), a title for the main heading, and that
 * title can optionally render in the content area through a render prop.
 *
 * One of the following is required for labeling the dialog:
 * - title content (React node or string)
 * - aria-label (string)
 * - aria-labelledby (string ID reference)
 *
 * ### Usage
 *
 * ```jsx
 * import {FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
 * import {BodyText} from "@khanacademy/wonder-blocks-typography";
 *
 * <FlexibleDialog
 *     title={<Heading size="xxlarge" id="main-heading">Select mission</Heading>}
 *     content={
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
const FlexibleDialog = ({
    onClose,
    title,
    content,
    above,
    below,
    style,
    closeButtonVisible = true,
    testId,
    titleId,
    role,
    backgroundStyles,
    ...accessibilityProps
}: Props): React.ReactElement => {
    return (
        <Id id={titleId}>
            {(uniqueId) => {
                const headingId = titleId || uniqueId;

                const renderedTitle =
                    title == null ? null : typeof title === "string" ? (
                        <Heading id={headingId}>{title}</Heading>
                    ) : (
                        <View id={headingId} testId="title-heading-wrapper">
                            {title}
                        </View>
                    );

                return (
                    <ModalDialog
                        style={[componentStyles.dialog, style]}
                        above={above}
                        below={below}
                        testId={testId}
                        aria-label={accessibilityProps["aria-label"]}
                        aria-labelledby={uniqueId}
                        aria-describedby={
                            accessibilityProps["aria-describedby"]
                        }
                        role={role}
                    >
                        <FlexiblePanel
                            backgroundStyles={backgroundStyles}
                            onClose={onClose}
                            title={renderedTitle}
                            content={content}
                            closeButtonVisible={closeButtonVisible}
                            testId={testId}
                        />
                    </ModalDialog>
                );
            }}
        </Id>
    );
};

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

export default FlexibleDialog;
