// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import Color from "wonder-blocks-color";
import {View} from "wonder-blocks-core";

import ModalLauncherPortal from "./modal-launcher-portal.js";

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
    modal: React.Node | (({closeModal: () => void}) => React.Node),

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
     * If the parent needs to be notified when the modal is closed use
     * this prop.  Do not use `onClose` on the modals themselves as this
     * is used by ModalNavigator to determine when to remove the modal
     * the backdrop from the screen.
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
                        <View style={styles.modalPositioner}>
                            {this._renderModal()}
                        </View>
                    </ModalLauncherPortal>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalPositioner: {
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1080, // NOTE(mdr): Copied from Khan Academy webapp.

        width: "100%",
        height: "100%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // If the modal ends up being too big for the viewport (e.g., the min
        // height is triggered), add another scrollbar specifically for
        // scrolling modal content.
        //
        // TODO(mdr): The specified behavior is that the modal should scroll
        //     with the rest of the page, rather than separately, if overflow
        //     turns out to be necessary. That sounds hard to do; punting for
        //     now!
        overflow: "auto",

        background: Color.offBlack64,
    },
});
