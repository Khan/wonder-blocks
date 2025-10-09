import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import pencilIcon from "@phosphor-icons/core/bold/pencil-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import dotsThreeIcon from "@phosphor-icons/core/regular/dots-three.svg";
import Button from "@khanacademy/wonder-blocks-button";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {ActionMenu, ActionItem} from "@khanacademy/wonder-blocks-dropdown";
import {
    LabeledTextField,
    RadioGroup,
    Choice,
} from "@khanacademy/wonder-blocks-form";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import {
    ModalDialog,
    ModalLauncher,
    ModalPanel,
    OnePaneDialog,
} from "@khanacademy/wonder-blocks-modal";
import packageConfig from "../../packages/wonder-blocks-modal/package.json";

import type {ModalElement} from "../../packages/wonder-blocks-modal/src/util/types";
import ModalLauncherArgTypes from "./modal-launcher.argtypes";

import ComponentInfo from "../components/component-info";
import {allModes} from "../../.storybook/modes";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

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
        }
    />
);

export default {
    title: "Packages / Modal / ModalLauncher",
    component: ModalLauncher,
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
            },
        },
    },
    argTypes: ModalLauncherArgTypes,
} as Meta<typeof ModalLauncher>;

type StoryComponentType = StoryObj<typeof ModalLauncher>;

export const Default: StoryComponentType = {
    render: (args) => (
        <ModalLauncher {...args} modal={DefaultModal}>
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </ModalLauncher>
    ),
};

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
        description: {
            story: "This is a basic modal launcher. Its child, the button, has access to the `openModal` function via the function-as-child pattern. It passes this into its `onClick` function, which causes the modal to launch when the button is clicked.",
        },
    },
};

export const WithLongContentsAndFooter: StoryComponentType = () => {
    const LongModal = () => (
        <OnePaneDialog
            title="Hello, world! Here is an example of a long title that wraps to the next line."
            content={
                <View>
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
                </View>
            }
            footer={
                <View style={styles.footer}>
                    <View style={styles.row}>
                        <Button kind="tertiary">Previous</Button>
                        <Button kind="primary">Next</Button>
                    </View>
                </View>
            }
        />
    );
    return (
        <ModalLauncher modal={LongModal}>
            {({openModal}) => (
                <Button onClick={openModal}>Click me to open the modal</Button>
            )}
        </ModalLauncher>
    );
};

WithLongContentsAndFooter.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: "This example demonstrates how to handle long content in modals, especially at high zoom levels. The modal supports two modes: standard (fixed height with overflow hidden) and fullscreen (scrollable content). The fullscreen mode is particularly useful for accessibility, allowing users to read all content even at 400% zoom.",
        },
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
        description: {
            story: 'This is an example of a modal that uses a close button other than the default "X" button in the top right corner. Here, the default "X" close button is not rendered because the `closeButtonVisible` prop on the `<OnePaneDialog>` is set to false. Instead, a custom close button has been added to the modal footer. The `modal` prop on `<ModalLauncher>` can either be a plain modal, or it can be a function that takes a `closeModal` function as a parameter and returns a modal. The latter is what we do in this case. Then the `closeModal` function is passed into the `onClick` prop on the button in the footer.',
        },
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
        description: {
            story: "This is an example in which the modal _cannot_ be dismissed by clicking in in the backdrop. This is done by setting the `backdropDismissEnabled` prop on the `<ModalLauncher>` element to false.",
        },
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
                                <Heading size="xxlarge">Hello, world</Heading>
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
        description: {
            story: "Sometimes you'll want to trigger a modal programmatically. This can be done by rendering `<ModalLauncher>` without any children and instead setting its `opened` prop to true. In this situation, `ModalLauncher` is a controlled component which means you'll also have to update `opened` to false in response to the `onClose` callback being triggered. It is necessary to use this method in this example, as `ActionMenu` cannot have a `ModalLauncher` element as a child, (it can only have `Item` elements as children), so launching a modal from a dropdown must be done programatically.",
        },
    },
};

