import * as React from "react";
import * as ReactDOM from "react-dom";

import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import type {WithActionSchedulerProps} from "@khanacademy/wonder-blocks-timing";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import FocusTrap from "./focus-trap";
import DrawerBackdrop from "./drawer-backdrop";
import ScrollDisabler from "./scroll-disabler";
import type {DrawerAlignment, DrawerEasing, ModalElement} from "../util/types";
import {
    DrawerContext,
    DEFAULT_DRAWER_TIMING_DURATION_MS,
    DEFAULT_DRAWER_ANIMATED,
    DEFAULT_DRAWER_BACKDROP_DISMISS_ENABLED,
    DEFAULT_DRAWER_IS_EXITING,
} from "../util/drawer-context";
import {DRAWER_EXIT_DURATION_MS} from "../util/drawer-animation";
import ModalContext from "./modal-context";
import type {DrawerDialogStyles} from "./drawer-dialog";

/**
 * Re-exported centralized default values for the drawer system.
 *
 * These constants provide the default behavior for all drawer components
 * and can be imported by consumers who need to reference or override defaults.
 */
export {
    DEFAULT_DRAWER_TIMING_DURATION_MS,
    DEFAULT_DRAWER_ANIMATED,
    DEFAULT_DRAWER_BACKDROP_DISMISS_ENABLED,
    DEFAULT_DRAWER_IS_EXITING,
};

/** @deprecated Use DEFAULT_DRAWER_TIMING_DURATION_MS instead. */
export const DEFAULT_TIMING_DURATION_MS = DEFAULT_DRAWER_TIMING_DURATION_MS;

/**
 * A more restrictive type for DrawerLauncher that encourages the use of DrawerDialog.
 */
type DrawerModalElement = ModalElement;

/**
 * Function type that should return a DrawerDialog for proper drawer functionality
 */
type DrawerModalFunction = (props: {
    closeModal: () => void;
    styles?: DrawerDialogStyles;
}) => DrawerModalElement;

/**
 * Base props shared between controlled and uncontrolled modes
 */
type BaseProps = Readonly<{
    /**
     * The modal to render. Should be a DrawerDialog for proper drawer functionality.
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
     *
     * IMPORTANT: DrawerLauncher is designed specifically for DrawerDialog.
     * Using other modal types may result in incorrect animations, positioning,
     * and styling behavior.
     */
    modal: DrawerModalElement | DrawerModalFunction;
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
     * - `container` styles the container that holds the focus trap, modal dialog,
     *   and scrollable region.
     * - `backdrop` styles the backdrop overlaying the page behind the drawer,
     *   applied last so it overrides the backdrop's own styles. This is also the
     *   only way to reach the backdrop's opacity animation. Prefer
     *   `timingDuration` over setting `animationDuration` here, which desyncs the
     *   backdrop from the panel; `animationName: "none"` drops the animation in
     *   both directions, leaving the overlay to appear and disappear in a single
     *   frame each way.
     */
    styles?: {
        container?: StyleType;
        backdrop?: StyleType;
    };
    /**
     * Optional number of milliseconds for the slide animations, overriding the
     * duration of *both* phases. Also used to ensure timing of focused elements
     * after modals are opened.
     *
     * When unset, the enter runs at 300ms and the exit at 150ms. Easing is
     * unaffected either way.
     *
     * Turned off when `animated` option is `false` for reduced-motion preferences.
     */
    timingDuration?: number;
    /**
     * Optional per-phase easing overrides for the slide animation, e.g.
     * `{enter: "ease-out", exit: "ease-in"}`. Each value is any CSS
     * `animation-timing-function`, and either phase may be omitted to keep its
     * default curve.
     *
     * Applies to the sliding panel only; the backdrop's fade stays linear.
     */
    easing?: DrawerEasing;
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
}> &
    WithActionSchedulerProps;

/**
 * Controlled component mode: `opened` and `onClose` are required, `children` is forbidden
 */
type ControlledProps = BaseProps & {
    /**
     * Renders the modal when true, renders nothing when false.
     *
     * Using this prop makes the component behave as a controlled component.
     * The parent is responsible for managing the opening/closing of the modal
     * when using this prop. `onClose` is required and `children` is forbidden.
     */
    opened: boolean;
    /**
     * Called when the modal needs to notify the parent component that it should
     * be closed. Required when using `opened` prop (controlled mode).
     */
    onClose: () => unknown;
    children?: never;
};

