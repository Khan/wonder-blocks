import {Meta, StoryObj} from "@storybook/react-vite";
import {expect, fn, waitFor, within} from "storybook/test";
import {ResponsiveTabs} from "@khanacademy/wonder-blocks-tabs";
import {
    Interactive as InteractiveStory,
    INITIAL_TABS_COUNT,
} from "./responsive-tabs.stories";

export default {
    title: "Packages / Tabs / Testing / ResponsiveTabs - Playtesting",
    parameters: {
        /** These stories are used for testing purposes only so we disable snapshots */
        chromatic: {disableSnapshot: true},
        a11y: {
            config: {
                rules: [
                    // Disabling a11y violation: ""Elements must meet minimum
                    // color contrast ratio thresholds (color-contrast)".
                    // This is because the playtesting stories include switching
                    // between layouts with a fade in animation. Because of this,
                    // the a11y check will fail on an in between state where the
                    // color is not yet updated to the final color. Note: This
                    // a11y check is fully enabled for other ResponsiveTabs
                    // stories.
                    {
                        id: "color-contrast",
                        enabled: false,
                    },
                ],
            },
        },
    },
    args: {
        onLayoutChange: fn(),
        "aria-label": "Responsive Tabs",
    },
    tags: ["!autodocs"],
    globals: {
        theme: "thunderblocks",
    },
} as Meta<typeof ResponsiveTabs>;

type Story = StoryObj<typeof ResponsiveTabs>;

export const ChangingLabelLength: Story = {
    ...InteractiveStory,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal tabs
        const tablist = await canvas.findByRole("tablist");
        expect(tablist).toHaveAttribute("aria-label", "Responsive Tabs");

        const tabs = await canvas.findAllByRole("tab");
        expect(tabs).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

        // Update the tab labels to long labels to trigger the dropdown layout
        await userEvent.click(
            canvas.getByRole("button", {name: "Update tab labels"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("tablist")).not.toBeInTheDocument();
        });
        await canvas.findByRole("button", {
            name: "Tab 1 with a long label",
        });
        const opener = canvas.getByRole("button", {
            name: "Tab 1 with a long label",
        });
        await userEvent.click(opener);
        const menuItems = await canvas.findAllByRole("menuitem");
        expect(menuItems).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Reset the tab labels
        await userEvent.click(
            canvas.getByRole("button", {name: "Update tab labels"}),
        );

        // Confirm the horizontal tabs layout is used
        await canvas.findByRole("tablist");

        const tabsAfterReset = await canvas.findAllByRole("tab");
        expect(tabsAfterReset).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
    },
};

export const AddingAndRemovingTabs: Story = {
    ...InteractiveStory,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal tabs
        const tablist = await canvas.findByRole("tablist");
        expect(tablist).toHaveAttribute("aria-label", "Responsive Tabs");

        const tabs = await canvas.findAllByRole("tab");
        expect(tabs).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

        // Add a tab
        await userEvent.click(canvas.getByRole("button", {name: "Add a tab"}));

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("tablist")).not.toBeInTheDocument();
        });
        await canvas.findByRole("button", {name: "Tab 1"});

        const opener = canvas.getByRole("button", {name: "Tab 1"});
        await userEvent.click(opener);
        const menuItems = await canvas.findAllByRole("menuitem");
        expect(menuItems).toHaveLength(INITIAL_TABS_COUNT + 1);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Remove a tab
        await userEvent.click(
            canvas.getByRole("button", {name: "Remove a tab"}),
        );

        // Confirm the horizontal tabs layout is used
        await canvas.findByRole("tablist");

        const tabsAfterRemove = await canvas.findAllByRole("tab");
        expect(tabsAfterRemove).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
    },
};

export const ChangingContainerWidth: Story = {
    ...InteractiveStory,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal tabs
        const tablist = await canvas.findByRole("tablist");
        expect(tablist).toHaveAttribute("aria-label", "Responsive Tabs");

        const tabs = await canvas.findAllByRole("tab");
        expect(tabs).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

        // Change the container width
        await userEvent.click(
            canvas.getByRole("button", {name: "Change container width"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("tablist")).not.toBeInTheDocument();
        });
        await canvas.findByRole("button", {name: "Tab 1"});

        const opener = canvas.getByRole("button", {name: "Tab 1"});
        await userEvent.click(opener);
        const menuItems = await canvas.findAllByRole("menuitem");
        expect(menuItems).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Change the container width back
        await userEvent.click(
            canvas.getByRole("button", {name: "Change container width"}),
        );

        // Confirm the horizontal tabs layout is used
        await canvas.findByRole("tablist");

        const tabsAfterWidthChange = await canvas.findAllByRole("tab");
        expect(tabsAfterWidthChange).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
    },
};

export const ChangingZoomLevel: Story = {
    ...InteractiveStory,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal tabs
        const tablist = await canvas.findByRole("tablist");
        expect(tablist).toHaveAttribute("aria-label", "Responsive Tabs");

        const tabs = await canvas.findAllByRole("tab");
        expect(tabs).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

        // Change the zoom level
        await userEvent.click(
            canvas.getByRole("button", {name: "Simulate zoom"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("tablist")).not.toBeInTheDocument();
        });
        await canvas.findByRole("button", {name: "Tab 1"});

        const opener = canvas.getByRole("button", {name: "Tab 1"});
        await userEvent.click(opener);
        const menuItems = await canvas.findAllByRole("menuitem");
        expect(menuItems).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Change the zoom level back
        await userEvent.click(
            canvas.getByRole("button", {name: "Simulate zoom"}),
        );

        // Confirm the horizontal tabs layout is used
        await canvas.findByRole("tablist");

        const tabsAfterZoomChange = await canvas.findAllByRole("tab");
        expect(tabsAfterZoomChange).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
    },
};

export const TogglingIconInLabels: Story = {
    ...InteractiveStory,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal tabs
        const tablist = await canvas.findByRole("tablist");
        expect(tablist).toHaveAttribute("aria-label", "Responsive Tabs");

        const tabs = await canvas.findAllByRole("tab");
        expect(tabs).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

        // Toggle the icons
        await userEvent.click(
            canvas.getByRole("button", {name: "Toggle icons"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("tablist")).not.toBeInTheDocument();
        });
        await canvas.findByRole("button", {name: "Tab 1"});

        const opener = canvas.getByRole("button", {name: "Tab 1"});
        await userEvent.click(opener);
        const menuItems = await canvas.findAllByRole("menuitem");
        expect(menuItems).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Toggle the icons back
        await userEvent.click(
            canvas.getByRole("button", {name: "Toggle icons"}),
        );

        // Confirm the horizontal tabs layout is used
        await canvas.findByRole("tablist");

        const tabsAfterChange = await canvas.findAllByRole("tab");
        expect(tabsAfterChange).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
    },
};
