import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {breakpoint, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import type {DrawerAlignment} from "../util/types";
import {DEFAULT_TIMING_DURATION} from "./drawer-launcher";
import FlexibleDialog from "./flexible-dialog";
import theme from "../theme";

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
     * An optional id parameter for the main heading. If one is not provided,
     * an ID will be generated.
     */
    titleId?: string;
    /**
     * The content of the modal. Supports a render prop for placing the title in a slot.
     */
    content: React.ReactElement | ((slots: RenderProps) => React.ReactElement);
    /**
     * Positioning of the drawer. Uses logical properties to support
     * different writing modes:
     * - `inlineStart` / left in Left-To-Right
     * - `inlineEnd` / right in Left-To-Right
     * - `blockEnd` / bottom
     */
    alignment?: DrawerAlignment;
    /**
     * Writing direction for the page: right-to-left (rtl) or left-to-right (ltr).
     * This is used to determine the direction of the slide-in animation.
     * Defaults to "ltr".
     */
    direction?: "rtl" | "ltr"; // Use a hook instead?
    /**
     * Optional number of milliseconds for slide-in animation. Defaults to 400ms.
     * Used to ensure timing of focused elements after modals are opened.
     *
     * Turned off when `animated` option is `false` for reduced-motion preferences.
     */
    timingDuration?: number;
    /**
     * Optional flag to determine whether the dialog is closing, to fine-tune animations.
     */
    isExiting?: boolean; // should this be in this layer?
    /**
     * Whether to include animation in the `DrawerLauncher` and child components.
     * This should be false if the user has `prefers-reduced-motion` opted in.
     * Defaults to `true`.
     */
    animated?: boolean;
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
    styles?: DrawerDialogStyles;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * The ID of the content describing this dialog, if applicable.
     */
    "aria-describedby"?: string;
};

// Style contract for DrawerLauncher with DrawerDialog
export type DrawerDialogStyles = {
    root?: StyleType;
    dialog?: StyleType;
    panel?: StyleType;
    closeButton?: StyleType;
};

type RenderProps = {
    title: React.ReactNode | string;
};

/**
 * A dialog to be used with DrawerLauncher that builds on top of FlexibleDialog.
 * It can receive a custom background (image or color), a title for the main
 * heading, and that title can optionally render in the content area through
 * a render prop.
 *
 * One of the following is required for labeling the dialog:
 * - title content (React element or string)
 * - aria-label (string)
 * - aria-labelledby (string ID reference)
 *
 * ### Usage
 *
 * ```jsx
 * import {DrawerDialog} from "@khanacademy/wonder-blocks-modal";
 * import {BodyText} from "@khanacademy/wonder-blocks-typography";
 *
 * <DrawerDialog
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
const DrawerDialog = React.forwardRef(function DrawerDialog(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement {
    const {
        styles,
        alignment,
        direction = "ltr",
        animated = true,
        isExiting,
        timingDuration = DEFAULT_TIMING_DURATION,
    } = props;

    const componentStyles = getComponentStyles({
        direction,
        alignment,
        animated,
        isExiting,
        timingDuration,
    });

    console.log(direction, alignment, animated, isExiting, timingDuration);

    return (
        <FlexibleDialog
            {...props}
            ref={ref}
            styles={{
                root: [componentStyles.root, styles?.root],
                dialog: [componentStyles.dialog, styles?.dialog],
                panel: styles?.panel,
                closeButton: styles?.closeButton,
            }}
        />
    );
});

const getTransformValue = (
    direction: string | undefined = "ltr",
    alignment: DrawerAlignment,
    percentage: number,
): string => {
    if (alignment === "blockEnd") {
        return `translate3d(0, ${percentage}%, 0)`;
    }

    // For inlineEnd, we need to reverse the direction compared to inlineStart
    const directionMultiplier =
        direction === "rtl"
            ? alignment === "inlineEnd"
                ? -1
                : 1
            : alignment === "inlineEnd"
              ? 1
              : -1;

    return `translate3d(${directionMultiplier * percentage}%, 0, 0)`;
};

const createKeyframes = (
    direction: string | undefined,
    alignment: DrawerAlignment,
) => ({
    slideIn: {
        "0%": {
            transform: getTransformValue(direction, alignment, 100),
            opacity: 0,
        },
        "100%": {
            transform: getTransformValue(direction, alignment, 0),
            opacity: 1,
        },
    },
    slideOut: {
        "0%": {
            transform: getTransformValue(direction, alignment, 0),
            opacity: 1,
        },
        "100%": {
            transform: getTransformValue(direction, alignment, 100),
            opacity: 0,
        },
    },
});

const getComponentStyles = ({
    alignment,
    direction,
    animated,
    isExiting,
    timingDuration,
}: {
    alignment: DrawerAlignment | undefined;
    direction: string | undefined;
    animated: boolean;
    timingDuration: number;
    isExiting?: boolean;
}) => {
    // Generate keyframes for the current alignment and RTL state
    const alignmentKeyframes = alignment
        ? createKeyframes(direction, alignment)
        : null;

    return StyleSheet.create({
        root: {
            boxShadow: theme.dialog.shadow.default,
            // Allows propagating the text color to all the children.
            color: semanticColor.core.foreground.neutral.strong,
            overflow: "auto", // Prevent dialog from scrolling with background
            position: "relative",
            willChange: "transform, opacity",

            // Override FlexibleDialog defaults for drawer usage
            height: "100%",
            minHeight: "100vh",

            // Use common widths for mininum/maximum
            minWidth: breakpoint.width.xsMax,
            maxWidth: breakpoint.width.smMax,
            width: "100%",

            // Unset minimums on smaller screens
            [breakpoint.mediaQuery.smOrSmaller]: {
                minWidth: "unset",
                maxWidth: "unset",
            },
        },
        dialog: {
            // Override the minHeight and minWidth on View
            // And allow BlockEnd content to provide its own height
            minHeight: alignment === "blockEnd" ? "unset" : "100vh",
            minWidth: "unset",
        },
        inlineStart: {
            // @ts-expect-error [FEI-5019] - `animationName` expects a string not an object
            animationName:
                animated &&
                alignmentKeyframes &&
                (isExiting
                    ? alignmentKeyframes.slideOut
                    : alignmentKeyframes.slideIn),
            animationDuration: `${timingDuration}ms`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
        },
        inlineEnd: {
            // @ts-expect-error [FEI-5019] - `animationName` expects a string not an object
            animationName:
                animated &&
                alignmentKeyframes &&
                (isExiting
                    ? alignmentKeyframes.slideOut
                    : alignmentKeyframes.slideIn),
            animationDuration: `${timingDuration}ms`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
        },
        blockEnd: {
            // @ts-expect-error [FEI-5019] - `animationName` expects a string not an object
            animationName:
                animated &&
                alignmentKeyframes &&
                (isExiting
                    ? alignmentKeyframes.slideOut
                    : alignmentKeyframes.slideIn),
            animationDuration: `${timingDuration}ms`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
            height: "auto",
            minHeight: "unset",
            maxWidth: "unset",

            [breakpoint.mediaQuery.smOrSmaller]: {
                height: "auto",
            },
        },
    });
};

export default DrawerDialog;
