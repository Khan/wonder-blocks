import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveTabs} from "@khanacademy/wonder-blocks-tabs";
import {ScenariosLayout} from "../components/scenarios-layout";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {longText} from "../components/text-for-testing";
import {allModes, themeModes} from "../../.storybook/modes";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    title: "Packages / Tabs / Testing / ResponsiveTabs - Snapshots",
    component: ResponsiveTabs,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: {...themeModes, small: allModes.small},
        },
        a11y: {
            config: {
                rules: [
                    {
                        // Ignoring color contrast violations at the responsive
                        // component level due to SB flakiness around the a11y
                        // check running during the fade transition. This is
                        // covered at the component level.
                        id: "color-contrast",
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta<typeof ResponsiveTabs>;

type Story = StoryObj<typeof ResponsiveTabs>;

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

const generateTabs = (count: number, label: string = "Tab") => {
    return Array.from({length: count}, (_, index) => ({
        label: `${label} ${index + 1}`,
        id: `tab-${index + 1}`,
        panel: <div>Tab contents {index + 1}</div>,
    }));
};

export const Scenarios: Story = {
    render: function render() {
        const scenarios = [
            {
                name: "Default",
                props: {
                    tabs: generateTabs(5),
                    selectedTabId: "tab-1",
                },
            },
            {
                name: "Many items",
                props: {
                    tabs: generateTabs(30),
                    selectedTabId: "tab-1",
                },
            },
            {
                name: "Zero items",
                props: {
                    tabs: [],
                    selectedTabId: "tab-1",
                },
            },
            {
                name: "Long labels",
                props: {
                    tabs: generateTabs(3, longText),
                    selectedTabId: "tab-1",
                },
            },
            {
                name: "Custom styles",
                props: {
                    tabs: generateTabs(3),
                    selectedTabId: "tab-1",
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
            },
            {
                name: "With icons",
                props: {
                    tabs: [
                        {
                            label: "Tab 1",
                            id: "tab-1",
                            panel: <div>Tab contents 1</div>,
                            icon: <PhosphorIcon icon={IconMappings.cookie} />,
                        },
                        {
                            label: "Tab 2",
                            id: "tab-2",
                            panel: <div>Tab contents 2</div>,
                            icon: <PhosphorIcon icon={IconMappings.iceCream} />,
                        },
                        {
                            label: "Tab 3",
                            id: "tab-3",
                            panel: <div>Tab contents 3</div>,
                            icon: (
                                <Icon>
                                    <img src="logo.svg" alt="Wonder Blocks" />
                                </Icon>
                            ),
                        },
                        {
                            label: "Tab 4",
                            id: "tab-4",
                            panel: <div>Tab contents 4</div>,
                            icon: (
                                <PhosphorIcon icon={IconMappings.lightbulb} />
                            ),
                        },
                    ],
                    selectedTabId: "tab-1",
                },
            },
            {
                name: "With icons and long labels",
                props: {
                    tabs: [
                        {
                            label: longText,
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
                    ],
                    selectedTabId: "tab-1",
                },
            },
        ];

        return (
            <ScenariosLayout
                scenarios={scenarios}
                styles={{
                    root: {
                        width: "100%",
                        alignItems: "stretch",
                        padding: sizing.size_080,
                    },
                }}
            >
                {(props, name) => (
                    <ControlledResponsiveTabs {...props} aria-label={name} />
                )}
            </ScenariosLayout>
        );
    },
};
