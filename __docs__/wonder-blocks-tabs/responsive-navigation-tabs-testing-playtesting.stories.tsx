import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {expect, fn, waitFor, within} from "storybook/test";
import {MemoryRouter} from "react-router-dom";
import {
    CompatRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom-v5-compat";
import {ResponsiveNavigationTabs} from "@khanacademy/wonder-blocks-tabs";
import {View} from "@khanacademy/wonder-blocks-core";
import {Body} from "@khanacademy/wonder-blocks-typography";
import {
    Interactive as InteractiveStory,
    INITIAL_TABS_COUNT,
} from "./responsive-navigation-tabs.stories";

export default {
    title: "Packages / Tabs / Testing / ResponsiveNavigationTabs - Playtesting",
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
    args: {
        onLayoutChange: fn(),
    },
    tags: ["!autodocs"],
    globals: {
        theme: "thunderblocks",
    },
} as Meta<typeof ResponsiveNavigationTabs>;

type Story = StoryObj<typeof ResponsiveNavigationTabs>;

export const ChangingLabelLength: Story = {
    ...InteractiveStory,
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({args, canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Confirm the initial state is using horizontal navigation tabs and showing
        // all links
        const links = await canvas.findAllByRole("link");
        expect(links).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

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

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Reset the tab labels
        await userEvent.click(
            canvas.getByRole("button", {name: "Update tab labels"}),
        );

        // Confirm the horizontal navigation tabs layout is used
        const linksAfterReset = await canvas.findAllByRole("link");
        expect(linksAfterReset).toHaveLength(INITIAL_TABS_COUNT);

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

        // Confirm the initial state using horizontal navigation tabs
        const links = await canvas.findAllByRole("link");
        expect(links).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

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

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Remove a tab
        await userEvent.click(
            canvas.getByRole("button", {name: "Remove a tab"}),
        );

        // Confirm the horizontal navigation tabs layout is used
        const linksAfterRemove = await canvas.findAllByRole("link");
        expect(linksAfterRemove).toHaveLength(INITIAL_TABS_COUNT);

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

        // Confirm the initial state using horizontal navigation tabs
        const links = await canvas.findAllByRole("link");
        expect(links).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

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

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Change the container width back
        await userEvent.click(
            canvas.getByRole("button", {name: "Change container width"}),
        );

        // Confirm the horizontal navigation tabs layout is used
        const linksAfterWidthChange = await canvas.findAllByRole("link");
        expect(linksAfterWidthChange).toHaveLength(INITIAL_TABS_COUNT);

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

        // Confirm the initial state using horizontal navigation tabs
        const links = await canvas.findAllByRole("link");
        expect(links).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

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

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Change the zoom level back
        await userEvent.click(
            canvas.getByRole("button", {name: "Simulate zoom"}),
        );

        // Confirm the horizontal navigation tabs layout is used
        const linksAfterZoomChange = await canvas.findAllByRole("link");
        expect(linksAfterZoomChange).toHaveLength(INITIAL_TABS_COUNT);

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

        // Confirm the initial state is using horizontal tabs
        const links = await canvas.findAllByRole("link");
        expect(links).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");

        // Toggle the icons
        await userEvent.click(
            canvas.getByRole("button", {name: "Toggle icons"}),
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

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("dropdown");

        // Toggle the icons back
        await userEvent.click(
            canvas.getByRole("button", {name: "Toggle icons"}),
        );

        // Confirm the horizontal tabs layout is used
        const linksAfterChange = await canvas.findAllByRole("link");
        expect(linksAfterChange).toHaveLength(INITIAL_TABS_COUNT);

        expect(args.onLayoutChange).toHaveBeenLastCalledWith("tabs");
    },
};

const FOCUS_ID_TABS = [
    {
        id: "overview",
        label: "Overview",
        href: "/overview",
        focusId: "overview-heading",
    },
    {
        id: "assignments",
        label: "Assignments",
        href: "/assignments",
        focusId: "assignments-heading",
    },
    {
        id: "progress",
        label: "Progress",
        href: "/progress",
        focusId: "progress-heading",
    },
];

function OverviewPage() {
    return (
        <View>
            <h1 id="overview-heading">Overview</h1>
            <Body>
                Overview content. Focus moves here when this tab is selected.
            </Body>
        </View>
    );
}

function AssignmentsPage() {
    return (
        <View>
            <h1 id="assignments-heading">Assignments</h1>
            <Body>
                Assignments content. Focus moves here when this tab is selected.
            </Body>
        </View>
    );
}

function ProgressPage() {
    return (
        <View>
            <h1 id="progress-heading">Progress</h1>
            <Body>
                Progress content. Focus moves here when this tab is selected.
            </Body>
        </View>
    );
}

function ResponsiveNavigationTabsWithRouter() {
    const location = useLocation();
    const selectedTabId =
        location.pathname === "/" || location.pathname === ""
            ? "overview"
            : location.pathname.slice(1);

    return (
        <View>
            <ResponsiveNavigationTabs
                aria-label="Section navigation"
                tabs={FOCUS_ID_TABS}
                selectedTabId={selectedTabId}
                onTabSelected={() => {}}
                showDivider
            />
            <Routes>
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/assignments" element={<AssignmentsPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/" element={<Navigate to="/overview" replace />} />
            </Routes>
        </View>
    );
}

/**
 * ResponsiveNavigationTabs with `focusId` on each tab and React Router. When a tab
 * is selected (by clicking a link or when the route changes), focus moves to
 * the element with the tab's `focusId`. This story uses client-side navigation
 * so that `selectedTabId` stays in sync with the URL and the focus effect runs
 * when the route changes.
 */
export const FocusIdWithReactRouter: Story = {
    render: () => (
        <MemoryRouter initialEntries={["/overview"]}>
            <CompatRouter>
                <ResponsiveNavigationTabsWithRouter />
            </CompatRouter>
        </MemoryRouter>
    ),
    globals: {
        viewport: {
            value: "large",
        },
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement.ownerDocument.body);

        // Initial route is /overview; focus should not be on the heading (no focus on mount)
        const overviewHeading = canvas.getByRole("heading", {
            name: "Overview",
        });
        expect(overviewHeading).not.toHaveFocus();

        // Click Assignments tab; after navigation, focus should move to assignments heading
        await userEvent.click(canvas.getByRole("link", {name: "Assignments"}));
        await waitFor(() => {
            const assignmentsHeading = canvas.getByRole("heading", {
                name: "Assignments",
            });
            expect(assignmentsHeading).toHaveFocus();
        });

        // Click Progress tab; focus should move to progress heading
        await userEvent.click(canvas.getByRole("link", {name: "Progress"}));
        await waitFor(() => {
            const progressHeading = canvas.getByRole("heading", {
                name: "Progress",
            });
            expect(progressHeading).toHaveFocus();
        });

        // Click Overview tab; focus should move to overview heading
        await userEvent.click(canvas.getByRole("link", {name: "Overview"}));
        await waitFor(() => {
            expect(overviewHeading).toHaveFocus();
        });
    },
};
