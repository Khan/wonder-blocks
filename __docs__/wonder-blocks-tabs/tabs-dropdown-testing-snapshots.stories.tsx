import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {TabsDropdown} from "../../packages/wonder-blocks-tabs/src/components/tabs-dropdown";
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
    title: "Packages / Tabs / Tabs / Subcomponents / TabsDropdown / Testing / TabsDropdown - Snapshots",
    component: TabsDropdown,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: {...themeModes, small: allModes.small},
        },
    },
} as Meta<typeof TabsDropdown>;

type Story = StoryObj<typeof TabsDropdown>;

const ControlledTabsDropdown = (
    props: React.ComponentProps<typeof TabsDropdown>,
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
        <TabsDropdown
            {...props}
            selectedTabId={selectedTabId}
            onTabSelected={setSelectedTabId}
            opened={opened}
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
                            panel: <div>Tab contents 1</div>,
                        },
                        {
                            label: longTextWithNoWordBreak,
                            id: "tab-2",
                            panel: <div>Tab contents 2</div>,
                        },
                    ],
                    selectedTabId: "tab-1",
                    opened: true,
                    styles: {root: {paddingBlockEnd: sizing.size_800}},
                },
            },
            {
                name: "Opened with short tab names",
                props: {
                    tabs: [
                        {
                            label: "1",
                            id: "tab-1",
                            panel: <div>Tab contents 1</div>,
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
                            panel: <div>Tab contents 1</div>,
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
                            panel: <div>Tab contents 1</div>,
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
                            panel: <div>Tab contents 1</div>,
                        },
                        {
                            label: "Tab 2",
                            id: "tab-2",
                            panel: <div>Tab contents 2</div>,
                        },
                        {
                            label: "Tab 3",
                            id: "tab-3",
                            panel: <div>Tab contents 3</div>,
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
                            panel: <div>Tab contents 1</div>,
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
                            panel: <div>Tab contents 1</div>,
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
                        tabPanel: {
                            backgroundColor:
                                semanticColor.core.background.neutral.subtle,
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
                            panel: <div>Tab contents 1</div>,
                        },
                        {
                            label: "Tab 2",
                            id: "tab-2",
                            panel: <div>Tab contents 2</div>,
                        },
                    ],
                    selectedTabId: "tab-1",
                },
            },
        ];

        return (
            <ScenariosLayout
                scenarios={scenarios}
                styles={{root: {width: "100%", alignItems: "stretch"}}}
            >
                {(props, name) => (
                    <ControlledTabsDropdown {...props} aria-label={name} />
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
                panel: <div>Tab contents 1</div>,
                icon: <PhosphorIcon icon={IconMappings.cookie} />,
            },
            {
                label: longText,
                id: "tab-2",
                panel: <div>Tab contents 2</div>,
                icon: <PhosphorIcon icon={IconMappings.iceCream} />,
            },
            {
                label: longTextWithNoWordBreak,
                id: "tab-3",
                panel: <div>Tab contents 3</div>,
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
    render: ControlledTabsDropdown,
};
