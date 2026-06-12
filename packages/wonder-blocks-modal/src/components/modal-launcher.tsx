import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import {
    withActionScheduler,
    type WithActionSchedulerProps,
    SchedulePolicy,
    ClearPolicy,
} from "@khanacademy/wonder-blocks-timing";

import FocusTrap from "./focus-trap";
import ModalBackdrop from "./modal-backdrop";
import ScrollDisabler from "./scroll-disabler";
import type {ModalElement} from "../util/types";
import ModalContext from "./modal-context";

type Props = Readonly<{
    /**
     * The modal to render, or `null` to indicate a closed state.
     *
     * Pass a React element or render function to show the modal. Pass `null`
     * to keep the launcher mounted but in a closed state — this is the
     * recommended pattern for controlled usage because it lets the launcher
     * capture and restore keyboard focus across open/close transitions:
     *
     * ```jsx
     * <ModalLauncher
     *     modal={isOpen ? <MyDialog /> : null}
     *     onClose={() => setIsOpen(false)}
     * />
     * ```
     *
     * The modal is rendered inside a portal appended to `document.body`, so
     * it won't be clipped by overflow constraints in the component tree. When
     * a render function is used, the `closeModal` callback can be called to
     * trigger a close:
     *
     * ```jsx
     * <ModalLauncher
     *     modal={({closeModal}) => <MyDialog onClose={closeModal} />}
     *     onClose={() => setIsOpen(false)}
     * />
     * ```
     *
     * Note: Don't call `closeModal` while rendering! It should be used to
     * respond to user interaction, like `onClick`.
     */
    modal: ModalElement | ((props: {closeModal: () => void}) => ModalElement);
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
     * Test ID used for e2e testing. It's set on the ModalBackdrop
     */
    testId?: string;

    /**
     * If the parent needs to be notified when the modal is closed, use this
     * prop. You probably want to use this instead of `onClose` on the modals
     * themselves, since this will capture a more complete set of close events.
     *
     * Called when the modal needs to notify the parent component that it should
     * be closed.
     *
     * Required when using controlled mode (no `children`) so that close events
     * initiated from within the modal (e.g. X button, Escape key, backdrop
     * click) propagate to the parent.
     */
    onClose?: () => unknown;

    /**
     * Render prop that receives an `openModal` callback. When provided the
     * component operates in **uncontrolled** mode: the launcher manages its
     * own open/close state, and the `modal` prop always describes the dialog
     * content (never `null`).
     *
     * ```jsx
     * <ModalLauncher modal={<MyDialog />}>
     *     {({openModal}) => <button onClick={openModal}>Open</button>}
     * </ModalLauncher>
     * ```
     *
     * When omitted the component operates in **controlled** mode: pass
     * `modal={null}` to close and `modal={<MyDialog />}` to open.
     */
    children?: (arg1: {openModal: () => unknown}) => React.ReactNode;
}> &
    WithActionSchedulerProps;

/**
 * This component enables you to launch a modal, covering the screen.
 *
 * **Controlled mode** — keep the launcher always mounted and use
 * `modal={null}` to close:
 *
 * ```jsx
 * <ModalLauncher
 *     modal={isOpen ? <MyDialog /> : null}
 *     onClose={() => setIsOpen(false)}
 * />
 * ```
 *
 * **Uncontrolled mode** — use the `children` render prop to get an
 * `openModal` callback:
 *
 * ```jsx
 * <ModalLauncher modal={<MyDialog />}>
 *     {({openModal}) => <button onClick={openModal}>Open</button>}
 * </ModalLauncher>
 * ```
 */
