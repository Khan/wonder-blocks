import * as React from "react";
import {render, screen} from "@testing-library/react";

import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {IconButton} from "../icon-button";
import {ActivityIconButton} from "../activity-icon-button";
import {IconButtonRef} from "../../util/icon-button.types";

/**
 * Tests for props that are common to the different IconButton types.
 */
describe("IconButton types", () => {
    describe.each([
        {name: "IconButton", Component: IconButton},
        {name: "ActivityIconButton", Component: ActivityIconButton},
    ])("$name", ({Component}) => {
        it("should render the icon", async () => {
            // Arrange
            render(
                <IconButton
                    aria-label="Search"
                    icon={magnifyingGlassIcon}
                    onClick={() => {}}
                />,
            );

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(button.innerHTML).toEqual(
                expect.stringContaining("mask-image"),
            );
        });

        it("should forward the ref to the root element", () => {
            // Arrange
            const ref = React.createRef<IconButtonRef>();
            render(<Component icon={magnifyingGlassIcon} ref={ref} />);

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(ref.current).toBe(button);
        });

        describe("Attributes", () => {
            it("should set the id attribute", () => {
                // Arrange
                const id = "button-id";
                render(<Component icon={magnifyingGlassIcon} id={id} />);

                // Act
                const button = screen.getByRole("button");

                // Assert
                expect(button).toHaveAttribute("id", id);
            });

            it("should set the data-testid attribute", () => {
                // Arrange
                const testId = "badge-testid";
                render(
                    <Component icon={magnifyingGlassIcon} testId={testId} />,
                );

                // Act
                const button = screen.getByTestId(testId);

                // Assert
                expect(button).toHaveAttribute("data-testid", testId);
            });
        });

        describe("Accessibility", () => {
            describe("ARIA", () => {
                it("should set aria-disabled when the disabled prop is set", () => {
                    // Arrange
                    render(
                        <IconButton
                            aria-label="Search"
                            disabled={true}
                            icon={magnifyingGlassIcon}
                            onClick={() => {}}
                        />,
                    );

                    // Act
                    const iconButton = screen.getByRole("button");

                    // Assert
                    expect(iconButton).toHaveAttribute("aria-disabled", "true");
                });
            });
        });
    });
});
