import * as React from "react";
import packageConfig from "../../packages/wonder-blocks-switch/package.json";
import ComponentInfo from "../components/component-info";
import {
    Tab,
    TabItem,
    TabPanel,
    Tabs,
    Test,
} from "../../packages/wonder-blocks-tabs/src/index";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";

export default {
    title: "Packages / Tabs",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
};

export const Default = () => {
    return <Test />;
};
const tabs: Array<TabItem> = [
    {
        id: "tab-1",
        renderTab(tabProps) {
            return <Tab {...tabProps}>Tab 1</Tab>;
        },
        renderPanel(panelProps) {
            return <TabPanel {...panelProps}>Panel 1</TabPanel>;
        },
    },
    {
        id: "tab-2",
        renderTab(tabProps) {
            return <Tab {...tabProps}>Tab 2</Tab>;
        },
        renderPanel(panelProps) {
            return <TabPanel {...panelProps}>Panel 2</TabPanel>;
        },
    },
    {
        id: "tab-3",
        renderTab(tabProps) {
            return <Tab {...tabProps}>Tab 3</Tab>;
        },
        renderPanel(panelProps) {
            return <TabPanel {...panelProps}>Panel 3</TabPanel>;
        },
    },
];

export const Example = () => {
    const [selectedTabId, setSelectedTabId] = React.useState(tabs[0].id);
    return (
        <Tabs
            aria-label="Tools"
            tabs={tabs}
            selectedTabId={selectedTabId}
            onTabChange={setSelectedTabId}
        />
    );
};

export const TabsWithFlexibleContent = () => {
    const [selectedTabId, setSelectedTabId] = React.useState(tabs[0].id);
    const tabsWithFlexibleContent = [
        {
            id: "tab-1",
            renderTab(tabProps) {},
            label: (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: spacing.xxxSmall_4,
                    }}
                >
                    <PhosphorIcon icon={IconMappings.calendar} size="small" />
                    Tab with icon
                </div>
            ),
            panel: <div>Panel 1</div>,
        },
        {
            id: "tab-2",
            label: (
                <Tooltip content="This is a text tooltip">
                    Tab with Tooltip
                </Tooltip>
            ),
            panel: <div>Panel 2</div>,
        },
        {
            id: "tab-3",
            label: (
                <Popover
                    content={
                        <PopoverContent
                            title="Popover title"
                            content="Content"
                        />
                    }
                    opened={selectedTabId === "tab-3"}
                >
                    <div>Tab with Popover</div>
                </Popover>
            ),
            panel: <div>Panel 3</div>,
        },
    ];
    return (
        <div>
            <Tabs
                aria-label="Tools"
                tabs={tabsWithFlexibleContent}
                selectedTabId={selectedTabId}
                onTabChange={setSelectedTabId}
            />
        </div>
    );
};
