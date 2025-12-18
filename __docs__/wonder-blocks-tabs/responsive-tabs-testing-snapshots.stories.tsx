import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveTabs} from "@khanacademy/wonder-blocks-tabs";
import {ScenariosLayout} from "../components/scenarios-layout";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {longText} from "../components/text-for-testing";

export default {
    title: "Packages / Tabs / ResponsiveTabs / Testing / ResponsiveTabs - Snapshots",
    component: ResponsiveTabs,
    tags: ["!autodocs"],
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
                    tabs: generateTabs(3),
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
        ];

        return (
            <ScenariosLayout
                scenarios={scenarios}
                styles={{root: {width: "100%", alignItems: "stretch"}}}
            >
                {(props, name) => (
                    <ControlledResponsiveTabs {...props} aria-label={name} />
                )}
            </ScenariosLayout>
        );
    },
};
