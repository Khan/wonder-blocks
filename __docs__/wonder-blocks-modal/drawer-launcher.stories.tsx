import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {ActionMenu, ActionItem} from "@khanacademy/wonder-blocks-dropdown";
import {RadioGroup, Choice} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {DrawerDialog, DrawerLauncher} from "@khanacademy/wonder-blocks-modal";
import packageConfig from "../../packages/wonder-blocks-modal/package.json";

import type {ModalElement} from "../../packages/wonder-blocks-modal/src/util/types";
import DrawerLauncherArgTypes from "./drawer-launcher.argtypes";

import ComponentInfo from "../components/component-info";
import {allModes} from "../../.storybook/modes";
import TextField from "../../packages/wonder-blocks-form/src/components/text-field";
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

const DefaultModal = (): ModalElement => (
    <DrawerDialog
        title="Single-line title"
        content={
            <View>
                <BodyText>{reallyLongText}</BodyText>
            </View>
        }
    />
);

export default {
    title: "Packages / Modal / DrawerLauncher / DrawerLauncher",
    component: DrawerLauncher,
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
                component: `A drawer modal launcher intended for the DrawerDialog component. It can align a dialog on the left (inlineStart), right (inlineEnd), or bottom of the screen.

- Slide animations can be turned off with the \`animated\` prop.
- Timing of animations can be fine-tuned with the \`timingDuration\` prop, used on enter and exit animations. It is also used to coordinate timing of focus management on open and close.

### Usage

\`\`\`jsx
import {DrawerLauncher} from "@khanacademy/wonder-blocks-modal";
import {DrawerDialog} from "@khanacademy/wonder-blocks-modal";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

<DrawerLauncher
     onClose={handleClose}
     opened={opened}
     animated={animated}
     alignment="inlineStart"
     modal={({closeModal}) => (
         <DrawerDialog
             title="Assign Mastery Mission"
             content={
                 <View>
                     <BodyText>
                         Hello, world
                     </BodyText>
                 </View>
             }
         />
     )}
/>
\`\`\``,
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
    argTypes: DrawerLauncherArgTypes,
} as Meta<typeof DrawerLauncher>;

type StoryComponentType = StoryObj<typeof DrawerLauncher>;

export const Default: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => (
        <DrawerLauncher {...args} modal={DefaultModal}>
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </DrawerLauncher>
    ),
};

Default.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

/**
 *
 * An inlineStart-aligned drawer. Uses the `alignment` prop to slide in from the
 * left in LTR writing mode and right in RTL writing mode.
 */
export const InlineStartAligned: StoryComponentType = {
    args: {
        alignment: "inlineStart",
    },
    render: (args) => (
        <DrawerLauncher modal={DefaultModal} alignment={args.alignment}>
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </DrawerLauncher>
    ),
};

InlineStartAligned.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};
/**
 *
 * An inlineEnd-aligned drawer. Uses the `alignment` prop to slide in from the
 * right in LTR writing mode and left in RTL writing mode.
 */
export const InlineEndAligned: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => (
        <DrawerLauncher modal={DefaultModal} alignment={args.alignment}>
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </DrawerLauncher>
    ),
};

InlineEndAligned.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

/**
 *
 * An blockEnd-aligned drawer. Uses the `alignment` prop to slide in from the
 * bottom in all writing modes, and a `timingDuration` of 400 milliseconds to
 * allow more time for animating-in vertically.
 */
export const BlockEndAligned: StoryComponentType = {
    args: {
        alignment: "blockEnd",
        timingDuration: 400,
    },
    render: (args) => (
        <DrawerLauncher modal={DefaultModal} alignment={args.alignment}>
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </DrawerLauncher>
    ),
};

BlockEndAligned.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

/**
 *
 * A drawer with `animated` set to false for reducing motion
 */
export const WithNoAnimation: StoryComponentType = {
    args: {
        alignment: "inlineStart",
    },
    render: (args) => (
        <DrawerLauncher
            modal={DefaultModal}
            animated={false}
            alignment={args.alignment}
        >
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </DrawerLauncher>
    ),
};

WithNoAnimation.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

/**
 *
 * An drawer with short content for style testing.
 *
 * Note: this component likely isn't the best choice for short content in the wild.
 */
export const WithShortContent: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => (
        <DrawerLauncher
            modal={
                <DrawerDialog
                    title="Single-line title"
                    content={
                        <View>
                            <BodyText>Short contents</BodyText>
                        </View>
                    }
                />
            }
            alignment={args.alignment}
        >
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </DrawerLauncher>
    ),
};

WithShortContent.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};
/**
 *
 * A launcher with a really long DrawerDialog, for testing overflow styles.
 */
