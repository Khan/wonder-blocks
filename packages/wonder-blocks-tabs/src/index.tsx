import * as React from "react";
import Link from "@khanacademy/wonder-blocks-link";

type AriaLabelOrAriaLabelledby =
    | {"aria-label": string; "aria-labelledby"?: never}
    | {"aria-label"?: never; "aria-labelledby": string};

type TablistProps = {
    children: React.ReactNode;
} & AriaLabelOrAriaLabelledby;

type TabProps = {
    children: React.ReactNode;
    "aria-controls": string;
    selected?: boolean;
    id: string;
    onClick?: (event: React.MouseEvent) => unknown;
    tabIndex?: number;
};

type TabPanelProps = {
    children: React.ReactNode;
    id: string;
    "aria-labelledby": string;
};

export const Tablist = (props: TablistProps) => {
    const {
        children,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
    } = props;
    return (
        <div
            role="tablist"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
        >
            {children}
        </div>
    );
};

export const Tab = (props: TabProps) => {
    const {
        children,
        "aria-controls": ariaControls,
        selected,
        onClick,
        tabIndex,
    } = props;
    return (
        <button
            role="tab"
            aria-controls={ariaControls}
            aria-selected={selected}
            onClick={onClick}
            style={{backgroundColor: selected ? "lightblue" : undefined}}
            tabIndex={tabIndex}
        >
            {children}
        </button>
    );
};

export const TabPanel = (props: TabPanelProps) => {
    const {children, id, "aria-labelledby": ariaLabelledby} = props;
    return (
        <div role="tabpanel" id={id} aria-labelledby={ariaLabelledby}>
            {children}
        </div>
    );
};

type TabItem = {
    id: string;
    label: React.ReactNode;
    panel: React.ReactNode;
};

type TabsProps = {
    tabs: Array<TabItem>;
    selectedTab: string;
    onTabChange: (tabId: string) => void;
} & AriaLabelOrAriaLabelledby;

export const Tabs = (props: TabsProps) => {
    const {
        tabs,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        selectedTab,
        onTabChange,
    } = props;

    function getPanelId(tabId: string) {
        return `${tabId}__panel`;
    }

    function getTabId(tabId: string) {
        return `${tabId}__tab`;
    }

    const currentTab = tabs.find((tab) => tab.id === selectedTab) || tabs[0];

    return (
        <div>
            <Tablist aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.id}
                        aria-controls={getPanelId(tab.id)}
                        id={getTabId(tab.id)}
                        selected={selectedTab === tab.id}
                        onClick={() => onTabChange(tab.id)}
                        tabIndex={selectedTab === tab.id ? undefined : -1}
                    >
                        {tab.label}
                    </Tab>
                ))}
            </Tablist>
            <TabPanel
                key={currentTab.id}
                id={getPanelId(currentTab.id)}
                aria-labelledby={getTabId(currentTab.id)}
            >
                {currentTab.panel}
            </TabPanel>
        </div>
    );
};

type NavTabsProps = {
    children: React.ReactNode;
} & AriaLabelOrAriaLabelledby;

export const NavTabs = (props: NavTabsProps) => {
    const {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        children,
    } = props;
    return (
        <nav aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
            {children}
        </nav>
    );
};

type NavTabItemProps = {
    selected?: boolean;
    children: React.ReactNode;
};

export const NavTabItem = (props: NavTabItemProps) => {
    const {children, selected} = props;
    return (
        <li style={{backgroundColor: selected ? "lightblue" : undefined}}>
            {children}
        </li>
    );
};

export const Test = () => {
    const [selectedTab, setSelectedTab] = React.useState("tab-1");

    return (
        <div>
            --- manual wiring of tab components ---
            <Tablist aria-label="Tool tabs">
                <Tab aria-controls="tab-panel-1" id="tab-1">
                    Tab 1
                </Tab>
                <Tab aria-controls="tab-panel-2" id="tab-2">
                    Tab 2
                </Tab>
            </Tablist>
            <TabPanel id="tab-panel-1" aria-labelledby="tab-1">
                Panel 1
            </TabPanel>
            <TabPanel id="tab-panel-2" aria-labelledby="tab-2">
                Panel 2
            </TabPanel>
            --- tabs configuration component ---
            <Tabs
                aria-label="Tools"
                tabs={[
                    {
                        id: "tab-1",
                        label: <div>Tab 1</div>,
                        panel: <div>contents 1</div>,
                    },
                    {
                        id: "tab-2",
                        label: <div>Tab 2</div>,
                        panel: <div>contents 2</div>,
                    },
                ]}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
            />
            --- NavTabs ---
            <NavTabs aria-label="Secondary navigation">
                <NavTabItem>
                    <Link href="#tab1">Tab 1</Link>
                </NavTabItem>
                <NavTabItem selected={true}>
                    <Link href="#tab2">Tab 2</Link>
                </NavTabItem>
            </NavTabs>
        </div>
    );
};
