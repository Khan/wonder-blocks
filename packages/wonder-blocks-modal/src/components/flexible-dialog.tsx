import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {View} from "@khanacademy/wonder-blocks-core";

import {breakpoint, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import FlexiblePanel from "./flexible-panel";
import theme from "../theme";
import {DrawerAlignment} from "../util/types";

// One of these three props is required for labeling the dialog:
// `title`, `aria-label`, or `aria-labelledby`.
type AccessibleDialogProps =
    | {
          title: React.ReactElement | string;
          "aria-label"?: never;
          "aria-labelledby"?: string;
      }
    | {title?: never; "aria-label": string; "aria-labelledby"?: never}
    | {title?: never; "aria-label"?: never; "aria-labelledby": string};

type Props = AccessibleDialogProps & {
    /**
     * Optional alignment for the dialog when used in a DrawerLauncher.
     * Uses logical properties to support different writing modes:
     * - `inlineStart` / left in Left-To-Right
     * - `inlineEnd` / right in Left-To-Right
     * - `blockEnd` / bottom
     */
    alignment?: DrawerAlignment;
    /**
     * An optional id parameter for the main heading. If one is not provided,
     * an ID will be generated.
     */
    titleId?: string;
    /**
     * The content of the modal. Supports a render prop for placing the title in a slot.
     */
    content: React.ReactElement | ((slots: RenderProps) => React.ReactElement);
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
     * When set, overrides the default role value. Default role is "dialog"
     * Roles other than dialog and alertdialog aren't appropriate for this
     * component
     */
    role?: "dialog" | "alertdialog";
    /**
     * Optional custom styles.
     */
    styles?: {
        root?: StyleType;
        panel?: StyleType;
        closeButton?: StyleType;
    };
    /**
     * Test ID used for e2e testing.
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
 * A flexible modal variant with fewer layout constraints. It can receive
 * a custom background (image or color), a title for the main heading, and that
 * title can optionally render in the content area through a render prop.
 *
 * One of the following is required for labeling the dialog:
 * - title content (React element or string)
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
const FlexibleDialog = React.forwardRef(function FlexibleDialog(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement {
    const {
        onClose,
        title,
        content,
        styles,
        closeButtonVisible = true,
        testId,
        titleId,
        role = "dialog",
        alignment,
        ...accessibilityProps
    } = props;

    const uniqueId = React.useId();
    const headingId = titleId ?? uniqueId;

    const renderedTitle =
        title == null ? null : typeof title === "string" ? (
            <Heading id={headingId}>{title}</Heading>
        ) : (
            // Augment heading element with ID/testId
            React.cloneElement(title, {
                id: headingId,
                testId: "title-heading-wrapper",
            })
        );

    return (
        <View style={[componentStyles.dialog, styles?.root]}>
            <View
                role={role}
                aria-modal="true"
                aria-label={accessibilityProps["aria-label"]}
                aria-labelledby={headingId}
                aria-describedby={accessibilityProps["aria-describedby"]}
                ref={ref}
                testId={testId}
            >
                <FlexiblePanel
                    styles={{
                        panel: styles?.panel,
                        closeButton: styles?.closeButton,
                    }}
                    onClose={onClose}
                    title={renderedTitle}
                    content={content}
                    closeButtonVisible={closeButtonVisible}
                    testId={testId}
                />
            </View>
        </View>
    );
});

const componentStyles = StyleSheet.create({
    dialog: {
        borderRadius: theme.root.border.radius,
        boxShadow: theme.dialog.shadow.default,
        // Allows propagating the text color to all the children.
        color: semanticColor.core.foreground.neutral.strong,
        flexDirection: "row",
        height: "auto",
        maxHeight: "100vh",
        maxWidth: 576,
        overflow: "auto", // Prevent dialog from scrolling with background
        position: "relative",
        width: "93.75%",

        [breakpoint.mediaQuery.sm]: {
            width: "100%",
            height: "100vh",
            maxHeight: "100vh",
        },
    },
});

export default FlexibleDialog;
