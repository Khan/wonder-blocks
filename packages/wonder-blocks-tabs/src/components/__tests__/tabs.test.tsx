import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    it("should render the tabs in a tablist", async () => {
        // Arrange
        render(
            <Tabs
                tabs={tabs}
                selectedTabId={tabs[0].id}
                onTabSelected={jest.fn()}
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
                />,
            );

            // Act
            const tab = screen.getByRole("tab", {name: "Tab 2"});
            await userEvent.click(tab);

            // Assert
            expect(onTabSelected).toHaveBeenCalledExactlyOnceWith("tab-2");
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should have no a11y violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <Tabs
                        tabs={tabs}
                        selectedTabId={tabs[0].id}
                        onTabSelected={jest.fn()}
                    />,
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
                    />,
                );
                const tab = screen.getByRole("tab", {name: "Tab 1"});

                // Act
                const tabPanel = screen.getByRole("tabpanel", {name: "Tab 1"});

                // Assert
                expect(tabPanel).toHaveAttribute("aria-labelledby", tab.id);
            });
        });
    });
});
