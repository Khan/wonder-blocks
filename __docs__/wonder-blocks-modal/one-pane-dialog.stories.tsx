/* eslint-disable no-alert */
import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";

import {ModalLauncher, OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import packageConfig from "../../packages/wonder-blocks-modal/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import OnePaneDialogArgTypes from "./one-pane-dialog.argtypes";

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
    title: "Packages / Modal / OnePaneDialog",
    component: OnePaneDialog,
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
            viewports: [320, 640, 1024],
        },
    },
    argTypes: OnePaneDialogArgTypes,
} as Meta<typeof OnePaneDialog>;

type StoryComponentType = StoryObj<typeof OnePaneDialog>;

export const Default: StoryComponentType = {
    render: (args) => (
        <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <OnePaneDialog {...args} />
            </View>
        </View>
    ),
    args: {
        content: (
            <Body>
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est.`}
            </Body>
        ),
        title: "Some title",
    },
};

export const Simple: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog
                title="Hello, world! Here is an example of a long title that wraps to the next line."
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
            />
        </View>
    </View>
);

Simple.parameters = {
    docs: {
        description: {
            story: `This is the most basic OnePaneDialog, with just
            the title and content.`,
        },
    },
};

export const WithFooter: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog
                title="Hello, world!"
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
                footer={
                    <View style={styles.footer}>
                        <LabelLarge>Step 1 of 4</LabelLarge>
                        <View style={styles.row}>
                            <Button kind="tertiary">Previous</Button>
                            <Strut size={16} />
                            <Button kind="primary">Next</Button>
                        </View>
                    </View>
                }
            />
        </View>
    </View>
);

WithFooter.parameters = {
    docs: {
        description: {story: `This OnePaneDialog includes a custom footer.`},
    },
};

export const WithSubtitle: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog
                title="Hello, world!"
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
                subtitle={
                    "Subtitle that provides additional context to the title"
                }
            />
        </View>
    </View>
);

WithSubtitle.parameters = {
    docs: {
        description: {story: `This OnePaneDialog includes a custom subtitle.`},
    },
};

export const WithBreadcrumbs: StoryComponentType = () => (
    <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog
                title="Hello, world!"
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
                breadcrumbs={
                    <Breadcrumbs>
                        <BreadcrumbsItem>
                            <Link href="">Course</Link>
                        </BreadcrumbsItem>
                        <BreadcrumbsItem>
                            <Link href="">Unit</Link>
                        </BreadcrumbsItem>
                        <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                    </Breadcrumbs>
                }
            />
        </View>
    </View>
);

WithBreadcrumbs.parameters = {
    docs: {
        description: {
            story: `This OnePaneDialog includes a custom Breadcrumbs
            element.`,
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
                <OnePaneDialog
                    title="Single-line title"
                    content={
                        <View>
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
                        </View>
                    }
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
            <OnePaneDialog
                title="Hello, world!"
                content={
                    <Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}
                    </Body>
                }
                style={{
                    color: color.blue,
                    maxWidth: 1000,
                }}
            />
        </View>
    </View>
);

WithStyle.parameters = {
    docs: {
        description: {
            story: `A OnePaneDialog can have custom styles via the
            \`style\` prop. Here, the modal has a \`maxWidth: 1000\` and
            \`color: Color.blue\` in its custom styles.`,
        },
    },
};

export const FlexibleModal: StoryComponentType = () => {
    const styles = StyleSheet.create({
        example: {
            padding: spacing.xLarge_32,
            alignItems: "center",
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
            <OnePaneDialog
                title="Exercises"
                content={
                    <View>
                        <Body>This is the current question: {question}</Body>
                    </View>
                }
                footer={
                    <View style={styles.footer}>
                        <LabelLarge>
                            Step {current + 1} of {total}
                        </LabelLarge>
                        <View style={styles.row}>
                            <Button kind="tertiary" onClick={handlePrevButton}>
                                Previous
                            </Button>
                            <Strut size={16} />
                            <Button kind="primary" onClick={handleNextButton}>
                                Next
                            </Button>
                        </View>
                    </View>
                }
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
                    <Button onClick={openModal}>Open flexible modal</Button>
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

FlexibleModal.parameters = {
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
        <OnePaneDialog
            title="Single-line title"
            content={
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
            }
            footer={<Button onClick={closeModal}>Close</Button>}
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
            the \`<ModalLauncher>\` element is a \`<OnePaneDialog>\`.
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
});
