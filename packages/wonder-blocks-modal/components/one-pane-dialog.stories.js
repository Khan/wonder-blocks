/* eslint-disable no-alert */
// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {Body} from "@khanacademy/wonder-blocks-typography";
import Button from "@khanacademy/wonder-blocks-button";

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
    title: "OnePaneDialog",
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

export const simple: StoryComponentType<Empty> = () => {
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

export const kitchenSink: StoryComponentType<Empty> = () => {
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

export const withOpener: StoryComponentType<Empty> = () => {
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

withOpener.story = {
    parameters: {
        viewport: {
            defaultViewport: null,
        },
        chromatic: {
            // Don't take screenshots of this story since it would only show a button.
            disable: true,
        },
    },
};
