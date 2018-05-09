// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import ModalDialog from "./modal-dialog.js";
import ModalContentPane from "./modal-content-pane.js";
import ModalFooter from "./modal-footer.js";
import ModalContent from "./modal-content.js";

type Props = {
    /** The modal's content. */
    content: React.Node,

    /** The optional footer to display beneath the contents. */
    footer?: React.Node,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.
     *
     * This defaults to a no-op via `defaultProps`. (When used in a
     * `ModalLauncher`, we'll automatically add an extra listener here via
     * `cloneElement`, so that the `ModalLauncher` can listen for close button
     * clicks too.)
     */
    onClickCloseButton: () => void,
};

/**
 * A one-column modal layout.
 */
export default class OneColumnModal extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    render() {
        const {onClickCloseButton, content, footer} = this.props;

        return (
            <ModalDialog style={styles.wrapper}>
                <ModalContentPane
                    showCloseButton
                    onClickCloseButton={onClickCloseButton}
                    content={<ModalContent>{content}</ModalContent>}
                    footer={
                        footer ? <ModalFooter>{footer}</ModalFooter> : undefined
                    }
                />
            </ModalDialog>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: "64.65%",
    },
});
