import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {NavigationTabsDropdown} from "../navigation-tabs-dropdown";

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

const tabs = [
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

describe("NavigationTabsDropdown", () => {
    it("should set the ref", () => {
        // Arrange
        // Act
        const ref = React.createRef<HTMLDivElement>();
        const {container} = render(
            <NavigationTabsDropdown
                tabs={tabs}
                selectedTabId="tab-1"
                onTabSelected={jest.fn()}
                ref={ref}
            />,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access -- check ref is on root element
        expect(ref.current).toBe(container.firstChild);
    });

    describe("Props", () => {
        describe("tabs prop", () => {
            it("should render the tabs when the dropdown is opened", async () => {
                // Arrange
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Act
                await userEvent.click(screen.getByRole("button"));

                // Assert
                expect(
                    screen.getByRole("menuitem", {name: "Tab 1"}),
                ).toBeInTheDocument();
                expect(
                    screen.getByRole("menuitem", {name: "Tab 2"}),
                ).toBeInTheDocument();
                expect(
                    screen.getByRole("menuitem", {name: "Tab 3"}),
                ).toBeInTheDocument();
            });

            it("should render nothing when there are no tabs", () => {
                // Arrange
                // Act
                const {container} = render(
                    <NavigationTabsDropdown
                        tabs={[]}
                        selectedTabId=""
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(container).toBeEmptyDOMElement();
            });

            it("should render tabs with correct href attributes", async () => {
                // Arrange
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Act
                await userEvent.click(screen.getByRole("button"));

                // Assert
                expect(
                    screen.getByRole("menuitem", {name: "Tab 1"}),
                ).toHaveAttribute("href", "#tab-1");
                expect(
                    screen.getByRole("menuitem", {name: "Tab 2"}),
                ).toHaveAttribute("href", "#tab-2");
                expect(
                    screen.getByRole("menuitem", {name: "Tab 3"}),
                ).toHaveAttribute("href", "#tab-3");
            });
        });

        describe("selectedTabId prop", () => {
            it("should display selected tab label in opener", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-2"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent("Tab 2");
            });

            it("should mark selected tab as active in menu", async () => {
                // Arrange
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-2"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Act
                await userEvent.click(screen.getByRole("button"));

                // Assert
                expect(
                    screen.getByRole("menuitem", {current: true}),
                ).toHaveTextContent("Tab 2");
            });

            it("should use default label when selectedTabId is invalid", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="invalid-id"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent("Tabs");
            });
        });

        describe("id", () => {
            describe("when id is provided", () => {
                it("should use the provided id on the root element", () => {
                    // Arrange
                    // Act
                    const {container} = render(
                        <NavigationTabsDropdown
                            id="navigation-tabs-dropdown-id"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
                    expect(container.firstChild).toHaveAttribute(
                        "id",
                        "navigation-tabs-dropdown-id",
                    );
                });

                it("should use the provided id on the opener element with '-opener' suffix", () => {
                    // Arrange
                    // Act
                    render(
                        <NavigationTabsDropdown
                            id="navigation-tabs-dropdown-id"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    expect(screen.getByRole("button")).toHaveAttribute(
                        "id",
                        "navigation-tabs-dropdown-id-opener",
                    );
                });
            });

            describe("when id is not provided", () => {
                it("should auto-generate an id on the root element", () => {
                    // Arrange
                    // Act
                    const {container} = render(
                        <NavigationTabsDropdown
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
                    expect(container.firstChild).toHaveAttribute("id");
                });

                it("should auto-generate an id on the opener element with '-opener' suffix", () => {
                    // Arrange
                    render(
                        <NavigationTabsDropdown
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );
                    // Act
                    const opener = screen.getByRole("button");

                    // Assert
                    expect(opener.id.endsWith("-opener")).toBe(true);
                });
            });
        });
    });

    describe("Events", () => {
        describe("onTabSelected", () => {
            it("should call the onTabSelected handler with the tab id when a tab is clicked", async () => {
                // Arrange
                const onTabSelected = jest.fn();
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={onTabSelected}
                    />,
                );
                await userEvent.click(screen.getByRole("button"));

                // Act
                await userEvent.click(
                    screen.getByRole("menuitem", {name: "Tab 2"}),
                );

                // Assert
                expect(onTabSelected).toHaveBeenCalledWith("tab-2");
            });
        });
    });
});
