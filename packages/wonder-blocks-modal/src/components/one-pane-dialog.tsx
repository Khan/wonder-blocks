import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Breadcrumbs} from "@khanacademy/wonder-blocks-breadcrumbs";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

// eslint-disable-next-line import/no-deprecated
import {IDProvider} from "@khanacademy/wonder-blocks-core";
import ModalDialog from "./modal-dialog";
import ModalPanel from "./modal-panel";
import ModalHeader from "./modal-header";

type Common = {
    /**
     * The content of the modal, appearing between the titlebar and footer.
     */
    content: React.ReactNode;
    /**
     * The title of the modal, appearing in the titlebar.
     */
    title: string;
    /**
     * The content of the modal's footer. A great place for buttons!
     *
     * Content is right-aligned by default. To control alignment yourself,
     * provide a container element with 100% width.
     */
    footer?: React.ReactNode;
    /**
     * Called when the close button is clicked.
     *
     * If you're using `ModalLauncher`, you probably shouldn't use this prop!
     * Instead, to listen for when the modal closes, add an `onClose` handler
     * to the `ModalLauncher`.  Doing so will result in a console.warn().
     */
    onClose?: () => unknown;
    /**
     * When true, the close button is shown; otherwise, the close button is not shown.
     */
    closeButtonVisible?: boolean;
    /**
     * When set, provides a component that can render content above the top of the modal;
     * when not set, no additional content is shown above the modal.
     * This prop is passed down to the ModalDialog.
     */
    above?: React.ReactNode;
    /**
     * When set, provides a component that will render content below the bottom of the modal;
     * when not set, no additional content is shown below the modal.
     * This prop is passed down to the ModalDialog.
     *
     * NOTE: Devs can customize this content by rendering the component assigned to this prop with custom styles,
     * such as by wrapping it in a View.
     */
    below?: React.ReactNode;
    /**
     * When set, overrides the default role value. Default role is "dialog"
     * Roles other than dialog and alertdialog aren't appropriate for this
     * component
     */
    role?: "dialog" | "alertdialog";
    /**
     * Optional custom styles.
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing. This ID will be passed down to the Dialog.
     */
    testId?: string;
    /**
     * An optional id parameter for the title. If one is
     * not provided, a unique id will be generated.
     */
    titleId?: string;
    /**
     * The ID of the content describing this dialog, if applicable.
     */
    "aria-describedby"?: string;
};

type WithSubtitle = Common & {
    /**
     * The subtitle of the modal, appearing in the titlebar, below the title.
     */
    subtitle: string;
};

type WithBreadcrumbs = Common & {
    /**
     * Adds a breadcrumb-trail, appearing in the ModalHeader, above the title.
     */
    breadcrumbs: React.ReactElement<React.ComponentProps<typeof Breadcrumbs>>;
};

type Props = Common | WithSubtitle | WithBreadcrumbs;

type DefaultProps = {
    closeButtonVisible: Props["closeButtonVisible"];
};

/**
 * This is the standard layout for most straightforward modal experiences.
 *
 * The ModalHeader is required, but the ModalFooter is optional.
 * The content of the dialog itself is fully customizable, but the
 * left/right/top/bottom padding is fixed.
 *
 * ### Usage
 *
 * ```jsx
 * import {OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
 * import {Body} from "@khanacademy/wonder-blocks-typography";
 *
 * <OnePaneDialog
 *     title="Some title"
 *     content={
 *         <Body>
 *             {`Lorem ipsum dolor sit amet, consectetur adipiscing
 *             elit, sed do eiusmod tempor incididunt ut labore et
 *             dolore magna aliqua. Ut enim ad minim veniam,
 *             quis nostrud exercitation ullamco laboris nisi ut
 *             aliquip ex ea commodo consequat. Duis aute irure
 *             dolor in reprehenderit in voluptate velit esse
 *             cillum dolore eu fugiat nulla pariatur. Excepteur
 *             sint occaecat cupidatat non proident, sunt in culpa
 *             qui officia deserunt mollit anim id est.`}
 *         </Body>
 *     }
 * />
 * ```
 */
export default class OnePaneDialog extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        closeButtonVisible: true,
    };

    renderHeader(
        uniqueId: string,
    ): React.ReactElement<React.ComponentProps<typeof ModalHeader>> {
        const {
            title,
            // @ts-expect-error [FEI-5019] - TS2339 - Property 'breadcrumbs' does not exist on type 'Readonly<Props> & Readonly<{ children?: ReactNode; }>'.
            breadcrumbs = undefined,
            // @ts-expect-error [FEI-5019] - TS2339 - Property 'subtitle' does not exist on type 'Readonly<Props> & Readonly<{ children?: ReactNode; }>'.
            subtitle = undefined,
            testId,
        } = this.props;

        if (breadcrumbs) {
            return (
                <ModalHeader
                    title={title}
                    breadcrumbs={
                        breadcrumbs as React.ReactElement<
                            React.ComponentProps<typeof Breadcrumbs>
                        >
                    }
                    titleId={uniqueId}
                    testId={testId && `${testId}-header`}
                />
            );
        } else if (subtitle) {
            return (
                <ModalHeader
                    title={title}
                    subtitle={subtitle as string}
                    titleId={uniqueId}
                    testId={testId && `${testId}-header`}
                />
            );
        } else {
            return (
                <ModalHeader
                    title={title}
                    titleId={uniqueId}
                    testId={testId && `${testId}-header`}
                />
            );
        }
    }

    render(): React.ReactNode {
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
            role,
            "aria-describedby": ariaDescribedBy,
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
                                aria-describedby={ariaDescribedBy}
                                role={role}
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
} as const;
