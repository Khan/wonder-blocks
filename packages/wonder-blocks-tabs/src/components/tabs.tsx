import * as React from "react";
import {keys} from "@khanacademy/wonder-blocks-core";
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
    /**
     * The mode of activation for the tabs for keyboard navigation. Defaults to
     * `manual`.
     *
     * - If `manual`, the tab will only be activated when a tab receives focus
     * and is selected by pressing `Space` or `Enter`.
     * - If `automatic`, the tab will be activated once a tab receives focus.
     */
    activationMode?: "manual" | "automatic";
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
        activationMode = "manual",
    } = props;

    const focusedTabId = React.useRef(selectedTabId);
    const tabRefs = React.useRef<{[key: string]: HTMLButtonElement | null}>({});

    React.useEffect(() => {
        focusedTabId.current = selectedTabId;
    }, [selectedTabId]);

    const selectTab = React.useCallback(
        (tabId: string) => {
            if (tabId !== selectedTabId) {
                // Select the tab only if it's not already selected
                onTabSelected(tabId);
            }
        },
        [onTabSelected, selectedTabId],
    );

    const handleKeyInteraction = React.useCallback(
        (tabId: string) => {
            // Move focus to the tab
            const tabElement = tabRefs.current[tabId];
            tabElement?.focus();

            switch (activationMode) {
                case "manual": {
                    // Only update which tab is focused since we aren't activating
                    // the tab yet
                    focusedTabId.current = tabId;
                    break;
                }
                case "automatic": {
                    // Activate the tab. When selectedTabId is updated, focus will
                    // be moved to the selected tab
                    selectTab(tabId);
                    break;
                }
            }
        },
        [activationMode, selectTab, focusedTabId],
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            const currentIndex = tabs.findIndex(
                (tab) => tab.id === focusedTabId.current,
            );

            switch (event.key) {
                case keys.left: {
                    event.preventDefault();
                    const prevIndex =
                        (currentIndex - 1 + tabs.length) % tabs.length;
                    handleKeyInteraction(tabs[prevIndex].id);
                    break;
                }
                case keys.right: {
                    event.preventDefault();
                    const nextIndex = (currentIndex + 1) % tabs.length;
                    handleKeyInteraction(tabs[nextIndex].id);
                    break;
                }
                case keys.home: {
                    event.preventDefault();
                    handleKeyInteraction(tabs[0].id);
                    break;
                }
                case keys.end: {
                    event.preventDefault();
                    handleKeyInteraction(tabs[tabs.length - 1].id);
                    break;
                }
                case keys.enter:
                case keys.space: {
                    event.preventDefault();
                    selectTab(focusedTabId.current);
                    break;
                }
            }
        },
        [handleKeyInteraction, selectTab, tabs, focusedTabId],
    );

    const handleTablistBlur = React.useCallback(() => {
        // When tablist loses focus, set the focused tab to the selected tab to
        // reset it
        focusedTabId.current = selectedTabId;
    }, [selectedTabId]);

    return (
        <div ref={ref}>
            <Tablist
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                onBlur={handleTablistBlur}
            >
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
                            onKeyDown={handleKeyDown}
                            ref={(element) => {
                                tabRefs.current[tab.id] = element;
                            }}
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
                        active={selectedTabId === tab.id}
                    >
                        {selectedTabId === tab.id && tab.panel}
                    </TabPanel>
                );
            })}
        </div>
    );
});
