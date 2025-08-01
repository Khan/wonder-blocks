import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import {
    ModalDialog,
    ModalPanel,
    ModalFooter,
} from "@khanacademy/wonder-blocks-modal";
import packageConfig from "../../packages/wonder-blocks-modal/package.json";

import ComponentInfo from "../components/component-info";

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
} as const;

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
 * Modal footer included after the content.
 *
 * ### Implementation notes
 *
 * If you are creating a custom Dialog, make sure to follow these guidelines:
 * - Make sure to include it as part of [ModalPanel](/#modalpanel) by using the `footer` prop.
 * - The footer is completely flexible. Meaning the developer needs to add its own custom layout to match design specs.
 *
 * ### Usage
 *
 * ```tsx
 * <ModalFooter>
 *     <Button onClick={() => {}}>Submit</Button>
 * </ModalFooter>
 * ```
 */
export default {
    title: "Packages / Modal / Building Blocks / ModalFooter",
    component: ModalFooter,
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
        viewport: {
            viewports: customViewports,
            defaultViewport: "desktop",
        },
        chromatic: {
            // We already have screenshots of other stories in
            // one-pane-dialog.stories.tsx
            disableSnapshot: true,
        },
    },
    argTypes: {
        children: {
            control: {type: undefined},
        },
    },
} as Meta<typeof ModalFooter>;

type StoryComponentType = StoryObj<typeof ModalFooter>;

/**
 * This is a basic footer. It contains an empty `<View>`, so it is completely
 * blank.
 */
export const Default: StoryComponentType = {
    args: {
        children: <View />,
    },
    render: (args) => (
        <ModalDialog aria-labelledby={"modal-id-0"} style={styles.dialog}>
            <ModalPanel
                content={
                    <View style={{gap: sizing.size_240}}>
                        <Heading size="xxlarge" id="modal-id-0">
                            Modal Heading
                        </Heading>
                        {longBody}
                    </View>
                }
                footer={<ModalFooter {...args} />}
            />
        </ModalDialog>
    ),
};

/**
 * This is a `<ModalFooter>` with a `<Button>` as a child. No additional styling
 * is needed, as the footer already has the style `{justifyContent: "flex-end"}`.
 */
export const WithButton: StoryComponentType = {
    render: () => (
        <ModalDialog aria-labelledby={"modal-id-2"} style={styles.dialog}>
            <ModalPanel
                content={
                    <View style={{gap: sizing.size_240}}>
                        <Heading size="xxlarge" id="modal-id-2">
                            Modal Heading
                        </Heading>
                        {longBody}
                    </View>
                }
                footer={
                    <ModalFooter>
                        <Button onClick={() => {}}>Submit</Button>
                    </ModalFooter>
                }
            />
        </ModalDialog>
    ),
};

/**
 * This is an example of a footer with multiple actions. It's fully responsive,
 * so the buttons are in a column layout when the window is small.
 */
export const WithThreeActions: StoryComponentType = {
    render: () => {
        const mobile = "@media (max-width: 1023px)";
        const desktop = "@media (min-width: 1024px)";

        const buttonStyle = {
            [desktop]: {
                marginInlineEnd: sizing.size_160,
            },
            [mobile]: {
                marginBlockEnd: sizing.size_160,
            },
        } as const;

        const containerStyle = {
            [desktop]: {
                flexDirection: "row",
                justifyContent: "flex-end",
            },
            [mobile]: {
                flexDirection: "column-reverse",
                width: "100%",
            },
        } as const;

        return (
            <ModalDialog aria-labelledby={"modal-id-3"} style={styles.dialog}>
                <ModalPanel
                    content={
                        <View style={{gap: sizing.size_240}}>
                            <Heading size="xxlarge" id="modal-id-3">
                                Modal Heading
                            </Heading>
                            {longBody}
                        </View>
                    }
                    footer={
                        <ModalFooter>
                            <View style={containerStyle}>
                                <Button style={buttonStyle} kind="tertiary">
                                    Tertiary action
                                </Button>
                                <Button style={buttonStyle} kind="tertiary">
                                    Secondary action
                                </Button>
                                <Button style={buttonStyle}>
                                    Primary action
                                </Button>
                            </View>
                        </ModalFooter>
                    }
                />
            </ModalDialog>
        );
    },
};

/**
 * This is an example of a footer that indicates multiple steps in a flow.
 */
export const WithMultipleActions: StoryComponentType = {
    render: () => {
        const footerStyle = {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
        } as const;

        const rowStyle = {
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: sizing.size_160,
        } as const;

        return (
            <ModalDialog aria-labelledby={"modal-id-4"} style={styles.dialog}>
                <ModalPanel
                    content={
                        <View style={{gap: sizing.size_240}}>
                            <Heading size="xxlarge" id="modal-id-4">
                                Modal Heading
                            </Heading>
                            <BodyText>Here is some text in the modal.</BodyText>
                        </View>
                    }
                    footer={
                        <ModalFooter>
                            <View style={footerStyle}>
                                <BodyText weight="bold">Step 1 of 4</BodyText>
                                <View style={rowStyle}>
                                    <Button kind="tertiary">Previous</Button>
                                    <Button kind="primary">Next</Button>
                                </View>
                            </View>
                        </ModalFooter>
                    }
                />
            </ModalDialog>
        );
    },
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