export const WithReallyLongContent: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => {
        type CloseModalProps = {
            closeModal: () => void;
        };
        const longModal = ({closeModal}: CloseModalProps) => (
            <DrawerDialog
                title="Really long content area"
                content={
                    <View>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                        <BodyText>{reallyLongText}</BodyText>
                    </View>
                }
            />
        );
        return (
            <DrawerLauncher alignment={args.alignment} modal={longModal}>
                {({openModal}) => (
                    <Button onClick={openModal}>
                        Click me to open the modal
                    </Button>
                )}
            </DrawerLauncher>
        );
    },
};

WithReallyLongContent.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

const NestedDrawerDialogComponent = ({titleText}: {titleText: string}) => {
    return (
        <DrawerDialog
            title={titleText}
            content={({title: titleElement}) => (
                <View style={styles.nestedModalContent}>
                    {titleElement}
                    <BodyText size="small">
                        Testing out nested modal content
                    </BodyText>
                </View>
            )}
        />
    );
};

/**
 *
 * A launcher with nested dialogs, for testing a real-world implementation.
 * This demonstrates that DrawerLauncher styles are properly applied to DrawerDialog
 * even when there are nested components in between. The modal should receive the
 * proper alignment animation and full-height styles.
 */
export const WithNestedDialogs: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => {
        const renderNestedModal = ({closeModal}: {closeModal: () => void}) => {
            return (
                <NestedDrawerDialogComponent titleText="Nested DrawerDialog" />
            );
        };

        return (
            <DrawerLauncher
                alignment={args.alignment}
                modal={renderNestedModal}
            >
                {({openModal}) => (
                    <Button onClick={openModal}>
                        Click me to open the modal
                    </Button>
                )}
            </DrawerLauncher>
        );
    },
};

WithNestedDialogs.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};
/**
 *
 * An drawer with customized dialog dimensions.
 */
export const WithCustomDimensions: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => (
        <DrawerLauncher
            modal={
                <DrawerDialog
                    styles={{
                        root: {
                            minWidth: "unset",
                            width: "unset",
                        },
                    }}
                    title="Single-line title"
                    content={
                        <View>
                            <BodyText>Short contents</BodyText>
                        </View>
                    }
                />
            }
            alignment={args.alignment}
        >
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </DrawerLauncher>
    ),
};

WithCustomDimensions.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

/**
 *
 *  This is an example in which the modal _cannot_
    be dismissed by clicking in in the backdrop. This is done by
    setting the `backdropDismissEnabled` prop on the
    `<DrawerLauncher>` element to false.
 */
export const WithBackdropDismissDisabled: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => (
        <DrawerLauncher
            modal={DefaultModal}
            backdropDismissEnabled={false}
            alignment={args.alignment}
        >
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </DrawerLauncher>
    ),
};

WithBackdropDismissDisabled.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

/**
 *
 *  Sometimes you'll want to trigger a modal
    programmatically. This can be done by rendering `<DrawerLauncher>`
    without any children and instead setting its `opened` prop to
    true. In this situation, `DrawerLauncher` is a controlled
    component which means you'll also have to update `opened` to
    false in response to the `onClose` callback being triggered.
    It is necessary to use this method in this example, as
    `ActionMenu` cannot have a `DrawerLauncher` element as a child,
    (it can only have `Item` elements as children), so launching a
    modal from a dropdown must be done programatically.
 */
export const TriggeringProgrammatically: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
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

                <DrawerLauncher
                    onClose={handleClose}
                    opened={opened}
                    alignment={args.alignment}
                    modal={({closeModal}) => (
                        <DrawerDialog
                            title="Triggered from action menu"
                            content={
                                <View>
                                    <BodyText>Hello, world</BodyText>
                                </View>
                            }
                        />
                    )}
                    // Note that this modal launcher has no children.
                />
            </View>
        );
    },
};

TriggeringProgrammatically.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

/**
 *
 *  You can use the `closedFocusId` prop on the
    `DrawerLauncher` to specify where to set the focus after the
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
    dropdown. A solution to this is to use the `closedFocusId` prop
    to specify where to set the focus after the modal has been closed.
    In this example, `closedFocusId` is set to the ID of the button
    labeled "Focus here after close." If the focus shifts to the button
    labeled "Top of page (should not receieve focus)," then the focus
    is on the page body, and the `closedFocusId` did not work.
 */
export const WithClosedFocusId: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
                    <ActionItem
                        label="Open modal"
                        onClick={() => handleOpen()}
                    />
                </ActionMenu>
                <DrawerLauncher
                    alignment={args.alignment}
                    onClose={() => handleClose()}
                    opened={opened}
                    closedFocusId="button-to-focus-on"
                    modal={DefaultModal}
                />
            </View>
        );
    },
};

WithClosedFocusId.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

/**
 *  Sometimes, you may want a specific element inside
    the modal to receive focus first. This can be done using the
    `initialFocusId` prop on the `<DrawerLauncher>` element.
    Just pass in the ID of the element that should receive focus,
    and it will automatically receieve focus once the modal opens.
    In this example, the top text input would have received the focus
    by default, but the bottom text field receives focus instead
    since its ID is passed into the `initialFocusId` prop.
 */
