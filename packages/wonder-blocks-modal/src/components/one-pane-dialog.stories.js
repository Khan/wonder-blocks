/* eslint-disable no-alert */
// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {Body} from "@khanacademy/wonder-blocks-typography";
import Button from "@khanacademy/wonder-blocks-button";
import {ActionMenu, ActionItem} from "@khanacademy/wonder-blocks-dropdown";

import type {StoryComponentType} from "@storybook/react";
import OnePaneDialog from "./one-pane-dialog.js";
import ModalLauncher from "./modal-launcher.js";

import type {ModalElement} from "../util/types.js";

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
    title: "Floating/Modal/OnePaneDialog",
    parameters: {
        viewport: {
            viewports: customViewports,
            defaultViewport: "desktop",
        },
        chromatic: {
            viewports: [320, 640, 1024],
        },
    },
};

export const Simple: StoryComponentType = () => {
    const modal = (
        <OnePaneDialog
            testId="one-pane-dialog-above"
            title="Hello, world!"
            content={
                <View>
                    <Body>
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                        }
                    </Body>
                </View>
            }
            closeButtonVisible={true}
        />
    );

    return (
        <ModalLauncher
            modal={modal}
            testId="modal-launcher-default-example"
            opened={true}
            onClose={() => alert("This would close the modal.")}
        />
    );
};

const styles = StyleSheet.create({
    above: {
        background: "url(/modal-above.png)",
        width: 874,
        height: 551,
        position: "absolute",
        top: 40,
        left: -140,
    },

    below: {
        background: "url(/modal-below.png)",
        width: 868,
        height: 521,
        position: "absolute",
        top: -100,
        left: -300,
    },
});

export const KitchenSink: StoryComponentType = () => {
    const modal = (
        <OnePaneDialog
            title="Single-line title"
            subtitle="Subtitle that provides additional context to the title"
            testId="one-pane-dialog-above"
            content={
                <View>
                    <Body>
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                        }
                    </Body>
                    <br />
                    <Body>
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                        }
                    </Body>
                    <br />
                    <Body>
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                        }
                    </Body>
                </View>
            }
            footer={<Button onClick={() => {}}>Button (no-op)</Button>}
            closeButtonVisible={true}
            above={<View style={styles.above} />}
            below={<View style={styles.below} />}
        />
    );

    return (
        <ModalLauncher
            modal={modal}
            testId="modal-launcher-default-example"
            opened={true}
            onClose={() => alert("This would close the modal.")}
        />
    );
};

export const WithOpener: StoryComponentType = () => {
    type MyModalProps = {|
        closeModal: () => void,
    |};

    const MyModal = ({closeModal}: MyModalProps): ModalElement => (
        <OnePaneDialog
            title="Single-line title"
            subtitle="Subtitle that provides additional context to the title"
            testId="one-pane-dialog-above"
            content={
                <View>
                    <Body>
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                        }
                    </Body>
                    <br />
                    <Body>
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                        }
                    </Body>
                    <br />
                    <Body>
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                        }
                    </Body>
                </View>
            }
            footer={<Button onClick={() => {}}>Button (no-op)</Button>}
            closeButtonVisible={true}
            above={<View style={styles.above} />}
            below={<View style={styles.below} />}
        />
    );

    return (
        <ModalLauncher
            modal={MyModal}
            testId="modal-launcher-default-example"
            onClose={() => alert("This would close the modal.")}
        >
            {({openModal}) => <Button onClick={openModal}>Click me</Button>}
        </ModalLauncher>
    );
};

WithOpener.parameters = {
    viewport: {
        defaultViewport: null,
    },
    chromatic: {
        // Don't take screenshots of this story since it would only show a button.
        disableSnapshot: true,
    },
};

export const WithClosedFocusId: StoryComponentType = () => {
    const [opened, setOpened] = React.useState(false);

    const handleOpen = () => {
        console.log("opening modal");
        setOpened(true);
    };

    const handleClose = () => {
        console.log("closing modal");
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
