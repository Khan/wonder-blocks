import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ResponsiveTabItem, ResponsiveTabs} from "../responsive-tabs";
import {longTextWithNoWordBreak} from "../../../../../__docs__/components/text-for-testing";

describe("ResponsiveTabs", () => {
    const tabs: ResponsiveTabItem[] = [
        {
            id: "tab-1",
            label: "Tab 1",
            panel: <div>Contents of tab 1</div>,
        },
        {
            id: "tab-2",
            label: "Tab 2",
            panel: <div>Contents of tab 2</div>,
        },
        {
            id: "tab-3",
            label: "Tab 3",
            panel: <div>Contents of tab 3</div>,
        },
    ];

    const tabsWithLongLabels: ResponsiveTabItem[] = [
        {
            id: "tab-1",
            label: longTextWithNoWordBreak,
            panel: <div>Contents of tab 1</div>,
        },
        {
            id: "tab-2",
            label: longTextWithNoWordBreak,
            panel: <div>Contents of tab 2</div>,
        },
        {
            id: "tab-3",
            label: longTextWithNoWordBreak,
            panel: <div>Contents of tab 3</div>,
        },
    ];

    describe("Tabs layout", () => {
        it("should render the tabs in a tablist", () => {
            // Arrange
            render(
                <ResponsiveTabs
                    aria-label="Responsive Tabs"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Act
            const tablist = screen.getByRole("tablist");
            const tabElements = within(tablist).getAllByRole("tab");

            // Assert
            expect(tabElements).toEqual([
                expect.objectContaining({textContent: "Tab 1"}),
                expect.objectContaining({textContent: "Tab 2"}),
                expect.objectContaining({textContent: "Tab 3"}),
            ]);
        });

        it("should render the selected tab panel based on the selectedTabId prop", () => {
            // Arrange
            render(
                <ResponsiveTabs
                    aria-label="Responsive Tabs"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Act
            const selectedTabPanel = screen.getByText("Contents of tab 1");

            // Assert
            expect(selectedTabPanel).toBeInTheDocument();
        });

        describe("Events", () => {
            it("should call the onTabSelected handler with the tab id when a tab is clicked", async () => {
                // Arrange
                const onTabSelected = jest.fn();
                render(
                    <ResponsiveTabs
                        aria-label="Responsive Tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={onTabSelected}
                    />,
                );
                const tab = screen.getByRole("tab", {name: "Tab 2"});

                // Act
                await userEvent.click(tab);

                // Assert
                expect(onTabSelected).toHaveBeenCalledWith("tab-2");
            });
        });

        describe("Accessibility", () => {
            it("should use the aria-label prop", () => {
                // Arrange
                // Act
                render(
                    <ResponsiveTabs
                        aria-label="Responsive Tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(
                    screen.getByRole("tablist", {name: "Responsive Tabs"}),
                ).toHaveAttribute("aria-label", "Responsive Tabs");
            });

            it("should use the aria-labelledby prop", () => {
                // Arrange
                // Act
                render(
                    <div>
                        <h1 id="tabs-heading">Responsive Tabs</h1>
                        <ResponsiveTabs
                            aria-labelledby="tabs-heading"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />
                        ,
                    </div>,
                );

                // Assert
                expect(
                    screen.getByRole("tablist", {name: "Responsive Tabs"}),
                ).toHaveAttribute("aria-labelledby", "tabs-heading");
            });
        });
    });

    describe("Dropdown layout", () => {
        it("should render the tabs in a dropdown", async () => {});

        it("should render the selected tab panel based on the selectedTabId prop", () => {});

        describe("Events", () => {
            it("should call the onTabSelected handler with the tab id when a tab is clicked", () => {});
        });

        describe("Accessibility", () => {
            it("should use the aria-label prop", () => {});

            it("should use the aria-labelledby prop", () => {});
        });
    });

    describe("Layout changes", () => {
        // TODO: zoom, adding/removing tabs, etc. might be better to test in Storybook
        it("should call the onLayoutChange handler with the new layout when the layout changes", () => {});
    });
});
