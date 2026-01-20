import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveNavigationTabs} from "@khanacademy/wonder-blocks-tabs";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Tabs / ResponsiveNavigationTabs",
    component: ResponsiveNavigationTabs,
    excludeStories: ["INITIAL_TABS_COUNT"],
    parameters: {
        chromatic: {
            // Disabling snapshots in favour of snapshot stories
            disableSnapshot: true,
        },
    },
} as Meta<typeof ResponsiveNavigationTabs>;

type Story = StoryObj<typeof ResponsiveNavigationTabs>;

export const INITIAL_TABS_COUNT = 7;

const ControlledResponsiveNavigationTabs = (
    args: PropsFor<typeof ResponsiveNavigationTabs>,
) => {
    const [selectedTabId, setSelectedTabId] = React.useState(
        args.selectedTabId,
    );
    return (
        <ResponsiveNavigationTabs
            {...args}
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
        />
    );
};

/**
 * ResponsiveNavigationTabs will switch between the NavigationTabs and
 * NavigationTabsDropdown layouts based on if there is enough horizontal space
 * to display the tabs.
 *
 * Some things that can affect this are:
 * - the length of tab labels, especially with translated text
 * - the number of tabs
 * - the width of the container or screen
 * - the zoom level
 */
export const Default: Story = {
    render: function Render(args) {
        const [tabsCount, setTabsCount] = React.useState(INITIAL_TABS_COUNT);
        const [showLongLabels, setShowLongLabels] = React.useState(false);
        const tabs = new Array(tabsCount).fill(0).map((_, index) => ({
            label: showLongLabels
                ? `Navigation tab ${index + 1} with a long label`
                : `Navigation tab ${index + 1}`,
            id: `tab-${index + 1}`,
            href: `#tab-${index + 1}`,
        }));

        const [containerWidth, setContainerWidth] = React.useState<
            string | undefined
        >(undefined);

        const [zoomLevel, setZoomLevel] = React.useState<number | undefined>(
            undefined,
        );

        return (
            <View
                style={{
                    gap: sizing.size_360,
                }}
            >
                <View
                    style={{width: containerWidth, zoom: zoomLevel ?? "100%"}}
                >
                    <ControlledResponsiveNavigationTabs
                        {...args}
                        selectedTabId="tab-1"
                        onTabSelected={() => {}}
                        tabs={tabs}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        gap: sizing.size_160,
                        flexWrap: "wrap",
                    }}
                >
                    <Button onClick={() => setShowLongLabels(!showLongLabels)}>
                        Update tab labels
                    </Button>
                    <Button onClick={() => setTabsCount(tabsCount + 1)}>
                        Add a tab
                    </Button>
                    <Button
                        onClick={() => {
                            if (tabsCount > 1) {
                                setTabsCount(tabsCount - 1);
                            }
                        }}
                    >
                        Remove a tab
                    </Button>
                    <Button
                        onClick={() => {
                            setContainerWidth(
                                containerWidth === undefined
                                    ? "200px"
                                    : undefined,
                            );
                        }}
                    >
                        Change container width
                    </Button>
                    <Button
                        onClick={() => {
                            setZoomLevel(
                                zoomLevel === undefined ? 4 : undefined,
                            );
                        }}
                    >
                        Simulate zoom
                    </Button>
                </View>
            </View>
        );
    },
};
