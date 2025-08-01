import * as React from "react";
import {render, screen} from "@testing-library/react";

import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";

import Button from "../button";
import {ButtonRef} from "../../util/button.types";
import {ActivityButton} from "../activity-button";

/**
 * Tests for props that are common to the different Button types.
 */
describe("Button types", () => {
    describe.each([
        {name: "Button", Component: Button},
        {name: "ActivityButton", Component: ActivityButton},
    ])("$name", ({Component}) => {
        it("should render the start icon", async () => {
            // Arrange
            render(
                <Component startIcon={magnifyingGlassIcon} onClick={() => {}}>
                    Label
                </Component>,
            );

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(button.innerHTML).toEqual(
                expect.stringContaining("mask-image"),
            );
        });

        it("should forward the ref to the root element", () => {
            // Arrange
            const ref = React.createRef<ButtonRef>();
            render(
                <Component onClick={() => {}} ref={ref}>
                    Label
                </Component>,
            );

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(ref.current).toBe(button);
        });

        describe("Attributes", () => {
            it("should set the id attribute", () => {
                // Arrange
                const id = "button-id";
                render(
                    <Component onClick={() => {}} id={id}>
                        Label
                    </Component>,
                );

                // Act
                const button = screen.getByRole("button");

                // Assert
                expect(button).toHaveAttribute("id", id);
            });

            it("should set the data-testid attribute", () => {
                // Arrange
                const testId = "badge-testid";
                render(
                    <Component onClick={() => {}} testId={testId}>
                        Label
                    </Component>,
                );

                // Act
                const button = screen.getByTestId(testId);

                // Assert
                expect(button).toHaveAttribute("data-testid", testId);
            });

            it("should set the button role when not using href", () => {
                // Arrange
                render(<Component onClick={() => {}}>Label</Component>);

                // Act
                const button = screen.getByRole("button");

                // Assert
                expect(button).toBeInTheDocument();
            });

            it("should set the link role when using href", () => {
                // Arrange
                const href = "https://example.com";
                render(
                    <Component href={href} onClick={() => {}}>
                        Label
                    </Component>,
                );

                // Act
                const button = screen.getByRole("link");

                // Assert
                expect(button).toBeInTheDocument();
            });
        });

        describe("Accessibility", () => {
            describe("ARIA", () => {
                it("should set aria-disabled when the disabled prop is set", () => {
                    // Arrange
                    render(
                        <Component disabled={true} onClick={() => {}}>
                            Label
                        </Component>,
                    );

                    // Act
                    const button = screen.getByRole("button");

                    // Assert
                    expect(button).toHaveAttribute("aria-disabled", "true");
                });
            });
        });
    });
});
