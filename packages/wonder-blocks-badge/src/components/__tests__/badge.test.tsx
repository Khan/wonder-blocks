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

    it("should not render anything if label is an empty string and there is no icon", () => {
        // Arrange
        // Act
        const {container} = render(<Badge label="" />);

        // Assert
        expect(container).toBeEmptyDOMElement();
    });

    it("should forward the ref to the root element", () => {
        // Arrange
        const ref = React.createRef<HTMLDivElement>();
        render(<Badge ref={ref} label="Badge label" />);

        // Act
        const badge = screen.getByText("Badge label");
        // Assert
        expect(ref.current).toBe(badge);
    });

    describe("Attributes", () => {
        it("should set the id attribute", () => {
            // Arrange
            const id = "badge-id";
            render(<Badge id={id} label="Badge label" />);

            // Act
            const badge = screen.getByText("Badge label");

            // Assert
            expect(badge).toHaveAttribute("id", id);
        });

        it("should set the data-testid attribute", () => {
            // Arrange
            const testId = "badge-testid";
            render(<Badge testId={testId} label="Badge label" />);

            // Act
            const badge = screen.getByTestId(testId);

            // Assert
            expect(badge).toHaveAttribute("data-testid", testId);
        });
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
