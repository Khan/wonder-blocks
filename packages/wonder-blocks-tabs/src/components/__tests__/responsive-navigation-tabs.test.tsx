import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
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

    describe("Props", () => {
        it("should use nav as the default tag", () => {
            // Arrange
            // Act
            render(
                <ResponsiveNavigationTabs
                    aria-label="Responsive Navigation Tabs"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Assert
            const nav = screen.getByRole("navigation", {
                name: "Responsive Navigation Tabs",
            });
            expect(nav).toHaveProperty("tagName", "NAV");
        });

        it("should use the tag prop if provided", () => {
            // Arrange
            // Act
            render(
                <ResponsiveNavigationTabs
                    tag="div"
                    aria-label="Responsive Navigation Tabs"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Assert
            const element = screen.getByLabelText("Responsive Navigation Tabs");
            expect(element).toHaveProperty("tagName", "DIV");
        });

        it("should use the provided id on the root element", () => {
            // Arrange
            // Act
            const {container} = render(
                <ResponsiveNavigationTabs
                    id="responsive-navigation-tabs-id"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
            expect(container.firstChild).toHaveAttribute(
                "id",
                "responsive-navigation-tabs-id",
            );
        });

        it("should use the provided testId on the root element", () => {
            // Arrange
            // Act
            const {container} = render(
                <ResponsiveNavigationTabs
                    testId="responsive-navigation-tabs-test-id"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
            expect(container.firstChild).toHaveAttribute(
                "data-testid",
                "responsive-navigation-tabs-test-id",
            );
        });
    });

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

        describe("Icons", () => {
            // Note: Test for icons in the dropdown layout can be found in the
            // NavigationTabsDropdown tests.
            it("should render the icon for tab links", () => {
                // Arrange
                render(
                    <ResponsiveNavigationTabs
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                href: "#tab-1",
                                icon: (
                                    <Icon>
                                        <img src="icon.svg" alt="tab 1 icon" />
                                    </Icon>
                                ),
                            },
                            {
                                id: "tab-2",
                                label: "Tab 2",
                                href: "#tab-2",
                                icon: (
                                    <PhosphorIcon
                                        icon="icon.svg"
                                        aria-label="tab 2 icon"
                                    />
                                ),
                            },
                        ]}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Act
                const images = screen.getAllByRole("img");

                // Assert
                expect(images).toHaveLength(2);
            });

            it("should include the accessible name of the icons in the accessible name of the tab links", async () => {
                // Arrange
                // Act
                render(
                    <ResponsiveNavigationTabs
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                href: "#tab-1",
                                icon: (
                                    <Icon>
                                        <img src="icon.svg" alt="tab 1 icon" />
                                    </Icon>
                                ),
                            },
                            {
                                id: "tab-2",
                                label: "Tab 2",
                                href: "#tab-2",
                                icon: (
                                    <PhosphorIcon
                                        icon="icon.svg"
                                        aria-label="tab 2 icon"
                                    />
                                ),
                            },
                        ]}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                await screen.findByRole("link", {
                    name: "tab 1 icon Tab 1",
                });
                await screen.findByRole("link", {
                    name: "tab 2 icon Tab 2",
                });
            });

            it("should not include image roles in the tab links if the icons are marked as decorative only", () => {
                // Arrange
                render(
                    <ResponsiveNavigationTabs
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                href: "#tab-1",
                                icon: (
                                    <Icon>
                                        <img src="icon.svg" alt="" />
                                    </Icon>
                                ),
                            },
                            {
                                id: "tab-2",
                                label: "Tab 2",
                                href: "#tab-2",
                                icon: <PhosphorIcon icon="icon.svg" />,
                            },
                        ]}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.queryByRole("img")).not.toBeInTheDocument();
            });
        });

        describe("Accessibility", () => {
            it("should use the aria-label prop", () => {
                // Arrange
                // Act
                render(
                    <ResponsiveNavigationTabs
                        aria-label="Main navigation"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(
                    screen.getByRole("navigation", {name: "Main navigation"}),
                ).toHaveAttribute("aria-label", "Main navigation");
            });

            it("should use the aria-labelledby prop", () => {
                // Arrange
                // Act
                render(
                    <div>
                        <h1 id="nav-heading">Site Navigation</h1>
                        <ResponsiveNavigationTabs
                            aria-labelledby="nav-heading"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />
                    </div>,
                );

                // Assert
                expect(
                    screen.getByRole("navigation", {name: "Site Navigation"}),
                ).toHaveAttribute("aria-labelledby", "nav-heading");
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

        describe("Props", () => {
            it("should use nav as the default tag in dropdown layout", async () => {
                // Arrange
                // Act
                render(
                    <ResponsiveNavigationTabs
                        aria-label="Responsive Navigation Tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                const nav = screen.getByRole("navigation", {
                    name: "Responsive Navigation Tabs",
                });
                expect(nav).toHaveProperty("tagName", "NAV");
            });

            it("should use the tag prop if provided in dropdown layout", async () => {
                // Arrange
                // Act
                render(
                    <ResponsiveNavigationTabs
                        tag="div"
                        aria-label="Responsive Tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                const element = screen.getByLabelText("Responsive Tabs");
                expect(element).toHaveProperty("tagName", "DIV");
            });
        });

        describe("Accessibility", () => {
            it("should use the aria-label prop", async () => {
                // Arrange
                // Act
                render(
                    <ResponsiveNavigationTabs
                        aria-label="Main navigation"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(
                    screen.getByRole("navigation", {name: "Main navigation"}),
                ).toHaveAttribute("aria-label", "Main navigation");
            });

            it("should use the aria-labelledby prop", async () => {
                // Arrange
                // Act
                render(
                    <div>
                        <h1 id="nav-heading">Site Navigation</h1>
                        <ResponsiveNavigationTabs
                            aria-labelledby="nav-heading"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />
                    </div>,
                );

                // Assert
                expect(
                    screen.getByRole("navigation", {name: "Site Navigation"}),
                ).toHaveAttribute("aria-labelledby", "nav-heading");
            });
        });
    });
});
