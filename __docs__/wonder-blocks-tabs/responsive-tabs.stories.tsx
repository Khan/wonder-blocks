import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveTabs} from "@khanacademy/wonder-blocks-tabs";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Tabs / ResponsiveTabs",
    component: ResponsiveTabs,
    excludeStories: ["INITIAL_TABS_COUNT"],
} as Meta<typeof ResponsiveTabs>;

type Story = StoryObj<typeof ResponsiveTabs>;

export const INITIAL_TABS_COUNT = 15;

const ControlledResponsiveTabs = (args: PropsFor<typeof ResponsiveTabs>) => {
    const [selectedTabId, setSelectedTabId] = React.useState(
        args.selectedTabId,
    );
    return (
        <View>
            <ResponsiveTabs
                {...args}
                selectedTabId={selectedTabId}
                onTabSelected={setSelectedTabId}
            />
        </View>
    );
};
export const Default: Story = {
    render: function Render(args) {
        const [tabsCount, setTabsCount] = React.useState(INITIAL_TABS_COUNT);
        const [showLongLabels, setShowLongLabels] = React.useState(false);
        const tabs = new Array(tabsCount).fill(0).map((_, index) => ({
            label: showLongLabels
                ? `Tab ${index + 1} with a long label`
                : `Tab ${index + 1}`,
            id: `tab-${index + 1}`,
            panel: <div>Tab contents {index + 1}</div>,
        }));

        const [containerWidth, setContainerWidth] = React.useState<
            string | undefined
        >(undefined);

        const [zoomLevel, setZoomLevel] = React.useState<number | undefined>(
            undefined,
        );

        React.useEffect(() => {
            if (zoomLevel !== undefined) {
                document.body.style.zoom = `${zoomLevel}%`;
            } else {
                document.body.style.zoom = "100%";
            }
        }, [zoomLevel]);
        return (
            <View
                style={{
                    gap: sizing.size_360,
                    width: containerWidth,
                }}
            >
                <ControlledResponsiveTabs
                    {...args}
                    selectedTabId="tab-1"
                    onTabSelected={() => {}}
                    tabs={tabs}
                />
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
                                zoomLevel === undefined ? 400 : undefined,
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
