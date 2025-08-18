import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import Button, {ActivityButton} from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import {ModalLauncher, FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
import packageConfig from "../../packages/wonder-blocks-modal/package.json";

import ComponentInfo from "../components/component-info";
import FlexibleDialogArgTypes from "./flexible-dialog.argtypes";
import {allModes} from "../../.storybook/modes";

import celebrationBg from "../../static/celebration_bg.svg";
import celebrationChest from "../../static/celebration-chest.svg";
import {reallyLongText} from "../components/text-for-testing";

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
    title: "Packages / Modal / FlexibleDialog",
    component: FlexibleDialog,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <Story />
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
            modes: {
                small: allModes.small,
                large: allModes.large,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    argTypes: FlexibleDialogArgTypes,
} as Meta<typeof FlexibleDialog>;

type StoryComponentType = StoryObj<typeof FlexibleDialog>;

export const Default: StoryComponentType = {
    render: (args) => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <FlexibleDialog {...args} />
            </View>
        </View>
    ),
    args: {
        title: <Heading id="main-heading">Some title</Heading>,
        content: (
            <>
                <BodyText>{reallyLongText}</BodyText>
            </>
        ),
    },
};

/**
 * A FlexibleDialog with full-bleed background image and custom contents.
 */
const modalBgStyle = {
    backgroundColor: semanticColor.core.background.critical.subtle, // fallback color
    backgroundImage: `url(${celebrationBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
} as const;

export const WithBackgroundImage: StoryComponentType = {
    render: () => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <FlexibleDialog
                    title={
                        <Heading
                            size="xlarge"
                            weight="bold"
                            id="gem-challenge-completed-modal-heading"
                            tag="h2"
                        >
                            Congrats Rainier McCheddarton!
                        </Heading>
                    }
                    styles={{
                        panel: modalBgStyle,
                    }}
                    content={({title}) => (
                        <View style={styles.centered}>
                            <img
                                src={celebrationChest}
                                style={{maxWidth: "240px"}}
                                alt=""
                            />
                            {title}
                            <Heading
                                size="large"
                                weight="bold"
                                style={{
                                    marginBlock: sizing.size_240,
                                    textAlign: "center",
                                }}
                            >
                                Your class, Advanced Calculus, reached 1500 of
                                1500 gems
                            </Heading>
                            <ActivityButton
                                kind="primary"
                                styles={{
                                    root: {
                                        marginBlockStart: 20,
                                        alignSelf: "center",
                                    },
                                }}
                                onClick={() => {}}
                            >
                                Continue
                            </ActivityButton>
                        </View>
                    )}
                />
            </View>
        </View>
    ),
};

/**
 *
 * A FlexibleDialog can have a movable title via the
  `content` and its `title` render prop, so it doesn't have to be the first
  element. It will also label the dialog as its accessible name.
 */
export const WithTitleRenderProp: StoryComponentType = {
    render: () => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <FlexibleDialog
                    title={<Heading tag="h2">Hey, Bagley!</Heading>}
                    content={({title}) => (
                        <View>
                            <img src={celebrationChest} alt="" />
                            {title}
                            <Heading
                                size="large"
                                weight="bold"
                                tag="h3"
                                style={{
                                    marginBlock: sizing.size_240,
                                    textAlign: "center",
                                }}
                            >
                                Your class, Advanced Calculus, reached 1500 of
                                1500 gems
                            </Heading>
                        </View>
                    )}
                />
            </View>
        </View>
    ),
};

/**
 *
 * A FlexibleDialog can have an aria-label as its accessible name.
 */
export const WithAriaLabel: StoryComponentType = {
    render: () => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <FlexibleDialog
                    aria-label="Catz are the best"
                    content={
                        <View>
                            <BodyText>This is some text</BodyText>
                        </View>
                    }
                />
            </View>
        </View>
    ),
};

/**
 *
 * A FlexibleDialog can have an aria-label as its accessible name.
 */
export const WithAriaLabelledby: StoryComponentType = {
    render: () => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <FlexibleDialog
                    aria-labelledby="main-heading"
                    content={
                        <View>
                            <Heading id="main-heading">
                                Dogz are the best
                            </Heading>
                            <BodyText>This is some text</BodyText>
                        </View>
                    }
                />
            </View>
        </View>
    ),
};

/**
 *
 * A FlexibleDialog can have custom styles via the
  `style` prop. Here, the modal has a `maxWidth: 1000` and
  `color: Color.blue` in its custom styles.
 */
export const WithStyle: StoryComponentType = {
    render: () => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <FlexibleDialog
                    title={<Heading>Hello, world!</Heading>}
                    content={
                        <>
                            <BodyText>{reallyLongText}</BodyText>
                        </>
                    }
                    styles={{
                        root: {
                            color: semanticColor.status.notice.foreground,
                            maxWidth: 1000,
                        },
                        panel: {
                            backgroundColor:
                                semanticColor.status.notice.background,
                        },
                    }}
                />
            </View>
        </View>
    ),
};

/**
 *
 * A FlexibleDialog will adjust with long contents, instead of fixing its height.
 */
export const WithLongContents: StoryComponentType = {
    render: () => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <FlexibleDialog
                    title={<Heading>Hello, world!</Heading>}
                    content={
                        <>
                            <BodyText>{reallyLongText}</BodyText>
                            <BodyText>{reallyLongText}</BodyText>
                            <BodyText>{reallyLongText}</BodyText>
                            <BodyText>{reallyLongText}</BodyText>
                            <BodyText>{reallyLongText}</BodyText>
                            <BodyText>{reallyLongText}</BodyText>
                            <BodyText>{reallyLongText}</BodyText>
                            <BodyText>{reallyLongText}</BodyText>
                        </>
                    }
                />
            </View>
        </View>
    ),
};

/**
 *
 * A modal can be launched using a launcher. Here,
   the launcher is a `<Button>` element whose `onClick` function
   opens the modal. The modal passed into the `modal` prop of
   the `<ModalLauncher>` element is a `<FlexibleDialog>`.
   To turn an element into a launcher, wrap the element in a
   `<ModalLauncher>` element.
 */
export const WithLauncher: StoryComponentType = () => {
    type MyModalProps = {
        closeModal: () => void;
    };

    const MyModal = ({closeModal}: MyModalProps): React.ReactElement => (
        <FlexibleDialog
            title={<Heading>Single-line title</Heading>}
            content={
                <>
                    <BodyText>{reallyLongText}</BodyText>
                    <View style={styles.launcherButton}>
                        <Button onClick={closeModal}>Close</Button>
                    </View>
                </>
            }
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
    centered: {
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        textAlign: "center",
    },
    previewSizer: {
        minHeight: "calc(100vh - 1.6rem)",
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: sizing.size_160,
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    launcherButton: {
        marginTop: "auto",
    },
});
