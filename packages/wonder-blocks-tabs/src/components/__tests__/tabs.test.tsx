/* eslint-disable max-lines */
import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import {TabItem, Tabs} from "../tabs";
import {Tab} from "../tab";

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

    it("should set scrollableElementRef on an element with overflow-x: auto", () => {
        // Arrange
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Tabs
                scrollableElementRef={ref}
                tabs={tabs}
                selectedTabId={tabs[0].id}
                onTabSelected={jest.fn()}
                aria-label={tabsAriaLabel}
            />,
        );

        // Assert
        expect(ref.current).toHaveStyle("overflow-x: auto");
    });

    describe("Props", () => {
        describe("id", () => {
            it("should use the provided id for the root element", async () => {
                // Arrange
                const id = "id";

                // Act
                const {container} = render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        id={id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Assert
                // eslint-disable-next-line testing-library/no-node-access -- checking the root element
                expect(container.firstChild).toHaveAttribute("id", id);
            });

            it("should use the provided id for the tablist element", async () => {
                // Arrange
                const id = "id";
                render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        id={id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Act
                const tablist = await screen.findByRole("tablist");

                // Assert
                expect(tablist).toHaveAttribute("id", `${id}-tablist`);
            });

            it("should autogenerate an id for the root element if no id is provided", async () => {
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
                // eslint-disable-next-line testing-library/no-node-access -- checking the root element
                expect(container.firstChild).toHaveAttribute("id");
            });

            it("should autogenerate an id for the tablist element if no id is provided", async () => {
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
                const tablist = await screen.findByRole("tablist");

                // Assert
                expect(tablist.id).toEndWith("-tablist");
            });
        });

        describe("testId", () => {
            it("should set the testId for the root element", async () => {
                // Arrange
                const testId = "test-id";
                // Act
                const {container} = render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        testId={testId}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Assert
                // eslint-disable-next-line testing-library/no-node-access -- checking the root element
                expect(container.firstChild).toHaveAttribute(
                    "data-testid",
                    testId,
                );
            });

            it("should set the testId for the tablist element", async () => {
                // Arrange
                const testId = "test-id";
                render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        testId={testId}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Act
                const tablist = await screen.findByRole("tablist");

                // Assert
                expect(tablist).toHaveAttribute(
                    "data-testid",
                    `${testId}-tablist`,
                );
            });

            it("should not set the testId for the root element if no testId is provided", () => {
                // Arrange
                const {container} = render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Assert
                // eslint-disable-next-line testing-library/no-node-access -- checking the root element
                expect(container.firstChild).not.toHaveAttribute("data-testid");
            });

            it("should not set the testId for the tablist element if no testId is provided", () => {
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
                const tablist = screen.getByRole("tablist");

                // Assert
                expect(tablist).not.toHaveAttribute("data-testid");
            });
        });

        describe("tab item ids", () => {
            it("should use the tab item id for the tab element", () => {
                // Arrange
                const id = "tab-id";
                render(
                    <Tabs
                        tabs={[{id, label: "Label", panel: "Panel"}]}
                        selectedTabId={id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Act
                const tab = screen.getByRole("tab", {name: "Label"});

                // Assert
                expect(tab).toHaveAttribute("id", `${id}-tab`);
            });

            it("should use the tab item id for the tab panel element", () => {
                // Arrange
                const id = "tab-id";
                render(
                    <Tabs
                        tabs={[{id, label: "Label", panel: "Panel"}]}
                        selectedTabId={id}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Act
                const tabPanel = screen.getByRole("tabpanel", {name: "Label"});

                // Assert
                expect(tabPanel).toHaveAttribute("id", `${id}-panel`);
            });
        });

        describe("tab item test ids", () => {
            it("should set the testId for the tab element", () => {
                // Arrange
                const testId = "test-id";
                render(
                    <Tabs
                        tabs={[
                            {
                                id: "tab-id",
                                label: "Label",
                                panel: "Panel",
                                testId,
                            },
                        ]}
                        selectedTabId={"tab-id"}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Act
                const tab = screen.getByRole("tab", {name: "Label"});

                // Assert
                expect(tab).toHaveAttribute("data-testid", `${testId}-tab`);
            });

            it("should set the testId for the tab panel element", () => {
                // Arrange
                const testId = "test-id";
                render(
                    <Tabs
                        tabs={[
                            {
                                id: "tab-id",
                                label: "Label",
                                panel: "Panel",
                                testId,
                            },
                        ]}
                        selectedTabId={"tab-id"}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Act
                const tabPanel = screen.getByRole("tabpanel", {name: "Label"});

                // Assert
                expect(tabPanel).toHaveAttribute(
                    "data-testid",
                    `${testId}-panel`,
                );
            });

            it("should not set the testId for the tab element if no testId is provided", () => {
                // Arrange
                render(
                    <Tabs
                        tabs={[{id: "tab-id", label: "Label", panel: "Panel"}]}
                        selectedTabId={"tab-id"}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Act
                const tab = screen.getByRole("tab", {name: "Label"});

                // Assert
                expect(tab).not.toHaveAttribute("data-testid");
            });

            it("should not set the testId for the tab panel element if no testId is provided", () => {
                // Arrange
                render(
                    <Tabs
                        tabs={[{id: "tab-id", label: "Label", panel: "Panel"}]}
                        selectedTabId={"tab-id"}
                        onTabSelected={jest.fn()}
                        aria-label={tabsAriaLabel}
                    />,
                );

                // Act
                const tabPanel = screen.getByRole("tabpanel", {name: "Label"});

                // Assert
                expect(tabPanel).not.toHaveAttribute("data-testid");
            });
        });

        describe("tabs", () => {
            describe("label prop render function", () => {
                it("should render the tab label using the render function", () => {
                    // Arrange
                    render(
                        <Tabs
                            aria-label={tabsAriaLabel}
                            tabs={[
                                {
                                    id: "tab-1",
                                    label: (tabProps) => (
                                        <div
                                            key={tabProps.id}
                                            data-testid="tab-wrapper"
                                        >
                                            <Tab {...tabProps}>Label</Tab>
                                        </div>
                                    ),
                                    panel: "Panel",
                                },
                            ]}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Act
                    const tabWrapper = screen.getByTestId("tab-wrapper");

                    // Assert
                    expect(tabWrapper).toBeInTheDocument();
                });

                it("should pass the tab props to the render function", () => {
                    // Arrange
                    const labelRenderFn = jest.fn();

                    // Act
                    render(
                        <Tabs
                            aria-label={tabsAriaLabel}
                            tabs={[
                                {
                                    id: "tab-1",
                                    label: labelRenderFn,
                                    panel: "Panel",
                                    "aria-label": "Tab 1 Aria Label",
                                    testId: "tab-1-test-id",
                                    icon: <img src="icon.svg" alt="icon" />,
                                },
                            ]}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    expect(labelRenderFn).toHaveBeenCalledExactlyOnceWith({
                        id: "tab-1-tab",
                        testId: "tab-1-test-id-tab",
                        key: "tab-1",
                        selected: true,
                        "aria-controls": "tab-1-panel",
                        "aria-label": "Tab 1 Aria Label",
                        icon: <img src="icon.svg" alt="icon" />,
                        onClick: expect.any(Function),
                        onKeyDown: expect.any(Function),
                        ref: expect.any(Function),
                    });
                });
            });
        });
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

            it("should use aria attributes from the tab items", async () => {
                // Arrange
                const ariaLabel = "Specific aria label";
                render(
                    <Tabs
                        tabs={[
                            {
                                label: "Tab 1",
                                id: "tab-1",
                                "aria-label": ariaLabel,
                                panel: "Content",
                            },
                        ]}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                        aria-label="Tabs Example"
                    />,
                );

                // Act
                const tab = await screen.findByRole("tab", {name: ariaLabel});

                // Assert
                expect(tab).toHaveAttribute("aria-label", ariaLabel);
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
                    await userEvent.tab();

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
                    await userEvent.tab(); // tab to get to the active tab

                    // Act
                    await userEvent.tab(); // tab to leave the tablist

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
                    await userEvent.tab(); // tab to get to the active tab

                    // Act
                    await userEvent.tab(); // tab to leave the tablist

                    // Assert
                    expect(button).toHaveFocus();
                });

                it("should focus on the selected tab when focus is back to the tablist after changing the focused tab without selecting it", async () => {
                    // Arrange
                    render(
                        <ControlledTabs
                            tabs={tabs}
                            selectedTabId={tabs[0].id}
                        />,
                    );
                    await userEvent.tab(); // focus on the active tab
                    await userEvent.keyboard("{ArrowRight}"); // move focus to the next tab without selecting it
                    await userEvent.tab(); // move focus out of the tablist

                    // Act
                    await userEvent.keyboard("{Shift>}{Tab}"); // move focus back to the tablist

                    // Assert
                    // Selected tab should be focused
                    expect(
                        screen.getByRole("tab", {name: "Tab 1"}),
                    ).toHaveFocus();
                });

                it("should continue to focus on the correct tab when focus is moved from the tablist without selecting a tab", async () => {
                    // Arrange
                    render(
                        <ControlledTabs
                            tabs={tabs}
                            selectedTabId={tabs[0].id}
                        />,
                    );
                    await userEvent.tab(); // focus on the active tab
                    await userEvent.keyboard("{ArrowRight}"); // move focus to the next tab without selecting it
                    await userEvent.tab(); // move focus out of the tablist
                    await userEvent.keyboard("{Shift>}{Tab}"); // move focus back to the tablist

                    // Act
                    await userEvent.keyboard("{ArrowRight}"); // move focus to the next tab

                    // Assert
                    // Next tab should be focused
                    expect(
                        screen.getByRole("tab", {name: "Tab 2"}),
                    ).toHaveFocus();
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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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
                        await userEvent.tab();

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

            describe("Multiple Tabs instances", () => {
                it("should only focus on tabs within the same instance when an arrow key is pressed", async () => {
                    // Arrange
                    render(
                        <div>
                            <ControlledTabs
                                // First set of tabs are post fixed with "a" and
                                // will have the same ids as the second set of tabs
                                tabs={[
                                    {
                                        label: "Tab 1a",
                                        id: "tab-1",
                                        panel: "Panel 1a",
                                    },
                                    {
                                        label: "Tab 2a",
                                        id: "tab-2",
                                        panel: "Panel 2a",
                                    },
                                ]}
                                selectedTabId={"tab-1"}
                            />
                            <ControlledTabs
                                // Second set of tabs are post fixed with "b" and
                                // will have the same ids as the first set of tabs
                                tabs={[
                                    {
                                        label: "Tab 1b",
                                        id: "tab-1",
                                        panel: "Panel 1b",
                                    },
                                    {
                                        label: "Tab 2b",
                                        id: "tab-2",
                                        panel: "Panel 2b",
                                    },
                                ]}
                                selectedTabId={"tab-1"}
                            />
                        </div>,
                    );
                    const tab1b = screen.getByRole("tab", {name: "Tab 1b"});
                    const tab2b = screen.getByRole("tab", {name: "Tab 2b"});
                    tab1b.focus(); // Focus on the second set of tabs

                    // Act
                    await userEvent.keyboard("{ArrowRight}");

                    // Assert
                    expect(tab2b).toHaveFocus();
                });
            });

            describe("RTL", () => {
                it("should focus on the previous tab when the right arrow key is pressed and it is in RTL mode", async () => {
                    // Arrange
                    render(
                        <div dir="rtl">
                            <ControlledTabs
                                tabs={[
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
                                ]}
                                selectedTabId={"tab-2"}
                            />
                        </div>,
                    );
                    await userEvent.tab();

                    // Act
                    await userEvent.keyboard("{ArrowRight}");

                    // Assert
                    expect(
                        screen.getByRole("tab", {name: "Tab 1"}),
                    ).toHaveFocus();
                });

                it("should focus on the next tab when the left arrow key is pressed and it is in RTL mode", async () => {
                    // Arrange
                    render(
                        <div dir="rtl">
                            <ControlledTabs
                                tabs={[
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
                                ]}
                                selectedTabId={"tab-2"}
                            />
                        </div>,
                    );
                    await userEvent.tab();

                    // Act
                    await userEvent.keyboard("{ArrowLeft}");

                    // Assert
                    expect(
                        screen.getByRole("tab", {name: "Tab 3"}),
                    ).toHaveFocus();
                });

                it("should focus on the first tab when the home key is pressed and it is in RTL mode", async () => {
                    // Arrange
                    render(
                        <div dir="rtl">
                            <ControlledTabs
                                tabs={[
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
                                ]}
                                selectedTabId={"tab-2"}
                            />
                        </div>,
                    );
                    await userEvent.tab();

                    // Act
                    await userEvent.keyboard("{Home}");

                    // Assert
                    expect(
                        screen.getByRole("tab", {name: "Tab 1"}),
                    ).toHaveFocus();
                });

                it("should focus on the last tab when the end key is pressed and it is in RTL mode", async () => {
                    // Arrange
                    render(
                        <div dir="rtl">
                            <ControlledTabs
                                tabs={[
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
                                ]}
                                selectedTabId={"tab-2"}
                            />
                        </div>,
                    );
                    await userEvent.tab();

                    // Act
                    await userEvent.keyboard("{End}");

                    // Assert
                    expect(
                        screen.getByRole("tab", {name: "Tab 3"}),
                    ).toHaveFocus();
                });
            });
        });
    });

    describe("Performance", () => {
        describe("Panel Caching (mountAllPanels={false})", () => {
            it("should not mount tab panels that are not visited", () => {
                // Arrange
                const secondPanelOnMount = jest.fn();
                const SecondPanel = () => {
                    React.useEffect(() => {
                        secondPanelOnMount();
                    }, []);
                    return <div>Panel 2</div>;
                };

                // Act
                render(
                    <ControlledTabs
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                panel: "Panel 1",
                            },
                            {
                                id: "tab-2",
                                label: "Tab 2",
                                panel: <SecondPanel />,
                            },
                        ]}
                        selectedTabId={"tab-1"}
                        mountAllPanels={false}
                    />,
                );

                // Assert
                // Since the first tab is selected, the second panel should not have been mounted
                expect(secondPanelOnMount).not.toHaveBeenCalled();
            });

            it("should not remount tabs that have been visited", async () => {
                // Arrange
                const firstPanelOnMount = jest.fn();
                const FirstPanel = () => {
                    React.useEffect(() => {
                        firstPanelOnMount();
                    }, []);
                    return <div>Panel 1</div>;
                };
                render(
                    <ControlledTabs
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                panel: <FirstPanel />,
                            },
                            {
                                id: "tab-2",
                                label: "Tab 2",
                                panel: "Panel 2",
                            },
                        ]}
                        selectedTabId={"tab-1"}
                        mountAllPanels={false}
                    />,
                );

                // Act
                // Change tabs and then go back to the first tab
                const tab2 = screen.getByRole("tab", {name: "Tab 2"});
                await userEvent.click(tab2);
                const tab1 = screen.getByRole("tab", {name: "Tab 1"});
                await userEvent.click(tab1);

                // Assert
                expect(firstPanelOnMount).toHaveBeenCalledTimes(1);
            });

            it("should not have the panel contents in the DOM if it is not visited", () => {
                // Arrange
                // Act
                render(
                    <ControlledTabs
                        tabs={[
                            {label: "Tab 1", id: "tab-1", panel: "Panel 1"},
                            {label: "Tab 2", id: "tab-2", panel: "Panel 2"},
                        ]}
                        selectedTabId={"tab-1"}
                        mountAllPanels={false}
                    />,
                );

                // Assert
                expect(screen.queryByText("Panel 2")).not.toBeInTheDocument();
            });
        });

        describe("Mounting All Panels (mountAllPanels={true})", () => {
            it("should mount all tab panels when the component mounts", () => {
                // Arrange
                const onMount = jest.fn();
                const Panel1 = () => {
                    const name = "Panel 1";
                    React.useEffect(() => {
                        onMount(name);
                    }, []);
                    return <div>{name}</div>;
                };
                const Panel2 = () => {
                    const name = "Panel 2";
                    React.useEffect(() => {
                        onMount(name);
                    }, []);
                    return <div>{name}</div>;
                };

                // Act
                render(
                    <ControlledTabs
                        tabs={[
                            {label: "Tab 1", id: "tab-1", panel: <Panel1 />},
                            {label: "Tab 2", id: "tab-2", panel: <Panel2 />},
                        ]}
                        selectedTabId={"tab-1"}
                        mountAllPanels={true}
                    />,
                );

                // Assert
                expect(onMount.mock.calls).toEqual([["Panel 1"], ["Panel 2"]]);
            });

            it("should not remount tab panel if it is visited again", async () => {
                // Arrange
                const onMount = jest.fn();
                const Panel1 = () => {
                    const name = "Panel 1";
                    React.useEffect(() => {
                        onMount(name);
                    }, []);
                    return <div>{name}</div>;
                };
                const Panel2 = () => {
                    const name = "Panel 2";
                    React.useEffect(() => {
                        onMount(name);
                    }, []);
                    return <div>{name}</div>;
                };
                render(
                    <ControlledTabs
                        tabs={[
                            {label: "Tab 1", id: "tab-1", panel: <Panel1 />},
                            {label: "Tab 2", id: "tab-2", panel: <Panel2 />},
                        ]}
                        selectedTabId={"tab-1"}
                        mountAllPanels={true}
                    />,
                );
                onMount.mockClear();
                await userEvent.click(screen.getByRole("tab", {name: "Tab 2"}));

                // Act
                // Visit the first tab again
                await userEvent.click(screen.getByRole("tab", {name: "Tab 1"}));

                // Assert
                expect(onMount.mock.calls).toEqual([]);
            });

            it("should include the tab panel in the DOM if it is not visited", () => {
                // Arrange
                // Act
                render(
                    <ControlledTabs
                        tabs={[
                            {label: "Tab 1", id: "tab-1", panel: "Panel 1"},
                            {label: "Tab 2", id: "tab-2", panel: "Panel 2"},
                        ]}
                        selectedTabId={"tab-1"}
                        mountAllPanels={true}
                    />,
                );

                // Assert
                expect(screen.getByText("Panel 2")).toBeInTheDocument();
            });
        });

        describe("mountAllPanels is not set (defaults to false)", () => {
            it("should not mount tab panels that are not visited", () => {
                // Arrange
                // Act
                render(
                    <ControlledTabs
                        tabs={[
                            {id: "tab-1", label: "Tab 1", panel: "Panel 1"},
                            {id: "tab-2", label: "Tab 2", panel: "Panel 2"},
                        ]}
                        selectedTabId={"tab-1"}
                    />,
                );

                // Assert
                expect(screen.queryByText("Panel 2")).not.toBeInTheDocument();
            });
        });
    });
});
