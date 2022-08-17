/* eslint-disable no-alert */
// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {ActionMenu, ActionItem} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import {ModalLauncher, OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

import OnePaneDialogArgTypes from "./one-pane-dialog.argtypes.js";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

const customViewports = {
    phone: {
        name: "phone",
        styles: {
            width: "320px",
            height: "568px",
        },
    },
    tablet: {
        name: "tablet",
        styles: {
            width: "640px",
            height: "960px",
        },
    },
    desktop: {
        name: "desktop",
        styles: {
            width: "1024px",
            height: "768px",
        },
    },
};

export default {
    title: "Modal/OnePaneDialog",
    component: OnePaneDialog,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
        viewport: {
            viewports: customViewports,
            defaultViewport: "desktop",
        },
        chromatic: {
            viewports: [320, 640, 1024],
        },
    },
    argTypes: OnePaneDialogArgTypes,
};

export const Default: StoryComponentType = (args) => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog {...args} />
        </View>
    </View>
);

Default.args = {
    content: (
        <Body>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est.`}
        </Body>
    ),
    title: "Some title",
};

export const Simple: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog
                title="Hello, world! Here is an example of a long title that wraps to the next line."
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
            />
        </View>
    </View>
);

Simple.parameters = {
    docs: {
        storyDescription: `This is the most basic OnePaneDialog, with just
            the title and content.`,
    },
};

export const WithFooter: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog
                title="Hello, world!"
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
                footer={
                    <View style={styles.footer}>
                        <LabelLarge>Step 1 of 4</LabelLarge>
                        <View style={styles.row}>
                            <Button kind="tertiary">Previous</Button>
                            <Strut size={16} />
                            <Button kind="primary">Next</Button>
                        </View>
                    </View>
                }
            />
        </View>
    </View>
);

WithFooter.parameters = {
    docs: {
        storyDescription: `This OnePaneDialog includes a custom footer.`,
    },
};

export const WithSubtitle: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog
                title="Hello, world!"
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
                subtitle={
                    "Subtitle that provides additional context to the title"
                }
            />
        </View>
    </View>
);

WithSubtitle.parameters = {
    docs: {
        storyDescription: `This OnePaneDialog includes a custom subtitle.`,
    },
};

export const WithBreadcrumbs: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog
                title="Hello, world!"
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
                breadcrumbs={
                    <Breadcrumbs>
                        <BreadcrumbsItem>
                            <Link href="">Course</Link>
                        </BreadcrumbsItem>
                        <BreadcrumbsItem>
                            <Link href="">Unit</Link>
                        </BreadcrumbsItem>
                        <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                    </Breadcrumbs>
                }
            />
        </View>
    </View>
);

WithBreadcrumbs.parameters = {
    docs: {
        storyDescription: `This OnePaneDialog includes a custom Breadcrumbs
            element.`,
    },
};

export const WithAboveAndBelow: StoryComponentType = () => {
    const aboveStyle = {
        background: "url(./modal-above.png)",
        width: 874,
        height: 551,
        position: "absolute",
        top: 40,
        left: -140,
    };

    const belowStyle = {
        background: "url(./modal-below.png)",
        width: 868,
        height: 521,
        position: "absolute",
        top: -100,
        left: -300,
    };

    return (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <OnePaneDialog
                    title="Single-line title"
                    content={
                        <View>
                            <Body>
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
                            </Body>
                            <br />
                            <Body>
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
                            </Body>
                            <br />
                            <Body>
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
                            </Body>
                        </View>
                    }
                    above={<View style={aboveStyle} />}
                    below={<View style={belowStyle} />}
                />
            </View>
        </View>
    );
};

WithAboveAndBelow.parameters = {
    docs: {
        storyDescription: `The element passed into the \`above\` prop is
            rendered in front of the modal. The element passed into the
            \`below\` prop is rendered behind the modal. In this example,
            a \`<View>\` element with a background image of a person and an
            orange blob is passed into the \`below\` prop. A \`<View>\`
            element with a background image of an arc and a blue semicircle
            is passed into the \`above\` prop. This results in the person's
            head and the orange blob peeking out from behind the modal, and
            the arc and semicircle going over the front of the modal.`,
    },
};

