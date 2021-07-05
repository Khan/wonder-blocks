// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import ModalDialog from "./modal-dialog.js";
import ModalPanel from "./modal-panel.js";

type Props = {|
    ...AriaProps,

    /**
     * The content of the modal.
     */
    children: React.Node,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler to
     * the `ModalLauncher`.  Doing so will result in a console.warn().
     */
    onClose?: () => mixed,

    /**
     * When true, the close button is shown; otherwise, the close button is not
     * shown.
     */
    closeButtonVisible?: boolean,

    /**
     * Optional custom styles.
     */
    style?: StyleType,

    /**
     * Test ID used for e2e testing. This ID will be passed down to the Dialog.
     */
    testId?: string,

    /**
     * An optional id parameter for the element that provides the dialog title.
     *
     * NOTE: The best way to generate a unique title id is by using IDProvider
     * in the parent container.
     */
    titleId?: string,
|};

type DefaultProps = {|
    closeButtonVisible: $PropertyType<Props, "closeButtonVisible">,
|};

/**
 * This is the minimal layout for modal experiences that only require to display
 * some content (no header or footer included).
 *
 * The content of the dialog itself is fully customizable, but the
 * left/right/top/bottom padding is fixed.
 */
export default class BasicDialog extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        closeButtonVisible: true,
    };

    render(): React.Node {
        const {
            onClose,
            children,
            style,
            closeButtonVisible,
            testId,
            titleId,
        } = this.props;

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <ModalDialog
                        style={[styles.dialog, style]}
                        testId={testId}
                        aria-labelledby={titleId}
                    >
                        <ModalPanel
                            onClose={onClose}
                            content={children}
                            closeButtonVisible={closeButtonVisible}
                            testId={testId}
                        />
                    </ModalDialog>
                )}
            </MediaLayout>
        );
    }
}

const styleSheets = {
    small: StyleSheet.create({
        dialog: {
            width: "100%",
            height: "100%",
            overflow: "hidden",
        },
    }),

    mdOrLarger: StyleSheet.create({
        dialog: {
            width: "auto",
            minWidth: 420,
            maxWidth: 576,
            height: "auto",
            minHeight: 320,
            maxHeight: 624,
        },
    }),
};
