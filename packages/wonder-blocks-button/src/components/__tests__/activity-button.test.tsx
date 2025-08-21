import * as React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {ActivityButton} from "../activity-button";

describe("ActivityButton", () => {
    describe("attributes", () => {
        test("no explicit role for anchor with href", () => {
            // Arrange
            render(<ActivityButton href="/">Text</ActivityButton>);

            // Act
            const link = screen.getByRole("link");

            // Assert
            expect(link).not.toHaveAttribute("role");
        });

        test("no explicit link role for anchor with href", () => {
            // Arrange
            render(<ActivityButton href="/">Text</ActivityButton>);

            // Act
            const link = screen.getByRole("link");

            // Assert
            expect(link).not.toHaveAttribute("role", "link");
        });

        test("no explicit role for button", () => {
            // Arrange
            render(<ActivityButton>Text</ActivityButton>);

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(button).not.toHaveAttribute("role");
        });

        test("no explicit button role for button element", () => {
            // Arrange
            render(<ActivityButton>Text</ActivityButton>);

            // Act
            const button = screen.getByRole("button");

            // Assert
            expect(button).not.toHaveAttribute("role", "button");
        });

        test("allow other explicit roles", () => {
            // Arrange
            render(<ActivityButton role="tab">Tab</ActivityButton>);

            // Act
            const tab = screen.getByRole("tab");

            // Assert
            expect(tab).toHaveAttribute("role");
        });
    });

    describe("mouse event handlers", () => {
        describe("onMouseDown", () => {
            test("should call onMouseDown handler when mouse is pressed down", async () => {
                // Arrange
                const user = userEvent.setup();
                const onMouseDown = jest.fn();
                render(
                    <ActivityButton onMouseDown={onMouseDown}>
                        Test Button
                    </ActivityButton>
                );

                // Act
                const button = screen.getByRole("button");
                await user.pointer({target: button, keys: '[MouseLeft>]'});

                // Assert
                expect(onMouseDown).toHaveBeenCalledTimes(1);
                expect(onMouseDown).toHaveBeenCalledWith(
                    expect.objectContaining({
                        type: "mousedown",
                    })
                );
            });

            test("should not call onMouseDown when button is disabled", async () => {
                // Arrange
                const user = userEvent.setup();
                const onMouseDown = jest.fn();
                render(
                    <ActivityButton disabled onMouseDown={onMouseDown}>
                        Test Button
                    </ActivityButton>
                );

                // Act
                const button = screen.getByRole("button");
                await user.pointer({target: button, keys: '[MouseLeft>]'});

                // Assert
                expect(onMouseDown).not.toHaveBeenCalled();
            });

            test("should work with links (href)", async () => {
                // Arrange
                const user = userEvent.setup();
                const onMouseDown = jest.fn();
                render(
                    <ActivityButton href="/test" onMouseDown={onMouseDown}>
                        Test Link
                    </ActivityButton>
                );

                // Act
                const link = screen.getByRole("link");
                await user.pointer({target: link, keys: '[MouseLeft>]'});

                // Assert
                expect(onMouseDown).toHaveBeenCalledTimes(1);
            });
        });

        describe("onMouseUp", () => {
            test("should call onMouseUp handler when mouse is released", async () => {
                // Arrange
                const user = userEvent.setup();
                const onMouseUp = jest.fn();
                render(
                    <ActivityButton onMouseUp={onMouseUp}>
                        Test Button
                    </ActivityButton>
                );

                // Act
                const button = screen.getByRole("button");
                await user.pointer({target: button, keys: '[MouseLeft>][/MouseLeft]'});

                // Assert
                expect(onMouseUp).toHaveBeenCalledTimes(1);
                expect(onMouseUp).toHaveBeenCalledWith(
                    expect.objectContaining({
                        type: "mouseup",
                    })
                );
            });

            test("should not call onMouseUp when button is disabled", async () => {
                // Arrange
                const user = userEvent.setup();
                const onMouseUp = jest.fn();
                render(
                    <ActivityButton disabled onMouseUp={onMouseUp}>
                        Test Button
                    </ActivityButton>
                );

                // Act
                const button = screen.getByRole("button");
                await user.pointer({target: button, keys: '[MouseLeft>][/MouseLeft]'});

                // Assert
                expect(onMouseUp).not.toHaveBeenCalled();
            });
        });

        describe("onMouseLeave", () => {
            test("should call onMouseLeave handler when mouse leaves button", () => {
                // Arrange
                const onMouseLeave = jest.fn();
                render(
                    <ActivityButton onMouseLeave={onMouseLeave}>
                        Test Button
                    </ActivityButton>
                );

                // Act
                const button = screen.getByRole("button");
                fireEvent.mouseEnter(button);
                fireEvent.mouseLeave(button);

                // Assert
                expect(onMouseLeave).toHaveBeenCalledTimes(1);
                expect(onMouseLeave).toHaveBeenCalledWith(
                    expect.objectContaining({
                        type: "mouseleave",
                    })
                );
            });

            test("should not call onMouseLeave when button is disabled", () => {
                // Arrange
                const onMouseLeave = jest.fn();
                render(
                    <ActivityButton disabled onMouseLeave={onMouseLeave}>
                        Test Button
                    </ActivityButton>
                );

                // Act
                const button = screen.getByRole("button");
                fireEvent.mouseEnter(button);
                fireEvent.mouseLeave(button);

                // Assert
                expect(onMouseLeave).not.toHaveBeenCalled();
            });

            test("should work with links (href)", () => {
                // Arrange
                const onMouseLeave = jest.fn();
                render(
                    <ActivityButton href="/test" onMouseLeave={onMouseLeave}>
                        Test Link
                    </ActivityButton>
                );

                // Act
                const link = screen.getByRole("link");
                fireEvent.mouseEnter(link);
                fireEvent.mouseLeave(link);

                // Assert
                expect(onMouseLeave).toHaveBeenCalledTimes(1);
            });
        });

        describe("combined mouse events", () => {
            test("should call all mouse event handlers in correct sequence", async () => {
                // Arrange
                const user = userEvent.setup();
                const onMouseDown = jest.fn();
                const onMouseUp = jest.fn();
                const onMouseLeave = jest.fn();
                const callOrder: string[] = [];
                
                onMouseDown.mockImplementation(() => callOrder.push('mousedown'));
                onMouseUp.mockImplementation(() => callOrder.push('mouseup'));
                onMouseLeave.mockImplementation(() => callOrder.push('mouseleave'));

                render(
                    <ActivityButton 
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseLeave}
                    >
                        Test Button
                    </ActivityButton>
                );

                // Act
                const button = screen.getByRole("button");
                await user.hover(button);
                await user.pointer({target: button, keys: '[MouseLeft>][/MouseLeft]'});
                await user.unhover(button);

                // Assert
                expect(callOrder).toEqual(['mousedown', 'mouseup', 'mouseleave']);
            });

            test("should work independently - only provided handlers are called", () => {
                // Arrange
                const onMouseDown = jest.fn();
                render(
                    <ActivityButton onMouseDown={onMouseDown}>
                        Test Button
                    </ActivityButton>
                );

                // Act
                const button = screen.getByRole("button");
                fireEvent.mouseEnter(button);
                fireEvent.mouseDown(button);
                fireEvent.mouseUp(button);
                fireEvent.mouseLeave(button);

                // Assert
                expect(onMouseDown).toHaveBeenCalledTimes(1);
                // No errors should be thrown for missing handlers
            });
        });
    });
});
