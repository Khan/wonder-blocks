import * as React from "react";
import {
    addStyle,
    AriaProps,
    keys,
    PropsFor,
    StyleType,
    useOnMountEffect,
} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import {TabPanel} from "./tab-panel";
import {Tab} from "./tab";
import {Tablist} from "./tablist";
import {useTabIndicator} from "../hooks/use-tab-indicator";

export type TabRenderProps = Omit<PropsFor<typeof Tab>, "children">;

export type TabItem = AriaProps & {
    /**
     * A unique id for the tab.
     *
     * Here is how the id is used for the different elements in the component:
     * - The tab will have an id formatted as `${id}-tab`
     * - The associated tab panel will have an id formatted as `${id}-panel`
     *
     * It is also used to communicate the id of the selected tab via the
     * `selectedTabId` and `onTabSelected` props.
     */
    id: string;
    /**
     * The contents of the tab label.
     *
     * For specific use cases where the underlying tab element is wrapped
     * by another component (like a `Tooltip` or `Popover`), a render function
     * can be used with the `Tab` component instead. The render function
     * provides the tab props that should be applied to the `Tab` component.
     * See example in the docs for more details.
     */
    label: React.ReactNode | ((tabProps: TabRenderProps) => React.ReactElement);
    /**
     * The contents of the panel associated with the tab.
     */
    panel: React.ReactNode;
    /**
     * Optional test ID for e2e testing.
     *
     * Here is how the test id is used for the different elements in the component:
     * - The tab will have a testId formatted as `${testId}-tab`
     * - The associated tab panel will have a testId formatted as `${testId}-panel`
     */
    testId?: string;
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
     * A unique id to use as the base of the ids for the elements within the
     * component. If the `id` prop is not provided, a base unique id will be
     * auto-generated.
     *
     * Here is how the id is used for the different elements in the component:
     * - The root will have an id of `${id}`
     * - The tablist will have an id formatted as ${id}-tablist
     *
     * If you need to apply an id to a specific tab or tab panel, the `id` for
     * the tab item in the `tabs` prop will be used:
     * - The tab will have an id formatted as `${id}-tab`
     * - The associated tab panel will have an id formatted as `${id}-panel`
     */
    id?: string;
    /**
     * Optional test ID for e2e testing. Here is how the test id is used for the
     * different elements in the component:
     * - The root will have a testId formatted as `${testId}`
     * - The tablist will have a testId formatted as `${testId}-tablist`
     *
     * If you need to apply a testId to a specific tab or tab panel, add the
     * test id to the tab item in the `tabs` prop:
     * - The tab will have a testId formatted as `${testId}-tab`
     * - The associated tab panel will have a testId formatted as `${testId}-panel`
     */
    testId?: string;
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
    /**
     * Whether to include animation in the `Tabs` component. This should be
     * false if the user has `prefers-reduced-motion` opted in. Defaults to
     * `false`.
     */
    animated?: boolean;
    /**
     * Custom styles for the `Tabs` component.
     * - `root`: Styles the root `div` element.
     * - `tablist`: Styles the `tablist` element.
     * - `tab`: Styles all `tab` elements.
     * - `tabPanel`: Styles all the `tabpanel` elements.
     *
     * If styles need to be applied to specific tab or tab panel elements,
     * consider setting the styles on the `label` and `panel` content for the
     * `tabs` prop.
     */
    styles?: {
        root?: StyleType;
        tablist?: StyleType;
        tab?: StyleType;
        tabPanel?: StyleType;
    };

    /**
     * Whether to mount all tab panels when the component mounts.
     *
     * - When enabled, all tab panels are in the DOM. This is useful if the
     * tab contents should be crawlable for SEO purposes.
     * - When disabled, tab panels are only in the DOM if they've been visited.
     * This is useful for performance so that unvisited panels are not mounted.
     *
     * Defaults to `false`.
     */
    mountAllPanels?: boolean;
} & AriaLabelOrAriaLabelledby;

/**
 * Returns the id of the tab.
 */
function getTabId(tabId: string) {
    return `${tabId}-tab`;
}

/**
 * Returns the id of the tab panel.
 */

