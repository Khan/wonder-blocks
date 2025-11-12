import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import Card from "../../components/card";

describe("Card", () => {
    describe("Basic rendering", () => {
        it("should render children correctly", () => {
            // Arrange
            render(
                <Card>
                    <div data-testid="child-content">Card Content</div>
                </Card>,
            );

            // Act
            const childContent = screen.getByTestId("child-content");

            // Assert
            expect(childContent).toBeInTheDocument();
        });

        it("should not render dismiss button by default", () => {
            // Arrange
            render(
                <Card>
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.queryByRole("button");

            // Assert
            expect(dismissButton).not.toBeInTheDocument();
        });
    });

    describe("Dismiss button functionality", () => {
        it("should render dismiss button when onDismiss is present", () => {
            // Arrange
            render(
                <Card
                    onDismiss={() => {}}
                    labels={{dismissButtonAriaLabel: "Close"}}
                >
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.getByRole("button");

            // Assert
            expect(dismissButton).toBeInTheDocument();
        });

        it("should not render dismiss button there is no onDismiss prop", () => {
            // Arrange
            render(
                <Card>
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.queryByRole("button");

            // Assert
            expect(dismissButton).not.toBeInTheDocument();
        });

        it("should call onDismiss when dismiss button is clicked", async () => {
            // Arrange
            const mockOnDismiss = jest.fn();
            render(
                <Card
                    labels={{dismissButtonAriaLabel: "Close it!"}}
                    onDismiss={mockOnDismiss}
                >
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.getByRole("button", {
                name: "Close it!",
            });
            await userEvent.click(dismissButton);

            // Assert
            expect(mockOnDismiss).toHaveBeenCalledTimes(1);
        });
    });

    describe("Test IDs", () => {
        it("should apply a custom testId for card", () => {
            // Arrange
            render(
                <Card testId="my-card">
                    <div>Content</div>
                </Card>,
            );

            // Act
            const card = screen.getByTestId("my-card");

            // Assert
            expect(card).toBeInTheDocument();
        });

        it("should append -dismiss-button to testId for dismiss button", () => {
            // Arrange
            render(
                <Card
                    testId="my-card"
                    onDismiss={() => {}}
                    labels={{dismissButtonAriaLabel: "Close"}}
                >
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.getByTestId("my-card-dismiss-button");

            // Assert
            expect(dismissButton).toBeInTheDocument();
        });

        it("should use default testId for dismiss button when no custom testId provided", () => {
            // Arrange
            render(
                <Card
                    onDismiss={() => {}}
                    labels={{dismissButtonAriaLabel: "Close"}}
                >
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.getByTestId("card-dismiss-button");

            // Assert
            expect(dismissButton).toBeInTheDocument();
        });
    });

    describe("Accessibility", () => {
        it("should pass custom aria-label to dismiss button", () => {
            // Arrange
            render(
                <Card
                    onDismiss={() => {}}
                    labels={{dismissButtonAriaLabel: "Custom Close"}}
                >
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.getByRole("button", {
                name: "Custom Close",
            });

            // Assert
            expect(dismissButton).toBeInTheDocument();
        });

        it("should render with a custom tag", () => {
            // Arrange
            render(
                <Card tag="section" labels={{cardAriaLabel: "Card Section"}}>
                    <h2>Heading</h2>
                    <p>Description</p>
                </Card>,
            );

            // Act
            const section = screen.getByRole("region");

            // Assert
            expect(section).toBeInTheDocument();
        });

        it("should apply labels.cardAriaLabel for a custom tag", () => {
            // Arrange
            render(
                <Card
                    tag="section"
                    labels={{cardAriaLabel: "Custom section label"}}
                >
                    <h2>Heading</h2>
                    <p>Description</p>
                </Card>,
            );

            // Act
            const section = screen.getByRole("region", {
                name: "Custom section label",
            });

            // Assert
            expect(section).toBeInTheDocument();
        });

        it("should apply the inert attribute", () => {
            // Arrange
            render(
                <Card inert testId="card">
                    <h2>Heading</h2>
                    <p>Description</p>
                    <button>Button</button>
                </Card>,
            );

            // Act
            const section = screen.getByTestId("card");

            // Assert
            expect(section).toHaveAttribute("inert");
        });
    });

    describe("Complex content scenarios", () => {
        it("should work with fragment children", () => {
            // Arrange
            render(
                <Card>
                    <>
                        <span data-testid="fragment-child-1">First</span>
                        <span data-testid="fragment-child-2">Second</span>
                    </>
                </Card>,
            );

            // Act
            const firstChild = screen.getByTestId("fragment-child-1");
            const secondChild = screen.getByTestId("fragment-child-2");

            // Assert
            expect(firstChild).toBeInTheDocument();
            expect(secondChild).toBeInTheDocument();
        });
    });
});
