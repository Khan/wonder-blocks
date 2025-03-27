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
};

export const Tabs = (props: Props) => {
    const {tabs} = props;
    return (
        <div>
            <Tablist>
                {tabs.map((tab) => {
                    return <Tab key={tab.id}>{tab.label}</Tab>;
                })}
            </Tablist>
            {tabs.map((tab) => {
                return <TabPanel key={tab.id}>{tab.panel}</TabPanel>;
            })}
        </div>
    );
};
