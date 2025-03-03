import * as React from "react";
import Link from "@khanacademy/wonder-blocks-link";
import {CSSProperties, StyleSheet} from "aphrodite";
import {addStyle, StyleType, View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {styles} from "@khanacademy/wonder-blocks-typography";

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
};

type TabPanelProps = {
    children: React.ReactNode;
    id: string;
    "aria-labelledby": string;
    style?: StyleType;
};

const StyledDiv = addStyle("div");
export const Tablist = (props: TablistProps) => {
    const {
        children,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
    } = props;
    return (
        <StyledDiv
            role="tablist"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            style={tabStyles.list}
        >
            {children}
        </StyledDiv>
    );
};

const StyledButton = addStyle("button");

export const Tab = (props: TabProps) => {
    const {
        children,
        "aria-controls": ariaControls,
        selected,
        onClick,
        id,
        ...otherProps
    } = props;
    return (
        <StyledButton
            id={id}
            style={[styles.Body, tabStyles.tab, selected && tabStyles.selected]}
            role="tab"
            aria-controls={ariaControls}
            aria-selected={selected}
            onClick={onClick}
            tabIndex={selected ? undefined : -1}
            {...otherProps}
        >
            {children}
        </StyledButton>
    );
};

export const TabPanel = (props: TabPanelProps) => {
    const {children, id, "aria-labelledby": ariaLabelledby, style} = props;
    return (
        <StyledDiv
            style={style}
            role="tabpanel"
            id={id}
            aria-labelledby={ariaLabelledby}
        >
            {children}
        </StyledDiv>
    );
};

type TabLabel =
    | {
          label: React.ReactElement;
          renderTab?: never;
      }
    | {
          label?: never;
          renderTab(tabProps: Omit<TabProps, "children">): React.ReactElement;
      };
export type TabItem = {
    id: string;
    panel: React.ReactElement;
    keepPanelMounted?: boolean;
} & TabLabel;

type TabsProps = {
    tabs: Array<TabItem>;
    selectedTabId: string;
    onTabChange: (tabId: string) => void;
} & AriaLabelOrAriaLabelledby;

export const Tabs = (props: TabsProps) => {
    const {
        tabs,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        selectedTabId,
        onTabChange,
    } = props;
    const visitedTabsRef = React.useRef(new Set<string>());
    visitedTabsRef.current.add(selectedTabId);

    function getPanelId(tabId: string) {
        return `${tabId}__panel`;
    }

    function getTabId(tabId: string) {
        return `${tabId}__tab`;
    }

    return (
        <View style={[tabStyles.tabs]}>
            <Tablist aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
                {tabs.map((tab) => {
                    const tabProps = {
                        key: tab.id,
                        "aria-controls": getPanelId(tab.id),
                        id: getTabId(tab.id),
                        selected: selectedTabId === tab.id,
                        onClick: () => onTabChange(tab.id),
                    };
                    return tab.label ? (
                        <Tab {...tabProps}>{tab.label}</Tab>
                    ) : (
                        tab.renderTab(tabProps)
                    );
                })}
            </Tablist>
            {tabs.map((tab) => (
                <TabPanel
                    key={tab.id}
                    id={getPanelId(tab.id)}
                    aria-labelledby={getTabId(tab.id)}
                    style={
                        selectedTabId === tab.id ? undefined : {display: "none"}
                    }
                >
                    {visitedTabsRef.current.has(tab.id) && tab.panel}
                </TabPanel>
            ))}
        </View>
    );
};

type NavigationTabsProps = {
    children: React.ReactNode;
    styles?: {
        root?: StyleType;
    };
} & AriaLabelOrAriaLabelledby;

const StyledNav = addStyle("nav");
const StyledUl = addStyle("ul");
export const NavigationTabs = (props: NavigationTabsProps) => {
    const {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        children,
        styles,
    } = props;
    return (
        <StyledNav
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            style={[styles?.root]}
        >
            <StyledUl style={tabStyles.list}>{children}</StyledUl>
        </StyledNav>
    );
};

type NavigationTabItemProps = {
    selected?: boolean;
    children: React.ReactElement<React.ComponentProps<typeof Link>>;
};

export const NavigationTabItem = (props: NavigationTabItemProps) => {
    const {children, selected} = props;
    function renderChildren() {
        return React.cloneElement(children, {
            "aria-current": selected ? "page" : undefined,
            style: [
                styles.Body,
                tabStyles.tab,
                tabStyles.navTab,
                selected && tabStyles.selected,
            ],
        });
    }
    return <li>{renderChildren()}</li>;
};

const underlineStyles: CSSProperties = {
    content: '""',
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: spacing.xxxSmall_4,
};

const tabStyles = StyleSheet.create({
    list: {
        display: "flex",
        listStyle: "none",
        padding: 0,
        margin: 0,
        gap: spacing.medium_16,
    },
    tab: {
        backgroundColor: semanticColor.surface.primary,
        color: semanticColor.action.outlined.progressive.default.foreground,
        border: "none",
        cursor: "pointer",
        padding: 0,
        paddingTop: spacing.xSmall_8,
        paddingBottom: spacing.xSmall_8,
        boxSizing: "border-box",
        ":hover": {
            textDecoration: "none",
            [":after" as any]: {
                ...underlineStyles,
                backgroundColor:
                    semanticColor.action.outlined.progressive.hover.foreground, // TODO semantics look correct but is the same value as default
            },
        },
        position: "relative",
    },

    navTab: {
        color: semanticColor.text.primary,
        paddingTop: spacing.large_24,
        paddingBottom: spacing.large_24,
    },
    selected: {
        fontWeight: "bold",
        color: semanticColor.action.outlined.progressive.default.foreground, // TODO use selected token
        ":after": {
            ...underlineStyles,
            backgroundColor:
                semanticColor.action.outlined.progressive.default.foreground,
        },
    },
    tabs: {
        gap: spacing.xSmall_8,
    },
});

const TestTabPanel = (props: {num: number}) => {
    React.useEffect(() => {
        console.log("mounted TabPanel", props.num);
    }, []);
    return <div>TabPanel{props.num}</div>;
};

export const Test = () => {
    const [selectedTabId, setSelectedTabId] = React.useState("tab-1");
    const [selectedNavTab, setSelectedNavTab] = React.useState("tab-1");
    return (
        <div>
            --- tabs configuration component ---
            <Tabs
                aria-label="Tools"
                tabs={[
                    {
                        id: "tab-1",
                        label: <div>Tab 1</div>,
                        panel: <TestTabPanel num={1} />,
                    },
                    {
                        id: "tab-2",
                        label: <div>Tab 2</div>,
                        panel: <TestTabPanel num={2} />,
                    },
                    {
                        id: "tab-3",
                        label: <div>Tab 3</div>,
                        panel: <TestTabPanel num={3} />,
                    },
                ]}
                selectedTabId={selectedTabId}
                onTabChange={setSelectedTabId}
            />
            --- NavigationTabs ---
            <NavigationTabs aria-label="Secondary navigation">
                <NavigationTabItem selected={selectedNavTab === "tab-1"}>
                    <Link
                        href="#tab1"
                        onClick={() => setSelectedNavTab("tab-1")}
                    >
                        Tab 1
                    </Link>
                </NavigationTabItem>
                <NavigationTabItem selected={selectedNavTab === "tab-2"}>
                    <Link
                        href="#tab2"
                        onClick={() => setSelectedNavTab("tab-2")}
                    >
                        Tab 2
                    </Link>
                </NavigationTabItem>
            </NavigationTabs>
        </div>
    );
};
