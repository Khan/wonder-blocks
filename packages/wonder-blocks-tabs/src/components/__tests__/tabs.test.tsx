/* eslint-disable max-lines */
import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import {TabItem, Tabs} from "../tabs";

describe("Tabs", () => {
    const tabs: TabItem[] = [
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

    const tabsAriaLabel = "Tabs Example";

    const ControlledTabs = (
        props: Omit<
            PropsFor<typeof Tabs>,
            "onTabSelected" | "aria-label" | "aria-labelledby"
        >,
    ) => {
        const [selectedTabId, setSelectedTabId] = React.useState(
            props.selectedTabId,
        );

        return (
            <Tabs
                {...props}
                aria-label={tabsAriaLabel}
                selectedTabId={selectedTabId}
                onTabSelected={setSelectedTabId}
            />
        );
    };

    it("should render the tabs in a tablist", async () => {
        // Arrange
        render(
            <Tabs
                tabs={tabs}
                selectedTabId={tabs[0].id}
                onTabSelected={jest.fn()}
                aria-label={tabsAriaLabel}
            />,
        );
        const tablist = await screen.findByRole("tablist");

        // Act
        const tabElements = await within(tablist).findAllByRole("tab");

        // Assert
        expect(tabElements).toEqual([
            expect.objectContaining({textContent: tabs[0].label}),
            expect.objectContaining({textContent: tabs[1].label}),
            expect.objectContaining({textContent: tabs[2].label}),
        ]);
    });

    it("should render the selected tab panel", () => {
        // Arrange
        const expectedSelectedTabPanelId = "expected-selected-tab-panel";
        const tabs: TabItem[] = [
            {
                id: "tab-1",
                label: "Tab 1",
                panel: (
                    <div data-testid={expectedSelectedTabPanelId}>
                        Contents of tab 1
                    </div>
                ),
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

        // Act
        render(
            <Tabs
                tabs={tabs}
                selectedTabId={tabs[0].id}
                onTabSelected={jest.fn()}
                aria-label={tabsAriaLabel}
            />,
        );

        // Act
        expect(screen.getByTestId(expectedSelectedTabPanelId)).toBeVisible();
    });

    it("should not render the tab panel if it is not selected", () => {
        // Arrange
        const panelTestId = "panelTestId";
        const tabs: TabItem[] = [
            {
                id: "tab-1",
                label: "Tab 1",
                panel: <div data-testid={panelTestId}>Contents of tab 1</div>,
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
        render(
            <Tabs
                tabs={tabs}
                selectedTabId={tabs[1].id}
                onTabSelected={jest.fn()}
                aria-label={tabsAriaLabel}
            />,
        );

        // Act
        const panel = screen.queryByTestId(panelTestId);

        // Assert
        expect(panel).not.toBeInTheDocument();
    });

    it("should forward the ref to the root element", () => {
        // Arrange
        const ref = React.createRef<HTMLDivElement>();

        // Act
        const {container} = render(
            <Tabs
                tabs={tabs}
                selectedTabId={tabs[0].id}
                onTabSelected={jest.fn()}
                ref={ref}
                aria-label={tabsAriaLabel}
            />,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access -- check ref is on root element
        expect(ref.current).toBe(container.firstChild);
    });

    describe("Event Handlers", () => {
        it("should call the onTabSelected handler with the tab id when a tab is clicked", async () => {
            // Arrange
            const onTabSelected = jest.fn();

            // Act
            render(
                <Tabs
                    tabs={tabs}
                    selectedTabId={tabs[0].id}
                    onTabSelected={onTabSelected}
                    aria-label={tabsAriaLabel}
                />,
            );

            // Act
            const tab = screen.getByRole("tab", {name: "Tab 2"});
            await userEvent.click(tab);

            // Assert
            expect(onTabSelected).toHaveBeenCalledExactlyOnceWith("tab-2");
        });
    });

    describe("Interactions", () => {
        describe("Selecting a tab", () => {
            it("should focus on the selected tab when a tab is clicked", async () => {
                // Arrange
                render(
                    <ControlledTabs tabs={tabs} selectedTabId={tabs[0].id} />,
                );

                // Act
                await userEvent.click(screen.getByRole("tab", {name: "Tab 2"}));

                // Assert
                expect(screen.getByRole("tab", {name: "Tab 2"})).toHaveFocus();
            });

            it("should select the tab when a tab is clicked", async () => {
                // Arrange
                render(
                    <ControlledTabs tabs={tabs} selectedTabId={tabs[0].id} />,
                );

                // Act
                await userEvent.click(screen.getByRole("tab", {name: "Tab 2"}));

                // Assert
                expect(
                    screen.getByRole("tab", {name: "Tab 2"}),
                ).toHaveAttribute("aria-selected", "true");
            });

            it("should change the tab panel content when a tab is clicked", async () => {
                // Arrange
                render(
                    <ControlledTabs tabs={tabs} selectedTabId={tabs[0].id} />,
                );

                // Act
                await userEvent.click(screen.getByRole("tab", {name: "Tab 2"}));

                // Assert
                expect(
                    screen.getByText("Contents of tab 2"),
                ).toBeInTheDocument();
            });
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should have no a11y violations when aria-label is provided", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });

            it("should have no a11y violations when aria-labelledby is provided", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <div>
                        <h1 id="tabs-label">Tabs Example</h1>
                        <Tabs
                            tabs={tabs}
                            selectedTabId={tabs[0].id}
                            onTabSelected={jest.fn()}
                            aria-labelledby={"tabs-label"}
                        />
                    </div>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should have aria-selected on the selected tab", () => {
                // Arrange
                render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Act
                const tab = screen.getByRole("tab", {name: "Tab 1"});

                // Assert
                expect(tab).toHaveAttribute("aria-selected", "true");
            });

            it("should have aria-selected set to false on tabs that are not selected", () => {
                // Arrange
                // Act
                render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Assert
                expect(
                    screen.getByRole("tab", {name: "Tab 2"}),
                ).toHaveAttribute("aria-selected", "false");
                expect(
                    screen.getByRole("tab", {name: "Tab 3"}),
                ).toHaveAttribute("aria-selected", "false");
            });

            it("should have aria-controls on the tab with the id of the associated tab panel", () => {
                // Arrange
                render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );
                const tabPanel = screen.getByRole("tabpanel", {name: "Tab 1"});

                // Act
                const tab = screen.getByRole("tab", {name: "Tab 1"});

                // Assert
                expect(tab).toHaveAttribute("aria-controls", tabPanel.id);
            });

            it("should have aria-labelledby on the tab panel with the id of the associated tab", () => {
                // Arrange
                render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );
                const tab = screen.getByRole("tab", {name: "Tab 1"});

                // Act
                const tabPanel = screen.getByRole("tabpanel", {name: "Tab 1"});

                // Assert
                expect(tabPanel).toHaveAttribute("aria-labelledby", tab.id);
            });

            it("should set aria-label on the tablist when provided", async () => {
                // Arrange
                const ariaLabel = "label";
                render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                        aria-label={ariaLabel}
                    />,
                );

                // Act
                const tablist = await screen.findByRole("tablist");

                // Assert
                expect(tablist).toHaveAttribute("aria-label", ariaLabel);
            });

            it("should set aria-labelledby on the tablist when provided", async () => {
                // Arrange
                const ariaLabelledby = "labelledby";
                render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                        aria-labelledby={ariaLabelledby}
                    />,
                );

                // Act
                const tablist = await screen.findByRole("tablist");

                // Assert
                expect(tablist).toHaveAttribute(
                    "aria-labelledby",
                    ariaLabelledby,
                );
            });
        });

        describe("Keyboard Navigation", () => {
            describe("Tab key", () => {
                it("should focus on the active tab when the tab key is pressed", async () => {
                    // Arrange
                    render(
                        <ControlledTabs
                            tabs={tabs}
                            selectedTabId={tabs[1].id}
                        />,
                    );
                    const tab = screen.getByRole("tab", {name: "Tab 2"});

                    // Act
                    await userEvent.keyboard("{Tab}");

                    // Assert
                    expect(tab).toHaveFocus();
                });

                it("should focus on the tabpanel if there are no focusable elements in the tabpanel", async () => {
                    // Arrange
                    render(
                        <ControlledTabs
                            tabs={tabs}
                            selectedTabId={tabs[1].id}
                        />,
                    );
                    const tabPanel = screen.getByRole("tabpanel", {
                        name: "Tab 2",
                    });
                    await userEvent.keyboard("{Tab}"); // tab to get to the active tab

                    // Act
                    await userEvent.keyboard("{Tab}"); // tab to leave the tablist

                    // Assert
                    expect(tabPanel).toHaveFocus();
                });

                it("should focus on the first focusable element in the tabpanel if there is one", async () => {
                    // Arrange
                    render(
                        <ControlledTabs
                            tabs={[
                                {
                                    id: "tab-1",
                                    label: "Tab 1",
                                    panel: (
                                        <div>
                                            With button <button>Button</button>
                                        </div>
                                    ),
                                },
                                {
                                    id: "tab-2",
                                    label: "Tab 2",
                                    panel: <div>No focusable elements</div>,
                                },
                            ]}
                            selectedTabId={tabs[0].id}
                        />,
                    );
                    const button = screen.getByRole("button", {name: "Button"});
                    await userEvent.keyboard("{Tab}"); // tab to get to the active tab

                    // Act
                    await userEvent.keyboard("{Tab}"); // tab to leave the tablist

                    // Assert
                    expect(button).toHaveFocus();
                });
            });

            describe("Activation Mode: Manual", () => {
                describe("Right arrow key", () => {
                    it("should focus on the next tab when the right arrow key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 2"}),
                        ).toHaveFocus();
                    });

                    it("should not change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 2"}),
                        ).toHaveAttribute("aria-selected", "false");
                    });

                    it("should not change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.queryByText("Contents of tab 2"),
                        ).not.toBeInTheDocument();
                    });
                });

                describe("Right arrow key when the last tab is active", () => {
                    it("should focus on the first tab when the right arrow key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[2].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveFocus();
                    });

                    it("should not change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[2].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveAttribute("aria-selected", "false");
                    });

                    it("should not change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[2].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.queryByText("Contents of tab 1"),
                        ).not.toBeInTheDocument();
                    });
                });

                describe("Left arrow key", () => {
                    it("should focus on the previous tab when the left arrow key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveFocus();
                    });

                    it("should not change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveAttribute("aria-selected", "false");
                    });

                    it("should not change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.queryByText("Contents of tab 1"),
                        ).not.toBeInTheDocument();
                    });
                });

                describe("Left arrow key when the first tab is active", () => {
                    it("should focus on the last tab when the left arrow key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 3"}),
                        ).toHaveFocus();
                    });

                    it("should not change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 3"}),
                        ).toHaveAttribute("aria-selected", "false");
                    });

                    it("should not change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.queryByText("Contents of tab 3"),
                        ).not.toBeInTheDocument();
                    });
                });

                describe("Home key", () => {
                    it("should focus on the first tab when the home key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.tab();
                        // Act
                        await userEvent.keyboard("{Home}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveFocus();
                    });

                    it("should not change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard("{Home}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveAttribute("aria-selected", "false");
                    });

                    it("should not change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard("{Home}");

                        // Assert
                        expect(
                            screen.queryByText("Contents of tab 1"),
                        ).not.toBeInTheDocument();
                    });
                });

                describe("End key", () => {
                    it("should focus on the last tab when the end key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.tab();
                        // Act
                        await userEvent.keyboard("{End}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 3"}),
                        ).toHaveFocus();
                    });

                    it("should not change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard("{End}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 3"}),
                        ).toHaveAttribute("aria-selected", "false");
                    });

                    it("should not change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard("{End}");

                        // Assert
                        expect(
                            screen.queryByText("Contents of tab 3"),
                        ).not.toBeInTheDocument();
                    });
                });

                describe.each([
                    {key: "{Enter}", label: "Enter"},
                    {key: " ", label: "Space"},
                ])("$label key to activate tab", ({key}) => {
                    it("should keep focus on the tab when it's activated", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.tab();
                        await userEvent.keyboard("{ArrowLeft}");

                        // Act
                        await userEvent.keyboard(key);

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveFocus();
                    });

                    it("should change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.tab();
                        await userEvent.keyboard("{ArrowLeft}");

                        // Act
                        await userEvent.keyboard(key);

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveAttribute("aria-selected", "true");
                    });

                    it("should change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                            />,
                        );
                        await userEvent.tab();
                        await userEvent.keyboard("{ArrowLeft}");

                        // Act
                        await userEvent.keyboard(key);

                        // Assert
                        expect(
                            screen.getByText("Contents of tab 1"),
                        ).toBeInTheDocument();
                    });
                });
            });

            describe("Activation Mode: Automatic", () => {
                describe("Right arrow key", () => {
                    it("should focus on the next tab when the right arrow key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 2"}),
                        ).toHaveFocus();
                    });

                    it("should change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 2"}),
                        ).toHaveAttribute("aria-selected", "true");
                    });

                    it("should change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByText("Contents of tab 2"),
                        ).toBeInTheDocument();
                    });
                });

                describe("Right arrow key when the last tab is active", () => {
                    it("should focus on the first tab when the right arrow key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[2].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveFocus();
                    });

                    it("should change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[2].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveAttribute("aria-selected", "true");
                    });

                    it("should change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[2].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowRight}");

                        // Assert
                        expect(
                            screen.getByText("Contents of tab 1"),
                        ).toBeInTheDocument();
                    });
                });

                describe("Left arrow key", () => {
                    it("should focus on the previous tab when the left arrow key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveFocus();
                    });

                    it("should change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveAttribute("aria-selected", "true");
                    });

                    it("should change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByText("Contents of tab 1"),
                        ).toBeInTheDocument();
                    });
                });

                describe("Left arrow key when the first tab is active", () => {
                    it("should focus on the last tab when the left arrow key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 3"}),
                        ).toHaveFocus();
                    });

                    it("should change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 3"}),
                        ).toHaveAttribute("aria-selected", "true");
                    });

                    it("should change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[0].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.keyboard("{Tab}");

                        // Act
                        await userEvent.keyboard("{ArrowLeft}");

                        // Assert
                        expect(
                            screen.getByText("Contents of tab 3"),
                        ).toBeInTheDocument();
                    });
                });

                describe("Home key", () => {
                    it("should focus on the first tab when the home key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.tab();
                        // Act
                        await userEvent.keyboard("{Home}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveFocus();
                    });

                    it("should change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard("{Home}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 1"}),
                        ).toHaveAttribute("aria-selected", "true");
                    });

                    it("should change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard("{Home}");

                        // Assert
                        expect(
                            screen.getByText("Contents of tab 1"),
                        ).toBeInTheDocument();
                    });
                });

                describe("End key", () => {
                    it("should focus on the last tab when the end key is pressed", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.tab();
                        // Act
                        await userEvent.keyboard("{End}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 3"}),
                        ).toHaveFocus();
                    });

                    it("should change the selected tab", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard("{End}");

                        // Assert
                        expect(
                            screen.getByRole("tab", {name: "Tab 3"}),
                        ).toHaveAttribute("aria-selected", "true");
                    });

                    it("should change the tab panel content", async () => {
                        // Arrange
                        render(
                            <ControlledTabs
                                tabs={tabs}
                                selectedTabId={tabs[1].id}
                                activationMode="automatic"
                            />,
                        );
                        await userEvent.tab();

                        // Act
                        await userEvent.keyboard("{End}");

                        // Assert
                        expect(
                            screen.getByText("Contents of tab 3"),
                        ).toBeInTheDocument();
                    });
                });
            });
        });
    });
});
