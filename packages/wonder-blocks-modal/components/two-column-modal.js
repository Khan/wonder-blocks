// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import ModalDialog from "./modal-dialog.js";
import ModalContentPane from "./modal-content-pane.js";

type Props = {
    /** The sidebar contents (which becomes the header on mobile screens). */
    sidebar: React.Node,

    /** The main contents. */
    content: React.Node,

    /** The optional footer to display beneath the content. */
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
 * A two-column modal layout.
 */
export default class TwoColumnModal extends React.Component<Props> {
    static defaultProps = {
        onClickCloseButton: () => {},
    };

    render() {
        const {onClickCloseButton, sidebar, content, footer} = this.props;

        return (
            <ModalDialog style={styles.wrapper}>
                <ModalContentPane
                    showCloseButton
                    color="dark"
                    onClickCloseButton={onClickCloseButton}
                    style={styles.column}
                    content={sidebar}
                />
                <ModalContentPane
                    style={styles.column}
                    content={content}
                    footer={footer}
                />
            </ModalDialog>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: "86.72%",
        height: "60.42%",
        minHeight: 464,
    },

    column: {
        flex: "0 0 50%",
    },
});
