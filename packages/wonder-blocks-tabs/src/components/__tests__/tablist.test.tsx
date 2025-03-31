import * as React from "react";
import {render, screen} from "@testing-library/react";
import {Tablist} from "../tablist";

describe("Tablist", () => {
    it("should render role=tablist", async () => {
        // Arrange
        render(<Tablist>Tablist</Tablist>);

        // Act
        const tabList = await screen.findByRole("tablist");

        // Assert
        expect(tabList).toBeInTheDocument();
    });

    it("should render the provided children", async () => {
        // Arrange
        const childrenId = "children-id";
        render(
            <Tablist>
                <span data-testid={childrenId}>Tablist</span>
            </Tablist>,
        );

        // Act
        const children = await screen.findByTestId(childrenId);

        // Assert
        expect(children).toBeInTheDocument();
    });

    it("should forward the ref to the tablist", async () => {
        // Arrange
        const ref = React.createRef<HTMLDivElement>();

        // Act
        render(<Tablist ref={ref}>Tablist</Tablist>);

        // Assert
        expect(await screen.findByRole("tablist")).toBe(ref.current);
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
                        <Tablist>
                            <button
                                role="tab"
                                id={tabId}
                                aria-controls={panelId}
                            >
                                Tab
                            </button>
                        </Tablist>
                        <div
                            role="tabpanel"
                            id={panelId}
                            aria-labelledby={tabId}
                        >
                            Tab panel
                        </div>
                    </div>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });
    });
});
