import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, LabelLarge, Title} from "@khanacademy/wonder-blocks-typography";

import {
    ModalDialog,
    ModalPanel,
    ModalFooter,
} from "@khanacademy/wonder-blocks-modal";
import packageConfig from "../../packages/wonder-blocks-modal/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

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
    title: "Modal/Building Blocks/ModalFooter",
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
            description: {
                component: null,
            },
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
            viewports: [320, 640, 1024],
        },
    },
    argTypes: {
        children: {
            control: {type: null},
        },
    },
} as Meta<typeof ModalFooter>;

type StoryComponentType = StoryObj<typeof ModalFooter>;

export const Default: StoryComponentType = {
    render: (args) => (
        <ModalDialog aria-labelledby={"modal-id-0"} style={styles.dialog}>
            <ModalPanel
                content={
                    <>
                        <Title id="modal-id-0">Modal Title</Title>
                        <Strut size={Spacing.large_24} />
                        {longBody}
                    </>
                }
                footer={<ModalFooter {...args} />}
            />
        </ModalDialog>
    ),
};

export const Simple: StoryComponentType = () => (
    <ModalDialog aria-labelledby={"modal-id-1"} style={styles.dialog}>
        <ModalPanel
            content={
                <>
                    <Title id="modal-id-1">Modal Title</Title>
                    <Strut size={Spacing.large_24} />
                    {longBody}
                </>
            }
            footer={
                <ModalFooter>
                    <View />
                </ModalFooter>
            }
        />
    </ModalDialog>
);

Simple.parameters = {
    docs: {
        description: {
            story: `This is a basic footer. It contains an empty
            \`<View>\`, so it is completely blank.`,
        },
    },
};

export const WithButton: StoryComponentType = () => (
    <ModalDialog aria-labelledby={"modal-id-2"} style={styles.dialog}>
        <ModalPanel
            content={
                <>
                    <Title id="modal-id-2">Modal Title</Title>
                    <Strut size={Spacing.large_24} />
                    {longBody}
                </>
            }
            footer={
                <ModalFooter>
                    <Button onClick={() => {}}>Submit</Button>
                </ModalFooter>
            }
        />
    </ModalDialog>
);

WithButton.parameters = {
    docs: {
        description: {
            story: `This is a \`<ModalFooter>\` with a \`<Button>\`
            as a child. No additional styling is needed, as the footer
            already has the style \`{justifyContent: "flex-end"}\`.`,
        },
    },
};

export const WithThreeActions: StoryComponentType = () => {
    const mobile = "@media (max-width: 1023px)";
    const desktop = "@media (min-width: 1024px)";

    const buttonStyle = {
        [desktop]: {
            marginRight: Spacing.medium_16,
        },
        [mobile]: {
            marginBottom: Spacing.medium_16,
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
                    <>
                        <Title id="modal-id-3">Modal Title</Title>
                        <Strut size={Spacing.large_24} />
                        {longBody}
                    </>
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
                            <Button style={buttonStyle}>Primary action</Button>
                        </View>
                    </ModalFooter>
                }
            />
        </ModalDialog>
    );
};

WithThreeActions.parameters = {
    docs: {
        description: {
            story: `This is an example of a footer with multiple
            actions. It's fully responsive, so the buttons are in a
            column layout when the window is small.`,
        },
    },
};

export const WithMultipleActions: StoryComponentType = () => {
    const footerStyle = {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    } as const;

    const rowStyle = {
        flexDirection: "row",
        justifyContent: "flex-end",
    } as const;

    return (
        <ModalDialog aria-labelledby={"modal-id-4"} style={styles.dialog}>
            <ModalPanel
                content={
                    <>
                        <Title id="modal-id-4">Modal Title</Title>
                        <Strut size={Spacing.large_24} />
                        {longBody}
                    </>
                }
                footer={
                    <ModalFooter>
                        <View style={footerStyle}>
                            <LabelLarge>Step 1 of 4</LabelLarge>
                            <View style={rowStyle}>
                                <Button kind="tertiary">Previous</Button>
                                <Strut size={16} />
                                <Button kind="primary">Next</Button>
                            </View>
                        </View>
                    </ModalFooter>
                }
            />
        </ModalDialog>
    );
};

WithMultipleActions.parameters = {
    docs: {
        description: {
            story: `This is an example of a footer that indicates
            multiple steps in a flow.`,
        },
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
