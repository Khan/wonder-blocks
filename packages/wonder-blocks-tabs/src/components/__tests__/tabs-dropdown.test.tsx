import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {TabsDropdown} from "../tabs-dropdown";

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
        panel: <div>Tab contents 1</div>,
    },
    {
        id: "tab-2",
        label: "Tab 2",
        panel: <div>Tab contents 2</div>,
    },
    {
        id: "tab-3",
        label: "Tab 3",
        panel: <div>Tab contents 3</div>,
    },
];

describe("TabsDropdown", () => {
    describe("Props", () => {
        it("should use the id prop for the root element", () => {
            // Arrange
            // Act
            const {container} = render(
                <TabsDropdown
                    id="tabs-dropdown-id"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitlychecking the root element
            expect(container.firstChild).toHaveAttribute(
                "id",
                "tabs-dropdown-id",
            );
        });

        it("should use the testId prop for the root element", () => {
            // Arrange
            // Act
            const {container} = render(
                <TabsDropdown
                    testId="tabs-dropdown-test-id"
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
            expect(container.firstChild).toHaveAttribute(
                "data-testid",
                "tabs-dropdown-test-id",
            );
        });

        it("should set the ref", () => {
            // Arrange
            // Act
            const ref = React.createRef<HTMLDivElement>();
            const {container} = render(
                <TabsDropdown
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

        describe("tabs prop", () => {
            it("should render the tabs when the dropdown is opened", async () => {
                // Arrange
                render(
                    <TabsDropdown
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
                    <TabsDropdown
                        tabs={[]}
                        selectedTabId=""
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(container).toBeEmptyDOMElement();
            });
        });

        describe("selectedTabId prop", () => {
            it("should render the selected tab panel", () => {
                // Arrange
                // Act
                render(
                    <TabsDropdown
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                panel: <div>Tab contents 1</div>,
                            },
                            {
                                id: "tab-2",
                                label: "Tab 2",
                                panel: <div>Tab contents 2</div>,
                            },
                            {
                                id: "tab-3",
                                label: "Tab 3",
                                panel: <div>Tab contents 3</div>,
                            },
                        ]}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );
                // Assert
                expect(screen.getByText("Tab contents 1")).toBeInTheDocument();
            });

            it("should not render inactive tab panels", async () => {
                // Arrange
                render(
                    <TabsDropdown
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                panel: <div>Tab contents 1</div>,
                            },
                            {
                                id: "tab-2",
                                label: "Tab 2",
                                panel: <div>Tab contents 2</div>,
                            },
                        ]}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );
                // Act
                await userEvent.click(screen.getByRole("button"));

                // Assert
                expect(
                    screen.queryByText("Tab contents 2"),
                ).not.toBeInTheDocument();
            });

            it("should use the selected tab label for the opener", () => {
                // Arrange
                // Act
                render(
                    <TabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent("Tab 1");
            });

            it("should mark the selected tab as current", async () => {
                // Arrange
                render(
                    <TabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );
                // Act
                await userEvent.click(screen.getByRole("button"));

                // Assert
                expect(
                    screen.getByRole("menuitem", {current: true}),
                ).toHaveTextContent("Tab 1");
            });
        });

        describe("opener", () => {
            it("should not be opened by default", () => {
                // Arrange
                // Act
                render(
                    <TabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.queryByRole("menu")).not.toBeInTheDocument();
            });

            it("should use the opened prop to control the open state", () => {
                // Arrange
                // Act
                render(
                    <TabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                        opened={true}
                    />,
                );

                // Assert
                expect(screen.getByRole("menu")).toBeInTheDocument();
            });
        });
        describe("labels prop", () => {
            it("should have a default label for the opener when there is an invalid selected tab id and labels.defaultOpenerLabel isn't set", () => {
                // Arrange
                // Act
                render(
                    <TabsDropdown
                        tabs={tabs}
                        selectedTabId=""
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent("Tabs");
            });

            it("should use the labels.defaultOpenerLabel prop for the opener when there is an invalidselected tab id", () => {
                // Arrange
                // Act
                render(
                    <TabsDropdown
                        tabs={tabs}
                        selectedTabId=""
                        onTabSelected={jest.fn()}
                        labels={{defaultOpenerLabel: "Custom Tabs Label"}}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent(
                    "Custom Tabs Label",
                );
            });
        });
    });

    describe("Events", () => {
        describe("onTabSelected", () => {
            it("should call the onTabSelected handler with the tab id when a tab is clicked", async () => {
                // Arrange
                const onTabSelected = jest.fn();
                render(
                    <TabsDropdown
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
