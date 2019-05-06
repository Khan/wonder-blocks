// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import ModalDialog from "../modal-dialog.js";
import ModalPanel from "../modal-panel.js";
import ModalHeader from "../modal-header.js";

type Props = {|
    ...AriaProps,

    /**
     * The content of the modal, appearing between the titlebar and footer.
     */
    content: React.Node,

    /**
     * The title of the modal, appearing in the titlebar.
     *
     * If a subtitle is also present, this becomes smaller to accommodate both
     * within the title bar.
     */
    title: string,

    /**
     * The subtitle of the modal, appearing in the titlebar, below the title.
     */
    subtitle?: string,

    /**
     * The content of the modal's footer. A great place for buttons!
     *
     * Content is right-aligned by default. To control alignment yourself,
     * provide a container element with 100% width.
     */
    footer?: React.Node,

    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.  Doing so will result in a console.warn().
     */
    onClose?: () => mixed,

    /**
     * When set, provides a component that can render content above the top of the modal;
     * when not set, no additional content is shown above the modal.
     * This prop is passed down to the ModalDialog.
     *
     * NOTE: Devs can customize this content by rendering the component assigned to this prop with custom styles,
     * such as by wrapping it in a View.
     */
    above?: React.Node,

    /**
     * When set, provides a component that will render content below the bottom of the modal;
     * when not set, no additional content is shown below the modal.
     * This prop is passed down to the ModalDialog.
     *
     * NOTE: Devs can customize this content by rendering the component assigned to this prop with custom styles,
     * such as by wrapping it in a View.
     */
    below?: React.Node,

    /**
     * Optional custom styles.
     */
    style?: StyleType,
|};

/**
 * This is the standard layout for most straightforward modal experiences.
 *
 * The ModalHeader is required, but the ModalFooter is optional.
 * The content of the dialog itself is fully customizable, but the left/right/top/bottom padding is fixed.
 */
export default class OnePaneDialog extends React.Component<Props> {
    render() {
        const {
            onClose,
            title,
            subtitle,
            footer,
            content,
            above,
            below,
            style,
        } = this.props;

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <ModalDialog
                        style={[styles.wrapper, style]}
                        above={above}
                        below={below}
                    >
                        <ModalPanel
                            onClose={onClose}
                            header={
                                <ModalHeader>
                                    <h1>{title}</h1>
                                    <h2>{subtitle}</h2>
                                </ModalHeader>
                            }
                            content={content}
                            footer={footer}
                            showCloseButton={true}
                        />
                    </ModalDialog>
                )}
            </MediaLayout>
        );
    }
}

const styleSheets = {
    all: StyleSheet.create({}),

    small: StyleSheet.create({}),

    mdOrLarger: StyleSheet.create({
        wrapper: {
            width: "93.75%",
            maxWidth: 576,
            height: "81.25%",
            maxHeight: 624,
        },
    }),
};
