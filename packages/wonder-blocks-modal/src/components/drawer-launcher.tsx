import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import type {WithActionSchedulerProps} from "@khanacademy/wonder-blocks-timing";
import {breakpoint} from "@khanacademy/wonder-blocks-tokens";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import FocusTrap from "./focus-trap";
import DrawerBackdrop from "./drawer-backdrop";
import ScrollDisabler from "./scroll-disabler";
import type {DrawerAlignment, ModalElement} from "../util/types";
import ModalContext from "./modal-context";
import FlexibleDialog, {type FlexibleDialogStyles} from "./flexible-dialog";

type Props = Readonly<{
    /**
     * The modal to render.
     *
     * The modal will be rendered inside of a container whose parent is
     * document.body. This allows us to use DrawerLauncher within menus and
     * other components that clip their content. If the modal needs to close
     * itself by some other means than tapping the backdrop or the default
     * close button a render callback can be passed. The closeModal function
     * provided to this callback can be called to close the modal.
     *
     * Note: Don't call `closeModal` while rendering! It should be used to
     * respond to user interaction, like `onClick`.
     */
    modal:
        | ModalElement
        | ((props: {
              closeModal: () => void;
              styles?: FlexibleDialogStyles;
          }) => ModalElement);
    /**
     * Positioning of the drawer. Uses logical properties to support
     * different writing modes:
     * - `inlineStart` / left in Left-To-Right
     * - `inlineEnd` / right in Left-To-Right
     * - `blockEnd` / bottom
     */
    alignment: DrawerAlignment;
    /**
     * Optional styles for the DrawerLauncher.
     *
     * This can be used to style the container that holds the focus trap, modal
     * dialog, and scrollable region.
     */
    styles?: {
        container?: StyleType;
    };
    /**
     * Optional number of milliseconds for slide-in animation. Defaults to 400ms.
     * Used to ensure timing of focused elements after modals are opened.
     *
     * Turned off when `animated` option is `false` for reduced-motion preferences.
     */
    timingDuration?: number;
    /**
     * Whether to include animation in the `DrawerLauncher` and child components.
     * This should be false if the user has `prefers-reduced-motion` opted in.
     * Defaults to `true`.
     */
    animated?: boolean;
    /**
     * Enables the backdrop to dismiss the modal on click/tap
     */
    backdropDismissEnabled?: boolean;
    /**
     * The selector for the element that will be focused when the dialog shows.
     * When not set, the first tabbable element within the dialog will be used,
     * which usually is the dismiss button (X).
     */
    initialFocusId?: string;
    /**
     * The selector for the element that will be focused after the dialog
     * closes. When not set, the last element focused outside the modal will
     * be used if it exists.
     */
    closedFocusId?: string;
    /**
     * Test ID used for e2e testing. It's set on the DrawerBackdrop
     */
    testId?: string;

    /**
     * Renders the modal when true, renders nothing when false.
     *
     * Using this prop makes the component behave as a controlled component.
     * The parent is responsible for managing the opening/closing of the modal
     * when using this prop.  `onClose` should always be used and `children`
     * should never be used with this prop.  Not doing so will result in an
     * error being thrown.
     */
    opened?: boolean;

    /**
     * If the parent needs to be notified when the modal is closed, use this
     * prop. You probably want to use this instead of `onClose` on the modals
     * themselves, since this will capture a more complete set of close events.
     *
     * Called when the modal needs to notify the parent component that it should
     * be closed.
     *
     * This prop must be used when the component is being used as a controlled
     * component.
     */
    onClose?: () => unknown;

    /**
     * WARNING: This props should only be used when using the component as a
     * controlled component.
     */
    children?: (arg1: {
        openModal: () => unknown;
        styles?: FlexibleDialogStyles;
    }) => React.ReactNode;
}> &
    WithActionSchedulerProps;

// Set a default timing duration for animations and focus management. Also used for tests.
export const DEFAULT_TIMING_DURATION = 400;

const defaultProps = {
    backdropDismissEnabled: true,
    defaultTimingDuration: DEFAULT_TIMING_DURATION,
} as const;

