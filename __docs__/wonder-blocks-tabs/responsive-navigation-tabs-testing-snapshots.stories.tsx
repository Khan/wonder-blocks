import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {ResponsiveNavigationTabs} from "@khanacademy/wonder-blocks-tabs";
import {ScenariosLayout} from "../components/scenarios-layout";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {longText} from "../components/text-for-testing";
import {allModes, themeModes} from "../../.storybook/modes";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

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
