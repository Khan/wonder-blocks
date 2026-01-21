import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveNavigationTabs} from "@khanacademy/wonder-blocks-tabs";
import {ScenariosLayout} from "../components/scenarios-layout";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {longText} from "../components/text-for-testing";
import {allModes, themeModes} from "../../.storybook/modes";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    title: "Packages / Tabs / ResponsiveNavigationTabs / Testing / ResponsiveNavigationTabs - Snapshots",
    component: ResponsiveNavigationTabs,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {
            modes: {...themeModes, small: allModes.small},
        },
    },
} as Meta<typeof ResponsiveNavigationTabs>;

type Story = StoryObj<typeof ResponsiveNavigationTabs>;

const ControlledResponsiveNavigationTabs = (
    args: PropsFor<typeof ResponsiveNavigationTabs>,
) => {
    const [selectedTabId, setSelectedTabId] = React.useState(
        args.selectedTabId,
    );
    return (
        <View>
            <ResponsiveNavigationTabs
                {...args}
                selectedTabId={selectedTabId}
                onTabSelected={setSelectedTabId}
            />
        </View>
    );
};

const generateTabs = (count: number, label: string = "Nav tab") => {
    return Array.from({length: count}, (_, index) => ({
        label: `${label} ${index + 1}`,
        id: `tab-${index + 1}`,
        href: `#tab-${index + 1}`,
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
                name: "With icons",
                props: {
                    tabs: [
                        {
                            label: "Nav tab 1",
                            id: "tab-1",
                            href: "#tab-1",
                            icon: <PhosphorIcon icon={IconMappings.cookie} />,
                        },
                        {
                            label: "Nav tab 2",
                            id: "tab-2",
                            href: "#tab-2",
                            icon: <PhosphorIcon icon={IconMappings.iceCream} />,
                        },
                        {
                            label: "Nav tab 3",
                            id: "tab-3",
                            href: "#tab-3",
                            icon: (
                                <Icon>
                                    <img src="logo.svg" alt="Wonder Blocks" />
                                </Icon>
                            ),
                        },
                        {
                            label: "Nav tab 4",
                            id: "tab-4",
                            href: "#tab-4",
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
                            href: "#tab-1",
                            icon: <PhosphorIcon icon={IconMappings.cookie} />,
                        },
                        {
                            label: longText,
                            id: "tab-2",
                            href: "#tab-2",
                            icon: <PhosphorIcon icon={IconMappings.iceCream} />,
                        },
                    ],
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
                {(props) => <ControlledResponsiveNavigationTabs {...props} />}
            </ScenariosLayout>
        );
    },
};
