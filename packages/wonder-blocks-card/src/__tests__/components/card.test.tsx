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
        it("should render dismiss button when showDismissButton is true", () => {
            // Arrange
            render(
                <Card showDismissButton={true}>
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.getByRole("button");

            // Assert
            expect(dismissButton).toBeInTheDocument();
        });

        it("should not render dismiss button when showDismissButton is false", () => {
            // Arrange
            render(
                <Card showDismissButton={false}>
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.queryByRole("button");

            // Assert
            expect(dismissButton).not.toBeInTheDocument();
        });

        it("should pass custom aria-label to dismiss button", () => {
            // Arrange
            render(
                <Card
                    showDismissButton={true}
                    dismissButtonLabel="Custom Close"
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

        it("should call onDismiss when dismiss button is clicked", async () => {
            // Arrange
            const mockOnDismiss = jest.fn();
            render(
                <Card
                    showDismissButton={true}
                    dismissButtonLabel="Close"
                    onDismiss={mockOnDismiss}
                >
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.getByRole("button", {name: "Close"});
            await userEvent.click(dismissButton);

            // Assert
            expect(mockOnDismiss).toHaveBeenCalledTimes(1);
        });

        it("should call onDismiss with event when dismiss button is clicked", async () => {
            // Arrange
            const mockOnDismiss = jest.fn();
            render(
                <Card
                    showDismissButton={true}
                    dismissButtonLabel="Close"
                    onDismiss={mockOnDismiss}
                >
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.getByRole("button", {name: "Close"});
            await userEvent.click(dismissButton);

            // Assert
            expect(mockOnDismiss).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: "click",
                }),
            );
        });

        it("should handle missing onDismiss prop gracefully", async () => {
            // Arrange
            render(
                <Card showDismissButton={true} dismissButtonLabel="Close">
                    <div>Content</div>
                </Card>,
            );

            // Act & Assert
            const dismissButton = screen.getByRole("button", {name: "Close"});
            await expect(userEvent.click(dismissButton)).resolves.not.toThrow();
        });
    });

    describe("Accessibility", () => {
        it("should use default aria-label on dismiss button when dismissButtonLabel is not provided", () => {
            // Arrange
            render(
                <Card showDismissButton={true}>
                    <div>Content</div>
                </Card>,
            );

            // Act
            const dismissButton = screen.getByRole("button", {name: "Close"});

            // Assert
            expect(dismissButton).toBeInTheDocument();
        });

        it("should render with proper semantic structure", () => {
            // Arrange
            render(
                <Card>
                    <h2>Heading</h2>
                    <p>Description</p>
                </Card>,
            );

            // Act
            const heading = screen.getByRole("heading", {level: 2});
            const paragraph = screen.getByText("Description");

            // Assert
            expect(heading).toBeInTheDocument();
            expect(paragraph).toBeInTheDocument();
        });
    });

    describe("Complex content scenarios", () => {
        it("should render multiple child elements", () => {
            // Arrange
            render(
                <Card>
                    <h3 data-testid="title">Card Title</h3>
                    <p data-testid="body">Card body content</p>
                    <button data-testid="action">Action Button</button>
                </Card>,
            );

            // Act
            const title = screen.getByTestId("title");
            const body = screen.getByTestId("body");
            const actionButton = screen.getByTestId("action");

            // Assert
            expect(title).toBeInTheDocument();
            expect(body).toBeInTheDocument();
            expect(actionButton).toBeInTheDocument();
        });

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
