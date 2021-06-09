/* eslint-disable no-alert */
// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";
import BasicDialog from "./basic-dialog.js";
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
    title: "Modal/BasicDialog",
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

export const minimal: StoryComponentType = () => {
    const modal = (
        <BasicDialog
            closeButtonVisible={true}
            style={styles.customDialog}
            testId="basic-dialog-minimal"
            titleId="some-unique-id"
        >
            <View style={styles.content}>
                <HeadingLarge id="some-unique-id">Are you sure?</HeadingLarge>
                <Strut size={Spacing.small_12} />
                <Body>
                    This example shows how to use a simple modal that does not
                    have header and footer. Only allows you to pass a custom
                    content in it.
                </Body>
                <Strut size={Spacing.xLarge_32} />
                <Button kind="primary">Primary action</Button>
                <Strut size={Spacing.small_12} />
                <Button kind="tertiary">Cancel</Button>
            </View>
        </BasicDialog>
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
    customDialog: {
        width: 420,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});