function getTabPanelId(tabId: string) {
    return `${tabId}-panel`;
}

const StyledDiv = addStyle("div");
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
        id,
        testId,
        animated = false,
        styles: stylesProp,
        mountAllPanels = false,
    } = props;

    /**
     * The id of the tab that is currently focused.
     */
    const focusedTabId = React.useRef(selectedTabId);

    /**
     * Keep track of refs for each each tab.
     */
    const tabRefs = React.useRef<{[key: string]: HTMLButtonElement | null}>({});

    /**
     * Element ids
     */
    const generatedUniqueId = React.useId();
    const uniqueId = id ?? generatedUniqueId;
    const tablistId = `${uniqueId}-tablist`;

    /**
     * Keep track of tabs that have been visited to avoid unnecessary mounting/
     * unmounting of tab panels when we switch tabs. We won't mount any tab
     * panel contents that aren't visited, and we won't remount tabs that have
     * been visited already.
     */
    const visitedTabsRef = React.useRef(new Set<string>());
    visitedTabsRef.current.add(selectedTabId);

    /**
     * Ref for the tablist.
     */
    const tablistRef = React.useRef<HTMLDivElement>(null);

    /**
     * Whether the component is in RTL mode.
     */
    const [isRtl, setIsRtl] = React.useState(false);

    useOnMountEffect(() => {
        setIsRtl(!!tablistRef.current?.closest("[dir=rtl]"));
    });

    const previousSelectedTabId = React.useRef(selectedTabId);

    /**
     * Determine if the tab is active if it has aria-selected="true".
     */
    const isTabActive = React.useCallback((tabElement: Element): boolean => {
        return tabElement.ariaSelected === "true";
    }, []);

    const {indicatorProps, updateUnderlineStyle} = useTabIndicator({
        animated,
        tabsContainerRef: tablistRef,
        isTabActive,
    });

    React.useEffect(() => {
        focusedTabId.current = selectedTabId;
    }, [selectedTabId]);

    React.useEffect(() => {
        // Update the underline style when the selected tab changes or the tabs
        // changes
        updateUnderlineStyle();
    }, [updateUnderlineStyle, tabs, selectedTabId]);

    const selectTab = React.useCallback(
        (tabId: string) => {
            if (tabId !== selectedTabId) {
                // Select the tab only if it's not already selected
                previousSelectedTabId.current = selectedTabId;
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
                case isRtl && keys.right:
                case !isRtl && keys.left: {
                    // Select previous tab
                    event.preventDefault();
                    const prevIndex =
                        (currentIndex - 1 + tabs.length) % tabs.length;
                    handleKeyInteraction(tabs[prevIndex].id);
                    break;
                }
                case isRtl && keys.left:
                case !isRtl && keys.right: {
                    // Select next tab
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
        [handleKeyInteraction, selectTab, tabs, focusedTabId, isRtl],
    );

    const handleTablistBlur = React.useCallback(() => {
        // When tablist loses focus, set the focused tab to the selected tab to
        // reset it
        focusedTabId.current = selectedTabId;
    }, [selectedTabId]);

    if (tabs.length === 0) {
        return <React.Fragment />;
    }

    const currentIndex = tabs.findIndex((tab) => tab.id === selectedTabId);

    const previousIndex = tabs.findIndex(
        (tab) => tab.id === previousSelectedTabId.current,
    );

    function getCurrentTabAnimationStyle() {
        if (currentIndex === previousIndex || !animated) {
            return undefined;
        }

        if (currentIndex > previousIndex) {
            return styles.slideInFromRight;
        }

        return styles.slideInFromLeft;
    }

    function getPreviousTabAnimationStyle() {
        if (currentIndex === previousIndex || !animated) {
            return undefined;
        }

        if (currentIndex > previousIndex) {
            return styles.slideOutToLeft;
        }

        return styles.slideOutToRight;
    }
    const currentTabAnimationStyle = getCurrentTabAnimationStyle();
    const previousTabAnimationStyle = getPreviousTabAnimationStyle();

    return (
        <StyledDiv
            ref={ref}
            id={uniqueId}
            data-testid={testId}
            style={[styles.tabs, stylesProp?.root]}
        >
            {/* Wrap the tablist so we can set relative positioning for the tab indicator */}
            <StyledDiv style={styles.tablistWrapper}>
                <Tablist
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledby}
                    onBlur={handleTablistBlur}
                    id={tablistId}
                    testId={testId && `${testId}-tablist`}
                    ref={tablistRef}
                    style={stylesProp?.tablist}
                >
                    {tabs.map((tab) => {
                        const {
                            id,
                            label,
                            panel: _,
                            testId: tabTestId,
                            ...otherProps // Should only include aria related props
                        } = tab;

                        const tabProps: TabRenderProps = {
                            ...otherProps,
                            key: id,
                            id: getTabId(id),
                            testId: tabTestId && getTabId(tabTestId),
                            selected: id === selectedTabId,
                            "aria-controls": getTabPanelId(id),
                            onClick: () => {
                                selectTab(id);
                            },
                            onKeyDown: handleKeyDown,
                            ref: (element) => {
                                tabRefs.current[tab.id] = element;
                            },
                            style: stylesProp?.tab,
                        };

                        if (typeof label === "function") {
                            return label(tabProps);
                        }

                        return <Tab {...tabProps}>{label}</Tab>;
                    })}
                </Tablist>
                {<div {...indicatorProps} />}
            </StyledDiv>
            <div style={{position: "relative"}}>
                {tabs.map((tab) => {
                    const isActive = selectedTabId === tab.id;
                    return (
                        <TabPanel
                            key={tab.id}
                            id={getTabPanelId(tab.id)}
                            aria-labelledby={getTabId(tab.id)}
                            active={isActive}
                            testId={tab.testId && getTabPanelId(tab.testId)}
                            style={[
                                stylesProp?.tabPanel,
                                isActive && currentTabAnimationStyle,
                                previousSelectedTabId.current === tab.id &&
                                    previousTabAnimationStyle,
                                {width: "100%"},
                            ]}
                        >
                            {/* Tab panel contents are rendered if the tab has
                        been previously visited or if mountAllPanels is enabled.
                        If mountAllPanels is off, it prevents unnecessary
                        re-mounting of tab panel contents when switching tabs.
                        Note that TabPanel will only display the contents if it
                        is the active panel. */}
                            {(mountAllPanels ||
                                visitedTabsRef.current.has(tab.id)) &&
                                tab.panel}
                        </TabPanel>
                    );
                })}
            </div>
        </StyledDiv>
    );
});

