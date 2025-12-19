import {Meta, StoryObj} from "@storybook/react-vite";
import {expect, fn, waitFor, within} from "storybook/test";
import {ResponsiveTabs} from "@khanacademy/wonder-blocks-tabs";
import {
    Default as ResponsiveTabsDefault,
    INITIAL_TABS_COUNT,
} from "./responsive-tabs.stories";

export default {
    title: "Packages / Tabs / ResponsiveTabs / Testing / Responsive Tabs - Playtesting",
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
    ...ResponsiveTabsDefault,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal tabs
        await waitFor(() => {
            expect(canvas.getByRole("tablist")).toHaveAttribute(
                "aria-label",
                "Responsive Tabs",
            );
        });
        await waitFor(() => {
            expect(canvas.getAllByRole("tab")).toHaveLength(INITIAL_TABS_COUNT);
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
        });

        // Update the tab labels to long labels to trigger the dropdown layout
        await userEvent.click(
            canvas.getByRole("button", {name: "Update tab labels"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("tablist")).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(
                canvas.getByRole("button", {
                    name: "Tab 1 with a long label",
                }),
            ).toBeInTheDocument();
        });
        const opener = canvas.getByRole("button", {
            name: "Tab 1 with a long label",
        });
        await userEvent.click(opener);
        await waitFor(() => {
            expect(canvas.getAllByRole("menuitem")).toHaveLength(
                INITIAL_TABS_COUNT,
            );
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");
        });

        // Reset the tab labels
        await userEvent.click(
            canvas.getByRole("button", {name: "Update tab labels"}),
        );

        // Confirm the horizontal tabs layout is used
        await waitFor(() => {
            expect(canvas.getByRole("tablist")).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(canvas.getAllByRole("tab")).toHaveLength(INITIAL_TABS_COUNT);
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
        });
    },
};

export const AddingAndRemovingTabs: Story = {
    ...ResponsiveTabsDefault,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal tabs
        await waitFor(() => {
            expect(canvas.getByRole("tablist")).toHaveAttribute(
                "aria-label",
                "Responsive Tabs",
            );
        });
        await waitFor(() => {
            expect(canvas.getAllByRole("tab")).toHaveLength(INITIAL_TABS_COUNT);
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
        });

        // Add a tab
        await userEvent.click(canvas.getByRole("button", {name: "Add a tab"}));

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("tablist")).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(
                canvas.getByRole("button", {name: "Tab 1"}),
            ).toBeInTheDocument();
        });
        const opener = canvas.getByRole("button", {name: "Tab 1"});
        await userEvent.click(opener);
        await waitFor(() => {
            expect(canvas.getAllByRole("menuitem")).toHaveLength(
                INITIAL_TABS_COUNT + 1,
            );
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");
        });

        // Remove a tab
        await userEvent.click(
            canvas.getByRole("button", {name: "Remove a tab"}),
        );

        // Confirm the horizontal tabs layout is used
        await waitFor(() => {
            expect(canvas.getByRole("tablist")).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(canvas.getAllByRole("tab")).toHaveLength(INITIAL_TABS_COUNT);
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
        });
    },
};

export const ChangingContainerWidth: Story = {
    ...ResponsiveTabsDefault,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal tabs
        await waitFor(() => {
            expect(canvas.getByRole("tablist")).toHaveAttribute(
                "aria-label",
                "Responsive Tabs",
            );
        });
        await waitFor(() => {
            expect(canvas.getAllByRole("tab")).toHaveLength(INITIAL_TABS_COUNT);
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
        });

        // Change the container width
        await userEvent.click(
            canvas.getByRole("button", {name: "Change container width"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("tablist")).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(
                canvas.getByRole("button", {name: "Tab 1"}),
            ).toBeInTheDocument();
        });
        const opener = canvas.getByRole("button", {name: "Tab 1"});
        await userEvent.click(opener);
        await waitFor(() => {
            expect(canvas.getAllByRole("menuitem")).toHaveLength(
                INITIAL_TABS_COUNT,
            );
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");
        });

        // Change the container width back
        await userEvent.click(
            canvas.getByRole("button", {name: "Change container width"}),
        );

        // Confirm the horizontal tabs layout is used
        await waitFor(() => {
            expect(canvas.getByRole("tablist")).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(canvas.getAllByRole("tab")).toHaveLength(INITIAL_TABS_COUNT);
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
        });
    },
};

export const ChangingZoomLevel: Story = {
    ...ResponsiveTabsDefault,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state using horizontal tabs
        await waitFor(() => {
            expect(canvas.getByRole("tablist")).toHaveAttribute(
                "aria-label",
                "Responsive Tabs",
            );
        });
        await waitFor(() => {
            expect(canvas.getAllByRole("tab")).toHaveLength(INITIAL_TABS_COUNT);
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
        });

        // Change the zoom level
        await userEvent.click(
            canvas.getByRole("button", {name: "Simulate zoom"}),
        );

        // Confirm the dropdown layout is used
        await waitFor(() => {
            expect(canvas.queryByRole("tablist")).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(
                canvas.getByRole("button", {name: "Tab 1"}),
            ).toBeInTheDocument();
        });
        const opener = canvas.getByRole("button", {name: "Tab 1"});
        await userEvent.click(opener);
        await waitFor(() => {
            expect(canvas.getAllByRole("menuitem")).toHaveLength(
                INITIAL_TABS_COUNT,
            );
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");
        });

        // Change the zoom level back
        await userEvent.click(
            canvas.getByRole("button", {name: "Simulate zoom"}),
        );

        // Confirm the horizontal tabs layout is used
        await waitFor(() => {
            expect(canvas.getByRole("tablist")).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(canvas.getAllByRole("tab")).toHaveLength(INITIAL_TABS_COUNT);
        });
        await waitFor(() => {
            expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
        });
    },
};
