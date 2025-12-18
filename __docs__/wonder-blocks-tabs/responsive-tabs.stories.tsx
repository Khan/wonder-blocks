import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveTabs} from "@khanacademy/wonder-blocks-tabs";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import responsiveTabsArgtypes from "./responsive-tabs.argtypes";

export default {
    title: "Packages / Tabs / ResponsiveTabs",
    component: ResponsiveTabs,
    excludeStories: ["INITIAL_TABS_COUNT"],
    argTypes: responsiveTabsArgtypes,
    parameters: {
        chromatic: {
            // Disabling snapshots in favour of snapshot stories
            disableSnapshot: true,
        },
    },
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

/**
 * ResponsiveTabs will switch between the tabs and dropdown layouts based on if
 * there is enough horizontal space to display the tabs.
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

        return (
            <View
                style={{
                    gap: sizing.size_360,
                }}
            >
                <View
                    style={{width: containerWidth, zoom: zoomLevel ?? "100%"}}
                >
                    <ControlledResponsiveTabs
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

/**
 * Custom styles can be set for the ResponsiveTabs component using the `styles` prop.
 *
 * The following parts can be styled:
 * - `root`: Styles the root `div` element.
 *
 * To customize the styles of the tabs or dropdown, set the `styles` prop on
 * the `tabsProps` or `dropdownProps` props. See the `Tabs` and `TabsDropdown`
 * docs for more details.
 */
export const CustomStyles: Story = {
    render: Default.render,
    args: {
        styles: {
            root: {
                outline: `${border.width.medium} dashed ${semanticColor.core.border.instructive.subtle}`,
                outlineOffset: border.width.medium,
            },
        },
        tabsProps: {
            styles: {
                root: {
                    outline: `${border.width.medium} solid ${semanticColor.core.border.success.subtle}`,
                },
            },
        },
        dropdownProps: {
            styles: {
                root: {
                    outline: `${border.width.medium} solid ${semanticColor.core.border.critical.subtle}`,
                },
            },
        },
    },
};