export const WithOpenedTrue = () => {
    const [openedModal, setOpenedModal] = React.useState<
        "EDIT" | "DELETE" | null
    >(null);
    const [, setSelectedItem] = React.useState<string | null>(null);

    // Simulated data item
    const item = {
        id: "1",
        title: "Example Assignment",
        dueDate: new Date().toISOString(),
    };

    const handleClose = () => {
        setOpenedModal(null);
        setSelectedItem(null);
    };

    const editDialog = ({closeModal}: {closeModal: () => void}) => (
        <OnePaneDialog
            title="Edit Item"
            content={
                <View style={styles.modalContent}>
                    <BodyText>
                        This is a reproduction of the focus management issue.
                        When this modal is closed, focus should return to the
                        action menu button that opened it.
                    </BodyText>
                </View>
            }
            footer={
                <View>
                    <Button onClick={closeModal}>Close</Button>
                </View>
            }
        />
    );

    const deleteDialog = ({closeModal}: {closeModal: () => void}) => (
        <ModalDialog aria-labelledby="heading-id">
            <ModalPanel
                content={
                    <View style={styles.modalContent}>
                        <Heading id="heading-id">Delete Item</Heading>
                        <BodyText>
                            Are you sure you want to delete this item? When this
                            modal is closed, focus should return to the action
                            menu button.
                        </BodyText>
                    </View>
                }
                footer={
                    <View style={styles.footer}>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button
                            onClick={() => {
                                // Simulate delete
                                closeModal();
                            }}
                        >
                            Delete
                        </Button>
                    </View>
                }
            />
        </ModalDialog>
    );

    return (
        <View>
            <View style={styles.actionMenuRow}>
                <BodyText>Example Item</BodyText>
                <ActionMenu
                    menuText=""
                    opener={() => (
                        <IconButton
                            aria-label="Actions"
                            aria-haspopup="true"
                            kind="secondary"
                            icon={dotsThreeIcon}
                            testId="item-actions-button"
                            size="small"
                        />
                    )}
                >
                    <ActionItem
                        onClick={() => {
                            setSelectedItem(item.id);
                            setOpenedModal("EDIT");
                        }}
                        label="Edit"
                        leftAccessory={
                            <PhosphorIcon icon={pencilIcon} size="small" />
                        }
                    />
                    <ActionItem
                        onClick={() => {
                            setSelectedItem(item.id);
                            setOpenedModal("DELETE");
                        }}
                        label="Delete"
                        leftAccessory={
                            <PhosphorIcon icon={trashIcon} size="small" />
                        }
                    />
                </ActionMenu>
            </View>

            {/* Edit Modal */}
            <ModalLauncher
                opened={openedModal === "EDIT"}
                onClose={handleClose}
                modal={editDialog}
            />

            {/* Delete Modal */}
            <ModalLauncher
                opened={openedModal === "DELETE"}
                onClose={handleClose}
                modal={deleteDialog}
            />
        </View>
    );
};

WithOpenedTrue.parameters = {
    chromatic: {
        // All the examples for ModalLauncher are behavior based, not visual.
        disableSnapshot: true,
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
        description: {
            story: 'You can use the `closedFocusId` prop on the `ModalLauncher` to specify where to set the focus after the modal has been closed. Imagine the following situation: clicking on a dropdown menu option to open a modal causes the dropdown to close, and so all of the dropdown options are removed from the DOM. This can be a problem because by default, the focus shifts to the previously focused element after a modal is closed; in this case, the element that opened the modal cannot receive focus since it no longer exists in the DOM, so when you close the modal, it doesn\'t know where to focus on the page. When the previously focused element no longer exists, the focus shifts to the page body, which causes a jump to the top of the page. This can make it diffcult to find the original dropdown. A solution to this is to use the `closedFocusId` prop to specify where to set the focus after the modal has been closed. In this example, `closedFocusId` is set to the ID of the button labeled "Focus here after close." If the focus shifts to the button labeled "Top of page (should not receieve focus)," then the focus is on the page body, and the `closedFocusId` did not work.',
        },
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
                <View style={{gap: sizing.size_240}}>
                    <LabeledTextField
                        label="Label"
                        value={value}
                        onChange={setValue}
                    />
                    <LabeledTextField
                        label="Label 2"
                        value={value2}
                        onChange={setValue2}
                        id="text-field-to-be-focused"
                    />
                </View>
            }
            footer={
                <View style={styles.row}>
                    <Button kind="tertiary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button onClick={closeModal}>Submit</Button>
                </View>
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
        description: {
            story: "Sometimes, you may want a specific element inside the modal to receive focus first. This can be done using the `initialFocusId` prop on the `<ModalLauncher>` element. Just pass in the ID of the element that should receive focus, and it will automatically receieve focus once the modal opens. In this example, the top text input would have received the focus by default, but the bottom text field receives focus instead since its ID is passed into the `initialFocusId` prop.",
        },
    },
};

/**
 * Focus trap navigation
 */
