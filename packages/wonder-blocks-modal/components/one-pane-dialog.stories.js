/* eslint-disable no-alert */
// @flow
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {Body} from "@khanacademy/wonder-blocks-typography";
import Button from "@khanacademy/wonder-blocks-button";

import OnePaneDialog from "./one-pane-dialog/one-pane-dialog.js";
import ModalLauncher from "./modal-launcher.js";

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
            width: "650px",
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
    },
};

export const simple = () => {
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

export const headerAndFooter = () => {
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
            footer={<Button>Button (no-op)</Button>}
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
