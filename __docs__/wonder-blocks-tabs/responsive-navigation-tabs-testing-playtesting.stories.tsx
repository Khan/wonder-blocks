import {Meta, StoryObj} from "@storybook/react-vite";
import {expect, waitFor, within} from "storybook/test";
import {ResponsiveNavigationTabs} from "@khanacademy/wonder-blocks-tabs";
import {
    Default as ResponsiveNavigationTabsDefault,
    INITIAL_TABS_COUNT,
} from "./responsive-navigation-tabs.stories";

export default {
    title: "Packages / Tabs / ResponsiveNavigationTabs / Testing / Responsive Navigation Tabs - Playtesting",
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
                    // a11y check is fully enabled for other ResponsiveNavigationTabs
                    // stories.
                    {
                        id: "color-contrast",
                        enabled: false,
                    },
                ],
            },
        },
    },
    tags: ["!autodocs"],
    globals: {
        theme: "thunderblocks",
    },
} as Meta<typeof ResponsiveNavigationTabs>;

type Story = StoryObj<typeof ResponsiveNavigationTabs>;

export const ChangingLabelLength: Story = {
    ...ResponsiveNavigationTabsDefault,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state is using horizontal navigation tabs and showing
        // all links
        const links = await canvas.findAllByRole("link");
        expect(links).toHaveLength(INITIAL_TABS_COUNT);

        // Update the tab labels to long labels to trigger the dropdown layout
        await userEvent.click(
            canvas.getByRole("button", {name: "Update tab labels"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("link")).not.toBeInTheDocument();
        });
        const opener = await canvas.findByRole("button", {
            name: "Navigation tab 1 with a long label",
        });
        await userEvent.click(opener);
        const menuItems = await canvas.findAllByRole("menuitem");
        expect(menuItems).toHaveLength(INITIAL_TABS_COUNT);

        // Reset the tab labels
        await userEvent.click(
            canvas.getByRole("button", {name: "Update tab labels"}),
        );

        // Confirm the horizontal navigation tabs layout is used
        const linksAfterReset = await canvas.findAllByRole("link");
        expect(linksAfterReset).toHaveLength(INITIAL_TABS_COUNT);
    },
};

export const AddingAndRemovingTabs: Story = {
    ...ResponsiveNavigationTabsDefault,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal navigation tabs
        const links = await canvas.findAllByRole("link");
        expect(links).toHaveLength(INITIAL_TABS_COUNT);

        // Add a tab
        await userEvent.click(canvas.getByRole("button", {name: "Add a tab"}));

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("link")).not.toBeInTheDocument();
        });

        const opener = await canvas.findByRole("button", {
            name: "Navigation tab 1",
        });
        await userEvent.click(opener);
        const menuItems = await canvas.findAllByRole("menuitem");
        expect(menuItems).toHaveLength(INITIAL_TABS_COUNT + 1);

        // Remove a tab
        await userEvent.click(
            canvas.getByRole("button", {name: "Remove a tab"}),
        );

        // Confirm the horizontal navigation tabs layout is used
        const linksAfterRemove = await canvas.findAllByRole("link");
        expect(linksAfterRemove).toHaveLength(INITIAL_TABS_COUNT);
    },
};

export const ChangingContainerWidth: Story = {
    ...ResponsiveNavigationTabsDefault,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal navigation tabs
        const links = await canvas.findAllByRole("link");
        expect(links).toHaveLength(INITIAL_TABS_COUNT);

        // Change the container width
        await userEvent.click(
            canvas.getByRole("button", {name: "Change container width"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("link")).not.toBeInTheDocument();
        });

        const opener = await canvas.findByRole("button", {
            name: "Navigation tab 1",
        });
        await userEvent.click(opener);
        const menuItems = await canvas.findAllByRole("menuitem");
        expect(menuItems).toHaveLength(INITIAL_TABS_COUNT);

        // Change the container width back
        await userEvent.click(
            canvas.getByRole("button", {name: "Change container width"}),
        );

        // Confirm the horizontal navigation tabs layout is used
        const linksAfterWidthChange = await canvas.findAllByRole("link");
        expect(linksAfterWidthChange).toHaveLength(INITIAL_TABS_COUNT);
    },
};

export const ChangingZoomLevel: Story = {
    ...ResponsiveNavigationTabsDefault,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal navigation tabs
        const links = await canvas.findAllByRole("link");
        expect(links).toHaveLength(INITIAL_TABS_COUNT);

        // Change the zoom level
        await userEvent.click(
            canvas.getByRole("button", {name: "Simulate zoom"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("link")).not.toBeInTheDocument();
        });
        const opener = await canvas.findByRole("button", {
            name: "Navigation tab 1",
        });
        await userEvent.click(opener);
        const menuItems = await canvas.findAllByRole("menuitem");
        expect(menuItems).toHaveLength(INITIAL_TABS_COUNT);

        // Change the zoom level back
        await userEvent.click(
            canvas.getByRole("button", {name: "Simulate zoom"}),
        );

        // Confirm the horizontal navigation tabs layout is used
        const linksAfterZoomChange = await canvas.findAllByRole("link");
        expect(linksAfterZoomChange).toHaveLength(INITIAL_TABS_COUNT);
    },
};