const slideInFromLeft = {
    from: {
        opacity: 0,
        display: "none",
        translate: "-100% 0",
    },
    to: {
        opacity: 1,
        display: "block",
    },
};
const slideInFromRight = {
    from: {
        opacity: 0,
        display: "none",
        translate: "100% 0",
    },
    to: {
        opacity: 1,
        display: "block",
    },
};
const slideOutToLeft = {
    // When a panel is sliding out, it should have position: absolute so
    // that it doesn't take up space while it is exiting
    from: {
        opacity: 1,
        display: "block",
        position: "absolute",
        top: 0,
    },
    to: {
        opacity: 0,
        display: "none",
        position: "absolute",
        top: 0,
        translate: "-100% 0",
    },
};
const slideOutToRight = {
    // When a panel is sliding out, it should have position: absolute so
    // that it doesn't take up space while it is exiting
    from: {
        opacity: 1,
        display: "block",
        position: "absolute",
        top: 0,
    },
    to: {
        opacity: 0,
        display: "none",
        position: "absolute",
        top: 0,
        translate: "100% 0",
    },
};

const styles = StyleSheet.create({
    tabs: {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "stretch",
        position: "relative",
    },
    tablistWrapper: {
        position: "relative",
        overflowX: "auto",
    },
    slideInFromLeft: {
        animationName: slideInFromLeft,
        animationDuration: "1s",
    } as any,
    slideInFromRight: {
        animationName: slideInFromRight,
        animationDuration: "1s",
    } as any,
    slideOutToLeft: {
        animationName: slideOutToLeft,
        animationDuration: "1s",
    } as any,
    slideOutToRight: {
        animationName: slideOutToRight,
        animationDuration: "1s",
    } as any,
});
