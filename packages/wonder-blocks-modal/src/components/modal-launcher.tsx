import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import type {WithActionSchedulerProps} from "@khanacademy/wonder-blocks-timing";

import FocusTrap from "./focus-trap";
import ModalBackdrop from "./modal-backdrop";
import ScrollDisabler from "./scroll-disabler";
import type {ModalElement} from "../util/types";
import ModalContext from "./modal-context";

const {useState, useEffect, useRef, useCallback} = React;

type Props = Readonly<{
    /**
     * The modal to render.
     *
     * The modal will be rendered inside of a container whose parent is
     * document.body. This allows us to use ModalLauncher within menus and
     * other components that clip their content. If the modal needs to close
     * itself by some other means than tapping the backdrop or the default
     * close button a render callback can be passed. The closeModal function
     * provided to this callback can be called to close the modal.
     *
     * Note: Don't call `closeModal` while rendering! It should be used to
     * respond to user intearction, like `onClick`.
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
    children?: (arg1: {openModal: () => unknown}) => React.ReactNode;
}> &
    WithActionSchedulerProps;

/**
 * This component enables you to launch a modal, covering the screen.
 *
 * Children have access to `openModal` function via the function-as-children
 * pattern, so one common use case is for this component to wrap a button:
 *
 * ```js
 * <ModalLauncher modal={<TwoColumnModal ... />}>
 *     {({openModal}) => <button onClick={openModal}>Learn more</button>}
 * </ModalLauncher>
 * ```
 *
 * The actual modal itself is constructed separately, using a layout component
 * like OnePaneDialog and is provided via
 * the `modal` prop.
 */
function ModalLauncher({
    backdropDismissEnabled = true,
    modal,
    initialFocusId,
    closedFocusId,
    testId,
    opened,
    onClose,
    children,
    schedule,
}: Props): React.ReactElement | null {
    /**
     * The most recent element _outside this component_ that received focus.
     * By default, it captures the element that triggered the modal opening
     */
    const lastElementFocusedOutsideModal = useRef<HTMLElement | null>(null);

    const [internalOpened, setInternalOpened] = useState(false);

    // Handle validation warnings (equivalent to getDerivedStateFromProps)
    useEffect(() => {
        if (typeof opened === "boolean" && children) {
            // eslint-disable-next-line no-console
            console.warn("'children' and 'opened' can't be used together");
        }
        if (typeof opened === "boolean" && !onClose) {
            // eslint-disable-next-line no-console
            console.warn("'onClose' should be used with 'opened'");
        }
        if (typeof opened !== "boolean" && !children) {
            // eslint-disable-next-line no-console
            console.warn("either 'children' or 'opened' must be set");
        }
    }, [opened, children, onClose]);

    // Determine the current opened state (controlled vs uncontrolled)
    const isOpened = typeof opened === "boolean" ? opened : internalOpened;

    const saveLastElementFocused = useCallback(() => {
        // keep a reference of the element that triggers the modal
        // @ts-expect-error [FEI-5019] - TS2322 - Type 'Element | null' is not assignable to type 'HTMLElement | null | undefined'.
        lastElementFocusedOutsideModal.current = document.activeElement;
    }, []);

    const openModal = useCallback(() => {
        saveLastElementFocused();
        setInternalOpened(true);
    }, [saveLastElementFocused]);

    const returnFocus = useCallback(() => {
        const lastElement = lastElementFocusedOutsideModal.current;

        // Focus on the specified element after closing the modal.
        if (closedFocusId) {
            // eslint-disable-next-line import/no-deprecated
            const focusElement = ReactDOM.findDOMNode(
                document.getElementById(closedFocusId),
            ) as any;

            if (focusElement) {
                // Wait for the modal to leave the DOM before trying
                // to focus on the specified element.
                schedule.animationFrame(() => {
                    focusElement.focus();
                });
                return;
            }
        }

        if (lastElement != null) {
            // Wait for the modal to leave the DOM before trying to
            // return focus to the element that triggered the modal.
            schedule.animationFrame(() => {
                lastElement.focus();
            });
        }
    }, [closedFocusId, schedule]);

    const handleCloseModal = useCallback(() => {
        setInternalOpened(false);

        // Use setTimeout to ensure the state update has completed
        setTimeout(() => {
            onClose?.();
            returnFocus();
        }, 0);
    }, [onClose, returnFocus]);

    const renderModal = useCallback((): ModalElement => {
        if (typeof modal === "function") {
            return modal({
                closeModal: handleCloseModal,
            });
        } else {
            return modal;
        }
    }, [modal, handleCloseModal]);

    // Handle saving focus when modal opens (equivalent to componentDidUpdate)
    useEffect(() => {
        if (isOpened) {
            saveLastElementFocused();
        }
    }, [isOpened, saveLastElementFocused]);

    const renderedChildren = children
        ? children({
              openModal: openModal,
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
}

/** A component that, when mounted, calls `onClose` when Escape is pressed. */
function ModalLauncherKeypressListener({
    onClose,
}: {
    onClose: () => unknown;
}): React.ReactElement | null {
    useEffect(() => {
        const handleKeyup = (e: KeyboardEvent) => {
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
        };

        window.addEventListener("keyup", handleKeyup);

        return () => {
            window.removeEventListener("keyup", handleKeyup);
        };
    }, [onClose]);

    return null;
}

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
