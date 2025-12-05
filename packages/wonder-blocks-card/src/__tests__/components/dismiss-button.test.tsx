import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {DismissButton} from "../../components/dismiss-button";

describe("DismissButton", () => {
    describe("Basic rendering", () => {
        it("should render as a button", () => {
            // Arrange & Act
            render(<DismissButton />);

            // Assert
            expect(screen.getByRole("button")).toBeInTheDocument();
        });
    });

    describe("Accessibility", () => {
        it("should use default aria-label when not provided", () => {
            // Arrange & Act
            render(<DismissButton />);

            // Assert
            expect(
                screen.getByRole("button", {name: "Close"}),
            ).toBeInTheDocument();
        });

        it("should use custom aria-label when provided", () => {
            // Arrange & Act
            render(<DismissButton aria-label="Dismiss notification" />);

            // Assert
            expect(
                screen.getByRole("button", {name: "Dismiss notification"}),
            ).toBeInTheDocument();
        });

        it("should use custom aria-describedby when provided", () => {
            // Arrange & Act
            render(
                <DismissButton aria-describedby="dismiss-button-describedby" />,
            );

            // Assert
            expect(screen.getByRole("button")).toHaveAttribute(
                "aria-describedby",
                "dismiss-button-describedby",
            );
        });

        it("should be keyboard accessible", () => {
            // Arrange
            render(<DismissButton aria-label="Close" />);

            // Act
            const button = screen.getByRole("button");
            button.focus();

            // Assert
            expect(button).toHaveFocus();
        });
    });

    describe("Event handling", () => {
        it("should call onClick when button is clicked", async () => {
            // Arrange
            const mockOnClick = jest.fn();
            render(<DismissButton onClick={mockOnClick} aria-label="Close" />);

            // Act
            const button = screen.getByRole("button", {name: "Close"});
            await userEvent.click(button);

            // Assert
            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });

        it("should call onClick with event parameter", async () => {
            // Arrange
            const mockOnClick = jest.fn();
            render(<DismissButton onClick={mockOnClick} aria-label="Close" />);

            // Act
            const button = screen.getByRole("button", {name: "Close"});
            await userEvent.click(button);

            // Assert
            expect(mockOnClick).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: "click",
                }),
            );
        });

        it("should handle missing onClick prop gracefully", async () => {
            // Arrange
            render(<DismissButton aria-label="Close" />);

            // Act & Assert
            const button = screen.getByRole("button", {name: "Close"});
            await expect(userEvent.click(button)).resolves.not.toThrow();
        });

        it("should support keyboard activation with Enter", async () => {
            // Arrange
            const mockOnClick = jest.fn();
            render(<DismissButton onClick={mockOnClick} aria-label="Close" />);

            // Act
            const button = screen.getByRole("button", {name: "Close"});
            button.focus();
            await userEvent.keyboard("{Enter}");

            // Assert
            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });

        it("should support keyboard activation with Space", async () => {
            // Arrange
            const mockOnClick = jest.fn();
            render(<DismissButton onClick={mockOnClick} aria-label="Close" />);

            // Act
            const button = screen.getByRole("button", {name: "Close"});
            button.focus();
            await userEvent.keyboard(" ");

            // Assert
            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });
    });

    describe("Test ID support", () => {
        it("should set data-testid attribute when testId is provided", () => {
            // Arrange
            const testId = "dismiss-button-test";
            render(<DismissButton testId={testId} aria-label="Close" />);

            // Act
            const button = screen.getByTestId(testId);

            // Assert
            expect(button).toHaveAttribute("data-testid", testId);
        });

        it("should not have data-testid attribute when testId is not provided", () => {
            // Arrange
            render(<DismissButton aria-label="Close" />);

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(button).not.toHaveAttribute("data-testid");
        });
    });
});
