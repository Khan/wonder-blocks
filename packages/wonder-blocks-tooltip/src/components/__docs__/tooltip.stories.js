// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {within, userEvent} from "@storybook/testing-library";
import {expect} from "@storybook/jest";

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {icons} from "@khanacademy/wonder-blocks-icon";
import {OnePaneDialog, ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Body} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";
import TooltipArgtypes from "./tooltip.argtypes.js";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Tooltip / Tooltip",
    component: Tooltip,
    argTypes: TooltipArgtypes,
    args: {
        forceAnchorFocusivity: true,
        placement: "top",
    },
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
};

const Template = (args) => <Tooltip {...args} />;

/**
 * Default example (interactive).
 */
export const Default: StoryComponentType = Template.bind({});

Default.args = {
    content: "This is a text tooltip on the top",
    children: "some text",
};

Default.play = async ({canvasElement}) => {
    // Arrange
    // NOTE: Using `body` here to work with React Portals.
    const canvas = within(canvasElement.ownerDocument.body);

    // Act
    await userEvent.hover(canvas.getByText("some text"));

    // Assert
    await expect(
        await canvas.findByText("This is a text tooltip on the top"),
    ).toBeInTheDocument();
};

/**
 * Complex anchor & title tooltip
 */
export const ComplexAnchorAndTitle: StoryComponentType = Template.bind({});

ComplexAnchorAndTitle.args = {
    forceAnchorFocusivity: false,
    placement: "bottom",
    id: "my-a11y-tooltip",
    title: "This tooltip has a title",
    content: "I'm at the bottom!",
    children: (
        <View>
            Some text
            <TextField
                aria-describedby="my-a11y-tooltip"
                id=""
                onChange={() => {}}
                value=""
            />
        </View>
    ),
};

ComplexAnchorAndTitle.play = async ({canvasElement}) => {
    // Arrange
    // NOTE: Using `body` here to work with React Portals.
    const canvas = within(canvasElement.ownerDocument.body);

    // Act
    await userEvent.hover(canvas.getByText("Some text"));

    // Assert
    await expect(
        await canvas.findByText("This tooltip has a title"),
    ).toBeInTheDocument();
};

ComplexAnchorAndTitle.parameters = {
    docs: {
        description: {
            story: "In this example, we're no longer forcing the anchor root to be focusable, since the text input can take focus. However, that needs a custom accessibility implementation too (for that, we should use `UniqueIDProvider`, but we'll cheat here and give our own identifier).",
        },
    },
};

/**
 * Anchor in scrollable parent & placement bottom
 */
export const AnchorInScrollableParent: StoryComponentType = () => (
    <View style={styles.scrollbox}>
        <View style={styles.hostbox}>
            <Body>
                This is a big long piece of text with a
                <Tooltip
                    content="This tooltip will disappear when scrolled out of bounds"
                    placement="bottom"
                >
                    [tooltip]
                </Tooltip>{" "}
                in the middle.
            </Body>
        </View>
    </View>
);

AnchorInScrollableParent.parameters = {
    // Disable Chromatic because it only shows the trigger element.
    chromatic: {
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: "In this example, we have the anchor in a scrollable parent. Notice how, when the anchor is focused but scrolled out of bounds, the tooltip disappears.",
        },
    },
};

/**
 * Tooltip in a modal
 */
export const TooltipInModal: StoryComponentType = () => {
    const scrollyContent = (
        <View style={styles.scrollbox}>
            <View style={styles.hostbox}>
                <Tooltip content="I'm on the left!" placement="left">
                    tooltip
                </Tooltip>
            </View>
        </View>
    );

    const modal = (
        <OnePaneDialog
            title="My modal"
            footer="Still my modal"
            content={<View style={styles.modalbox}>{scrollyContent}</View>}
        />
    );

    return (
        <ModalLauncher modal={modal}>
            {({openModal}) => <Button onClick={openModal}>Click here!</Button>}
        </ModalLauncher>
    );
};

TooltipInModal.parameters = {
    // Disable Chromatic because it initially renders the modal offscreen.
    chromatic: {
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: "This checks that the tooltip works how we want inside a modal. Click the button to take a look.",
        },
    },
};

/**
 * Tooltips side-by-side
 */
export const SideBySide: StoryComponentType = () => (
    <View style={styles.row}>
        <Tooltip content="Tooltip A" placement="bottom">
            <View style={styles.block}>A</View>
        </Tooltip>
        <Tooltip content="Tooltip B" placement="bottom">
            <View style={styles.block}>B</View>
        </Tooltip>
        <Tooltip content="Tooltip C" placement="bottom">
            <View style={styles.block}>C</View>
        </Tooltip>
        <Tooltip content="Tooltip D" placement="bottom">
            <View style={styles.block}>D</View>
        </Tooltip>
    </View>
);

SideBySide.storyName = "Side-by-side";

SideBySide.parameters = {
    // Disable Chromatic because it only shows the trigger element.
    chromatic: {
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: "Here, we can see that the first tooltip shown has an initial delay before it appears, as does the last tooltip shown, yet when moving between tooltipped items, the transition from one to another is instantaneous.",
        },
    },
};

/**
 * Tooltips on buttons
 */
export const TooltipOnButtons: StoryComponentType = () => {
    return (
        <View style={[styles.centered, styles.row]}>
            <Tooltip content={"This is a tooltip on a button."}>
                <Button disabled={false}>Example 1</Button>
            </Tooltip>
            <Tooltip
                content="This is a tooltip on a disabled button."
                placement="bottom"
            >
                <Button disabled={true}>Example 2</Button>
            </Tooltip>
            <Tooltip content="Short and stout">
                <IconButton
                    icon={icons.search}
                    aria-label="search"
                    onClick={() => {}}
                />
            </Tooltip>
        </View>
    );
};

TooltipOnButtons.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: "This example shows tooltips on different types of buttons.",
        },
    },
};

const styles = StyleSheet.create({
    example: {
        padding: Spacing.medium_16,
    },
    row: {
        flexDirection: "row",
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
        gap: Spacing.medium_16,
        padding: Spacing.xxLarge_48,
    },
    scrollbox: {
        height: 100,
        overflow: "auto",
        border: "1px solid black",
        margin: Spacing.small_12,
    },
    hostbox: {
        minHeight: "200vh",
    },
    modalbox: {
        height: "200vh",
    },
    block: {
        border: `solid 1px ${Color.lightBlue}`,
        width: Spacing.xLarge_32,
        height: Spacing.xLarge_32,
        alignItems: "center",
        justifyContent: "center",
    },
});
