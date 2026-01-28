import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveTabs} from "@khanacademy/wonder-blocks-tabs";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import responsiveTabsArgtypes from "./responsive-tabs.argtypes";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

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
        const [showIcons, setShowIcons] = React.useState(false);
        const tabs = new Array(tabsCount).fill(0).map((_, index) => ({
            label: showLongLabels
                ? `Tab ${index + 1} with a long label`
                : `Tab ${index + 1}`,
            id: `tab-${index + 1}`,
            panel: <div>Tab contents {index + 1}</div>,
            icon: showIcons ? (
                <PhosphorIcon icon={IconMappings.cookieBold} />
            ) : undefined,
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
                    <Button
                        onClick={() => {
                            setShowIcons(!showIcons);
                        }}
                    >
                        Toggle icons
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

/**
 * The tab items can be provided with an aria-label.
 */
export const TabItemAriaLabel: Story = {
    args: {
        tabs: [
            {
                label: "Tab 1",
                id: "tab-1",
                panel: <div>Tab contents 1</div>,
                "aria-label": "Tab 1 aria-label",
            },
            {
                label: "Tab 2",
                id: "tab-2",
                panel: <div>Tab contents 2</div>,
                "aria-label": "Tab 2 aria-label",
            },
            {
                label: "Tab 3",
                id: "tab-3",
                panel: <div>Tab contents 3</div>,
                "aria-label": "Tab 3 aria-label",
            },
        ],
        selectedTabId: "tab-1",
    },
    render: ControlledResponsiveTabs,
};

/**
 * Tab items can be provided with an icon. They can be a `PhosphorIcon` or
 * `Icon` component.
 */
export const TabIcons: Story = {
    render: ControlledResponsiveTabs,
    args: {
        selectedTabId: "tab-1",
        tabs: [
            {
                label: "Tab 1 with Phosphor icon",
                id: "tab-1",
                panel: <div>Tab contents 1</div>,
                icon: (
                    <PhosphorIcon
                        icon={IconMappings.cookieBold}
                        aria-label="Cookie"
                    />
                ),
            },
            {
                label: "Tab 2 with custom icon",
                id: "tab-2",
                panel: <div>Tab contents 2</div>,
                icon: (
                    <Icon>
                        <img src="logo.svg" alt="Wonder Blocks" />
                    </Icon>
                ),
            },
            {
                label: "Tab 3 with presentational icon",
                id: "tab-3",
                panel: <div>Tab contents 3</div>,
                icon: (
                    <PhosphorIcon
                        icon={IconMappings.iceCream}
                        aria-hidden={true}
                    />
                ),
            },
            {
                label: "Tab 4 with no icon",
                id: "tab-4",
                panel: <div>Tab contents 4</div>,
            },
        ],
    },
};