/**
 * Uncontrolled component mode: `children` is required, `opened` is forbidden
 */
type UncontrolledProps = BaseProps & {
    /**
     * Render prop that provides `openModal` function to trigger the modal.
     * Required when not using `opened` prop (uncontrolled mode).
     */
    children: (arg1: {openModal: () => unknown}) => React.ReactNode;
    /**
     * Optional callback when the modal is closed in uncontrolled mode.
     */
    onClose?: () => unknown;
    opened?: never;
};

/**
 * DrawerLauncher props - enforces proper controlled/uncontrolled usage at the type level
 */
type Props = ControlledProps | UncontrolledProps;

const defaultProps = {
    backdropDismissEnabled: DEFAULT_DRAWER_BACKDROP_DISMISS_ENABLED,
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
        animated = DEFAULT_DRAWER_ANIMATED,
        // Undefined by default, so the drawer components fall back to their
        // per-phase durations and easing curves.
        timingDuration,
        easing,
    } = props;

    const easingEnter = easing?.enter;
    const easingExit = easing?.exit;

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
            // If component is animated, allow time for the exit animation.
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
            }, timingDuration ?? DRAWER_EXIT_DURATION_MS);
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

    // Memoize drawerDialogProps to prevent unnecessary re-renders of DrawerContext consumers
    const drawerDialogProps = React.useMemo(
        () => ({
            alignment,
            animated,
            isExiting,
            timingDuration,
            easing: {enter: easingEnter, exit: easingExit},
        }),
        // Depends on the easing phases individually rather than the object, so an
        // inline `easing={{enter: "..."}}` literal doesn't invalidate the memo.
        [
            alignment,
            animated,
            isExiting,
            timingDuration,
            easingEnter,
            easingExit,
        ],
    );

    const renderModal = React.useCallback(() => {
        // Handle function-based modals
        if (typeof modal === "function") {
            const renderedModal = modal({
                closeModal: handleCloseModal,
            });

            if (!renderedModal) {
                return null;
            }

            return renderedModal;
        }

        // Handle element-based modals
        if (!modal) {
            return null;
        }

        return modal;
    }, [modal, handleCloseModal]);

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
            {(opened && !isExiting) || (opened && isExiting && animated)
                ? ReactDOM.createPortal(
                      <DrawerContext.Provider value={drawerDialogProps}>
                          <FocusTrap style={styles?.container}>
                              <DrawerBackdrop
                                  initialFocusId={initialFocusId}
                                  testId={testId}
                                  style={styles?.backdrop}
                                  onCloseModal={
                                      backdropDismissEnabled
                                          ? handleCloseModal
                                          : () => {}
                                  }
                              >
                                  {renderModal()}
                              </DrawerBackdrop>
                          </FocusTrap>
                      </DrawerContext.Provider>,
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

/**
 * A drawer modal launcher intended specifically for the DrawerDialog component. It can
 * align a dialog on the left (inlineStart), right (inlineEnd), or bottom of
 * the screen.
 *
 * **IMPORTANT**: This component should ONLY be used with DrawerDialog. Using other
 * modal components may result in incorrect animations, positioning, and styling.
 *
 * - Slide animations can be turned off with the `animated` prop.
 * - The drawer slides in over 300ms easing out, and leaves over 150ms easing in.
 * - `timingDuration` overrides the duration of both phases. It is also used to
 * coordinate timing of focus management on open and close.
 * - `easing` overrides the curves per phase, e.g.
 * `easing={{enter: "ease-out", exit: "ease-in"}}`.
 *
 * For conditionally rendering modals, ensure there is only one `DrawerLauncher` in
 * your component tree. A launcher needs to stay mounted on the current page to
 * properly handle the user's keyboard focus on close of modals.
 * Read [more details on Confluence](https://khanacademy.atlassian.net/wiki/spaces/FRONTEND/blog/2025/11/24/4454383789/Wonder+Blocks+Modal+Tips+Tricks).
 *
 * ### Usage
 *
 * ```jsx
 * import {DrawerLauncher, DrawerDialog} from "@khanacademy/wonder-blocks-modal";
 * import {BodyText} from "@khanacademy/wonder-blocks-typography";
 *
 * <DrawerLauncher
 *      onClose={handleClose}
 *      opened={opened}
 *      animated={animated}
 *      alignment="inlineStart"
 *      modal={({closeModal}) => (
 *          <DrawerDialog
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

DrawerLauncher.displayName = "DrawerLauncher";

export default withActionScheduler(DrawerLauncher);
