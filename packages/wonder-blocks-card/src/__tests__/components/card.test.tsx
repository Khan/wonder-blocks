import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {
    boxShadow,
    border,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

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

    describe("Style application", () => {
        it("should apply default styles", () => {
            // Arrange
            const testId = "test-card";

            // Act
            render(<Card testId={testId}>Content</Card>);
            const card = screen.getByTestId(testId);

            // Assert
            expect(card).toHaveStyle({
                position: "relative",
                borderStyle: "solid",
            });
        });

        it("should apply base-subtle background", () => {
            // Arrange
            const testId = "test-card";

            // Act
            render(
                <Card testId={testId} background="base-subtle">
                    Content
                </Card>,
            );
            const card = screen.getByTestId(testId);

            // Assert
            expect(card).toHaveStyle({
                backgroundColor: semanticColor.core.background.base.subtle,
            });
        });

        it("should apply medium border radius", () => {
            // Arrange
            const testId = "test-card";

            // Act
            render(
                <Card testId={testId} borderRadius="medium">
                    Content
                </Card>,
            );
            const card = screen.getByTestId(testId);

            // Assert
            expect(card).toHaveStyle({
                borderRadius: border.radius.radius_120,
            });
        });

        it("should apply medium padding", () => {
            // Arrange
            const testId = "test-card";

            // Act
            render(
                <Card testId={testId} paddingSize="medium">
                    Content
                </Card>,
            );
            const card = screen.getByTestId(testId);

            // Assert
            expect(card).toHaveStyle({
                padding: sizing.size_240,
            });
        });

        it("should apply low elevation", () => {
            // Arrange
            const testId = "test-card";

            // Act
            render(
                <Card testId={testId} elevation="low">
                    Content
                </Card>,
            );
            const card = screen.getByTestId(testId);

            // Assert
            expect(card).toHaveStyle({
                boxShadow: boxShadow.low,
            });
        });

        it("should apply image background", () => {
            // Arrange
            const testId = "test-card";
            const testImage = Image;

            // Act
            render(
                <Card testId={testId} background={testImage}>
                    Content
                </Card>,
            );
            const card = screen.getByTestId(testId);

            // Assert
            expect(card).toHaveStyle({
                backgroundSize: "cover",
            });
        });
    });

    describe("Style application", () => {
        it("should apply custom margin style", () => {
            // Arrange
            const testId = "test-card";
            const customStyle = {marginTop: "10px"};

            // Act
            render(
                <Card testId={testId} styles={{root: customStyle}}>
                    Content
                </Card>,
            );

            // Assert
            expect(screen.getByTestId(testId)).toHaveStyle(customStyle);
        });

        it("should apply custom padding style", () => {
            // Arrange
            const testId = "test-card";
            const customStyle = {padding: "20px"};

            // Act
            render(
                <Card testId={testId} styles={{root: customStyle}}>
                    Content
                </Card>,
            );

            // Assert
            expect(screen.getByTestId(testId)).toHaveStyle(customStyle);
        });

        it("should apply custom background color", () => {
            // Arrange
            const testId = "test-card";
            const customStyle = {backgroundColor: "rgb(255, 0, 0)"};

            // Act
            render(
                <Card testId={testId} styles={{root: customStyle}}>
                    Content
                </Card>,
            );

            // Assert
            expect(screen.getByTestId(testId)).toHaveStyle(customStyle);
        });

        it("should maintain default styles with custom styles", () => {
            // Arrange
            const testId = "test-card";
            const customStyle = {marginTop: "10px"};

            // Act
            render(
                <Card testId={testId} styles={{root: customStyle}}>
                    Content
                </Card>,
            );

            // Assert
            const element = screen.getByTestId(testId);
            expect(element).toHaveStyle(customStyle);
            expect(element).toHaveStyle({position: "relative"}); // A default style
        });
    });
});
