import * as React from "react";
import packageConfig from "../../packages/wonder-blocks-switch/package.json";
import ComponentInfo from "../components/component-info";
import {
    Tab,
    TabItem,
    Tablist,
    TabPanel,
    Tabs,
    Test,
} from "../../packages/wonder-blocks-tabs/src/index";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Tabs / Tabs",
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

export const Example = () => {
    const tabs = [
        {
            id: "tab-1",
            label: <div>Tab 1</div>,
            panel: <div>Panel 1</div>,
        },
        {
            id: "tab-2",
            label: <div>Tab 2</div>,
            panel: <div>Panel 2</div>,
        },
        {
            id: "tab-3",
            label: <div>Tab 3</div>,
            panel: <div>Panel 3</div>,
        },
    ];
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

export const FlexibleLabel = () => {
    const tabs: Array<TabItem> = [
        {
            id: "tab-1",
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
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: spacing.xxxSmall_4,
                    }}
                >
                    Tab with icon
                    <PhosphorIcon icon={IconMappings.calendar} size="small" />
                </div>
            ),
            panel: <div>Panel 2</div>,
        },
    ];
    const [selectedTabId, setSelectedTabId] = React.useState(tabs[0].id);
    return (
        <div>
            <Tabs
                aria-label="Tools"
                tabs={tabs}
                selectedTabId={selectedTabId}
                onTabChange={setSelectedTabId}
            />
        </div>
    );
};

export const IconsOnly = () => {
    const tabs: Array<TabItem> = [
        {
            id: "tab-1",
            label: (
                <div
                    style={{
                        padding: `0px ${spacing.xSmall_8}px`,
                    }}
                >
                    <PhosphorIcon
                        icon={IconMappings.gear}
                        size="medium"
                        role="img"
                        aria-label="Settings"
                    />
                </div>
            ),
            panel: <div>Panel 1</div>,
        },
        {
            id: "tab-2",
            label: (
                <div
                    style={{
                        padding: `0px ${spacing.xSmall_8}px`,
                    }}
                >
                    <PhosphorIcon
                        icon={IconMappings.calendar}
                        size="medium"
                        role="img"
                        aria-label="Schedule"
                    />
                </div>
            ),
            panel: <div>Panel 2</div>,
        },
    ];
    const [selectedTabId, setSelectedTabId] = React.useState(tabs[0].id);
    return (
        <div>
            <Tabs
                aria-label="Tools"
                tabs={tabs}
                selectedTabId={selectedTabId}
                onTabChange={setSelectedTabId}
            />
        </div>
    );
};

export const CustomTypography = () => {
    const tabs: Array<TabItem> = [
        {
            id: "tab-1",
            label: <HeadingLarge>Tab 1</HeadingLarge>,
            panel: <div>Panel 1</div>,
        },
        {
            id: "tab-2",
            label: <HeadingLarge>Tab 2</HeadingLarge>,
            panel: <div>Panel 2</div>,
        },
    ];
    const [selectedTabId, setSelectedTabId] = React.useState(tabs[0].id);
    return (
        <div>
            <Tabs
                aria-label="Tools"
                tabs={tabs}
                selectedTabId={selectedTabId}
                onTabChange={setSelectedTabId}
            />
        </div>
    );
};

export const UsingRenderTab = () => {
    const tabs: Array<TabItem> = [
        {
            id: "tab-1",
            renderTab(tabProps) {
                return (
                    <Tooltip content="This is a text tooltip">
                        <Tab {...tabProps}>Tab with Tooltip</Tab>
                    </Tooltip>
                );
            },
            panel: <div>Panel 1</div>,
        },
        {
            id: "tab-2",
            renderTab(tabProps) {
                return (
                    <Popover
                        content={
                            <PopoverContent
                                title="Popover title"
                                content="Content"
                            />
                        }
                        opened={selectedTabId === "tab-2"}
                    >
                        <Tab {...tabProps}>Tab with Popover</Tab>
                    </Popover>
                );
            },
            panel: <div>Panel 2</div>,
        },
    ];
    const [selectedTabId, setSelectedTabId] = React.useState(tabs[0].id);
    return (
        <div>
            <Tabs
                aria-label="Tools"
                tabs={tabs}
                selectedTabId={selectedTabId}
                onTabChange={setSelectedTabId}
            />
        </div>
    );
};
export const UsingSubcomponents = () => {
    const [selectedTabId, setSelectedTabId] = React.useState("tab-1");
    return (
        <div>
            <Tablist aria-label="Tabs">
                <Tab
                    id="tab-1"
                    aria-controls="panel-1"
                    onClick={() => setSelectedTabId("tab-1")}
                    selected={selectedTabId === "tab-1"}
                >
                    Tab 1
                </Tab>
                <Tab
                    id="tab-2"
                    aria-controls="panel-2"
                    onClick={() => setSelectedTabId("tab-2")}
                    selected={selectedTabId === "tab-2"}
                >
                    Tab 2
                </Tab>
            </Tablist>
            <TabPanel
                aria-labelledby="tab-1"
                id="panel-1"
                style={
                    selectedTabId === "tab-1" ? undefined : {display: "none"}
                }
            >
                Panel 1
            </TabPanel>
            <TabPanel
                aria-labelledby="tab-2"
                id="panel-2"
                style={
                    selectedTabId === "tab-2" ? undefined : {display: "none"}
                }
            >
                Panel 2
            </TabPanel>
        </div>
    );
};
