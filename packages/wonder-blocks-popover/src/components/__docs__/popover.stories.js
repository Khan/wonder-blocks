// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";
import type {Placement} from "@khanacademy/wonder-blocks-tooltip";
import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import PopoverArgtypes from "./popover.argtypes.js";

export default {
    title: "Popover/Popover",
    component: Popover,
    argTypes: PopoverArgtypes,
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
        // TODO(WB-1170): Reassess this after investigating more about Chromatic
        // flakyness.
        chromatic: {
            disableSnapshot: true,
        },
    },
    decorators: [
        (Story: any): React.Element<typeof View> => (
            <View style={styles.example}>{Story()}</View>
        ),
    ],
};

const styles = StyleSheet.create({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        height: `calc(100vh - 16px)`,
    },
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
    },
    actions: {
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
    },
});

const Template = (args) => <Popover {...args} />;

export const Default: StoryComponentType = Template.bind({});

Default.args = {
    children: ({open}) => <Button onClick={open}>Open default popover</Button>,
    content: (
        <PopoverContent
            closeButtonVisible
            title="Title"
            content="The popover content."
        />
    ),

    placement: "top",
    dismissEnabled: true,
    id: "",
    initialFocusId: "",
    testId: "",
    onClose: () => {},
};

/**
 * Using a trigger element
 */

export const TriggerElement: StoryComponentType = Template.bind({});

TriggerElement.args = {
    children: ({open}) => <Button onClick={open}>Trigger element</Button>,
    content: (
        <PopoverContent
            closeButtonVisible
            title="Title"
            content="The popover content."
            image={
                <img
                    src="/illustration.svg"
                    alt="An illustration of a person skating on a pencil"
                    width={288}
                    height={200}
                />
            }
        />
    ),

    dismissEnabled: true,
};

TriggerElement.parameters = {
    docs: {
        description: {
            story:
                `This example shows a popover adorning the same element that
                triggers it. This is accomplished by passing a function as
                children and using the \`open\` property passed it as the
                \`onClick\` handler on a button in this example.\n\n` +
                `**NOTES:**\n` +
                `- You will always need to add a trigger element inside the
                Popover to control when and/or from where to open the popover
                dialog.\n` +
                `- For this example, if you use the \`image\` prop, make sure
                to avoid using \`icon\` and/or \`emphasized\` at the same time.
                Doing so will throw an error.\n` +
                `- This example uses the \`dismissEnabled\` prop. This means
                that the user can close the Popover by pressing \`Esc\` or
                clicking in the trigger element.`,
        },
    },
};

/**
 * Opening a popover programatically (Controlled)
 */
export const Controlled: StoryComponentType = () => {
    const [opened, setOpened] = React.useState(true);
    return (
        <View style={styles.row}>
            <Popover
                opened={opened}
                onClose={() => {
                    setOpened(false);
                }}
                content={({close}) => (
                    <PopoverContent
                        title="Controlled popover"
                        content="This popover is controlled programatically. This means that is only displayed using the `opened` prop."
                        actions={
                            <Button
                                onClick={() => {
                                    close();
                                }}
                            >
                                Click to close the popover
                            </Button>
                        }
                    />
                )}
            >
                <Button
                    // eslint-disable-next-line no-console
                    onClick={() => console.log("This is a controlled popover.")}
                >
                    Anchor element (it does not open the popover)
                </Button>
            </Popover>
            <Strut size={Spacing.xLarge_32} />
            <Button onClick={() => setOpened(true)}>
                Outside button (click here to re-open the popover)
            </Button>
        </View>
    );
};

Controlled.args = {
    children: ({open}) => <Button onClick={open}>Trigger element</Button>,
    content: (
        <PopoverContent
            closeButtonVisible
            title="Title"
            content="The popover content."
            image={
                <img
                    src="/illustration.svg"
                    alt="An illustration of a person skating on a pencil"
                    width={288}
                    height={200}
                />
            }
        />
    ),

    dismissEnabled: true,
};

