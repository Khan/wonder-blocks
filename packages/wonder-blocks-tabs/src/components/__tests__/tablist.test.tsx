import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    describe("Event Handlers", () => {
        describe("onBlur", () => {
            it("should call the handler when the tablist is blurred", async () => {
                // Arrange
                const onBlur = jest.fn();
                render(
                    <Tablist onBlur={onBlur}>
                        <button role="tab">Tab</button>
                    </Tablist>,
                );
                await userEvent.tab(); // Focus on the tab

                // Act
                await userEvent.tab(); // Move focus out of the tablist

                // Assert
                expect(onBlur).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe("Props", () => {
        it("should use the provided id", async () => {
            // Arrange
            const id = "id";
            render(<Tablist id={id}>Tablist</Tablist>);

            // Act
            const tablist = await screen.findByRole("tablist");

            // Assert
            expect(tablist).toHaveAttribute("id", id);
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

        describe("ARIA", () => {
            it("should set aria-label when provided", async () => {
                // Arrange
                const ariaLabel = "label";
                render(<Tablist aria-label={ariaLabel}>Tablist</Tablist>);

                // Act
                const tablist = await screen.findByRole("tablist");

                // Assert
                expect(tablist).toHaveAttribute("aria-label", ariaLabel);
            });

            it("should set aria-labelledby when provided", async () => {
                // Arrange
                const ariaLabelledby = "labelledby";
                render(
                    <Tablist aria-labelledby={ariaLabelledby}>Tablist</Tablist>,
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
    });
});
