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
     */
    title: string,

    /**
     * The subtitle of the modal, appearing in the titlebar, below the title.
     */
    subtitle?: string,

    /**
     * Adds a breadcrumb-trail, appearing in the ModalHeader, above the title.
     */
    breadcrumbs?: React.Node,

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
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible?: boolean,

    /**
     * When set, provides a component that can render content above the top of the modal;
     * when not set, no additional content is shown above the modal.
     * This prop is passed down to the ModalDialog.
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

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

/**
 * This is the standard layout for most straightforward modal experiences.
 *
 * The ModalHeader is required, but the ModalFooter is optional.
 * The content of the dialog itself is fully customizable, but the left/right/top/bottom padding is fixed.
 */
export default class OnePaneDialog extends React.Component<Props> {
    static defaultProps = {
        closeButtonVisible: true,
    };

    render() {
        const {
            onClose,
            title,
            subtitle,
            breadcrumbs,
            footer,
            content,
            above,
            below,
            style,
            closeButtonVisible,
        } = this.props;

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <ModalDialog
                        style={[styles.dialog, style]}
                        above={above}
                        below={below}
                    >
                        <ModalPanel
                            onClose={onClose}
                            header={
                                <ModalHeader
                                    title={title}
                                    subtitle={subtitle}
                                    breadcrumbs={breadcrumbs}
                                />
                            }
                            content={content}
                            footer={footer}
                            closeButtonVisible={closeButtonVisible}
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
            width: "93.75%",
            maxWidth: 576,
            height: "81.25%",
            maxHeight: 624,
        },
    }),
};
