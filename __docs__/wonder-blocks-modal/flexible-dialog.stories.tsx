/* eslint-disable no-alert */
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
        content: (
            <>
                <Heading>Some title</Heading>
                <BodyText>
                    {`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est.`}
                </BodyText>
            </>
        ),
    },
};

const celebrationBgStyle = {
    backgroundColor: "#FCE6F7", // fallback color
    backgroundImage: `url(${celebrationBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
} as const;

export const CelebrationModal: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <FlexibleDialog
                title={
                    <Heading
                        size="xxlarge"
                        weight="bold"
                        id="gem-challenge-completed-modal-heading"
                        tag="h2"
                    >
                        Congrats Rainier McCheddarton!
                    </Heading>
                }
                style={styles.celebrationModal}
                backgroundStyles={celebrationBgStyle}
                content={({title}) => (
                    <View style={styles.centered}>
                        <img src={celebrationChest} width="280px" alt="" />
                        {title}
                        <Heading
                            size="large"
                            weight="bold"
                            style={{
                                marginBlock: sizing.size_240,
                                textAlign: "center",
                            }}
                        >
                            Your class, Advanced Calculus, reached 1500 of 1500
                            gems
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
);

CelebrationModal.parameters = {
    docs: {
        description: {
            story: `A FlexibleDialog with full-bleed background image and custom contents.`,
        },
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
                <FlexibleDialog
                    title={<Heading>Single-line title</Heading>}
                    content={({title}) => (
                        <View style={{gap: sizing.size_160}}>
                            {title}
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
                        </View>
                    )}
                    above={<View style={aboveStyle} />}
                    below={<View style={belowStyle} />}
                />
            </View>
        </View>
    );
};

WithAboveAndBelow.parameters = {
    docs: {
        description: {
            story: `The element passed into the \`above\` prop is
            rendered in front of the modal. The element passed into the
            \`below\` prop is rendered behind the modal. In this example,
            a \`<View>\` element with a background image of a person and an
            orange blob is passed into the \`below\` prop. A \`<View>\`
            element with a background image of an arc and a blue semicircle
            is passed into the \`above\` prop. This results in the person's
            head and the orange blob peeking out from behind the modal, and
            the arc and semicircle going over the front of the modal.`,
        },
    },
};

export const WithStyle: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <FlexibleDialog
                title={<Heading>Hello, world!</Heading>}
                content={
                    <>
                        <BodyText>
                            {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                        </BodyText>
                    </>
                }
                style={{
                    color: semanticColor.status.notice.foreground,
                    maxWidth: 1000,
                }}
            />
        </View>
    </View>
);

WithStyle.parameters = {
    docs: {
        description: {
            story: `A FlexibleDialog can have custom styles via the
            \`style\` prop. Here, the modal has a \`maxWidth: 1000\` and
            \`color: Color.blue\` in its custom styles.`,
        },
    },
};

export const MultiStepModal: StoryComponentType = () => {
    const styles = StyleSheet.create({
        example: {
            padding: sizing.size_320,
            alignItems: "center",
        },
        row: {
            flexDirection: "row",
            justifyContent: "flex-end",
        },
    });

    type ExerciseModalProps = {
        current: number;
        handleNextButton: () => unknown;
        handlePrevButton: () => unknown;
        question: string;
        total: number;
    };

    const ExerciseModal = function (
        props: ExerciseModalProps,
    ): React.ReactElement {
        const {current, handleNextButton, handlePrevButton, question, total} =
            props;

        return (
            <FlexibleDialog
                title={<Heading id="heading-1">Exercises</Heading>}
                content={({title}) => (
                    <>
                        <View>
                            {title}
                            <BodyText>
                                This is the current question: {question}
                            </BodyText>
                        </View>
                        <View style={styles.footer}>
                            <BodyText weight="bold">
                                Step {current + 1} of {total}
                            </BodyText>
                            <View style={styles.row}>
                                <Button
                                    kind="tertiary"
                                    onClick={handlePrevButton}
                                >
                                    Previous
                                </Button>
                                <Button
                                    kind="primary"
                                    onClick={handleNextButton}
                                >
                                    Next
                                </Button>
                            </View>
                        </View>
                    </>
                )}
            />
        );
    };

    type ExerciseContainerProps = {
        questions: Array<string>;
    };

    const ExerciseContainer = function (
        props: ExerciseContainerProps,
    ): React.ReactElement {
        const [currentQuestion, setCurrentQuestion] = React.useState(0);

        const handleNextButton = () => {
            setCurrentQuestion(
                Math.min(currentQuestion + 1, props.questions.length - 1),
            );
        };

        const handlePrevButton = () => {
            setCurrentQuestion(Math.max(0, currentQuestion - 1));
        };

        return (
            <ModalLauncher
                modal={
                    <ExerciseModal
                        question={props.questions[currentQuestion]}
                        current={currentQuestion}
                        total={props.questions.length}
                        handlePrevButton={handlePrevButton}
                        handleNextButton={handleNextButton}
                    />
                }
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Open multi-step modal</Button>
                )}
            </ModalLauncher>
        );
    };

    return (
        <View style={styles.example}>
            <ExerciseContainer
                questions={[
                    "First question",
                    "Second question",
                    "Last question",
                ]}
            />
        </View>
    );
};

MultiStepModal.parameters = {
    chromatic: {
        // This example is behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: `This example illustrates how we can update the
            Modal's contents by wrapping it into a new component/container.
            \`Modal\` is built in a way that provides great flexibility and
            makes it work with different variations and/or layouts.`,
        },
    },
};

export const WithLauncher: StoryComponentType = () => {
    type MyModalProps = {
        closeModal: () => void;
    };

    const MyModal = ({closeModal}: MyModalProps): React.ReactElement => (
        <FlexibleDialog
            title={<Heading>Single-line title</Heading>}
            content={
                <>
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
                    <View>
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
    docs: {
        description: {
            story: `A modal can be launched using a launcher. Here,
            the launcher is a \`<Button>\` element whose \`onClick\` function
            opens the modal. The modal passed into the \`modal\` prop of
            the \`<ModalLauncher>\` element is a \`<FlexibleDialog>\`.
            To turn an element into a launcher, wrap the element in a
            \`<ModalLauncher>\` element.`,
        },
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
        minHeight: 600,
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
    celebrationModal: {
        maxWidth: 1024,
    },
});
