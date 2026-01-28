import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {NavigationTabsDropdown} from "../../packages/wonder-blocks-tabs/src/components/navigation-tabs-dropdown";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {allModes, themeModes} from "../../.storybook/modes";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    title: "Packages / Tabs / NavigationTabs / Subcomponents / NavigationTabsDropdown / Testing / NavigationTabsDropdown - Snapshots",
    component: NavigationTabsDropdown,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: {...themeModes, small: allModes.small},
        },
    },
} as Meta<typeof NavigationTabsDropdown>;

type Story = StoryObj<typeof NavigationTabsDropdown>;

const ControlledNavigationTabsDropdown = (
    props: React.ComponentProps<typeof NavigationTabsDropdown>,
) => {
    const [selectedTabId, setSelectedTabId] = React.useState(
        props.selectedTabId,
    );
    const [opened, setOpened] = React.useState<boolean | undefined>(undefined);
    React.useEffect(() => {
        // Update opened after initial render so that the dropdown popper is
        // placed correctly
        if (props.opened !== undefined) {
            setOpened(props.opened);
        }
    }, [props.opened]);
    return (
        <NavigationTabsDropdown
            {...props}
            opened={opened}
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
        />
    );
};

export const Scenarios: Story = {
    render: () => {
        const scenarios = [
            {
                name: "Opened with long tab names",
                props: {
                    tabs: [
                        {
                            label: longText,
                            id: "tab-1",
                            href: "#tab-1",
                        },
                        {
                            label: longTextWithNoWordBreak,
                            id: "tab-2",
                            href: "#tab-2",
                        },
                    ],
                    selectedTabId: "tab-1",
                    opened: true,
                    styles: {root: {paddingBlockEnd: sizing.size_960}},
                },
            },
            {
                name: "Opened with short tab names",
                props: {
                    tabs: [
                        {
                            label: "1",
                            id: "tab-1",
                            href: "#tab-1",
                        },
                    ],
                    selectedTabId: "tab-1",
                    opened: true,
                    styles: {root: {paddingBlockEnd: sizing.size_560}},
                },
            },
            {
                name: "With long tab name that is selected",
                props: {
                    tabs: [
                        {
                            label: longText,
                            id: "tab-1",
                            href: "#tab-1",
                        },
                    ],
                    selectedTabId: "tab-1",
                },
            },
            {
                name: "With long tab name with no word break that is selected",
                props: {
                    tabs: [
                        {
                            label: longTextWithNoWordBreak,
                            id: "tab-1",
                            href: "#tab-1",
                        },
                    ],
                    selectedTabId: "tab-1",
                },
            },
            {
                name: "Invalid selected tab id",
                props: {
                    tabs: [
                        {
                            label: "Tab 1",
                            id: "tab-1",
                            href: "#tab-1",
                        },
                        {
                            label: "Tab 2",
                            id: "tab-2",
                            href: "#tab-2",
                        },
                        {
                            label: "Tab 3",
                            id: "tab-3",
                            href: "#tab-3",
                        },
                    ],
                    selectedTabId: "tab-invalid",
                },
            },
            {
                name: "Short selected tab name",
                props: {
                    tabs: [
                        {
                            label: "1",
                            id: "tab-1",
                            href: "#tab-1",
                        },
                    ],
                    selectedTabId: "tab-1",
                },
            },
            {
                name: "With custom styles",
                props: {
                    tabs: [
                        {
                            label: "Tab 1",
                            id: "tab-1",
                            href: "#tab-1",
                        },
                    ],
                    selectedTabId: "tab-1",
                    styles: {
                        root: {
                            border: `${border.width.thin} solid ${semanticColor.core.border.instructive.subtle}`,
                        },
                        opener: {
                            textTransform: "uppercase",
                        },
                        actionMenu: {
                            backgroundColor:
                                semanticColor.core.background.base.subtle,
                        },
                    },
                },
            },
            {
                name: "No tabs",
                props: {
                    tabs: [],
                    selectedTabId: "",
                },
            },
            {
                name: "Opener in RTL",
                decorator: <div dir="rtl" />,
                props: {
                    tabs: [
                        {
                            label: "Tab 1",
                            id: "tab-1",
                            href: "#tab-1",
                        },
                        {
                            label: "Tab 2",
                            id: "tab-2",
                            href: "#tab-2",
                        },
                    ],
                    selectedTabId: "tab-1",
                },
            },
            {
                name: "Show divider",
                props: {
                    tabs: [
                        {
                            label: "Navigation tab 1",
                            id: "tab-1",
                            href: "#tab-1",
                        },
                        {
                            label: "Navigation tab 2",
                            id: "tab-2",
                            href: "#tab-2",
                        },
                        {
                            label: "Navigation tab 3",
                            id: "tab-3",
                            href: "#tab-3",
                        },
                    ],
                    selectedTabId: "tab-1",
                    showDivider: true,
                },
            },
        ];

        return (
            <ScenariosLayout
                scenarios={scenarios}
                styles={{root: {width: "100%", alignItems: "stretch"}}}
            >
                {(props, name) => (
                    <ControlledNavigationTabsDropdown
                        {...props}
                        aria-label={name}
                    />
                )}
            </ScenariosLayout>
        );
    },
};

export const SmallScreenScenarios = {
    render: Scenarios.render,
    globals: {
        viewport: {
            value: "small",
        },
    },
    parameters: {
        chromatic: {
            // Disabling snapshots for this because small screen is covered by
            // the modes for the main Scenarios story
            disableSnapshot: true,
        },
    },
};

// Keeping opened dropdown with icons in a separate story from Scenarios
// so we can capture the opened state in the viewport for the snapshot
export const OpenedWithIcons = {
    args: {
        opened: true,
        tabs: [
            {
                label: "Tab 1",
                id: "tab-1",
                href: "#tab-1",
                icon: <PhosphorIcon icon={IconMappings.cookie} />,
            },
            {
                label: longText,
                id: "tab-2",
                href: "#tab-2",
                icon: <PhosphorIcon icon={IconMappings.iceCream} />,
            },
            {
                label: longTextWithNoWordBreak,
                id: "tab-3",
                href: "#tab-3",
                icon: (
                    <Icon>
                        <img src="logo.svg" alt="Wonder Blocks" />
                    </Icon>
                ),
            },
        ],
        selectedTabId: "tab-1",
        styles: {
            root: {
                paddingBlockEnd: sizing.size_960,
                marginBlockEnd: sizing.size_960,
            },
        },
    },
    render: ControlledNavigationTabsDropdown,
};
