import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {ActionMenu, ActionItem} from "@khanacademy/wonder-blocks-dropdown";
import {
    LabeledTextField,
    RadioGroup,
    Choice,
} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, Title} from "@khanacademy/wonder-blocks-typography";

import {ModalLauncher, OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import {name, version} from "../../packages/wonder-blocks-modal/package.json";

import type {ModalElement} from "../../packages/wonder-blocks-modal/src/util/types";
import ModalLauncherArgTypes from "./modal-launcher.argtypes";

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

const DefaultModal = (): ModalElement => (
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
            </View>
        }
    />
);

export default {
    title: "Modal/ModalLauncher",
    component: ModalLauncher,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
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
    argTypes: ModalLauncherArgTypes,
} satisfies ComponentMeta<typeof ModalLauncher>;

type StoryComponentType = ComponentStory<typeof ModalLauncher>;

export const Default: StoryComponentType = (args) => (
    <ModalLauncher {...args} modal={DefaultModal}>
        {({openModal}) => (
            <Button onClick={openModal}>Click me to open the modal</Button>
        )}
    </ModalLauncher>
);

Default.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

export const Simple: StoryComponentType = () => (
    <ModalLauncher modal={DefaultModal}>
        {({openModal}) => (
            <Button onClick={openModal}>Click me to open the modal</Button>
        )}
    </ModalLauncher>
);

Simple.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `This is a basic modal launcher. Its child, the
            button, has access to the \`openModal\` function via the
            function-as-child pattern. It passes this into its \`onClick\`
            function, which causes the modal to launch when the button
            is clicked.`,
    },
};

export const WithCustomCloseButton: StoryComponentType = () => {
    type MyModalProps = {
        closeModal: () => void;
    };

    const ModalWithCloseButton = ({
        closeModal,
    }: MyModalProps): React.ReactElement => (
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
                </View>
            }
            // No "X" close button in the top right corner
            closeButtonVisible={false}
            footer={<Button onClick={closeModal}>Close</Button>}
        />
    );

    return (
        <ModalLauncher modal={ModalWithCloseButton}>
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </ModalLauncher>
    );
};

WithCustomCloseButton.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `This is an example of a modal that uses
            a close button other than the default "X" button in the top
            right corner. Here, the default "X" close button is not rendered
            because the \`closeButtonVisible\` prop on the \`<OnePaneDialog>\`
            is set to false. Instead, a custom close button has been added
            to the modal footer. The \`modal\` prop on \`<ModalLauncher>\`
            can either be a plain modal, or it can be a function that takes
            a \`closeModal\` function as a parameter and returns a modal.
            The latter is what we do in this case. Then the \`closeModal\`
            function is passed into the \`onClick\` prop on the button
            in the footer.`,
    },
};

export const WithBackdropDismissDisabled: StoryComponentType = () => (
    <ModalLauncher modal={DefaultModal} backdropDismissEnabled={false}>
        {({openModal}) => (
            <Button onClick={openModal}>Click me to open the modal</Button>
        )}
    </ModalLauncher>
);

WithBackdropDismissDisabled.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `This is an example in which the modal _cannot_
            be dismissed by clicking in in the backdrop. This is done by
            setting the \`backdropDismissEnabled\` prop on the
            \`<ModalLauncher>\` element to false.`,
    },
};

export const TriggeringProgrammatically: StoryComponentType = () => {
    const [opened, setOpened] = React.useState(false);

    const handleOpen = () => {
        setOpened(true);
    };

    const handleClose = () => {
        setOpened(false);
    };

    return (
        <View>
            <ActionMenu menuText="actions">
                <ActionItem label="Open modal" onClick={handleOpen} />
            </ActionMenu>

            <ModalLauncher
                onClose={handleClose}
                opened={opened}
                modal={({closeModal}) => (
                    <OnePaneDialog
                        title="Triggered from action menu"
                        content={
                            <View>
                                <Title>Hello, world</Title>
                            </View>
                        }
                        footer={
                            <Button onClick={closeModal}>Close Modal</Button>
                        }
                    />
                )}
                // Note that this modal launcher has no children.
            />
        </View>
    );
};

TriggeringProgrammatically.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `Sometimes you'll want to trigger a modal
            programmatically. This can be done by rendering \`<ModalLauncher>\`
            without any children and instead setting its \`opened\` prop to
            true. In this situation, \`ModalLauncher\` is a controlled
            component which means you'll also have to update \`opened\` to
            false in response to the \`onClose\` callback being triggered.
            It is necessary to use this method in this example, as
            \`ActionMenu\` cannot have a \`ModalLauncher\` element as a child,
            (it can only have \`Item\` elements as children), so launching a
            modal from a dropdown must be done programatically.`,
    },
};

export const WithClosedFocusId: StoryComponentType = () => {
    const [opened, setOpened] = React.useState(false);

    const handleOpen = () => {
        setOpened(true);
    };

    const handleClose = () => {
        setOpened(false);
    };

    return (
        <View style={{gap: 20}}>
            <Button>Top of page (should not receive focus)</Button>
            <Button id="button-to-focus-on">Focus here after close</Button>
            <ActionMenu menuText="actions">
                <ActionItem label="Open modal" onClick={() => handleOpen()} />
            </ActionMenu>
            <ModalLauncher
                onClose={() => handleClose()}
                opened={opened}
                closedFocusId="button-to-focus-on"
                modal={DefaultModal}
            />
        </View>
    );
};

