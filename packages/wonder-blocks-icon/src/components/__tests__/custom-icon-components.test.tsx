import * as React from "react";
import {render, screen} from "@testing-library/react";
import {GemIcon} from "../custom-icon-components/gem-icon";

describe("Custom Icon Components", () => {
    describe.each([{name: "GemIcon", Component: GemIcon}])(
        "${name}",
        ({Component}) => {
            it("should render an img role with an aria-label when provided", () => {
                // Arrange
                const ariaLabel = "Icon example";
                render(<Component aria-label={ariaLabel} />);

                // Act
                const icon = screen.getByRole("img", {name: ariaLabel});

                // Assert
                expect(icon).toHaveAttribute("aria-label", ariaLabel);
            });

            it("should render an img role with an aria-labelledby when provided", () => {
                // Arrange
                const label = "Icon example";
                const labelId = "id-of-label";
                render(
                    <div>
                        <Component aria-labelledby={labelId} />
                        <span id={labelId}>{label}</span>
                    </div>,
                );

                // Act
                const icon = screen.getByRole("img", {name: label});

                // Assert
                expect(icon).toHaveAttribute("aria-labelledby", labelId);
            });

            it("should render with aria-hidden when no aria-label or aria-labelledby is provided", () => {
                // Arrange
                const testId = "test-id-of-icon";
                render(<Component testId={testId} />);

                // Act
                const icon = screen.getByTestId(testId);

                // Assert
                expect(icon).toHaveAttribute("aria-hidden", "true");
            });

            describe("Attributes", () => {
                it("should use the id prop", () => {
                    // Arrange
                    const id = "id-of-icon";
                    const testId = "test-id-of-icon";
                    render(<Component id={id} testId={testId} />);

                    // Act
                    const icon = screen.getByTestId(testId);

                    // Assert
                    expect(icon).toHaveAttribute("id", id);
                });

                it("should use the testId prop", () => {
                    // Arrange
                    const testId = "test-id-of-icon";
                    render(<Component testId={testId} />);

                    // Act
                    const icon = screen.getByTestId(testId);

                    // Assert
                    expect(icon).toHaveAttribute("data-testid", testId);
                });
            });

            describe("Accessibility", () => {
                describe("axe", () => {
                    it("should not have violations when aria-label is provided", async () => {
                        // Arrange
                        const ariaLabel = "Icon example";

                        // Act
                        const {container} = render(
                            <Component aria-label={ariaLabel} />,
                        );

                        // Assert
                        await expect(container).toHaveNoA11yViolations();
                    });

                    it("should not have violations when aria-labelledby is provided", async () => {
                        // Arrange
                        const label = "Icon example";
                        const labelId = "id-of-label";

                        // Act
                        const {container} = render(
                            <div>
                                <Component aria-labelledby={labelId} />
                                <span id={labelId}>{label}</span>
                            </div>,
                        );

                        // Assert
                        await expect(container).toHaveNoA11yViolations();
                    });

                    it("should not have violations when aria-label and aria-labelledby are not provided", async () => {
                        // Arrange
                        // Act
                        const {container} = render(<Component />);

                        // Assert
                        await expect(container).toHaveNoA11yViolations();
                    });
                });

                describe("ARIA", () => {
                    it("should accept aria props", () => {
                        // Arrange
                        const descriptionId = "description-id";
                        const testId = "test-id-of-icon";
                        render(
                            <span>
                                <Component
                                    aria-describedby={descriptionId}
                                    testId={testId}
                                />
                                <span id={descriptionId}>
                                    Description of icon
                                </span>
                            </span>,
                        );

                        // Act
                        const icon = screen.getByTestId(testId);

                        // Assert
                        expect(icon).toHaveAttribute(
                            "aria-describedby",
                            descriptionId,
                        );
                    });
                });
            });
        },
    );
});
