import * as React from "react";
import {render, screen} from "@testing-library/react";
import {NeutralBadge} from "../neutral-badge";

describe("NeutralBadge", () => {
    it("should render the label", () => {
        // Arrange
        const label = "Badge label";
        render(<NeutralBadge label={label} />);

        // Act
        const badge = screen.getByText(label);

        // Assert
        expect(badge).toBeInTheDocument();
    });

    it("should render the icon", () => {
        // Arrange
        const icon = <svg data-testid="icon-example" />;
        render(<NeutralBadge icon={icon} />);

        // Act
        const iconElement = screen.getByTestId("icon-example");

        // Assert
        expect(iconElement).toBeInTheDocument();
    });

    it("should not render anything if the label is an empty string and there is no icon", () => {
        // Arrange
        // Act
        const {container} = render(<NeutralBadge label="" />);

        // Assert
        expect(container).toBeEmptyDOMElement();
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should not have violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <NeutralBadge
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
