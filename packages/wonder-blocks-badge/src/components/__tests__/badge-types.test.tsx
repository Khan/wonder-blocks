import * as React from "react";
import {render, screen} from "@testing-library/react";
import {StatusBadge} from "../status-badge";
import {GemBadge} from "../gem-badge";

/**
 * Tests for props that are common to the different badge types.
 */
describe("Badge types", () => {
    describe.each([
        {name: "StatusBadge", Component: StatusBadge},
        {name: "GemBadge", Component: GemBadge},
    ])("$name", ({Component}) => {
        it("should forward the ref to the root element", () => {
            // Arrange
            const ref = React.createRef<HTMLDivElement>();
            render(<Component ref={ref} label="Badge label" />);

            // Act
            const badge = screen.getByText("Badge label");

            // Assert
            expect(ref.current).toBe(badge);
        });

        it("should use the tag prop if provided", () => {
            // Arrange
            render(<Component tag={"strong"} label="Badge label" />);

            // Act
            const badge = screen.getByText("Badge label");

            // Assert
            expect(badge).toHaveProperty("tagName", "STRONG");
        });

        describe("Attributes", () => {
            it("should set the id attribute", () => {
                // Arrange
                const id = "badge-id";
                render(<Component id={id} label="Badge label" />);

                // Act
                const badge = screen.getByText("Badge label");

                // Assert
                expect(badge).toHaveAttribute("id", id);
            });

            it("should set the data-testid attribute", () => {
                // Arrange
                const testId = "badge-testid";
                render(<Component testId={testId} label="Badge label" />);

                // Act
                const badge = screen.getByTestId(testId);

                // Assert
                expect(badge).toHaveAttribute("data-testid", testId);
            });
        });

        describe("Accessibility", () => {
            describe("ARIA", () => {
                it("should use ARIA props", () => {
                    // Arrange
                    const ariaLabel = "Example aria label";
                    render(
                        <Component
                            aria-label={ariaLabel}
                            label="Badge label"
                        />,
                    );

                    // Assert
                    const badge = screen.getByLabelText(ariaLabel);
                    expect(badge).toBeInTheDocument();
                });
            });
        });
    });
});
