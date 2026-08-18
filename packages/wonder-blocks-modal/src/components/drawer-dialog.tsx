import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {breakpoint, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import type {DrawerAlignment, DrawerEasing} from "../util/types";
import {
    useDrawerContext,
    DEFAULT_DRAWER_ANIMATED,
    DEFAULT_DRAWER_IS_EXITING,
} from "../util/drawer-context";
import {
    DRAWER_ENTER_DURATION_MS,
    DRAWER_ENTER_EASING,
    DRAWER_EXIT_DURATION_MS,
    DRAWER_EXIT_EASING,
    DRAWER_SLIDE_OFFSET,
} from "../util/drawer-animation";
import FlexibleDialog from "./flexible-dialog";
import theme from "../theme";
import {useDirectionDetection} from "../hooks/use-direction-detection";

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
     * Called when the close button is clicked.
     *
     * If you're using `DrawerLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `DrawerLauncher`.
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
    content?: StyleType;
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
 *
 * ### Custom styling
 *
 * You can optionally pass in the `styles` prop to override various parts of a DrawerDialog.
 *
 * - `styles.root` -  The outermost container of the dialog itself: alignment styles, box shadow, minWidth, maxWidth, width, height, maxHeight, etc.
 * - `styles.dialog` - The actual dialog element with minWidth/minHeight, mostly to override View default styles
 * - `styles.panel` - The inner dialog panel, targeting the internal `FlexiblePanel` component
 * - `styles.content` - The internal `ModalContent` component, which sets padding
 * - `styles.closeButton` - The close button, including absolute positioning
 */
const DrawerDialog = React.forwardRef(function DrawerDialog(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement {
    // Get drawer props from context
    const contextProps = useDrawerContext();
    const alignment = contextProps.alignment;
    const animated = contextProps.animated ?? DEFAULT_DRAWER_ANIMATED;
    const isExiting = contextProps.isExiting ?? DEFAULT_DRAWER_IS_EXITING;
    const timingDuration = contextProps.timingDuration;
    const easing = contextProps.easing;

    const {styles} = props;

    // Detect text direction from DOM
    const direction = useDirectionDetection();
    const isRtl = direction === "rtl";

    const componentStyles = getComponentStyles({
        alignment,
        isRtl,
        animated,
        isExiting,
        timingDuration,
        easing,
    });

    const alignmentStyles =
        (alignment && componentStyles[alignment]) || componentStyles.inlineEnd;

    return (
        <FlexibleDialog
            {...props}
            ref={ref}
            styles={{
                root: [
                    componentStyles.root,
                    alignmentStyles,
                    styles?.root,
                ].filter(Boolean),
                dialog: [componentStyles.dialog, styles?.dialog].filter(
                    Boolean,
                ),
                panel: styles?.panel,
                content: styles?.content,
                closeButton: styles?.closeButton,
            }}
        />
    );
});

/** The resting transform, shared by all alignments. */
const REST_TRANSFORM = "translate3d(0, 0, 0)";

/**
 * The transform that displaces the panel from its resting position by `offset`,
 * a CSS length or percentage, along the axis its alignment docks to.
 */
const getTransformValue = (
    isRtl: boolean,
    alignment: DrawerAlignment,
    offset: string,
): string => {
    if (alignment === "blockEnd") {
        // Positive Y is downward, off the bottom edge.
        return `translate3d(0, ${offset}, 0)`;
    }

    const isNegative = isRtl
        ? alignment === "inlineEnd"
        : alignment === "inlineStart";

    // calc() rather than a "-" prefix, since `offset` is a string.
    const signedOffset = isNegative ? `calc(-1 * ${offset})` : offset;

    return `translate3d(${signedOffset}, 0, 0)`;
};

/**
 * The panel fades as it slides. The slide covers only part of the panel's size,
 * so the fade is what carries it the rest of the way in and out.
 */
const createKeyframes = (isRtl: boolean, alignment: DrawerAlignment) => ({
    slideIn: {
        "0%": {
            transform: getTransformValue(isRtl, alignment, DRAWER_SLIDE_OFFSET),
            opacity: 0,
        },
        "100%": {
            transform: REST_TRANSFORM,
            opacity: 1,
        },
    },
    slideOut: {
        "0%": {
            transform: REST_TRANSFORM,
            opacity: 1,
        },
        "100%": {
            transform: getTransformValue(isRtl, alignment, DRAWER_SLIDE_OFFSET),
            opacity: 0,
        },
    },
});

/**
 * The animation properties shared by every alignment. `timingDuration` overrides
 * the duration of both phases; `easing` overrides either phase's curve.
 */
const getAnimationStyles = ({
    animated,
    isExiting,
    timingDuration,
    easing,
    alignmentKeyframes,
}: {
    animated: boolean;
    isExiting: boolean;
    timingDuration: number | undefined;
    easing: DrawerEasing | undefined;
    alignmentKeyframes: ReturnType<typeof createKeyframes> | null;
}) => {
    const phaseDuration = isExiting
        ? DRAWER_EXIT_DURATION_MS
        : DRAWER_ENTER_DURATION_MS;
    const phaseEasing = isExiting
        ? (easing?.exit ?? DRAWER_EXIT_EASING)
        : (easing?.enter ?? DRAWER_ENTER_EASING);

    // Aphrodite accepts a keyframes object for `animationName`, but the
    // CSSProperties type only permits a string. [FEI-5019]
    const animationName = (animated && alignmentKeyframes
        ? isExiting
            ? alignmentKeyframes.slideOut
            : alignmentKeyframes.slideIn
        : undefined) as unknown as React.CSSProperties["animationName"];

    return {
        animationName,
        animationDuration: `${timingDuration ?? phaseDuration}ms`,
        animationTimingFunction: phaseEasing,
        // `backwards` holds the off-screen `from` before the entrance starts;
        // `forwards` holds the off-screen `to` after the exit completes.
        animationFillMode: isExiting ? "forwards" : "backwards",
    };
};

const getComponentStyles = ({
    alignment,
    isRtl,
    animated,
    isExiting = false,
    timingDuration,
    easing,
}: {
    alignment: DrawerAlignment | undefined;
    isRtl: boolean;
    animated: boolean;
    timingDuration: number | undefined;
    easing: DrawerEasing | undefined;
    isExiting?: boolean;
}) => {
    // Generate keyframes for the current alignment and RTL state
    const alignmentKeyframes = alignment
        ? createKeyframes(isRtl, alignment)
        : null;

    const animationStyles = getAnimationStyles({
        animated,
        isExiting,
        timingDuration,
        easing,
        alignmentKeyframes,
    });

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
            minBlockSize: "100vh",

            // Use common widths for mininum/maximum
            minInlineSize: breakpoint.width.xsMax,
            maxInlineSize: breakpoint.width.smMax,
            width: "100%",

            // Unset minimums on smaller screens
            [breakpoint.mediaQuery.smOrSmaller]: {
                minInlineSize: "unset",
                maxInlineSize: "unset",
            },
        },
        dialog: {
            // Override the minBlockSize and minInlineSize on View
            // And allow BlockEnd content to provide its own height
            minBlockSize: alignment === "blockEnd" ? "unset" : "100vh",
            minInlineSize: "unset",
        },
        inlineStart: {
            ...animationStyles,
        },
        inlineEnd: {
            ...animationStyles,
        },
        blockEnd: {
            ...animationStyles,
            height: "auto",
            minBlockSize: "unset",
            maxInlineSize: "unset",

            [breakpoint.mediaQuery.smOrSmaller]: {
                height: "auto",
            },
        },
    });
};

DrawerDialog.displayName = "DrawerDialog";

export default DrawerDialog;
