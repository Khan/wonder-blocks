// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {
    ModalDialog,
    ModalPanel,
    ModalHeader,
} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, Title} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import ModalHeaderArgtypes from "./modal-header.argtypes.js";

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

const longBody = (
    <>
        <Body>
            {`Let's make this body content long in order
to test scroll overflow.`}
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
    </>
);

export default {
    title: "Modal/Building Blocks/ModalHeader",
    component: ModalHeader,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
        decorators: [
            (Story: any): React.Element<typeof View> => (
                <View style={styles.example}>{Story()}</View>
            ),
        ],
        viewport: {
            viewports: customViewports,
            defaultViewport: "desktop",
        },
        chromatic: {
            viewports: [320, 640, 1024],
        },
    },
    argTypes: ModalHeaderArgtypes,
};

export const Default: StoryComponentType = (args) => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby={args.titleId} style={styles.dialog}>
                <ModalPanel
                    header={<ModalHeader {...args} />}
                    content={longBody}
                />
            </ModalDialog>
        </View>
    </View>
);

Default.args = {
    title: "This is a modal title.",
    titleId: "modal-title-id-default-example",
};

export const Simple: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby="modal-title-1" style={styles.dialog}>
                <ModalPanel
                    header={
                        <ModalHeader
                            title="Modal Title"
                            titleId="modal-title-1"
                        />
                    }
                    content={
                        <>
                            <Title id="modal-title-1">Modal Title</Title>
                            <Strut size={Spacing.large_24} />
                            {longBody}
                        </>
                    }
                />
            </ModalDialog>
        </View>
    </View>
);

Simple.parameters = {
    docs: {
        storyDescription: `This is a basic \`<ModalPanel>\`. It just has a
            \`content\` prop that contains a title and a body.`,
    },
};

// Dark

// With Subtitle

// With Breadcrumbs

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