export const WithInitialFocusId: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = React.useState("Previously stored value");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value2, setValue2] = React.useState("");

        // @ts-expect-error [FEI-5019] - TS7031 - Binding element 'closeModal' implicitly has an 'any' type.
        const modalInitialFocus = ({closeModal}) => (
            <DrawerDialog
                title="Single-line title"
                content={
                    <View>
                        <View style={{gap: sizing.size_240}}>
                            <LabeledField
                                label="Label"
                                field={
                                    <TextField
                                        value={value}
                                        onChange={setValue}
                                    />
                                }
                            />
                            <LabeledField
                                label="Label 2"
                                id="field-to-be-focused"
                                field={
                                    <TextField
                                        value={value2}
                                        onChange={setValue2}
                                    />
                                }
                            />
                        </View>
                        <View style={styles.row}>
                            <Button kind="tertiary" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button onClick={closeModal}>Submit</Button>
                        </View>
                    </View>
                }
            />
        );

        return (
            <DrawerLauncher
                alignment={args.alignment}
                modal={modalInitialFocus}
                initialFocusId="field-to-be-focused-field"
            >
                {({openModal}) => (
                    <Button onClick={openModal}>
                        Open modal with initial focus
                    </Button>
                )}
            </DrawerLauncher>
        );
    },
};

WithInitialFocusId.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

/**
 * Focus trap navigation
 */
const SubModal = () => (
    <DrawerDialog
        title="Submodal"
        content={
            <View style={{gap: sizing.size_160}}>
                <BodyText>
                    This modal demonstrates how the focus trap works when a
                    modal is opened from another modal.
                </BodyText>
                <BodyText>
                    Try navigating this modal with the keyboard and then close
                    it. The focus should be restored to the button that opened
                    the modal.
                </BodyText>
                <LabeledField
                    label="Label"
                    field={<TextField value="" onChange={() => {}} />}
                />
                <Button>A focusable element</Button>
            </View>
        }
    />
);

/**
 *  All modals have a focus trap, which means that the
    focus is locked inside the modal. This is done to prevent the user
    from tabbing out of the modal and losing their place. The focus
    trap is also used to ensure that the focus is restored to the
    correct element when the modal is closed. In this example, the
    focus is trapped inside the modal, and the focus is restored to the
    button that opened the modal when the modal is closed.

    Also, this example includes a sub-modal that is opened from the
    first modal so we can test how the focus trap works when multiple
    modals are open.
 */
export const FocusTrap: StoryComponentType = {
    args: {
        alignment: "inlineEnd",
    },
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [selectedValue, setSelectedValue] = React.useState<any>(null);

        // @ts-expect-error [FEI-5019] - TS7031 - Binding element 'closeModal' implicitly has an 'any' type.
        const modalInitialFocus = ({closeModal}) => (
            <DrawerDialog
                title="Testing the focus trap on multiple modals"
                closeButtonVisible={false}
                content={
                    <View>
                        <View style={{gap: sizing.size_240}}>
                            <BodyText id="focus-trap-story-body-text">
                                This modal demonstrates how the focus trap works
                                with form elements (or focusable elements). Also
                                demonstrates how the focus trap is moved to the
                                next modal when it is opened (focus/tap on the
                                `Open another modal` button).
                            </BodyText>
                            <RadioGroup
                                label="A RadioGroup component inside a modal"
                                description="Some description"
                                groupName="some-group-name"
                                onChange={setSelectedValue}
                                selectedValue={selectedValue ?? ""}
                            >
                                <Choice
                                    label="Choice 1"
                                    value="some-choice-value"
                                />
                                <Choice
                                    label="Choice 2"
                                    value="some-choice-value-2"
                                />
                            </RadioGroup>
                        </View>
                        <View style={styles.row}>
                            <DrawerLauncher
                                modal={SubModal}
                                alignment={args.alignment}
                            >
                                {({openModal}) => (
                                    <Button
                                        kind="secondary"
                                        onClick={openModal}
                                    >
                                        Open another modal
                                    </Button>
                                )}
                            </DrawerLauncher>

                            <Button
                                onClick={closeModal}
                                disabled={!selectedValue}
                            >
                                Next
                            </Button>
                        </View>
                    </View>
                }
                aria-describedby="focus-trap-story-body-text"
            />
        );

        return (
            <DrawerLauncher
                modal={modalInitialFocus}
                alignment={args.alignment}
            >
                {({openModal}) => (
                    <Button onClick={openModal}>
                        Open modal with RadioGroup
                    </Button>
                )}
            </DrawerLauncher>
        );
    },
};

FocusTrap.storyName = "Navigation with focus trap";

FocusTrap.parameters = {
    chromatic: {
        // All the examples for DrawerLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
};

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        gap: sizing.size_160,
        paddingBlockStart: sizing.size_160,
    },
});
