import * as React from "react";
import {render, screen} from "@testing-library/react";
import {DueBadge} from "../due-badge";

describe("DueBadge", () => {
    it("should render the label", () => {
        // Arrange
        const label = "Badge label";
        render(<DueBadge label={label} />);

        // Act
        const badge = screen.getByText(label);

        // Assert
        expect(badge).toBeInTheDocument();
    });

    it("should render the icon with alt text", () => {
        // Arrange
        render(<DueBadge showIcon={true} iconAriaLabel="Due" />);

        // Act
        const iconElement = screen.getByRole("img", {
            name: "Due",
        });

        // Assert
        expect(iconElement).toBeInTheDocument();
    });

    it("should not have an img role if showIcon is true and no alt text is provided", () => {
        // Arrange
        render(<DueBadge showIcon={true} label="Badge" />);

        // Act
        const iconElement = screen.queryByRole("img");

        // Assert
        expect(iconElement).not.toBeInTheDocument();
    });

    it("should not render anything if there is an empty label and showIcon is false", () => {
        // Arrange
        // Act
        const {container} = render(<DueBadge label="" showIcon={false} />);

        // Assert
        expect(container).toBeEmptyDOMElement();
    });

    it("should not render the icon if showIcon is not set", () => {
        // Arrange
        render(<DueBadge label="Badge" />);

        // Act
        const iconElement = screen.queryByRole("img");

        // Assert
        expect(iconElement).not.toBeInTheDocument();
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should not have violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <DueBadge
                        label="Badge label"
                        showIcon={true}
                        iconAriaLabel="Due"
                    />,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        it("should not have violations if there is no label", async () => {
            // Arrange
            // Act
            const {container} = render(
                <DueBadge showIcon={true} iconAriaLabel="Due" />,
            );

            // Assert
            await expect(container).toHaveNoA11yViolations();
        });

        it("should not have violations if there is no icon", async () => {
            // Arrange
            // Act
            const {container} = render(
                <DueBadge showIcon={false} label="Badge" />,
            );

            // Assert
            await expect(container).toHaveNoA11yViolations();
        });
    });
});
