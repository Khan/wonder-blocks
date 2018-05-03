// @flow
import * as React from "react";

import {View} from "wonder-blocks-core";

import ModalLauncherPortal from "./modal-launcher-portal.js";
import ModalBackdrop from "./modal-backdrop.js";
import ScrollDisabler from "./scroll-disabler.js";
import type {ModalElement} from "../util/types.js";

type Props = {
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
    modal: ModalElement | (({closeModal: () => void}) => ModalElement),

    /**
     * Use the children-as-function pattern to pass a openModal function for
     * use anywhere within children. This provides a lot of flexibility in
     * terms of what actions may trigger the ModalLauncher to launch the modal.
     *
     * Note: Don't call `openModal` while rendering! It should be used to
     * respond to user intearction, like `onClick`.
     */
    children: ({openModal: () => void}) => React.Node,

    /**
     * If the parent needs to be notified when the modal is closed, use
     * this prop. You probably want to use this instead of `onClickCloseButton`
     * on the modals themselves, since this will capture a more complete set of
     * close events.
     */
    onClose?: () => void,
};

type State = {
    /** Whether the modal should currently be open. */
    opened: boolean,
};

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
 * like StandardModal, OneColumnModal, or TwoColumnModal, and is provided via
 * the `modal` prop.
 */
export default class ModalLauncher extends React.Component<Props, State> {
    state = {opened: false};

    _openModal = () => {
        this.setState({opened: true});
    };

    _closeModal = () => {
        this.setState({opened: false}, () => {
            this.props.onClose && this.props.onClose();
        });
    };

    _renderModal() {
        if (typeof this.props.modal === "function") {
            return this.props.modal({
                closeModal: this._closeModal,
            });
        } else {
            return this.props.modal;
        }
    }

    render() {
        const renderedChildren = this.props.children({
            openModal: this._openModal,
        });

        return (
            // TODO(mdr): This can be a fragment once we're on React 16.
            <View>
                {renderedChildren}
                {this.state.opened && (
                    <ModalLauncherPortal>
                        <ModalBackdrop onCloseModal={this._closeModal}>
                            {this._renderModal()}
                        </ModalBackdrop>
                    </ModalLauncherPortal>
                )}
                {this.state.opened && (
                    <ModalLauncherKeypressListener onClose={this._closeModal} />
                )}
                {this.state.opened && <ScrollDisabler />}
            </View>
        );
    }
}

/** A component that, when mounted, calls `onClose` when Escape is pressed. */
class ModalLauncherKeypressListener extends React.Component<{
    onClose: () => void,
}> {
    componentDidMount() {
        window.addEventListener("keyup", this._handleKeyup);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this._handleKeyup);
    }

    _handleKeyup = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            this.props.onClose();
        }
    };

    render() {
        return null;
    }
}
