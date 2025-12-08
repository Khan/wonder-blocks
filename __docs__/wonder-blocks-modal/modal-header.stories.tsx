import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {
    ModalDialog,
    ModalPanel,
    ModalHeader,
} from "@khanacademy/wonder-blocks-modal";
import packageConfig from "../../packages/wonder-blocks-modal/package.json";

import ComponentInfo from "../components/component-info";
import ModalHeaderArgtypes from "./modal-header.argtypes";

const longBody = (
    <>
        <BodyText>
            {`Let's make this body content long in order
to test scroll overflow.`}
        </BodyText>
        <BodyText>
            {`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}
        </BodyText>
        <BodyText>
            {`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}
        </BodyText>
        <BodyText>
            {`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}
        </BodyText>
    </>
);

/**
 * This is a helper component that is never rendered by itself. It is always
 * pinned to the top of the dialog, is responsive using the same behavior as its
 * parent dialog, and has the following properties:
 * - title
 * - breadcrumb OR subtitle, but not both.
 *
 * ### Accessibility notes
 *
 * - By default (e.g. using [OnePaneDialog](/#onepanedialog)), `titleId` is
 *   populated automatically by the parent container.
 * - If there is a custom Dialog implementation (e.g. `TwoPaneDialog`), the
 *   ModalHeader doesn’t have to have the `titleId` prop however this is
 *   recommended. It should match the `aria-labelledby` prop of the
 *   [ModalDialog](/#modaldialog) component. Identifiers can be generated with
 *   the `useId` React hook.
 *
 * ### Implementation notes
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to include it as part of [ModalPanel](/#modalpanel) by using the
 *   `header` prop.
 * - Add a title (required).
 * - Optionally add a subtitle or breadcrumbs.
 * - We encourage you to add `titleId` (see Accessibility notes).
 * - If you need to create e2e tests, make sure to pass a `testId` prop and
 *   add a sufix to scope the testId to this component: e.g.
 *   `some-random-id-ModalHeader`. This scope will also be passed to the title
 *   and subtitle elements: e.g. `some-random-id-ModalHeader-title`.
 *
 * ### Usage
 *
 * ```tsx
 * <ModalHeader
 *      title="This is a modal title."
 *      subtitle="subtitle"
 *      titleId="uniqueTitleId"
 *  />
 * ```
 */
export default {
    title: "Packages / Modal / Building Blocks / ModalHeader",
    component: ModalHeader,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.previewSizer}>
                <View style={styles.modalPositioner}>
                    <Story />
                </View>
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
        chromatic: {
            // We already have screenshots of other stories in
            // one-pane-dialog.stories.tsx
            disableSnapshot: true,
        },
        a11y: {
            // TODO(WB-1834): Fix the a11y violations and remove this.
            test: "todo",
        },
    },
    argTypes: ModalHeaderArgtypes,
} as Meta<typeof ModalHeader>;

type StoryComponentType = StoryObj<typeof ModalHeader>;

/**
 * This is a basic `<ModalHeader>`. It just has a `content` prop that contains a
 * title and a body.
 */
export const Default: StoryComponentType = {
    render: (args) => (
        <ModalDialog aria-labelledby={args.titleId} style={styles.dialog}>
            <ModalPanel header={<ModalHeader {...args} />} content={longBody} />
        </ModalDialog>
    ),
    args: {
        title: "This is a modal title.",
        titleId: "modal-title-id-default-example",
    },
};

/**
 * This is `<ModalHeader>` with a subtitle, which can be done by passing a
 * string into the `subtitle` prop.
 */
export const WithSubtitle: StoryComponentType = {
    render: () => (
        <ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
            <ModalPanel
                header={
                    <ModalHeader
                        title="Modal Title"
                        titleId="modal-title-3"
                        subtitle="This is what a subtitle looks like."
                    />
                }
                content={longBody}
            />
        </ModalDialog>
    ),
};

/**
 * This is `<ModalHeader>` with breadcrumbs, which can be done by passing a
 * Wonder Blocks `<Breadcrumbs>` element into the `breadcrumbs` prop.
 */
export const WithBreadcrumbs: StoryComponentType = {
    render: () => (
        <ModalDialog aria-labelledby="modal-title-5" style={styles.dialog}>
            <ModalPanel
                header={
                    <ModalHeader
                        title="Modal Title"
                        titleId="modal-title-5"
                        breadcrumbs={
                            <Breadcrumbs>
                                <BreadcrumbsItem>
                                    <Link href="#course">Course</Link>
                                </BreadcrumbsItem>
                                <BreadcrumbsItem>
                                    <Link href="#unit">Unit</Link>
                                </BreadcrumbsItem>
                                <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                            </Breadcrumbs>
                        }
                    />
                }
                content={longBody}
            />
        </ModalDialog>
    ),
};

const styles = StyleSheet.create({
    dialog: {
        maxWidth: 600,
        maxHeight: 500,
    },
    modalPositioner: {
        // Checkerboard background
        backgroundImage:
            "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    previewSizer: {
        height: 600,
    },
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
});
