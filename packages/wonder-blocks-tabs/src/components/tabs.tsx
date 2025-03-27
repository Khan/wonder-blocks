import * as React from "react";
import {TabPanel} from "./tab-panel";
import {Tab} from "./tab";
import {Tablist} from "./tablist";

export type TabItem = {
    id: string;
    label: React.ReactNode;
    panel: React.ReactElement;
};

type Props = {
    tabs: Array<TabItem>;
    selectedTabId: string;
    onTabSelected: (id: string) => unknown;
};

function getTabId(tabId: string) {
    return `${tabId}__tab`;
}

function getTabPanelId(tabId: string) {
    return `${tabId}__panel`;
}

export const Tabs = React.forwardRef(function Tabs(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {tabs, selectedTabId, onTabSelected} = props;

    return (
        <div ref={ref}>
            <Tablist>
                {tabs.map((tab) => {
                    return (
                        <Tab
                            key={tab.id}
                            onClick={() => {
                                onTabSelected(tab.id);
                            }}
                            id={getTabId(tab.id)}
                            aria-controls={getTabPanelId(tab.id)}
                            selected={tab.id === selectedTabId}
                        >
                            {tab.label}
                        </Tab>
                    );
                })}
            </Tablist>
            {tabs.map((tab) => {
                return (
                    <TabPanel
                        key={tab.id}
                        id={getTabPanelId(tab.id)}
                        aria-labelledby={getTabId(tab.id)}
                    >
                        {selectedTabId === tab.id && tab.panel}
                    </TabPanel>
                );
            })}
        </div>
    );
});
