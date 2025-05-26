import * as React from "react";
import {render, screen} from "@testing-library/react";
import {StreakBadge} from "../streak-badge";

describe("StreakBadge", () => {
    it("should render the label", () => {
        // Arrange
        const label = "Badge label";
        render(<StreakBadge label={label} />);

        // Act
        const badge = screen.getByText(label);

        // Assert
        expect(badge).toBeVisible();
    });

    it("should render the icon with alt text", () => {
        // Arrange
        render(<StreakBadge showIcon={true} iconAriaLabel="Streak" />);

        // Act
        const iconElement = screen.getByRole("img", {
            name: "Streak",
        });

        // Assert
        expect(iconElement).toBeInTheDocument();
    });

    it("should not have an img role if showIcon is true and no alt text is provided", () => {
        // Arrange
        render(<StreakBadge showIcon={true} />);

        // Act
        const iconElement = screen.queryByRole("img");

        // Assert
        expect(iconElement).not.toBeInTheDocument();
    });

    it("should not render anything if there is an empty label and showIcon is false", () => {
        // Arrange
        // Act
        const {container} = render(<StreakBadge label="" showIcon={false} />);

        // Assert
        expect(container).toBeEmptyDOMElement();
    });

    it("should not render the icon if showIcon is not set", () => {
        // Arrange
        render(<StreakBadge label="Badge" />);

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
                    <StreakBadge
                        label="Badge label"
                        showIcon={true}
                        iconAriaLabel="Streak"
                    />,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });

            it("should not have violations if there is no label", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <StreakBadge showIcon={true} iconAriaLabel="Streak" />,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });

            it("should not have violations if there is no label", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <StreakBadge showIcon={false} iconAriaLabel="Streak" />,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });
    });
});
