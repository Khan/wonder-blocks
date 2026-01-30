import * as React from "react";
import {render, screen} from "@testing-library/react";

import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {IconButton} from "../icon-button";
import {ActivityIconButton} from "../activity-icon-button";
import {ConversationIconButton} from "../conversation-icon-button";
import {IconButtonRef} from "../../util/icon-button.types";
import {NodeIconButton} from "../node-icon-button";

/**
 * Tests for props that are common to the different IconButton types.
 */
describe("IconButton types", () => {
    describe.each([
        {name: "IconButton", Component: IconButton},
        {name: "ActivityIconButton", Component: ActivityIconButton},
        {name: "ConversationIconButton", Component: ConversationIconButton},
        {name: "NodeIconButton", Component: NodeIconButton},
    ])("$name", ({Component}) => {
        it("should render the icon", async () => {
            // Arrange
            render(
                <Component
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
            render(
                <Component
                    icon={magnifyingGlassIcon}
                    aria-label="Search"
                    ref={ref}
                />,
            );

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(ref.current).toBe(button);
        });

        describe("Attributes", () => {
            it("should set the id attribute", () => {
                // Arrange
                const id = "button-id";
                render(
                    <Component
                        icon={magnifyingGlassIcon}
                        aria-label="Search"
                        id={id}
                    />,
                );

                // Act
                const button = screen.getByRole("button");

                // Assert
                expect(button).toHaveAttribute("id", id);
            });

            it("should set the data-testid attribute", () => {
                // Arrange
                const testId = "badge-testid";
                render(
                    <Component
                        icon={magnifyingGlassIcon}
                        aria-label="Search"
                        testId={testId}
                    />,
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
                        <Component
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

                it("should use aria-label to announce the button", () => {
                    // Arrange
                    render(
                        <Component
                            aria-label="Search"
                            icon={magnifyingGlassIcon}
                            onClick={() => {}}
                        />,
                    );

                    // Act
                    const button = screen.getByRole("button", {
                        name: "Search",
                    });

                    // Assert
                    expect(button).toBeInTheDocument();
                });
            });
        });
    });
});