Controlled.parameters = {
    docs: {
        description: {
            story:
                `Sometimes you'll want to trigger a popover programmatically.
                This can be done by setting the \`opened\` prop to \`true\`. In
                this situation the \`Popover\` is a controlled component. The
                parent is responsible for managing the opening/closing of the
                popover when using this prop. This means that you'll also have
                to update \`opened\` to \`false\` in response to the
                \`onClose\` callback being triggered.\n\n` +
                `Here you can see as well how the focus is managed when a
                popover is opened. To see more details, please check the
                **Accesibility section**.`,
        },
    },
};

/**
 * With Actions
 */
export const WithActions: StoryComponentType = Template.bind({});

const PopoverContentWithActions = ({close}: {|close: () => void|}) => {
    const [step, setStep] = React.useState(1);
    const totalSteps = 5;
    return (
        <PopoverContent
            title="Popover with actions"
            content="This example shows a popover which contains a set of actions that can be used to control the popover itself."
            actions={
                <View style={[styles.row, styles.actions]}>
                    <LabelLarge>
                        Step {step} of {totalSteps}
                    </LabelLarge>
                    <Strut size={Spacing.medium_16} />
                    <Button
                        kind="tertiary"
                        onClick={() => {
                            if (step < totalSteps) {
                                setStep(step + 1);
                            } else {
                                close();
                            }
                        }}
                    >
                        {step < totalSteps ? "Skip this step" : "Finish"}
                    </Button>
                </View>
            }
        />
    );
};

WithActions.args = {
    children: ({open}) => (
        <Button onClick={open}>Open popover with actions</Button>
    ),
    placement: "top",
    content: ({close}) => <PopoverContentWithActions close={close} />,
};

WithActions.parameters = {
    docs: {
        description: {
            story: `Sometimes you need to add actions to be able to
            control the popover state. For this reason, you can make use of the
            \`actions\` prop:`,
        },
    },
};

export const WithInitialFocusId: StoryComponentType = Template.bind({});

WithInitialFocusId.args = {
    children: ({open}) => (
        <Button onClick={open}>
            Open with initial focus on the &quot;Next&quot; button
        </Button>
    ),
    content: (
        <PopoverContent
            title="
            Setting initialFocusId"
            content="The focus will be set on the second button"
            actions={
                <View style={styles.row}>
                    <Button kind="tertiary" id="popover-button-1">
                        No focus
                    </Button>
                    <Strut size={Spacing.medium_16} />
                    <Button kind="tertiary" id="popover-button-2">
                        It is focused!
                    </Button>
                </View>
            }
        />
    ),
    placement: "top",
    dismissEnabled: true,
    initialFocusId: "popover-button-2",
};

WithInitialFocusId.storyName = "With initialFocusId";

WithInitialFocusId.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: `Sometimes, you may want a specific element inside
            the Popover to receive focus first. This can be done using the
            \`initialFocusId\` prop on the \`<Popover>\` element.
            Just pass in the ID of the element that should receive focus,
            and it will automatically receieve focus once the popover is
            displayed.
            In this example, the first button would have received the focus
            by default, but the second button receives focus instead
            since its ID is passed into the \`initialFocusId\` prop.`,
        },
    },
};

/**
 * Alignment example
 */
const BasePopoverExample = ({placement}: {|placement: Placement|}) => {
    const [opened, setOpened] = React.useState(true);
    return (
        <View style={styles.example}>
            <Popover
                placement={placement}
                opened={opened}
                onClose={() => setOpened(false)}
                content={
                    <PopoverContent
                        title="Title"
                        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                        closeButtonVisible
                    />
                }
            >
                <Button
                    onClick={() => {
                        setOpened(true);
                    }}
                >
                    {`Open popover: ${placement}`}
                </Button>
            </Popover>
        </View>
    );
};

export const PopoverAlignment: StoryComponentType = () => (
    <View style={styles.container}>
        <BasePopoverExample placement="left" />
        <BasePopoverExample placement="bottom" />
        <BasePopoverExample placement="right" />
        <BasePopoverExample placement="top" />
    </View>
);