const ModalLauncher = (props: Props): React.ReactElement | null => {
    const {
        backdropDismissEnabled = true,
        children,
        closedFocusId,
        initialFocusId,
        modal,
        onClose,
        schedule,
        testId,
    } = props;

    const lastElementFocusedOutsideModalRef = React.useRef<HTMLElement | null>(
        null,
    );

    // Uncontrolled open state (used only when `children` is provided)
    const [opened, setOpened] = React.useState(false);

    // In controlled mode (no children), open state is derived from the modal prop.
    const isControlled = !children;
    const isOpened = isControlled ? modal != null : opened;

    React.useEffect(() => {
        if (!isControlled && !onClose) {
            return;
        }
        if (isControlled && !onClose) {
            // eslint-disable-next-line no-console
            console.warn(
                "'onClose' should be provided when using ModalLauncher in controlled mode (without children)",
            );
        }
    }, [isControlled, onClose]);

    const saveLastElementFocused = React.useCallback(() => {
        // keep a reference of the element that triggers the modal
        // @ts-expect-error [FEI-5019] - TS2322 - Type 'Element | null' is not assignable to type 'HTMLElement | null'.
        lastElementFocusedOutsideModalRef.current = document.activeElement;
    }, []);

    const returnFocus = React.useCallback(() => {
        // Focus on the specified element after closing the modal.
        if (closedFocusId) {
            // eslint-disable-next-line import/no-deprecated
            const focusElement = ReactDOM.findDOMNode(
                document.getElementById(closedFocusId),
            ) as any;
            if (focusElement) {
                // Wait for the modal to leave the DOM before trying
                // to focus on the specified element.
                schedule.animationFrame(() => focusElement.focus(), {
                    schedulePolicy: SchedulePolicy.Immediately,
                    clearPolicy: ClearPolicy.Resolve,
                });
                return;
            }
        }

        const lastElement = lastElementFocusedOutsideModalRef.current;
        if (lastElement != null) {
            // Wait for the modal to leave the DOM before trying to
            // return focus to the element that triggered the modal.
            schedule.animationFrame(() => {
                lastElement.focus();
            });
        }
    }, [closedFocusId, schedule]);

    // Track modal prop transitions to manage focus in controlled mode.
    const prevModalRef = React.useRef(modal);
    React.useEffect(() => {
        if (!isControlled) {
            prevModalRef.current = modal;
            return;
        }
        const prevModal = prevModalRef.current;
        prevModalRef.current = modal;

        const wasOpen = prevModal != null;
        const isNowOpen = modal != null;

        if (!wasOpen && isNowOpen) {
            saveLastElementFocused();
        } else if (wasOpen && !isNowOpen) {
            returnFocus();
        }
    }, [modal, isControlled, saveLastElementFocused, returnFocus]);

    const openModal = React.useCallback(() => {
        saveLastElementFocused();
        setOpened(true);
    }, [saveLastElementFocused]);

    const handleCloseModal = React.useCallback(() => {
        if (!isControlled) {
            setOpened(false);
            returnFocus();
        }
        // In controlled mode, returnFocus() is called by the modal transition
        // effect once the parent updates modal to null.
        onClose?.();
    }, [isControlled, onClose, returnFocus]);

    const renderModal = React.useCallback((): ModalElement => {
        if (typeof modal === "function") {
            return modal({
                closeModal: handleCloseModal,
            });
        } else {
            return modal;
        }
    }, [modal, handleCloseModal]);

    const renderedChildren = children
        ? children({
              openModal,
          })
        : null;

    const {body} = document;
    if (!body) {
        return null;
    }

    return (
        <ModalContext.Provider value={{closeModal: handleCloseModal}}>
            {renderedChildren}
            {isOpened &&
                ReactDOM.createPortal(
                    /* We need the container View that FocusTrap creates to be at the
                       correct z-index so that it'll be above the global nav in webapp. */
                    <FocusTrap style={styles.container}>
                        <ModalBackdrop
                            initialFocusId={initialFocusId}
                            testId={testId}
                            onCloseModal={
                                backdropDismissEnabled
                                    ? handleCloseModal
                                    : () => {}
                            }
                        >
                            {renderModal()}
                        </ModalBackdrop>
                    </FocusTrap>,
                    body,
                )}
            {isOpened && (
                <ModalLauncherKeypressListener onClose={handleCloseModal} />
            )}
            {isOpened && <ScrollDisabler />}
        </ModalContext.Provider>
    );
};

/** A component that, when mounted, calls `onClose` when Escape is pressed. */
const ModalLauncherKeypressListener = ({
    onClose,
}: {
    onClose: () => unknown;
}): null => {
    const handleKeyup = React.useCallback(
        (e: KeyboardEvent) => {
            // We check the key as that's keyboard layout agnostic and also avoids
            // the minefield of deprecated number type properties like keyCode and
            // which, with the replacement code, which uses a string instead.
            if (e.key === "Escape") {
                // Stop the event going any further.
                // For cancellation events, like the Escape key, we generally should
                // air on the side of caution and only allow it to cancel one thing.
                // So, it's polite for us to stop propagation of the event.
                // Otherwise, we end up with UX where one Escape key press
                // unexpectedly cancels multiple things.
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }
        },
        [onClose],
    );

    React.useEffect(() => {
        window.addEventListener("keyup", handleKeyup);
        return () => {
            window.removeEventListener("keyup", handleKeyup);
        };
    }, [handleKeyup]);

    return null;
};

const styles = StyleSheet.create({
    container: {
        // This z-index is copied from the Khan Academy webapp.
        //
        // TODO(mdr): Should we keep this in a constants file somewhere? Or
        //     not hardcode it at all, and provide it to Wonder Blocks via
        //     configuration?
        zIndex: 1080,
    },
});

export default withActionScheduler(ModalLauncher);
