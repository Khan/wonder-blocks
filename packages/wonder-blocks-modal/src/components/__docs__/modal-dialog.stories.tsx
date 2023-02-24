import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {
    ModalLauncher,
    ModalDialog,
    ModalPanel,
} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, Title} from "@khanacademy/wonder-blocks-typography";

// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info";
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
} as const;

export default {
    title: "Modal/Building Blocks/ModalDialog",
    component: ModalDialog,
    decorators: [
        (Story: any): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: (
            <ComponentInfo name={name} version={version} />
        ) as any,
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
    // Make the following props null in the control panel
    // because setting an object for a React node is
    // not practical to do manually.
    argTypes: {
        children: {
            control: {type: null},
        },
        above: {
            control: {type: null},
        },
        below: {
            control: {type: null},
        },
    },
};

// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const Default: StoryComponentType = (args) => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby="modal-title-0" {...args}>
                <ModalPanel
                    content={
                        <>
                            <Title id="modal-title-0">Modal Title</Title>
                            <Strut size={Spacing.large_24} />
                            <Body>Here is some text in the modal.</Body>
                        </>
                    }
                />
            </ModalDialog>
        </View>
    </View>
);

Default.args = {
    style: {
        maxWidth: 500,
        maxHeight: 500,
    },
};

export const Simple: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog
                aria-labelledby="modal-title-1"
                style={styles.squareDialog}
            >
                <ModalPanel
                    content={
                        <>
                            <Title id="modal-title-1">Modal Title</Title>
                            <Strut size={Spacing.large_24} />
                            <Body>Here is some text in the modal.</Body>
                        </>
                    }
                />
            </ModalDialog>
        </View>
    </View>
);

Simple.parameters = {
    docs: {
        storyDescription: `This is a basic \`<ModalDialog>\` that wraps a
            \`<ModalPanel>\` element. The \`<ModalDialog>\` is just a a wrapper
            for the visual components of the overall modal. It sets
            the modal's role to \`"dialog"\`. If it did not have another
            element as a child here (a \`<ModalPanel>\` in this case),
            nothing would be visible. If the \`<ModalDialog>\` were not given
            a \`maxHeight\` or \`maxWidth\` style, it would take up the
            entire viewport. To demonstrate the difference between
            the \`<ModalDialog>\` and the \`<ModalPanel>\` elements, the panel
            has been given a smaller height and width than \`<ModalDialog>\`,
            and \`<ModalDialog>\` has been given a dark blue background.`,
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
    } as const;

    const belowStyle = {
        background: "url(./modal-below.png)",
        width: 868,
        height: 521,
        position: "absolute",
        top: -100,
        left: -300,
    } as const;

    return (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <ModalDialog
                    aria-labelledby="modal-title-2"
                    style={styles.squareDialog}
                    above={<View style={aboveStyle} />}
                    below={<View style={belowStyle} />}
                >
                    <ModalPanel
                        content={
                            <>
                                <Title id="modal-title-2">Modal Title</Title>
                                <Strut size={Spacing.large_24} />
                                <Body>Here is some text in the modal.</Body>
                            </>
                        }
                    />
                </ModalDialog>
            </View>
        </View>
    );
};

WithAboveAndBelow.parameters = {
    docs: {
        storyDescription: `The \`above\` and \`below\` props work the same
            for \`<ModalDialog>\` as they do for \`<OnePaneDialog>\`.
            The element passed into the \`above\` prop is rendered in front
            of the modal. The element passed into the \`below\` prop is
            rendered behind the modal. In this example, a \`<View>\` element
            with a background image of a person and an orange blob is passed
            into the \`below\` prop. A \`<View>\` element with a background
            image of an arc and a blue semicircle is passed into the \`above\`
            prop. This results in the person's head and the orange blob
            peeking out from behind the modal, and the arc and semicircle
            going over the front of the modal.`,
    },
};

export const WithLauncher: StoryComponentType = () => {
    type MyModalProps = {
        closeModal: () => void;
    };

    const MyModal: React.FC<MyModalProps> = ({
        closeModal,
    }): React.ReactElement => (
        <ModalDialog
            aria-labelledby="modal-title-3"
            style={styles.squareDialog}
        >
            <ModalPanel
                content={
                    <>
                        <Title id="modal-title-3">Modal Title</Title>
                        <Strut size={Spacing.large_24} />
                        <Body>Here is some text in the modal.</Body>
                    </>
                }
            />
        </ModalDialog>
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
            the launcher is a \`<Button>\` element whose \`onClick\` function
            opens the modal. The modal passed into the \`modal\` prop of
            the \`<ModalLauncher>\` element is a \`<ModalDialog>\` element.
            To turn an element into a launcher, wrap the element in a
            \`<ModalLauncher>\` element.`,
    },
};

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
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
        minHeight: 600,
        width: "100%",
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
    squareDialog: {
        maxHeight: 500,
        maxWidth: 500,
        backgroundColor: Color.darkBlue,
    },
    smallSquarePanel: {
        maxHeight: 400,
        maxWidth: 400,
    },
});