const DrawerLauncher = (props: Props) => {
    const {
        modal,
        backdropDismissEnabled = defaultProps.backdropDismissEnabled,
        initialFocusId,
        closedFocusId,
        testId,
        opened: controlledOpened,
        onClose,
        children,
        schedule,
        alignment,
        styles,
        animated = true,
        timingDuration = defaultProps.defaultTimingDuration,
    } = props;

    // State for uncontrolled mode
    const [uncontrolledOpened, setUncontrolledOpened] = React.useState(false);
    // State to track exit animation
    const [isExiting, setIsExiting] = React.useState(false);

    const launcherRef = React.useRef<HTMLDivElement>(null);

    // Get Language direction from closest parent with dir attribute
    const [direction, setDirection] = React.useState<string | undefined>(
        undefined,
    );

    // Ref to store the last focused element
    const lastElementFocusedOutsideModalRef = React.useRef<HTMLElement | null>(
        null,
    );

    // Determine if we're in controlled or uncontrolled mode
    const opened =
        typeof controlledOpened === "boolean"
            ? controlledOpened
            : uncontrolledOpened;

    // Validation warnings
    React.useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            if (typeof controlledOpened === "boolean" && children) {
                // eslint-disable-next-line no-console
                console.warn("'children' and 'opened' can't be used together");
            }
            if (typeof controlledOpened === "boolean" && !onClose) {
                // eslint-disable-next-line no-console
                console.warn("'onClose' should be used with 'opened'");
            }
            if (typeof controlledOpened !== "boolean" && !children) {
                // eslint-disable-next-line no-console
                console.warn("either 'children' or 'opened' must be set");
            }
        }
    }, [controlledOpened, children, onClose]);

    const saveLastElementFocused = React.useCallback(() => {
        lastElementFocusedOutsideModalRef.current =
            document.activeElement as HTMLElement;
    }, []);

    // Save last focused element when modal opens
    React.useEffect(() => {
        if (controlledOpened && !prevControlledOpened.current) {
            saveLastElementFocused();
        }
        prevControlledOpened.current = controlledOpened;
    }, [controlledOpened, saveLastElementFocused]);

    const prevControlledOpened = React.useRef(controlledOpened);

    const returnFocus = React.useCallback(() => {
        // Focus on the specified element after closing the modal.
        const focusElement = closedFocusId
            ? document.getElementById(closedFocusId)
            : null;

        // Wait for modal to leave DOM before focusing
        schedule.animationFrame(() => {
            if (focusElement) {
                focusElement.focus();
            } else if (lastElementFocusedOutsideModalRef.current) {
                lastElementFocusedOutsideModalRef.current.focus();
            }
        });
    }, [closedFocusId, schedule]);

    const handleCloseModal = React.useCallback(() => {
        if (animated) {
            // If component is animated, allow time for exit animations
            setIsExiting(true);
            setTimeout(() => {
                setIsExiting(false);
                if (typeof controlledOpened === "boolean") {
                    onClose?.();
                } else {
                    setUncontrolledOpened(false);
                    onClose?.();
                }
                returnFocus();
            }, timingDuration);
        } else {
            // For non-animated case, cleanup immediately
            if (typeof controlledOpened === "boolean") {
                onClose?.();
            } else {
                setUncontrolledOpened(false);
                onClose?.();
            }
            returnFocus();
        }
    }, [controlledOpened, onClose, returnFocus, animated, timingDuration]);

    const openModal = React.useCallback(() => {
        saveLastElementFocused();
        setUncontrolledOpened(true);
    }, [saveLastElementFocused]);

    // Find the closest RTL context when the component mounts
    React.useEffect(() => {
        const rtlParent = launcherRef.current?.closest('[dir="rtl"]');
        setDirection(rtlParent ? "rtl" : undefined);
    }, []);

    const componentStyles = getComponentStyles({
        direction,
        alignment,
        animated,
        isExiting,
        timingDuration,
    });

    const renderModal = React.useCallback(() => {
        // Base styles that include drawer positioning and alignment
        const drawerStyles: FlexibleDialogStyles = {
            root: [componentStyles.dialogRoot, componentStyles[alignment]],
            dialog: componentStyles.dialog,
        };

        // Helper to clone FlexibleDialog with merged styles
        const cloneFlexibleDialog = (
            modalElement: React.ReactElement,
            additionalProps: any = {},
        ) => {
            const userStyles = modalElement.props.styles;
            const mergedStyles: FlexibleDialogStyles = {
                ...drawerStyles,
                ...userStyles,
                // Ensure root styles are properly combined as arrays
                root: userStyles?.root
                    ? [drawerStyles.root, userStyles.root]
                    : drawerStyles.root,
            };

            return React.cloneElement(modalElement, {
                ...modalElement.props,
                ...additionalProps,
                styles: mergedStyles,
            });
        };

        // Handle function-based modals
        if (typeof modal === "function") {
            const renderedModal = modal({
                closeModal: handleCloseModal,
                styles: drawerStyles,
            });

            return renderedModal?.type === FlexibleDialog
                ? cloneFlexibleDialog(renderedModal)
                : renderedModal;
        }

        // Handle element-based modals
        return modal?.type === FlexibleDialog
            ? cloneFlexibleDialog(modal)
            : modal;
    }, [alignment, componentStyles, modal, handleCloseModal]);

    const renderedChildren = children
        ? children({
              openModal,
          })
        : null;

    const body = document.body;
    if (!body) {
        return null;
    }

    return (
        <ModalContext.Provider value={{closeModal: handleCloseModal}}>
            <div ref={launcherRef}>{renderedChildren}</div>
            {(opened && !isExiting) || (opened && isExiting && animated)
                ? ReactDOM.createPortal(
                      <div dir={direction}>
                          <FocusTrap style={styles?.container}>
                              <DrawerBackdrop
                                  alignment={alignment}
                                  animated={animated}
                                  initialFocusId={initialFocusId}
                                  testId={testId}
                                  isExiting={isExiting}
                                  onCloseModal={
                                      backdropDismissEnabled
                                          ? handleCloseModal
                                          : () => {}
                                  }
                              >
                                  {renderModal()}
                              </DrawerBackdrop>
                          </FocusTrap>
                      </div>,
                      body,
                  )
                : null}
            {/* Only keep event listeners while actually open */}
            {opened && !isExiting && (
                <>
                    <DrawerLauncherKeypressListener
                        onClose={handleCloseModal}
                    />
                    <ScrollDisabler />
                </>
            )}
        </ModalContext.Provider>
    );
};

