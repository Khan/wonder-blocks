import * as React from "react";
import {TabPanel} from "./tab-panel";
import {Tab} from "./tab";
import {Tablist} from "./tablist";

export type TabItem = {
    /**
     * A unique id for the tab.
     */
    id: string;
    /**
     * The contents of the tab label.
     */
    label: React.ReactNode;
    /**
     * The contents of the panel associated with the tab.
     */
    panel: React.ReactNode;
};

/**
 * Type to help ensure aria-label or aria-labelledby is set.
 */
type AriaLabelOrAriaLabelledby =
    | {
          /**
           * If there is no visible label for the tabs, set aria-label to a
           * label describing the tabs.
           */
          "aria-label": string;
          "aria-labelledby"?: never;
      }
    | {
          /**
           * If the tabs have a visible label, set aria-labelledby to a value
           * that refers to the labelling element.
           */
          "aria-labelledby": string;
          "aria-label"?: never;
      };

type Props = {
    /**
     * The tabs to render. The Tabs component will wire up the tab and panel
     * attributes for accessibility.
     */
    tabs: Array<TabItem>;
    /**
     * The id of the tab that is selected.
     */
    selectedTabId: string;
    /**
     * Called when a tab is selected.
     */
    onTabSelected: (id: string) => unknown;
} & AriaLabelOrAriaLabelledby;

/**
 * Returns the id of the tab.
 */
function getTabId(tabId: string) {
    return `${tabId}__tab`;
}

/**
 * Returns the id of the tab panel.
 */

function getTabPanelId(tabId: string) {
    return `${tabId}__panel`;
}

/**
 * A component that uses a tabbed interface to control a specific view. The
 * tabs have `role=”tab”` and keyboard users can change tabs using arrow keys.
 * For a tabbed interface where the tabs are links, see the NavigationTabs
 * component.
 */
export const Tabs = React.forwardRef(function Tabs(
    props: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        tabs,
        selectedTabId,
        onTabSelected,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
    } = props;

    return (
        <div ref={ref}>
            <Tablist aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
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
