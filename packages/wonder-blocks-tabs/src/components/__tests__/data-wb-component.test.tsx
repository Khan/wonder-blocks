import * as React from "react";
import {render, screen} from "@testing-library/react";
import Link from "@khanacademy/wonder-blocks-link";

import {Tabs} from "../tabs";
import {Tab} from "../tab";
import {NavigationTabs} from "../navigation-tabs";
import {NavigationTabItem} from "../navigation-tab-item";
import {ResponsiveTabs} from "../responsive-tabs";
import {ResponsiveNavigationTabs} from "../responsive-navigation-tabs";

const tabs = [
    {id: "tab-1", label: "Tab 1", panel: <div>Panel 1</div>},
    {id: "tab-2", label: "Tab 2", panel: <div>Panel 2</div>},
];

const navigationTabs = [
    {id: "tab-1", label: "Tab 1", href: "/tab-1"},
    {id: "tab-2", label: "Tab 2", href: "/tab-2"},
];

describe("data-wb-component", () => {
    it.each([
        [
            "Tabs",
            <Tabs
                key="1"
                tabs={tabs}
                selectedTabId="tab-1"
                onTabSelected={() => {}}
                aria-label="Tabs"
                testId="root"
            />,
        ],
        [
            "Tab",
            <Tab key="2" testId="root" id="tab" aria-controls="panel">
                Tab
            </Tab>,
        ],
        [
            "NavigationTabs",
            <NavigationTabs key="3" testId="root">
                <NavigationTabItem>
                    <Link href="/link">Profile</Link>
                </NavigationTabItem>
            </NavigationTabs>,
        ],
        [
            "NavigationTabItem",
            <NavigationTabs key="4">
                <NavigationTabItem testId="root">
                    <Link href="/link">Profile</Link>
                </NavigationTabItem>
            </NavigationTabs>,
        ],
        [
            "ResponsiveTabs",
            <ResponsiveTabs
                key="5"
                tabs={tabs}
                selectedTabId="tab-1"
                onTabSelected={() => {}}
                aria-label="Tabs"
                testId="root"
            />,
        ],
        [
            "ResponsiveNavigationTabs",
            <ResponsiveNavigationTabs
                key="6"
                tabs={navigationTabs}
                selectedTabId="tab-1"
                onTabSelected={() => {}}
                aria-label="Tabs"
                testId="root"
            />,
        ],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        render(element);

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });

    it("should set the Tab name on the tabs rendered by Tabs", () => {
        // Arrange
        render(
            <Tabs
                tabs={tabs}
                selectedTabId="tab-1"
                onTabSelected={() => {}}
                aria-label="Tabs"
            />,
        );

        // Act
        const tab = screen.getByRole("tab", {name: "Tab 1"});

        // Assert
        expect(tab).toHaveAttribute("data-wb-component", "Tab");
    });
});