/** A component that, when mounted, calls `onClose` when Escape is pressed. */
function DrawerLauncherKeypressListener({onClose}: {onClose: () => unknown}) {
    React.useEffect(() => {
        const handleKeyup = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }
        };

        window.addEventListener("keyup", handleKeyup);
        return () => window.removeEventListener("keyup", handleKeyup);
    }, [onClose]);

    return null;
}

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
        dialogRoot: {
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

/**
 * A drawer modal launcher intended for the FlexibleDialog component. It can
 * align a dialog on the left (inlineStart), right (inlineEnd), or bottom of
 * the screen.
 * - Slide animations can be turned off with the `animated` prop.
 * - Timing of animations can be fine-tuned with the `timingDuration` prop, used on
 * enter and exit animations. It is also used to coordinate timing of focus management
 * on open and close.
 *
 * ### Usage
 *
 * ```jsx
 * import {DrawerLauncher} from "@khanacademy/wonder-blocks-modal";
 * import {FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
 * import {BodyText} from "@khanacademy/wonder-blocks-typography";
 *
 * <DrawerLauncher
 *      onClose={handleClose}
 *      opened={opened}
 *      animated={animated}
 *      alignment="inlineStart"
 *      modal={({closeModal}) => (
 *          <FlexibleDialog
 *              title="Assign Mastery Mission"
 *              content={
 *                  <View>
 *                      <BodyText>
 *                          Hello, world
 *                      </BodyText>
 *                  </View>
 *              }
 *          />
 *      )}
 * />
 * ```
 */
export default withActionScheduler(DrawerLauncher);
