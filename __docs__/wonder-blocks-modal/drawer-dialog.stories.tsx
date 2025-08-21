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

import {allModes} from "../../.storybook/modes";
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
 * Drawer positioned at the bottom of the screen (block end).
 * Useful for mobile-friendly interfaces and action sheets.
 */
export const BottomDrawer: StoryComponentType = {
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
            {({openModal}) => (
                <Button onClick={openModal}>Open Bottom Drawer</Button>
            )}
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

/**
 * Drawer nested inside wrapper components. Demonstrates how the
 * context-based prop passing works with nested component structures.
 */
export const WithNestedComponents: StoryComponentType = {
    render: () => {
        const NestedWrapper = ({children}: {children: React.ReactNode}) => (
            <View style={{padding: spacing.small_12}}>{children}</View>
        );

        return (
            <DrawerLauncher
                alignment="blockEnd"
                modal={
                    <NestedWrapper>
                        <DrawerDialog
                            title="Nested Dialog"
                            content={
                                <View style={styles.content}>
                                    <BodyText>
                                        This drawer is nested inside wrapper
                                        components but still receives the proper
                                        alignment and animation props via React
                                        Context.
                                    </BodyText>
                                </View>
                            }
                        />
                    </NestedWrapper>
                }
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Open Nested Drawer</Button>
                )}
            </DrawerLauncher>
        );
    },
};

/**
 * Shows all drawer alignment options side by side for comparison.
 */
export const AllAlignments: StoryComponentType = {
    parameters: {
        chromatic: {
            disableSnapshot: false,
            modes: {
                large: allModes.large,
                medium: allModes.medium,
            },
        },
    },
    render: () => (
        <View
            style={{display: "flex", gap: spacing.medium_16, flexWrap: "wrap"}}
        >
            <DrawerLauncher
                alignment="inlineStart"
                modal={
                    <DrawerDialog
                        title="Inline Start"
                        content={
                            <View style={styles.content}>
                                <BodyText>
                                    Slides in from inline start (left in LTR)
                                </BodyText>
                            </View>
                        }
                    />
                }
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Inline Start</Button>
                )}
            </DrawerLauncher>

            <DrawerLauncher
                alignment="inlineEnd"
                modal={
                    <DrawerDialog
                        title="Inline End"
                        content={
                            <View style={styles.content}>
                                <BodyText>
                                    Slides in from inline end (right in LTR)
                                </BodyText>
                            </View>
                        }
                    />
                }
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Inline End</Button>
                )}
            </DrawerLauncher>

            <DrawerLauncher
                alignment="blockEnd"
                modal={
                    <DrawerDialog
                        title="Block End"
                        content={
                            <View style={styles.content}>
                                <BodyText>
                                    Slides in from block end (bottom)
                                </BodyText>
                            </View>
                        }
                    />
                }
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Block End</Button>
                )}
            </DrawerLauncher>
        </View>
    ),
};
