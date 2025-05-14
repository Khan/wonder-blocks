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
        expect(badge).toBeInTheDocument();
    });

    it("should render the icon with alt text", () => {
        // Arrange
        render(<StreakBadge showIcon={true} labels={{iconAltText: "Gems"}} />);

        // Act
        const iconElement = screen.getByRole("img", {
            name: "Gems",
        });

        // Assert
        expect(iconElement).toBeInTheDocument();
    });

    it("should have a decorative icon if showIcon is true and no alt text is provided", () => {
        // Arrange
        render(<StreakBadge showIcon={true} />);

        // Act
        const iconElement = screen.getByRole("presentation");

        // Assert
        expect(iconElement).toBeInTheDocument();
    });

    it("should not render anything if there is no label or icon", () => {
        // Arrange
        // Act
        const {container} = render(<StreakBadge />);

        // Assert
        expect(container).toBeEmptyDOMElement();
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
                        labels={{iconAltText: "Gems"}}
                    />,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });
    });
});
