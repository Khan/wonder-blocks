import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {expect, userEvent, waitFor, within} from "storybook/test";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";

/**
 * Interaction tests for Accordion and AccordionSection that run in a real
 * browser.
 *
 * A collapsed panel is hidden with CSS (`visibility: hidden`, from a CSS
 * Modules class), which jest can't see: it maps `*.module.css` to
 * identity-obj-proxy and loads no CSS. So the unit tests check the panel's
 * state, and these stories check that the panel content is actually visible
 * or hidden.
 */
export default {
    title: "Packages / Accordion / Testing / Interactions",
    component: Accordion,
    parameters: {
        /** These stories are used for testing purposes only so we disable snapshots */
        chromatic: {disableSnapshot: true},
    },
    tags: ["!autodocs", "!manifest"],
} as Meta<typeof Accordion>;

type Story = StoryObj<typeof Accordion>;

/**
 * An uncontrolled AccordionSection starts collapsed, and clicking its header
 * shows and then hides the content again.
 */
export const SectionTogglesVisibility: Story = {
    render: function Render() {
        return (
            <AccordionSection header="Title">Section content</AccordionSection>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        const header = canvas.getByRole("button", {name: "Title"});

        // Assert: collapsed by default
        await expect(canvas.getByText("Section content")).not.toBeVisible();

        // Act: expand
        await userEvent.click(header);

        // Assert
        await expect(canvas.getByText("Section content")).toBeVisible();

        // Act: collapse
        await userEvent.click(header);

        // Assert
        await expect(canvas.getByText("Section content")).not.toBeVisible();
    },
};

/**
 * A controlled AccordionSection shows or hides its content according to the
 * `expanded` prop.
 */
export const ControlledSection: Story = {
    render: function Render() {
        const [expanded, setExpanded] = React.useState(true);
        return (
            <AccordionSection
                header="Title"
                expanded={expanded}
                onToggle={setExpanded}
            >
                Section content
            </AccordionSection>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // Assert: starts expanded
        await expect(canvas.getByText("Section content")).toBeVisible();

        // Act
        await userEvent.click(canvas.getByRole("button", {name: "Title"}));

        // Assert
        await expect(canvas.getByText("Section content")).not.toBeVisible();
    },
};

/**
 * A non-collapsible AccordionSection always shows its content.
 */
export const NonCollapsibleSection: Story = {
    render: function Render() {
        return (
            <AccordionSection header="Title" collapsible={false}>
                Section content
            </AccordionSection>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // Assert
        await expect(canvas.getByText("Section content")).toBeVisible();
    },
};

/**
 * With `initialExpandedIndex`, only that section starts visible.
 */
export const InitialExpandedIndex: Story = {
    render: function Render() {
        return (
            <Accordion initialExpandedIndex={1}>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
            </Accordion>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // Assert
        await expect(canvas.getByText("Section 1 content")).not.toBeVisible();
        await expect(canvas.getByText("Section 2 content")).toBeVisible();
        await expect(canvas.getByText("Section 3 content")).not.toBeVisible();
    },
};

/**
 * With `allowMultipleExpanded={false}`, opening a section hides the one that
 * was open.
 */
export const SingleExpanded: Story = {
    render: function Render() {
        return (
            <Accordion allowMultipleExpanded={false} initialExpandedIndex={0}>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // Act
        await userEvent.click(canvas.getByRole("button", {name: "Section 2"}));

        // Assert
        await expect(canvas.getByText("Section 1 content")).not.toBeVisible();
        await expect(canvas.getByText("Section 2 content")).toBeVisible();
    },
};

/**
 * By default several sections can be open at once.
 */
export const MultipleExpanded: Story = {
    render: function Render() {
        return (
            <Accordion>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        // Act
        await userEvent.click(canvas.getByRole("button", {name: "Section 1"}));
        await userEvent.click(canvas.getByRole("button", {name: "Section 2"}));

        // Assert
        await expect(canvas.getByText("Section 1 content")).toBeVisible();
        await expect(canvas.getByText("Section 2 content")).toBeVisible();
    },
};

/**
 * The Enter and Space keys toggle a focused section's content.
 */
export const KeyboardToggle: Story = {
    render: function Render() {
        return (
            <Accordion>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        canvas.getByRole("button", {name: "Section 1"}).focus();

        // Act
        await userEvent.keyboard("{Enter}");

        // Assert
        await expect(canvas.getByText("Section 1 content")).toBeVisible();

        // Act
        await userEvent.keyboard(" ");

        // Assert
        await expect(canvas.getByText("Section 1 content")).not.toBeVisible();
    },
};

/**
 * With `animated`, the content still ends up visible once the open
 * transition finishes, and hidden once the close transition finishes.
 */
export const AnimatedToggle: Story = {
    render: function Render() {
        return (
            <AccordionSection header="Title" animated={true}>
                Section content
            </AccordionSection>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        const header = canvas.getByRole("button", {name: "Title"});

        // Act
        await userEvent.click(header);

        // Assert
        await waitFor(() =>
            expect(canvas.getByText("Section content")).toBeVisible(),
        );

        // Act
        await userEvent.click(header);

        // Assert
        await waitFor(() =>
            expect(canvas.getByText("Section content")).not.toBeVisible(),
        );
    },
};
