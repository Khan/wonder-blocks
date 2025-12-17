import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ResponsiveTabItem, ResponsiveTabs} from "../responsive-tabs";

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

    describe("Props", () => {
        it("should use the provided id on the root element", () => {
            // Arrange
            // Act
            const {container} = render(
                <ResponsiveTabs
                    id="responsive-tabs-id"
                    aria-label="Responsive Tabs"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
            expect(container.firstChild).toHaveAttribute(
                "id",
                "responsive-tabs-id",
            );
        });

        it("should use the provided testId on the root element", () => {
            // Arrange
            // Act
            const {container} = render(
                <ResponsiveTabs
                    testId="responsive-tabs-test-id"
                    aria-label="Responsive Tabs"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
            expect(container.firstChild).toHaveAttribute(
                "data-testid",
                "responsive-tabs-test-id",
            );
        });
    });

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

        describe("Props", () => {
            it("should use the provided id as a base for the ids of the elements within the tabs component", () => {
                // Arrange
                // Act
                render(
                    <ResponsiveTabs
                        id="responsive-tabs-id"
                        aria-label="Responsive Tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("tablist")).toHaveAttribute(
                    "id",
                    "responsive-tabs-id-tabs-tablist",
                );
            });

            it("should use the provided testId as a base for the testIds of the elements within the tabs component", () => {
                // Arrange
                // Act
                render(
                    <ResponsiveTabs
                        testId="responsive-tabs-test-id"
                        aria-label="Responsive Tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(
                    screen.getByTestId("responsive-tabs-test-id-tabs"),
                ).toHaveAttribute(
                    "data-testid",
                    "responsive-tabs-test-id-tabs",
                );
            });

            it("should use the testId prop on tab items for the tabs", () => {
                // Arrange
                // Act
                render(
                    <ResponsiveTabs
                        aria-label="Responsive Tabs"
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                panel: <div>Tab contents 1</div>,
                                testId: "tab-1-test-id",
                            },
                        ]}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByTestId("tab-1-test-id-tab")).toHaveAttribute(
                    "data-testid",
                    "tab-1-test-id-tab",
                );
            });
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
        let clientWidthSpy: jest.SpyInstance;
        let scrollWidthSpy: jest.SpyInstance;

        beforeAll(() => {
            // Dropdown is triggered when the tabs scrollWidth > clientWidth
            clientWidthSpy = jest
                .spyOn(HTMLElement.prototype, "clientWidth", "get")
                .mockImplementation(() => 10);
            scrollWidthSpy = jest
                .spyOn(HTMLElement.prototype, "scrollWidth", "get")
                .mockImplementation(() => 20);
        });

        afterAll(() => {
            clientWidthSpy.mockRestore();
            scrollWidthSpy.mockRestore();
        });

        it("should render the tabs in a dropdown", async () => {
            // Arrange
            render(
                <ResponsiveTabs
                    aria-label="Responsive Tabs"
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

        it("should render the selected tab panel based on the selectedTabId prop", () => {
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

            const selectedTabPanel = screen.getByText("Contents of tab 1");

            // Assert
            expect(selectedTabPanel).toBeInTheDocument();
        });

        describe("Props", () => {
            it("should use the provided id as a base for the ids of the elements within the dropdown component", () => {
                // Arrange
                // Act
                render(
                    <ResponsiveTabs
                        id="responsive-tabs-id"
                        aria-label="Responsive Tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );
                // Assert
                expect(screen.getByRole("region")).toHaveAttribute(
                    "id",
                    "responsive-tabs-id-dropdown",
                );
            });

            it("should use the provided testId as a base for the testIds of the elements within the dropdown component", () => {
                // Arrange
                // Act
                render(
                    <ResponsiveTabs
                        testId="responsive-tabs-test-id"
                        aria-label="Responsive Tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );
                // Assert
                expect(
                    screen.getByTestId("responsive-tabs-test-id-dropdown"),
                ).toHaveAttribute(
                    "data-testid",
                    "responsive-tabs-test-id-dropdown",
                );
            });

            it("should use the testId prop on tab items for the menu items", async () => {
                // Arrange
                render(
                    <ResponsiveTabs
                        aria-label="Responsive Tabs"
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                panel: <div>Tab contents 1</div>,
                                testId: "tab-1-test-id",
                            },
                        ]}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Open the dropdown
                const dropdownOpener = screen.getByRole("button", {
                    name: "Tab 1",
                });
                // Act
                await userEvent.click(dropdownOpener);
                // Assert
                expect(screen.getByTestId("tab-1-test-id")).toHaveAttribute(
                    "data-testid",
                    "tab-1-test-id",
                );
            });
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
                // Open the dropdown
                const dropdownOpener = screen.getByRole("button", {
                    name: "Tab 1",
                });
                await userEvent.click(dropdownOpener);

                // Get the second tab
                const tab = screen.getByRole("menuitem", {name: "Tab 2"});

                // Act
                await userEvent.click(tab);

                // Assert
                expect(onTabSelected).toHaveBeenCalledWith("tab-2");
            });

            it("should call the onLayoutChange handler with the new dropdown layout when the layout changes", async () => {
                // Arrange
                const onLayoutChange = jest.fn();
                // Act
                render(
                    <ResponsiveTabs
                        aria-label="Responsive Tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                        onLayoutChange={onLayoutChange}
                    />,
                );

                // Assert
                expect(onLayoutChange.mock.calls).toStrictEqual([
                    ["tabs"], // Initially render as tabs
                    ["dropdown"], // Update to dropdown layout after measuring
                ]);
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
                    screen.getByRole("region", {name: "Responsive Tabs"}),
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
                    </div>,
                );

                // Assert
                expect(
                    screen.getByRole("region", {name: "Responsive Tabs"}),
                ).toHaveAttribute("aria-labelledby", "tabs-heading");
            });
        });
    });
});
