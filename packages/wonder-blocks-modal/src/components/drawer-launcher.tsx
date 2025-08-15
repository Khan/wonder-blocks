import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import type {WithActionSchedulerProps} from "@khanacademy/wonder-blocks-timing";
import {breakpoint} from "@khanacademy/wonder-blocks-tokens";
import {zindexModal} from "../../../wonder-blocks-styles/src/styles/constants"; //"@khanacademy/wonder-blocks-styles";

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
        animated = true,
        timingDuration = defaultProps.defaultTimingDuration,
    } = props;

    // State for uncontrolled mode
    const [uncontrolledOpened, setUncontrolledOpened] = React.useState(false);
    // State to track exit animation
    const [isExiting, setIsExiting] = React.useState(false);

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

    const styles = getComponentStyles({
        alignment,
        animated,
        timingDuration,
        isExiting,
    });

    const renderModal = React.useCallback(() => {
        // Compose the props we need to pass in to various modals
        const composedProps = {
            styles: {
                root: styles.dialogRoot,
                dialog: styles.dialog,
                alignment: styles[alignment],
            },
        };
        if (typeof modal === "function") {
            // console.log("if", composedProps);
            const renderedModal = modal({
                closeModal: handleCloseModal,
                ...composedProps,
            });

            // If the rendered modal is a FlexibleDialog, inject animation props
            if (renderedModal && renderedModal.type === FlexibleDialog) {
                return React.cloneElement(renderedModal, {
                    ...composedProps,
                    ...renderedModal.props,
                });
            }
            return renderedModal;
        }

        // If the modal is a FlexibleDialog element, inject animation props
        if (modal && modal.type === FlexibleDialog) {
            return React.cloneElement(modal, {
                ...composedProps,
                ...modal.props,
            });
        }
        return modal;
    }, [alignment, styles, modal, handleCloseModal]);

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
            {renderedChildren}
            {/* Only render when opened (and not exiting) or when animating out */}
            {(opened && !isExiting) || (opened && isExiting && animated)
                ? ReactDOM.createPortal(
                      <FocusTrap style={styles.container}>
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
                      </FocusTrap>,
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

const keyframes = {
    slideInFromStart: {
        "0%": {
            transform: "translate3d(-100%, 0, 0)",
            opacity: 0,
        },
        "100%": {
            transform: "translate3d(0, 0, 0)",
            opacity: 1,
        },
    },
    slideOutToStart: {
        "0%": {
            transform: "translate3d(0, 0, 0)",
            opacity: 1,
        },
        "100%": {
            transform: "translate3d(-100%, 0, 0)",
            opacity: 0,
        },
    },
    slideInFromEnd: {
        "0%": {
            transform: "translate3d(100%, 0, 0)",
            opacity: 0,
        },
        "100%": {
            transform: "translate3d(0, 0, 0)",
            opacity: 1,
        },
    },
    slideOutToEnd: {
        "0%": {
            transform: "translate3d(0, 0, 0)",
            opacity: 1,
        },
        "100%": {
            transform: "translate3d(100%, 0, 0)",
            opacity: 0,
        },
    },
    slideInFromBottom: {
        "0%": {
            transform: "translate3d(0, 100%, 0)",
            opacity: 0,
        },
        "100%": {
            transform: "translate3d(0, 0, 0)",
            opacity: 1,
        },
    },
    slideOutToBottom: {
        "0%": {
            transform: "translate3d(0, 0, 0)",
            opacity: 1,
        },
        "100%": {
            transform: "translate3d(0, 100%, 0)",
            opacity: 0,
        },
    },
} as const;

const getComponentStyles = ({
    alignment,
    animated,
    isExiting,
    timingDuration,
}: {
    alignment: DrawerAlignment | undefined;
    animated: boolean;
    timingDuration: number;
    isExiting?: boolean;
}) =>
    StyleSheet.create({
        container: {
            zIndex: zindexModal,
        },
        dialogRoot: {
            height: "100%",
            minHeight: "100vh",
            // Use common widths for mininum/maximum
            minWidth: breakpoint.width.xsMax,
            maxWidth: breakpoint.width.smMax,
            width: "100%",

            // Unset minimums on small screens
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
            // @ts-expect-error [FEI-5019]: `animationName` expects a string not an object.
            animationName:
                animated &&
                (isExiting
                    ? keyframes.slideOutToStart
                    : keyframes.slideInFromStart),
            animationDuration: `${timingDuration}ms`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
        },
        inlineEnd: {
            // @ts-expect-error [FEI-5019]: `animationName` expects a string not an object.
            animationName:
                animated &&
                (isExiting
                    ? keyframes.slideOutToEnd
                    : keyframes.slideInFromEnd),
            animationDuration: `${timingDuration}ms`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
        },
        blockEnd: {
            // @ts-expect-error [FEI-5019]: `animationName` expects a string not an object.
            animationName:
                animated &&
                (isExiting
                    ? keyframes.slideOutToBottom
                    : keyframes.slideInFromBottom),
            animationDuration: `${timingDuration}ms`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
            height: "auto",
            minHeight: "unset",
            maxWidth: "unset",

            [breakpoint.mediaQuery.smOrSmaller]: {
                // override combined styles and breakpoints
                height: "auto",
            },
        },
    });

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
