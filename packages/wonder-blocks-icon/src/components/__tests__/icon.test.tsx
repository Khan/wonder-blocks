import * as React from "react";
import {render, screen} from "@testing-library/react";
import {Icon} from "../icon";

describe("Icon", () => {
    it("should render the children", () => {
        // Arrange
        const src = "/logo.svg";
        render(
            <Icon>
                <img src={src} alt="Logo" />
            </Icon>,
        );

        // Act
        const icon = screen.getByRole("img");

        // Assert
        expect(icon).toHaveAttribute("src", src);
    });

    it("should forward the ref to the icon root element", async () => {
        // Arrange
        const ref = React.createRef<HTMLDivElement>();

        // Act
        const {container} = render(
            <Icon ref={ref}>
                <img src="/icon.svg" alt="Icon example" />
            </Icon>,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access -- explicitly check that the root element
        expect(container.firstChild).toBe(ref.current);
    });

    describe("Attributes", () => {
        it("should set the id of the icon component", () => {
            // Arrange
            const id = "icon-id";

            // Act
            const {container} = render(
                <Icon id={id}>
                    <img src="/icon.svg" alt="Icon example" />
                </Icon>,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly check that the root element
            expect(container.firstChild).toHaveAttribute("id", id);
        });

        it("should set the test id of the icon", () => {
            // Arrange
            const testId = "icon-test-id";
            const {container} = render(
                <Icon testId={testId}>
                    <img src="/icon.svg" alt="Icon example" />
                </Icon>,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly check that the root element
            expect(container.firstChild).toHaveAttribute("data-testid", testId);
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should have no a11y violations when alt is provided", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <Icon>
                        <img src="/icon.svg" alt="Icon example" />
                    </Icon>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });

            it("should have no a11y violations when alt is empty", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <Icon>
                        <img src="/icon.svg" alt="" />
                    </Icon>,
                );

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
                            aria-describedby="icon-description"
                            testId="testId"
                        >
                            <img src="/icon.svg" alt="Icon example" />
                        </Icon>
                        <span id="icon-description">
                            Example description of icon
                        </span>
                    </span>,
                );

                // Act
                const iconComponent = screen.getByTestId("testId");

                // Assert
                expect(iconComponent).toHaveAttribute(
                    "aria-describedby",
                    "icon-description",
                );
            });
        });
    });
});
