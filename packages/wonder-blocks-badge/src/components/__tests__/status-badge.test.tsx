import * as React from "react";
import {render, screen} from "@testing-library/react";
import {StatusBadge} from "../status-badge";

describe("StatusBadge", () => {
    it("should render the label", () => {
        // Arrange
        const label = "Badge label";
        render(<StatusBadge label={label} />);

        // Act
        const badge = screen.getByText(label);

        // Assert
        expect(badge).toBeInTheDocument();
    });

    it("should render the icon", () => {
        // Arrange
        const icon = <svg data-testid="icon-example" />;
        render(<StatusBadge icon={icon} />);

        // Act
        const iconElement = screen.getByTestId("icon-example");

        // Assert
        expect(iconElement).toBeInTheDocument();
    });

    it("should not render anything if there is no label or icon", () => {
        // Arrange
        // Act
        const {container} = render(<StatusBadge />);

        // Assert
        expect(container).toBeEmptyDOMElement();
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should not have violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <StatusBadge
                        label="Badge label"
                        icon={<img src="/" alt="Example icon" />}
                    />,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });
    });
});
