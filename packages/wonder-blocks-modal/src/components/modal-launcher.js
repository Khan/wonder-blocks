// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import type {
    WithActionSchedulerProps,
    WithoutActionScheduler,
} from "@khanacademy/wonder-blocks-timing";

import FocusTrap from "./focus-trap.js";
import ModalBackdrop from "./modal-backdrop.js";
import ScrollDisabler from "./scroll-disabler.js";
import type {ModalElement} from "../util/types.js";
import ModalContext from "./modal-context.js";

type CommonProps = {|
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
    modal: ModalElement | (({|closeModal: () => void|}) => ModalElement),

    /**
     * If the parent needs to be notified when the modal is closed, use this
     * prop. You probably want to use this instead of `onClose` on the modals
     * themselves, since this will capture a more complete set of close events.
     */
    onClose?: () => mixed,

    /**
     * Enables the backdrop to dismiss the modal on click/tap
     */
    backdropDismissEnabled?: boolean,

    /**
     * The selector for the element that will be focused when the dialog shows.
     * When not set, the first tabbable element within the dialog will be used.
     */
    initialFocusId?: string,

    /**
     * The selector for the element that will be focused after the dialog
     * closes. When not set, the last element focused outside the modal will
     * be used if it exists.
     */
    closedFocusId?: string,

    /**
     * Test ID used for e2e testing. It's set on the ModalBackdrop
     */
    testId?: string,

    ...WithActionSchedulerProps,
|};

type ControlledProps = {|
    ...CommonProps,
    /**
     * Renders the modal when true, renders nothing when false.
     *
     * Using this prop makes the component behave as a controlled component.
     * The parent is responsible for managing the opening/closing of the modal
     * when using this prop.  `onClose` should always be used and `children`
     * should never be used with this prop.  Not doing so will result in an
     * error being thrown.
     */
    opened: boolean,

    /**
     * Called when the modal needs to notify the parent component that it should
     * be closed.
     *
     * This prop must be used when the component is being used as a controlled
     * component.
     */
    onClose: () => mixed,
|};

type DefaultProps = {|
    backdropDismissEnabled: $PropertyType<Props, "backdropDismissEnabled">,
|};

type UncontrolledProps = {|
    ...CommonProps,
    children: ({|openModal: () => mixed|}) => React.Node,
|};

type Props = ControlledProps | UncontrolledProps;

type State = {|
    /** Whether the modal should currently be open. */
    opened: boolean,
|};

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
class ModalLauncher extends React.Component<Props, State> {
    /**
     * The most recent element _outside this component_ that received focus.
     * Be default, it captures the element that triggered the modal opening
     */
    lastElementFocusedOutsideModal: ?HTMLElement;

    static defaultProps: DefaultProps = {
        backdropDismissEnabled: true,
    };

    static getDerivedStateFromProps(
        props: Props,
        state: State,
    ): ?Partial<State> {
        if (typeof props.opened === "boolean" && props.children) {
            // eslint-disable-next-line no-console
            console.warn("'children' and 'opened' can't be used together");
        }
        if (typeof props.opened === "boolean" && !props.onClose) {
            // eslint-disable-next-line no-console
            console.warn("'onClose' should be used with 'opened'");
        }
        if (typeof props.opened !== "boolean" && !props.children) {
            // eslint-disable-next-line no-console
            console.warn("either 'children' or 'opened' must be set");
        }
        return {
            opened:
                typeof props.opened === "boolean" ? props.opened : state.opened,
        };
    }

    state: State = {opened: false};

    componentDidUpdate(prevProps: Props) {
        // ensures the element is stored only when the modal is opened
        if (!prevProps.opened && this.props.opened) {
            this._saveLastElementFocused();
        }
    }

    _saveLastElementFocused: () => void = () => {
        // keep a reference of the element that triggers the modal
        this.lastElementFocusedOutsideModal = document.activeElement;
    };

    _openModal: () => void = () => {
        this._saveLastElementFocused();
        this.setState({opened: true});
    };

    _returnFocus: () => void = () => {
        const {closedFocusId, schedule} = this.props;
        const lastElement = this.lastElementFocusedOutsideModal;

        // Focus on the specified element after closing the modal.
        if (closedFocusId) {
            const focusElement = (ReactDOM.findDOMNode(
                document.getElementById(closedFocusId),
            ): any);

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
    };

    handleCloseModal: () => void = () => {
        this.setState({opened: false}, () => {
            const {onClose} = this.props;

            onClose && onClose();
            this._returnFocus();
        });
    };

    _renderModal(): ModalElement {
        if (typeof this.props.modal === "function") {
            return this.props.modal({
                closeModal: this.handleCloseModal,
            });
        } else {
            return this.props.modal;
        }
    }

    render(): React.Node {
        const renderedChildren = this.props.children
            ? this.props.children({
                  openModal: this._openModal,
              })
            : null;

        const {body} = document;
        if (!body) {
            return null;
        }

        return (
            // This flow check is valid, it's the babel plugin which is broken,
            // see modal-context.js for details.
            // $FlowFixMe
            <ModalContext.Provider value={{closeModal: this.handleCloseModal}}>
                {renderedChildren}
                {this.state.opened &&
                    ReactDOM.createPortal(
                        /* We need the container View that FocusTrap creates to be at the
                           correct z-index so that it'll be above the global nav in webapp. */
                        <FocusTrap style={styles.container}>
                            <ModalBackdrop
                                initialFocusId={this.props.initialFocusId}
                                testId={this.props.testId}
                                onCloseModal={
                                    this.props.backdropDismissEnabled
                                        ? this.handleCloseModal
                                        : () => {}
                                }
                            >
                                {this._renderModal()}
                            </ModalBackdrop>
                        </FocusTrap>,
                        body,
                    )}
                {this.state.opened && (
                    <ModalLauncherKeypressListener
                        onClose={this.handleCloseModal}
                    />
                )}
                {this.state.opened && <ScrollDisabler />}
            </ModalContext.Provider>
        );
    }
}

/** A component that, when mounted, calls `onClose` when Escape is pressed. */
class ModalLauncherKeypressListener extends React.Component<{|
    onClose: () => mixed,
|}> {
    componentDidMount() {
        window.addEventListener("keyup", this._handleKeyup);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this._handleKeyup);
    }

    _handleKeyup = (e: KeyboardEvent) => {
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
            this.props.onClose();
        }
    };

    render(): React.Node {
        return null;
    }
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

type ExportProps = WithoutActionScheduler<
    React.ElementConfig<typeof ModalLauncher>,
>;

export default (withActionScheduler(
    ModalLauncher,
): React.ComponentType<ExportProps>);
