import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import type {WithActionSchedulerProps} from "@khanacademy/wonder-blocks-timing";

import FocusTrap from "./focus-trap";
import DrawerBackdrop from "./drawer-backdrop";
import ScrollDisabler from "./scroll-disabler";
import type {DrawerAlignment, ModalElement} from "../util/types";
import ModalContext from "./modal-context";

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
     * respond to user intearction, like `onClick`.
     */
    modal: ModalElement | ((props: {closeModal: () => void}) => ModalElement);

    alignment: DrawerAlignment;
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
    children?: (arg1: {openModal: () => unknown}) => React.ReactNode;
}> &
    WithActionSchedulerProps;

const defaultProps = {
    backdropDismissEnabled: true,
} as const;

function DrawerLauncher(props: Props) {
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
    } = props;

    // State for uncontrolled mode
    const [uncontrolledOpened, setUncontrolledOpened] = React.useState(false);

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
        if (typeof controlledOpened === "boolean") {
            onClose?.();
        } else {
            setUncontrolledOpened(false);
        }
        returnFocus();
    }, [controlledOpened, onClose, returnFocus]);

    const openModal = React.useCallback(() => {
        saveLastElementFocused();
        setUncontrolledOpened(true);
    }, [saveLastElementFocused]);

    const renderModal = React.useCallback(() => {
        if (typeof modal === "function") {
            return modal({closeModal: handleCloseModal});
        }
        return modal;
    }, [modal, handleCloseModal]);

    const renderedChildren = children ? children({openModal}) : null;

    const body = document.body;
    if (!body) {
        return null;
    }

    return (
        <ModalContext.Provider value={{closeModal: handleCloseModal}}>
            {renderedChildren}
            {opened &&
                ReactDOM.createPortal(
                    <FocusTrap style={styles.container}>
                        <DrawerBackdrop
                            alignment={props.alignment}
                            initialFocusId={initialFocusId}
                            testId={testId}
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
                )}
            {opened && (
                <DrawerLauncherKeypressListener onClose={handleCloseModal} />
            )}
            {opened && <ScrollDisabler />}
        </ModalContext.Provider>
    );
}

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

export default withActionScheduler(DrawerLauncher);