export const WithStyle: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog
                title="Hello, world!"
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
                style={{
                    color: Color.blue,
                    maxWidth: 1000,
                }}
            />
        </View>
    </View>
);

WithStyle.parameters = {
    docs: {
        storyDescription: `A OnePaneDialog can have custom styles via the
            \`style\` prop. Here, the modal has a \`maxWidth: 1000\` and
            \`color: Color.blue\` in its custom styles.`,
    },
};

export const WithLauncher: StoryComponentType = () => {
    type MyModalProps = {|
        closeModal: () => void,
    |};

    const MyModal = ({
        closeModal,
    }: MyModalProps): React.Element<typeof OnePaneDialog> => (
        <OnePaneDialog
            title="Single-line title"
            content={
                <Body>
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
                </Body>
            }
            footer={<Button onClick={closeModal}>Close</Button>}
        />
    );

    return (
        <ModalLauncher modal={MyModal}>
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </ModalLauncher>
    );
};

WithLauncher.parameters = {
    chromatic: {
        // Don't take screenshots of this story since it would only show a
        // button and not the actual modal.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `A modal can be launched using a launcher. Here,
            the launcher is a \`Button\` element whose \`onClick\` function
            opens the modal. To turn an element into a launcher, wrap the
            element in a \`<ModalLauncher>\` element.`,
    },
};

// TODO(nisha): Move this example to the `ModalLauncher` section after
// it is added to Storybook.
export const WithClosedFocusId: StoryComponentType = () => {
    const [opened, setOpened] = React.useState(false);

    const handleOpen = () => {
        setOpened(true);
    };

    const handleClose = () => {
        setOpened(false);
    };

    return (
        <View style={{gap: 20}}>
            <Button>Top of page (should not receive focus)</Button>
            <Button id="button-to-focus-on">Focus here after close</Button>
            <ActionMenu menuText="actions">
                <ActionItem label="Open modal" onClick={() => handleOpen()} />
            </ActionMenu>
            <ModalLauncher
                onClose={() => handleClose()}
                opened={opened}
                closedFocusId="button-to-focus-on"
                modal={({closeModal}) => (
                    <OnePaneDialog
                        title="Triggered from action menu"
                        content={<View>Hello World</View>}
                        footer={
                            <Button onClick={closeModal}>Close Modal</Button>
                        }
                    />
                )}
            />
        </View>
    );
};

WithClosedFocusId.parameters = {
    chromatic: {
        // Don't take screenshots of this story since the case we want
        // to test doesn't appear on first render - it occurs after
        // we complete a series of steps.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `Clicking on a dropdown menu option to open a modal
            causes the dropdown to close, and so all of the dropdown options
            are removed from the DOM. This can be a problem because by
            default, the focus shifts to the previously focused element after
            a modal is closed; in this case, the element that opened the modal
            cannot receive focus since it no longer exists in the DOM,
            so when you close the modal, it doesn't know where to focus on the
            page. When the previously focused element no longer exists,
            the focus shifts to the page body, which causes a jump to
            the top of the page. This can make it diffcult to find the original
            dropdown. A solution to this is to use the \`closedFocusId\` prop.
            You can use this prop on the \`ModalLauncher\` to specify where
            to set the focus after the modal has been closed. In this example,
            \`closedFocusId\` is set to the ID of the button labeled
            "Focus here after close." If the focus shifts to the button labeled
            "Top of page (should not receieve focus)," then the focus is on
            the page body, and the \`closedFocusId\` did not work.`,
    },
};

const styles = StyleSheet.create({
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
    row: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});
