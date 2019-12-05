// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {typeof Breadcrumbs} from "@khanacademy/wonder-blocks-breadcrumbs";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import {IDProvider} from "@khanacademy/wonder-blocks-core";
import ModalDialog from "../modal-dialog.js";
import ModalPanel from "../modal-panel.js";
import ModalHeader from "../modal-header.js";

type Common = {|
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
     * Test ID used for e2e testing. This ID will be passed down to the Dialog.
     */
    testId?: string,

    /**
     * An optional id parameter for the title. If one is
     * not provided, a unique id will be generated.
     */
    titleId?: string,
|};

type WithSubtitle = {|
    ...Common,

    /**
     * The subtitle of the modal, appearing in the titlebar, below the title.
     */
    subtitle: string,
|};

type WithBreadcrumbs = {|
    ...Common,

    /**
     * Adds a breadcrumb-trail, appearing in the ModalHeader, above the title.
     */
    breadcrumbs: React.Element<Breadcrumbs>,
|};

type Props = Common | WithSubtitle | WithBreadcrumbs;

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

    renderHeader(uniqueId: string): React.Element<typeof ModalHeader> {
        const {
            title,
            breadcrumbs = undefined,
            subtitle = undefined,
            testId,
        } = this.props;

        if (breadcrumbs) {
            return (
                <ModalHeader
                    title={title}
                    breadcrumbs={(breadcrumbs: React.Element<Breadcrumbs>)}
                    titleId={uniqueId}
                />
            );
        } else if (subtitle) {
            return (
                <ModalHeader
                    title={title}
                    subtitle={(subtitle: string)}
                    titleId={uniqueId}
                    testId={testId && `${testId}-ModalHeader`}
                />
            );
        } else {
            return <ModalHeader title={title} titleId={uniqueId} />;
        }
    }

    render() {
        const {
            onClose,
            footer,
            content,
            above,
            below,
            style,
            closeButtonVisible,
            testId,
            titleId,
        } = this.props;

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <IDProvider id={titleId} scope="modal">
                        {(uniqueId) => (
                            <ModalDialog
                                style={[styles.dialog, style]}
                                above={above}
                                below={below}
                                testId={testId}
                                aria-labelledby={uniqueId}
                            >
                                <ModalPanel
                                    onClose={onClose}
                                    header={this.renderHeader(uniqueId)}
                                    content={content}
                                    footer={footer}
                                    closeButtonVisible={closeButtonVisible}
                                    testId={testId}
                                />
                            </ModalDialog>
                        )}
                    </IDProvider>
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
