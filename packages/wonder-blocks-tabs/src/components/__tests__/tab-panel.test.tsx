import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {TabPanel} from "../tab-panel";

describe("TabPanel", () => {
    const id = "tab-panel-id";
    const ariaLabelledby = "labelledby-id";

    const props = {
        id,
        "aria-labelledby": ariaLabelledby,
    };

    it("should render role=tabpanel", async () => {
        // Arrange
        render(
            <TabPanel id={id} aria-labelledby={ariaLabelledby}>
                Tab panel
            </TabPanel>,
        );

        // Act
        const tabPanel = await screen.findByRole("tabpanel", {
            // We expect the tab panel to be hidden if it is not active
            hidden: true,
        });

        // Assert
        expect(tabPanel).toBeInTheDocument();
    });

    it("should render the provided children", async () => {
        // Arrange
        const childrenId = "children-id";
        render(
            <TabPanel id={id} aria-labelledby={ariaLabelledby}>
                <span data-testid={childrenId}>Tab panel</span>
            </TabPanel>,
        );

        // Act
        const children = await screen.findByTestId(childrenId);

        // Assert
        expect(children).toBeInTheDocument();
    });

    it("should not be visible if active is false", async () => {
        // Arrange
        render(
            <TabPanel {...props} active={false}>
                TabPanel
            </TabPanel>,
        );
        // Act
        const tabPanel = await screen.findByRole("tabpanel", {hidden: true});

        // Assert
        expect(tabPanel).not.toBeVisible();
    });

    it("should be visible if active is true", async () => {
        // Arrange
        render(
            <TabPanel {...props} active={true}>
                TabPanel
            </TabPanel>,
        );
        // Act
        const tabPanel = await screen.findByRole("tabpanel");

        // Assert
        expect(tabPanel).toBeVisible();
    });

    describe("Props", () => {
        it("should set the id prop for the tab panel", async () => {
            // Arrange
            const id = "test-id";
            render(
                <TabPanel {...props} id={id}>
                    TabPanel
                </TabPanel>,
            );

            // Act
            const tabPanel = await screen.findByRole("tabpanel", {
                hidden: true,
            });

            // Assert
            expect(tabPanel).toHaveAttribute("id", id);
        });

        it("should set the testId for the tab panel", async () => {
            // Arrange
            const testId = "test-id";
            render(
                <TabPanel {...props} testId={testId} active={true}>
                    TabPanel
                </TabPanel>,
            );

            // Act
            const tabPanel = await screen.findByRole("tabpanel");

            // Assert
            expect(tabPanel).toHaveAttribute("data-testid", testId);
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should have no a11y violations", async () => {
                // Arrange
                const panelId = "panel-id";
                const tabId = "tab-id";

                // Act
                const {container} = render(
                    <div>
                        <div role="tablist">
                            <button
                                role="tab"
                                id={tabId}
                                aria-controls={panelId}
                            >
                                Tab
                            </button>
                        </div>
                        <TabPanel id={panelId} aria-labelledby={tabId}>
                            Tab panel
                        </TabPanel>
                    </div>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should set the aria-labelledby attribute based on the prop", async () => {
                // Arrange
                const ariaLabelledby = "aria-labelledby-id";
                render(
                    <TabPanel id={id} aria-labelledby={ariaLabelledby}>
                        Tab Panel
                    </TabPanel>,
                );

                // Act
                const tabPanel = await screen.findByRole("tabpanel", {
                    hidden: true,
                });

                // Assert
                expect(tabPanel).toHaveAttribute(
                    "aria-labelledby",
                    ariaLabelledby,
                );
            });
        });

        describe("Focus", () => {
            it("should be focusable if there are no focusable elements in the panel", async () => {
                // Arrange
                render(
                    <TabPanel {...props} active={true}>
                        No focusable elements
                    </TabPanel>,
                );
                const tabPanel = await screen.findByRole("tabpanel");

                // Act
                await userEvent.tab();

                // Assert
                expect(tabPanel).toHaveFocus();
            });

            it.each([
                {
                    element: <a href="#link">Link Example</a>,
                    label: "Link",
                },
                {
                    element: <input type="text" />,
                    label: "Input",
                },
                {
                    element: <button>Button</button>,
                    label: "Button",
                },
                {
                    element: <textarea />,
                    label: "Textarea",
                },
            ])(
                "should not be focusable if there is a focusable element in the panel ($label)",
                async ({element}) => {
                    // Arrange
                    render(
                        <TabPanel {...props} active={true}>
                            {element}
                        </TabPanel>,
                    );
                    const tabPanel = await screen.findByRole("tabpanel");

                    // Act
                    await userEvent.tab();

                    // Assert
                    expect(tabPanel).not.toHaveFocus();
                },
            );

            it.each([
                {
                    element: (
                        <a
                            href="#link"
                            data-testid="expected-focusable-element"
                        >
                            Link Example
                        </a>
                    ),
                    label: "Link",
                },
                {
                    element: (
                        <input
                            type="text"
                            data-testid="expected-focusable-element"
                        />
                    ),
                    label: "Input",
                },
                {
                    element: (
                        <button data-testid="expected-focusable-element">
                            Button
                        </button>
                    ),
                    label: "Button",
                },
                {
                    element: (
                        <textarea data-testid="expected-focusable-element" />
                    ),
                    label: "Textarea",
                },
            ])(
                "should focus on the expected focusable element if there is a focusable element in the panel ($label)",
                async ({element}) => {
                    // Arrange
                    render(
                        <TabPanel {...props} active={true}>
                            {element}
                        </TabPanel>,
                    );
                    const expectedFocusableElement = await screen.findByTestId(
                        "expected-focusable-element",
                    );

                    // Act
                    await userEvent.tab();

                    // Assert
                    expect(expectedFocusableElement).toHaveFocus();
                },
            );
        });
    });
});
