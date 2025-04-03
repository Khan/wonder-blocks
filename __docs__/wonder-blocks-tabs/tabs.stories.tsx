import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {TabItem, Tabs} from "@khanacademy/wonder-blocks-tabs";
import argTypes from "./tabs.argtypes";

const tabs: TabItem[] = [
    {label: "Tab 1", id: "tab-1", panel: <div>Tab contents 1</div>},
    {label: "Tab 2", id: "tab-2", panel: <div>Tab contents 2</div>},
    {label: "Tab 3", id: "tab-3", panel: <div>Tab contents 3</div>},
];

export default {
    title: "Packages / Tabs / Tabs / Tabs",
    component: Tabs,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    args: {
        tabs,
        selectedTabId: tabs[0].id,
        "aria-label": "Tabs Example",
    },
    argTypes,
    render: function Controlled(args) {
        const [selectedTabId, setSelectedTabId] = React.useState(
            args.selectedTabId || tabs[0].id,
        );

        return (
            <Tabs
                {...args}
                selectedTabId={selectedTabId}
                onTabSelected={setSelectedTabId}
                tabs={args.tabs || tabs}
            />
        );
    },
} as Meta<typeof Tabs>;

type StoryComponentType = StoryObj<typeof Tabs>;

export const Default: StoryComponentType = {
    args: {},
};
