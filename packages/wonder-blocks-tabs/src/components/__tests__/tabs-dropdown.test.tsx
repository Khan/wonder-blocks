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
        describe("id", () => {
            describe("when id is provided", () => {
                it("should use the provided id on the root element", () => {
                    // Arrange
                    // Act
                    const {container} = render(
                        <TabsDropdown
                            id="tabs-dropdown-id"
                            aria-label="Test tabs"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
                    expect(container.firstChild).toHaveAttribute(
                        "id",
                        "tabs-dropdown-id",
                    );
                });

                it("should use the provided id on the opener element with '-opener' suffix", () => {
                    // Arrange
                    // Act
                    render(
                        <TabsDropdown
                            id="tabs-dropdown-id"
                            aria-label="Test tabs"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    expect(screen.getByRole("button")).toHaveAttribute(
                        "id",
                        "tabs-dropdown-id-opener",
                    );
                });

                it("should use the provided id on the panel element with '-panel' suffix", () => {
                    // Arrange
                    // Act
                    render(
                        <TabsDropdown
                            id="tabs-dropdown-id"
                            aria-label="Test tabs"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    expect(
                        screen.getByRole("group", {name: "Tab 1"}),
                    ).toHaveAttribute("id", "tabs-dropdown-id-panel");
                });
            });

            describe("when id is not provided", () => {
                it("should auto-generate an id on the root element", () => {
                    // Arrange
                    // Act
                    const {container} = render(
                        <TabsDropdown
                            aria-label="Test tabs"
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
                        <TabsDropdown
                            aria-label="Test tabs"
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

                it("should auto-generate an id on the panel element with '-panel' suffix", () => {
                    // Arrange
                    render(
                        <TabsDropdown
                            aria-label="Test tabs"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Act
                    const panel = screen.getByRole("group", {name: "Tab 1"});

                    // Assert
                    expect(panel.id.endsWith("-panel")).toBe(true);
                });
            });
        });

        describe("testId", () => {
            it("should use the testId prop for the root element", () => {
                // Arrange
                // Act
                const {container} = render(
                    <TabsDropdown
                        testId="tabs-dropdown-test-id"
                        aria-label="Test tabs"
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

            it("should use the testId prop for the opener element with '-opener' suffix", () => {
                // Arrange
                // Act
                render(
                    <TabsDropdown
                        testId="tabs-dropdown-test-id"
                        aria-label="Test tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveAttribute(
                    "data-testid",
                    "tabs-dropdown-test-id-opener",
                );
            });

            it("should use the testId prop for the panel element with '-panel' suffix", () => {
                // Arrange
                // Act
                render(
                    <TabsDropdown
                        testId="tabs-dropdown-test-id"
                        aria-label="Test tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(
                    screen.getByRole("group", {name: "Tab 1"}),
                ).toHaveAttribute("data-testid", "tabs-dropdown-test-id-panel");
            });
        });

        it("should set the ref", () => {
            // Arrange
            // Act
            const ref = React.createRef<HTMLDivElement>();
            const {container} = render(
                <TabsDropdown
                    aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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
                        aria-label="Test tabs"
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

    describe("Accessibility", () => {
        describe("Semantics", () => {
            it("should have role='region' on the root element", () => {
                // Arrange
                // Act
                const {container} = render(
                    <TabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                        aria-label="Tabs for testing"
                    />,
                );

                // Assert
                // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
                expect(container.firstChild).toHaveAttribute("role", "region");
            });
        });

        describe("ARIA", () => {
            it("should set aria-labelledby on the panel to the opener's id", () => {
                // Arrange
                render(
                    <TabsDropdown
                        aria-label="Test tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );
                const opener = screen.getByRole("button");

                // Act
                const panel = screen.getByRole("group", {name: "Tab 1"});

                // Assert
                expect(panel).toHaveAttribute("aria-labelledby", opener.id);
            });

            it("should set aria-label on the region", () => {
                // Arrange
                // Act
                render(
                    <TabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                        aria-label="Tabs for testing"
                    />,
                );

                // Assert
                expect(
                    screen.getByRole("region", {name: "Tabs for testing"}),
                ).toHaveAttribute("aria-label", "Tabs for testing");
            });

            it("should set aria-labelledby on the region when provided", () => {
                // Arrange
                // Act
                render(
                    <>
                        <h1 id="tabs-heading">Tabs for testing</h1>
                        <TabsDropdown
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                            aria-labelledby="tabs-heading"
                        />
                    </>,
                );

                // Assert
                expect(
                    screen.getByRole("region", {name: "Tabs for testing"}),
                ).toHaveAttribute("aria-labelledby", "tabs-heading");
            });
        });

        describe("Keyboard Navigation", () => {
            it("should call onTabSelected when pressing Enter on a menu item", async () => {
                // Arrange
                const onTabSelected = jest.fn();
                render(
                    <TabsDropdown
                        aria-label="Test tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={onTabSelected}
                    />,
                );
                // Open the dropdown and pick the second tab
                await userEvent.tab();
                await userEvent.keyboard("{ArrowDown}");
                await userEvent.keyboard("{ArrowDown}");

                // Act
                await userEvent.keyboard("{Enter}");

                // Assert
                expect(onTabSelected).toHaveBeenCalledWith("tab-2");
            });

            it("should call onTabSelected when pressing Space on a menu item", async () => {
                // Arrange
                const onTabSelected = jest.fn();
                render(
                    <TabsDropdown
                        aria-label="Test tabs"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={onTabSelected}
                    />,
                );
                // Open the dropdown and pick the second tab
                await userEvent.tab();
                await userEvent.keyboard("{ArrowDown}");
                await userEvent.keyboard("{ArrowDown}");

                // Act
                await userEvent.keyboard(" ");

                // Assert
                expect(onTabSelected).toHaveBeenCalledWith("tab-2");
            });
        });
    });
});