const SubModal = () => (
    <OnePaneDialog
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
                <View style={{gap: sizing.size_240}}>
                    <BodyText id="focus-trap-story-body-text">
                        This modal demonstrates how the focus trap works with
                        form elements (or focusable elements). Also demonstrates
                        how the focus trap is moved to the next modal when it is
                        opened (focus/tap on the `Open another modal` button).
                    </BodyText>
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
                </View>
            }
            footer={
                <View style={styles.row}>
                    <ModalLauncher modal={SubModal}>
                        {({openModal}) => (
                            <Button kind="secondary" onClick={openModal}>
                                Open another modal
                            </Button>
                        )}
                    </ModalLauncher>

                    <Button onClick={closeModal} disabled={!selectedValue}>
                        Next
                    </Button>
                </View>
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
        description: {
            story: "All modals have a focus trap, which means that the focus is locked inside the modal. This is done to prevent the user from tabbing out of the modal and losing their place. The focus trap is also used to ensure that the focus is restored to the correct element when the modal is closed. In this example, the focus is trapped inside the modal, and the focus is restored to the button that opened the modal when the modal is closed.\n\nAlso, this example includes a sub-modal that is opened from the first modal so we can test how the focus trap works when multiple modals are open.",
        },
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
    },
    storyContainer: {
        display: "flex",
        flexDirection: "column",
        gap: sizing.size_240,
        maxWidth: 600,
    },
    description: {
        display: "flex",
        flexDirection: "column",
        gap: sizing.size_160,
        padding: sizing.size_160,
        backgroundColor: "rgba(33, 36, 44, 0.08)",
        borderRadius: 4,
    },
    buttonRow: {
        display: "flex",
        flexDirection: "row",
        gap: sizing.size_160,
        alignItems: "center",
    },
    actionMenuRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_160,
        justifyContent: "space-between",
        padding: sizing.size_160,
        borderColor: semanticColor.core.border.neutral.subtle,
        borderStyle: "solid",
        borderWidth: border.width.thin,
        borderRadius: border.radius.radius_040,
    },
});

/**
 * This example demonstrates how to use `ModalLauncher` to launch a modal that
 * looks like our own `PopoverContent` component. This is useful when you want
 * to create a modal with a custom layout that includes illustrations.
 *
 * You can find more details about how to build custom modals in our
 * `Modal>Building Blocks` section.
 *
 * #### Implementation details
 * - Make sure to wrap `ModalPanel` with `ModalDialog` to ensure that the modal
 *   is displayed correctly and includes all the proper a11y atrributes.
 * - Due to some constrains with `ModalDialog`, you'll likely need to override
 *   its width and height to ensure that the `PopoverContent` is displayed with
 *   the correct dimensions (see `ModalDialog.style` in the code snippet below).
 *
 * #### Accessibility notes
 * - Try to include the `aria-labelledby` attribute on the modal dialog, which
 *   is used to announce the title of the dialog to screen readers when it is
 *   opened.
 * - Make sure to include `alt` text for any images used in the `PopoverContent`
 *   component.
 */
export const CreatingACustomModal: StoryComponentType = {
    name: "Creating a custom modal with ModalLauncher",
    render: () => {
        const StyledImg = addStyle("img");
        const popoverModal = ({closeModal}: {closeModal: () => void}) => (
            <ModalDialog
                aria-labelledby="ready-dialog-title"
                style={{
                    width: "auto",
                    height: "auto",
                }}
            >
                <ModalPanel
                    style={{maxWidth: 423}}
                    closeButtonVisible={true}
                    content={
                        <View style={{gap: sizing.size_240}}>
                            <StyledImg
                                src="./km-ready.svg"
                                alt="An illustration a bubble with Khanmigo inside."
                                width={423}
                                height={230}
                                style={{
                                    // This is to ensure that the image is
                                    // aligned to the top left corner of the
                                    // dialog.
                                    marginInlineStart: `calc(${sizing.size_320} * -1)`,
                                    marginBlockStart: `calc(${sizing.size_320} * -1)`,
                                }}
                            />
                            <Heading size="medium" id="ready-dialog-title">
                                Hi, I’m Khanmigo!
                            </Heading>
                            <BodyText>
                                I’m your new AI-powered assistant, tutor, and
                                all around cheerleader to help you power up your
                                learning journey. Let’s take a look around
                                together!
                            </BodyText>
                            {/* Footer */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "center",
                                }}
                            >
                                <BodyText weight="bold">Step 1 of 4</BodyText>
                                <Button kind="primary" onClick={closeModal}>
                                    Next
                                </Button>
                            </View>
                        </View>
                    }
                />
            </ModalDialog>
        );

        return (
            <ModalLauncher modal={popoverModal}>
                {({openModal}) => (
                    <Button onClick={openModal}>Open custom modal</Button>
                )}
            </ModalLauncher>
        );
    },
    parameters: {
        chromatic: {
            // All the examples for ModalLauncher are behavior based, not
            // visual.
            disableSnapshot: true,
        },
    },
};

/**
 * The following example demonstrates how to use `ModalLauncher` to launch a
 * modal that is styled to be a confirmation modal.
 */
export const ConfirmationModal: StoryComponentType = {
    render: () => {
        return (
            <ModalLauncher
                modal={
                    <OnePaneDialog
                        style={{
                            blockSize: "fit-content",
                            inlineSize: "fit-content",
                            maxInlineSize: "100%",
                        }}
                        title="Title of the modal"
                        content={"Content"}
                        footer={<Button kind="primary">Confirm</Button>}
                    />
                }
            >
                {({openModal}) => (
                    <Button onClick={openModal}>
                        Click me to open the modal
                    </Button>
                )}
            </ModalLauncher>
        );
    },
    parameters: {
        chromatic: {
            // All the examples for ModalLauncher are behavior based, not
            // visual.
            disableSnapshot: true,
        },
    },
};
