import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {ActionMenu, ActionItem} from "@khanacademy/wonder-blocks-dropdown";
import {RadioGroup, Choice} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {DrawerDialog, DrawerLauncher} from "@khanacademy/wonder-blocks-modal";

import {reallyLongText} from "../components/text-for-testing";
import DrawerDialogArgTypes from "./drawer-dialog.argtypes";

/**
 * `DrawerDialog` is the modal content component designed specifically for use with `DrawerLauncher`.
 * It provides a consistent drawer interface with proper animations, positioning, and accessibility features.
 *
 * **IMPORTANT**: This component should only be used with `DrawerLauncher`. Using it with other
 * modal launchers may result in incorrect animations, positioning, and styling.
 *
 * The component automatically receives alignment, animation, and timing props from `DrawerLauncher`
 * via React Context, eliminating the need for manual prop passing in nested components.
 */
export default {
    title: "Packages / Modal / DrawerLauncher / DrawerDialog",
    component: DrawerDialog,
    parameters: {
        componentSubtitle: "Modal dialog designed for DrawerLauncher",
        chromatic: {
            // Drawer stories are behavior-based, disable visual regression testing
            disableSnapshot: true,
        },
    },
    argTypes: DrawerDialogArgTypes,
} satisfies Meta<typeof DrawerDialog>;

type StoryComponentType = StoryObj<typeof DrawerDialog>;

const styles = StyleSheet.create({
    content: {
        padding: spacing.medium_16,
    },
    section: {
        marginBottom: spacing.medium_16,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: spacing.medium_16,
    },
});

/**
 * Basic drawer dialog with simple content. This shows the default structure
 * and styling of a drawer dialog.
 */
export const Default: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            alignment="inlineEnd"
            modal={
                <DrawerDialog
                    title="Default Drawer"
                    content={
                        <View style={styles.content}>
                            <BodyText>
                                This is a basic drawer dialog with simple text
                                content. The drawer slides in from the inline
                                end (right in LTR mode).
                            </BodyText>
                        </View>
                    }
                />
            }
        >
            {({openModal}) => (
                <Button onClick={openModal}>Open Default Drawer</Button>
            )}
        </DrawerLauncher>
    ),
};

/**
 * Basic drawer dialog with no padding. This allows content to go to the edges.
 */
// TODO (WB-2080): Use media query tokens here and in ModalContent
const small = "@media (max-width: 767px)" as any;

export const WithNoPadding: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            alignment="inlineEnd"
            modal={
                <DrawerDialog
                    title="Default Drawer"
                    styles={{
                        content: {
                            padding: 0,
                            [small]: {
                                paddingInline: 0,
                            },
                        },
                    }}
                    content={
                        <View>
                            <BodyText>
                                This is a basic drawer dialog with no padding.
                            </BodyText>
                        </View>
                    }
                />
            }
        >
            {({openModal}) => (
                <Button onClick={openModal}>Open Default Drawer</Button>
            )}
        </DrawerLauncher>
    ),
};

/**
 * Drawer with rich content including form elements and actions.
 * Demonstrates how to create more complex drawer interfaces.
 */
export const WithFormContent: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            alignment="inlineStart"
            modal={
                <DrawerDialog
                    title="Settings"
                    content={
                        <View style={styles.content}>
                            <View style={styles.form}>
                                <View style={styles.section}>
                                    <BodyText size="medium">
                                        Preferences
                                    </BodyText>
                                    <RadioGroup
                                        groupName="theme"
                                        onChange={() => {}}
                                        selectedValue="light"
                                    >
                                        <Choice
                                            label="Light theme"
                                            value="light"
                                        />
                                        <Choice
                                            label="Dark theme"
                                            value="dark"
                                        />
                                        <Choice label="Auto" value="auto" />
                                    </RadioGroup>
                                </View>

                                <View style={styles.section}>
                                    <ActionMenu
                                        menuText="More actions"
                                        testId="action-menu"
                                    >
                                        <ActionItem label="Reset settings" />
                                        <ActionItem label="Export data" />
                                        <ActionItem label="Delete account" />
                                    </ActionMenu>
                                </View>
                            </View>
                        </View>
                    }
                />
            }
        >
            {({openModal}) => (
                <Button onClick={openModal}>Open Settings</Button>
            )}
        </DrawerLauncher>
    ),
};

/**
 * Drawer with action-focused content layout. Demonstrates a common
 * pattern for presenting multiple action options to the user.
 */
export const WithActionList: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            alignment="blockEnd"
            modal={
                <DrawerDialog
                    title="Actions"
                    content={
                        <View style={styles.content}>
                            <BodyText style={styles.section}>
                                Choose an action from the options below:
                            </BodyText>
                            <View style={styles.form}>
                                <Button kind="primary">Primary Action</Button>
                                <Button kind="secondary">
                                    Secondary Action
                                </Button>
                                <Button kind="tertiary">Cancel</Button>
                            </View>
                        </View>
                    }
                />
            }
        >
            {({openModal}) => <Button onClick={openModal}>Show Actions</Button>}
        </DrawerLauncher>
    ),
};

/**
 * Drawer using render prop pattern for content. This allows placing
 * the title element in a custom location within the content.
 */
export const WithRenderProp: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            alignment="inlineEnd"
            modal={
                <DrawerDialog
                    title="Render Prop Example"
                    content={({title}) => (
                        <View style={styles.content}>
                            <BodyText size="xsmall">Eyebrow</BodyText>
                            {title}
                            <BodyText style={styles.section}>
                                This content uses a render prop to customize how
                                the title is positioned within the drawer
                                content.
                            </BodyText>
                            <BodyText>
                                The title element is passed as a prop to the
                                render function, allowing for flexible layout
                                arrangements.
                            </BodyText>
                        </View>
                    )}
                />
            }
        >
            {({openModal}) => (
                <Button onClick={openModal}>Open Render Prop Drawer</Button>
            )}
        </DrawerLauncher>
    ),
};

/**
 * Drawer without visible close button. Useful when the content
 * provides its own close mechanism.
 */
export const NoCloseButton: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            alignment="inlineEnd"
            modal={
                <DrawerDialog
                    title="Confirm Action"
                    closeButtonVisible={false}
                    content={
                        <View style={styles.content}>
                            <BodyText style={styles.section}>
                                Are you sure you want to delete this item? This
                                action cannot be undone.
                            </BodyText>
                            <View style={styles.form}>
                                <Button kind="primary">Delete</Button>
                                <Button kind="secondary">Cancel</Button>
                            </View>
                        </View>
                    }
                />
            }
        >
            {({openModal}) => (
                <Button onClick={openModal}>Open Confirmation</Button>
            )}
        </DrawerLauncher>
    ),
};

/**
 * Drawer with long scrollable content. Demonstrates how the drawer
 * handles content overflow.
 */
export const WithScrollableContent: StoryComponentType = {
    render: () => (
        <DrawerLauncher
            alignment="inlineStart"
            modal={
                <DrawerDialog
                    title="Terms of Service"
                    content={
                        <View style={styles.content}>
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
            }
        >
            {({openModal}) => (
                <Button onClick={openModal}>Open Long Content</Button>
            )}
        </DrawerLauncher>
    ),
};
