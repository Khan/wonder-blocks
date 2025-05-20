import * as React from "react";
import {render, screen} from "@testing-library/react";
import {Icon} from "../icon";

describe("Icon", () => {
    it("should render the icon", () => {
        // Arrange
        const src = "/logo.svg";
        render(<Icon icon={src} alt="Logo" />);

        // Act
        const icon = screen.getByRole("img");

        // Assert
        expect(icon).toHaveAttribute("src", src);
    });

    it("should include the alt text", () => {
        // Arrange
        const src = "/logo.svg";
        const alt = "Logo";
        render(<Icon icon={src} alt={alt} />);

        // Act
        const icon = screen.getByRole("img");

        // Assert
        expect(icon).toHaveAttribute("alt", alt);
    });

    it("should include empty string alt text if not provided", () => {
        // Arrange
        const src = "/logo.svg";
        render(<Icon icon={src} />);

        // Act
        const icon = screen.getByRole("presentation");

        // Assert
        expect(icon).toHaveAttribute("alt", "");
    });

    it("should forward the ref to the icon", async () => {
        // Arrange
        const ref = React.createRef<HTMLImageElement>();

        // Act
        render(<Icon icon={"/icon.svg"} ref={ref} alt="Icon example" />);

        // Assert
        expect(await screen.findByRole("img")).toBe(ref.current);
    });

    describe("Attributes", () => {
        it("should set the id of the icon", () => {
            // Arrange
            const id = "icon-id";
            render(<Icon icon={"/icon.svg"} id={id} alt="Icon example" />);

            // Act
            const icon = screen.getByRole("img");

            // Assert
            expect(icon).toHaveAttribute("id", id);
        });

        it("should set the test id of the icon", () => {
            // Arrange
            const testId = "icon-test-id";
            render(
                <Icon icon={"/icon.svg"} testId={testId} alt="Icon example" />,
            );

            // Act
            const icon = screen.getByTestId(testId);

            // Assert
            expect(icon).toHaveAttribute("data-testid", testId);
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should have no a11y violations when alt is provided", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <Icon icon={"/icon.svg"} alt="Icon example" />,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });

            it("should have no a11y violations when alt is not provided", async () => {
                // Arrange
                // Act
                const {container} = render(<Icon icon={"/icon.svg"} />);

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should set aria attributes that are passed in", () => {
                // Arrange
                render(
                    <span>
                        <Icon
                            icon={"/icon.svg"}
                            alt="Icon example"
                            aria-describedby="icon-description"
                        />
                        <span id="icon-description">
                            Example description of icon
                        </span>
                    </span>,
                );

                // Act
                const icon = screen.getByRole("img");

                // Assert
                expect(icon).toHaveAttribute(
                    "aria-describedby",
                    "icon-description",
                );
            });
        });
    });
});