WithClosedFocusId.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `You can use the \`closedFocusId\` prop on the
            \`ModalLauncher\` to specify where to set the focus after the
            modal has been closed. Imagine the following situation:
            clicking on a dropdown menu option to open a modal
            causes the dropdown to close, and so all of the dropdown options
            are removed from the DOM. This can be a problem because by
            default, the focus shifts to the previously focused element after
            a modal is closed; in this case, the element that opened the modal
            cannot receive focus since it no longer exists in the DOM,
            so when you close the modal, it doesn't know where to focus on the
            page. When the previously focused element no longer exists,
            the focus shifts to the page body, which causes a jump to
            the top of the page. This can make it diffcult to find the original
            dropdown. A solution to this is to use the \`closedFocusId\` prop\
            to specify where to set the focus after the modal has been closed.
            In this example, \`closedFocusId\` is set to the ID of the button
            labeled "Focus here after close." If the focus shifts to the button
            labeled "Top of page (should not receieve focus)," then the focus
            is on the page body, and the \`closedFocusId\` did not work.`,
    },
};

export const WithInitialFocusId: StoryComponentType = () => {
    const [value, setValue] = React.useState("Previously stored value");
    const [value2, setValue2] = React.useState("");

    // @ts-expect-error [FEI-5019] - TS7031 - Binding element 'closeModal' implicitly has an 'any' type.
    const modalInitialFocus = ({closeModal}) => (
        <OnePaneDialog
            title="Single-line title"
            content={
                <>
                    <LabeledTextField
                        label="Label"
                        value={value}
                        onChange={setValue}
                    />
                    <Strut size={Spacing.large_24} />
                    <LabeledTextField
                        label="Label 2"
                        value={value2}
                        onChange={setValue2}
                        id="text-field-to-be-focused"
                    />
                </>
            }
            footer={
                <>
                    <Button kind="tertiary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Strut size={Spacing.medium_16} />
                    <Button onClick={closeModal}>Submit</Button>
                </>
            }
        />
    );

    return (
        <ModalLauncher
            modal={modalInitialFocus}
            initialFocusId="text-field-to-be-focused-field"
        >
            {({openModal}) => (
                <Button onClick={openModal}>
                    Open modal with initial focus
                </Button>
            )}
        </ModalLauncher>
    );
};

WithInitialFocusId.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        storyDescription: `Sometimes, you may want a specific element inside
            the modal to receive focus first. This can be done using the
            \`initialFocusId\` prop on the \`<ModalLauncher>\` element.
            Just pass in the ID of the element that should receive focus,
            and it will automatically receieve focus once the modal opens.
            In this example, the top text input would have received the focus
            by default, but the bottom text field receives focus instead
            since its ID is passed into the \`initialFocusId\` prop.`,
    },
};

/**
 * Focus trap navigation
 */
const SubModal = () => (
    <OnePaneDialog
        title="Submodal"
        content={
            <View style={{gap: Spacing.medium_16}}>
                <Body>
                    This modal demonstrates how the focus trap works when a
                    modal is opened from another modal.
                </Body>
                <Body>
                    Try navigating this modal with the keyboard and then close
                    it. The focus should be restored to the button that opened
                    the modal.
                </Body>
                <LabeledTextField label="Label" value="" onChange={() => {}} />
                <Button>A focusable element</Button>
            </View>
        }
    />
);

export const FocusTrap: StoryComponentType = () => {
    const [selectedValue, setSelectedValue] = React.useState<any>(null);

    // @ts-expect-error [FEI-5019] - TS7031 - Binding element 'closeModal' implicitly has an 'any' type.
    const modalInitialFocus = ({closeModal}) => (
        <OnePaneDialog
            title="Testing the focus trap on multiple modals"
            closeButtonVisible={false}
            content={
                <>
                    <Body id="focus-trap-story-body-text">
                        This modal demonstrates how the focus trap works with
                        form elements (or focusable elements). Also demonstrates
                        how the focus trap is moved to the next modal when it is
                        opened (focus/tap on the `Open another modal` button).
                    </Body>
                    <Strut size={Spacing.large_24} />
                    <RadioGroup
                        label="A RadioGroup component inside a modal"
                        description="Some description"
                        groupName="some-group-name"
                        onChange={setSelectedValue}
                        selectedValue={selectedValue ?? ""}
                    >
                        <Choice label="Choice 1" value="some-choice-value" />
                        <Choice label="Choice 2" value="some-choice-value-2" />
                    </RadioGroup>
                </>
            }
            footer={
                <>
                    <ModalLauncher modal={SubModal}>
                        {({openModal}) => (
                            <Button kind="secondary" onClick={openModal}>
                                Open another modal
                            </Button>
                        )}
                    </ModalLauncher>
                    <Strut size={Spacing.medium_16} />
                    <Button onClick={closeModal} disabled={!selectedValue}>
                        Next
                    </Button>
                </>
            }
            aria-describedby="focus-trap-story-body-text"
        />
    );

    return (
        <ModalLauncher modal={modalInitialFocus}>
            {({openModal}) => (
                <Button onClick={openModal}>Open modal with RadioGroup</Button>
            )}
        </ModalLauncher>
    );
};

FocusTrap.storyName = "Navigation with focus trap";

FocusTrap.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        storyDescription:
            `All modals have a focus trap, which means that the
            focus is locked inside the modal. This is done to prevent the user
            from tabbing out of the modal and losing their place. The focus
            trap is also used to ensure that the focus is restored to the
            correct element when the modal is closed. In this example, the
            focus is trapped inside the modal, and the focus is restored to the
            button that opened the modal when the modal is closed.\n\n` +
            `Also, this example includes a sub-modal that is opened from the
            first modal so we can test how the focus trap works when multiple
            modals are open.`,
    },
};

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
    },
});
