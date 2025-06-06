import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {StatusBadge} from "../status-badge";
import {GemBadge} from "../gem-badge";
import {StreakBadge} from "../streak-badge";
import {DueBadge} from "../due-badge";
/**
 * Tests for props that are common to the different badge types.
 */
describe("Badge types", () => {
    describe.each([
        {name: "StatusBadge", Component: StatusBadge},
        {name: "GemBadge", Component: GemBadge},
        {name: "StreakBadge", Component: StreakBadge},
        {name: "DueBadge", Component: DueBadge},
    ])("$name", ({Component}) => {
        it("should forward the ref to the root element", () => {
            // Arrange
            const ref = React.createRef<HTMLDivElement>();
            render(<Component ref={ref} label="Badge label" testId="badge" />);

            // Act
            const badge = screen.getByTestId("badge");

            // Assert
            expect(ref.current).toBe(badge);
        });

        it("should use the tag prop if provided", () => {
            // Arrange
            render(
                <Component tag={"strong"} label="Badge label" testId="badge" />,
            );

            // Act
            const badge = screen.getByTestId("badge");

            // Assert
            expect(badge).toHaveProperty("tagName", "STRONG");
        });

        describe("Attributes", () => {
            it("should set the id attribute", () => {
                // Arrange
                const id = "badge-id";
                render(
                    <Component id={id} label="Badge label" testId="badge" />,
                );

                // Act
                const badge = screen.getByTestId("badge");

                // Assert
                expect(badge).toHaveAttribute("id", id);
            });

            it("should set the data-testid attribute", () => {
                // Arrange
                const testId = "badge-testid";
                // Act
                const {container} = render(
                    <Component testId={testId} label="Badge label" />,
                );

                // Assert
                // eslint-disable-next-line testing-library/no-node-access -- explicitly check the root element for this test since we are testing the testId functionality
                expect(container.firstChild).toHaveAttribute(
                    "data-testid",
                    testId,
                );
            });
        });

        describe("Accessibility", () => {
            describe("ARIA", () => {
                it("should use ARIA props", () => {
                    // Arrange
                    const ariaLabel = "Example aria label";
                    render(
                        <Component
                            aria-label={ariaLabel}
                            label="Badge label"
                        />,
                    );

                    // Assert
                    const badge = screen.getByLabelText(ariaLabel);
                    expect(badge).toBeInTheDocument();
                });

                it("should set the role if provided", () => {
                    // Arrange
                    // Act
                    render(
                        <Component
                            role="button"
                            label="Badge label"
                            testId="badge"
                        />,
                    );

                    // Act
                    const badge = screen.getByTestId("badge");

                    // Assert
                    expect(badge).toHaveAttribute("role", "button");
                });

                it("should be focusable when used with a tooltip and it has the role=button", async () => {
                    // Arrange
                    render(
                        <Tooltip content="Tooltip content">
                            <Component
                                role="button"
                                label="Badge label"
                                testId="badge"
                            />
                        </Tooltip>,
                    );
                    const badge = screen.getByTestId("badge");

                    // Act
                    await userEvent.tab();

                    // Assert
                    expect(badge).toHaveFocus();
                });
            });
        });
    });
});
