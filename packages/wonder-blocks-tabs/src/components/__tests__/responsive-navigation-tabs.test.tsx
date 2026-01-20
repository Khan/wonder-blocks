import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    ResponsiveNavigationTabItem,
    ResponsiveNavigationTabs,
} from "../responsive-navigation-tabs";

jest.mock("react-popper", () => ({
    ...jest.requireActual("react-popper"),
    Popper: jest.fn().mockImplementation(({children}) => {
        // Mock `isReferenceHidden` to always return false (or true for testing visibility)
        return children({
            ref: jest.fn(),
            style: {},
            placement: "bottom",
            isReferenceHidden: false, // Mocking isReferenceHidden
        });
    }),
}));

describe("ResponsiveNavigationTabs", () => {
    const tabs: ResponsiveNavigationTabItem[] = [
        {
            id: "tab-1",
            label: "Tab 1",
            href: "#tab-1",
        },
        {
            id: "tab-2",
            label: "Tab 2",
            href: "#tab-2",
        },
        {
            id: "tab-3",
            label: "Tab 3",
            href: "#tab-3",
        },
    ];

    describe("NavigationTabs layout", () => {
        it("should render the tabs in a navigation", () => {
            // Arrange
            render(
                <ResponsiveNavigationTabs
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Act
            const navigation = screen.getByRole("navigation");
            const links = within(navigation).getAllByRole("link");

            // Assert
            expect(links).toEqual([
                expect.objectContaining({textContent: "Tab 1"}),
                expect.objectContaining({textContent: "Tab 2"}),
                expect.objectContaining({textContent: "Tab 3"}),
            ]);
        });

        it("should mark the selected tab as current", () => {
            // Arrange
            render(
                <ResponsiveNavigationTabs
                    tabs={tabs}
                    selectedTabId="tab-2"
                    onTabSelected={jest.fn()}
                />,
            );

            // Act
            const currentLink = screen.getByRole("link", {current: "page"});

            // Assert
            expect(currentLink).toHaveTextContent("Tab 2");
        });

        it("should apply correct href to links", () => {
            // Arrange
            render(
                <ResponsiveNavigationTabs
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Act
            const link1 = screen.getByRole("link", {name: "Tab 1"});
            const link2 = screen.getByRole("link", {name: "Tab 2"});
            const link3 = screen.getByRole("link", {name: "Tab 3"});

            // Assert
            expect(link1).toHaveAttribute("href", "#tab-1");
            expect(link2).toHaveAttribute("href", "#tab-2");
            expect(link3).toHaveAttribute("href", "#tab-3");
        });

        describe("Events", () => {
            it("should call the onTabSelected handler with the tab id when a link is clicked", async () => {
                // Arrange
                const onTabSelected = jest.fn();
                render(
                    <ResponsiveNavigationTabs
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={onTabSelected}
                    />,
                );
                const link = screen.getByRole("link", {name: "Tab 2"});

                // Act
                await userEvent.click(link);

                // Assert
                expect(onTabSelected).toHaveBeenCalledWith("tab-2");
            });
        });
    });

    describe("NavigationTabsDropdown layout", () => {
        let clientWidthSpy: jest.SpyInstance;
        let scrollWidthSpy: jest.SpyInstance;

        beforeAll(() => {
            // Dropdown is triggered when the tabs scrollWidth > clientWidth
            clientWidthSpy = jest
                .spyOn(HTMLElement.prototype, "clientWidth", "get")
                .mockImplementation(() => 100);
            scrollWidthSpy = jest
                .spyOn(HTMLElement.prototype, "scrollWidth", "get")
                .mockImplementation(() => 200);
        });

        afterAll(() => {
            clientWidthSpy.mockRestore();
            scrollWidthSpy.mockRestore();
        });

        it("should render the tabs in a dropdown", async () => {
            // Arrange
            render(
                <ResponsiveNavigationTabs
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            const dropdownOpener = screen.getByRole("button", {name: "Tab 1"});
            await userEvent.click(dropdownOpener);

            // Act
            const menuItems = screen.getAllByRole("menuitem");

            // Assert
            expect(menuItems).toEqual([
                expect.objectContaining({textContent: "Tab 1"}),
                expect.objectContaining({textContent: "Tab 2"}),
                expect.objectContaining({textContent: "Tab 3"}),
            ]);
        });

        it("should mark the selected tab as active in dropdown", async () => {
            // Arrange
            render(
                <ResponsiveNavigationTabs
                    tabs={tabs}
                    selectedTabId="tab-2"
                    onTabSelected={jest.fn()}
                />,
            );

            const dropdownOpener = screen.getByRole("button", {name: "Tab 2"});
            await userEvent.click(dropdownOpener);

            // Act
            const activeItem = screen.getByRole("menuitem", {current: true});

            // Assert
            expect(activeItem).toHaveTextContent("Tab 2");
        });

        it("should apply correct href to menu items", async () => {
            // Arrange
            render(
                <ResponsiveNavigationTabs
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            const dropdownOpener = screen.getByRole("button", {name: "Tab 1"});
            await userEvent.click(dropdownOpener);

            // Act
            const menuItem1 = screen.getByRole("menuitem", {name: "Tab 1"});
            const menuItem2 = screen.getByRole("menuitem", {name: "Tab 2"});
            const menuItem3 = screen.getByRole("menuitem", {name: "Tab 3"});

            // Assert
            expect(menuItem1).toHaveAttribute("href", "#tab-1");
            expect(menuItem2).toHaveAttribute("href", "#tab-2");
            expect(menuItem3).toHaveAttribute("href", "#tab-3");
        });

        describe("Events", () => {
            it("should call the onTabSelected handler with the tab id when a menu item is clicked", async () => {
                // Arrange
                const onTabSelected = jest.fn();
                render(
                    <ResponsiveNavigationTabs
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={onTabSelected}
                    />,
                );
                // Open the dropdown
                const dropdownOpener = screen.getByRole("button", {
                    name: "Tab 1",
                });
                await userEvent.click(dropdownOpener);

                // Get the second tab
                const menuItem = screen.getByRole("menuitem", {name: "Tab 2"});

                // Act
                await userEvent.click(menuItem);

                // Assert
                expect(onTabSelected).toHaveBeenCalledWith("tab-2");
            });
        });
    });
});
