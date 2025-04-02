import * as React from "react";
import {render, screen} from "@testing-library/react";
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

    it("should forward the ref to the tab panel", async () => {
        // Arrange
        const ref = React.createRef<HTMLDivElement>();

        // Act
        render(
            <TabPanel {...props} ref={ref}>
                TabPanel
            </TabPanel>,
        );

        // Assert
        expect(await screen.findByRole("tabpanel", {hidden: true})).toBe(
            ref.current,
        );
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
    });
});
