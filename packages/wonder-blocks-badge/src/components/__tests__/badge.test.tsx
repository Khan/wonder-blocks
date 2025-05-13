import * as React from "react";
import {render, screen} from "@testing-library/react";
import {Badge} from "../badge";

describe("Badge", () => {
    it("should render the label", () => {
        // Arrange
        const label = "Badge label";
        render(<Badge label={label} />);

        // Act
        const badge = screen.getByText(label);

        // Assert
        expect(badge).toBeInTheDocument();
    });

    it("should render the icon", () => {
        // Arrange
        const icon = <svg data-testid="icon-example" />;
        render(<Badge icon={icon} />);

        // Act
        const iconElement = screen.getByTestId("icon-example");

        // Assert
        expect(iconElement).toBeInTheDocument();
    });

    it("should not render anything if there is no label or icon", () => {
        // Arrange
        // Act
        const {container} = render(<Badge />);

        // Assert
        expect(container).toBeEmptyDOMElement();
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should not have violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <Badge
                        label="Badge label"
                        icon={<img src="/" alt="Example icon" />}
                    />,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should use ARIA props", () => {
                // Arrange
                const ariaLabel = "Example aria label";
                render(<Badge aria-label={ariaLabel} label="Badge label" />);

                // Assert
                const badge = screen.getByLabelText(ariaLabel);
                expect(badge).toBeInTheDocument();
            });
        });
    });
});
