// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {
    ModalDialog,
    ModalPanel,
    ModalHeader,
    ModalFooter,
} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, Title} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

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
    title: "Modal/Building Blocks/ModalPanel",
    component: ModalPanel,
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
    // Make the following props null in the control panel
    // because setting an object for a React node is
    // not practical to do manually, and adding a React Element
    // as one of the default args just results in an incoherent
    // json object in the control panel.
    argTypes: {
        content: {
            control: {type: null},
        },
        header: {
            control: {type: null},
        },
        footer: {
            control: {type: null},
        },
    },
};

export const Default: StoryComponentType = (args) => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby="modal-title-0" style={styles.dialog}>
                <ModalPanel
                    content={
                        <>
                            <Title id="modal-title-0">Modal Title</Title>
                            <Strut size={Spacing.large_24} />
                            {longBody}
                        </>
                    }
                    {...args}
                />
            </ModalDialog>
        </View>
    </View>
);

export const Simple: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby="modal-title-1" style={styles.dialog}>
                <ModalPanel
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

export const Dark: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby="modal-title-1" style={styles.dialog}>
                <ModalPanel
                    content={
                        <>
                            <Title id="modal-title-1">Modal Title</Title>
                            <Strut size={Spacing.large_24} />
                            {longBody}
                        </>
                    }
                    light={false}
                />
            </ModalDialog>
        </View>
    </View>
);

Dark.parameters = {
    docs: {
        storyDescription:
            "This is what a modal panel looks like when its `light` prop is set to false.",
    },
};

export const WithHeader: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby="modal-title-2" style={styles.dialog}>
                <ModalPanel
                    header={
                        <ModalHeader
                            titleId="modal-title-2"
                            title="Modal Title"
                        />
                    }
                    content={longBody}
                />
            </ModalDialog>
        </View>
    </View>
);

WithHeader.parameters = {
    docs: {
        storyDescription: `This is a \`<ModalPanel>\` with a \`header\`
            prop. Note that the header that renders here as part of the
            \`header\` prop is sticky, so it remains even if you scroll
            down in the modal.`,
    },
};

export const WithFooter: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
                <ModalPanel
                    content={
                        <>
                            <Title id="modal-title-3">Modal Title</Title>
                            <Strut size={Spacing.large_24} />
                            {longBody}
                        </>
                    }
                    footer={
                        <ModalFooter>
                            <Button onClick={() => {}}>Continue</Button>
                        </ModalFooter>
                    }
                />
            </ModalDialog>
        </View>
    </View>
);

WithFooter.parameters = {
    docs: {
        storyDescription: `A modal panel can have a footer with the \`footer\`
            prop. In this example, the footer just contains a button. Note
            that the footer is sticky.`,
    },
};

export const DarkWithHeaderAndFooter: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
                <ModalPanel
                    header={
                        <ModalHeader
                            titleId="modal-title-2"
                            title="Modal Title"
                        />
                    }
                    content={longBody}
                    footer={
                        <ModalFooter>
                            <Button onClick={() => {}} light={true}>
                                Continue
                            </Button>
                        </ModalFooter>
                    }
                    light={false}
                />
            </ModalDialog>
        </View>
    </View>
);

DarkWithHeaderAndFooter.parameters = {
    docs: {
        storyDescription: `Here is a dark \`<ModalPanel>\` with a header
            and a footer. The \`<Button>\` in the footer must have the
            \`light\` prop set to true in order to be visible on the dark
            background.`,
    },
};

export const TwoPanels: StoryComponentType = () => {
    const mobile = "@media (max-width: 1023px)";
    const desktop = "@media (min-width: 1024px)";

    const twoPaneDialogStyle = {
        [desktop]: {
            width: "86.72%",
            maxWidth: 888,
            height: "60.42%",
            minHeight: 308,
        },
        [mobile]: {
            width: "100%",
            height: "100%",
            overflow: "hidden",
        },
    };

    const panelGroupStyle = {
        flex: 1,

        [desktop]: {
            flexDirection: "row",
        },
        [mobile]: {
            flexDirection: "column",
        },
    };

    return (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <ModalDialog style={twoPaneDialogStyle}>
                    <View style={panelGroupStyle}>
                        <ModalPanel
                            content={
                                <View>
                                    <Title>Sidebar</Title>
                                    <Strut size={Spacing.large_24} />
                                    <Body>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris.
                                    </Body>
                                </View>
                            }
                            light={false}
                            closeButtonVisible={false}
                        />
                        <ModalPanel
                            content={
                                <View>
                                    <Title>Contents</Title>
                                    <Strut size={Spacing.large_24} />
                                    <Body>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.
                                    </Body>
                                    <Strut size={Spacing.large_24} />
                                    <Button>Primary action</Button>
                                </View>
                            }
                            closeButtonVisible={false}
                        />
                    </View>
                </ModalDialog>
            </View>
        </View>
    );
};

TwoPanels.parameters = {
    docs: {
        storyDescription: `Here is an example of how you can have a modal
            with two panels. Observe that it is responsive, so it uses a
            row layout with a larger window size and a column layout on
            a smaller window size. The "X" close button has been disabled
            for both panels since the top right spot would change depending
            on which layout is being used.`,
    },
};

export const WithStyle: StoryComponentType = () => {
    const modalStyles = {
        color: Color.blue,
        border: `2px solid ${Color.darkBlue}`,
        borderRadius: 20,
    };

    return (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <ModalDialog
                    aria-labelledby="modal-title-1"
                    style={styles.dialog}
                >
                    <ModalPanel
                        header={
                            <ModalHeader
                                titleId="modal-title-1"
                                title="Modal Title"
                            />
                        }
                        content={longBody}
                        style={modalStyles}
                    />
                </ModalDialog>
            </View>
        </View>
    );
};

WithStyle.parameters = {
    docs: {
        storyDescription: `A \`<ModalPanel>\` can have custom styles.
            In this example, the styles for the modal panel include blue
            text color, a 2px solid dark blue border, and a border
            radius of 20px.`,
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
