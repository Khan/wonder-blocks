import * as React from "react";
import {render, screen} from "@testing-library/react";

import InitialFocus from "../initial-focus";

describe("InitialFocus", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("should try to focus on a given element by id", () => {
        // Arrange
        render(
            <InitialFocus initialFocusId="initial-focus-id">
                <div data-testid="container">
                    <button data-testid="item-0" />
                    <button data-testid="item-1" id="initial-focus-id" />
                    <button data-testid="item-2" />
                </div>
            </InitialFocus>,
        );

        // Act
        const firstFocusableElement = screen.getByTestId("item-1");
        // Fast-forward until all timers have been executed
        jest.runAllTimers();

        // Assert
        expect(firstFocusableElement).toHaveFocus();
    });

    it("should try to focus on the first focusable element", () => {
        // Arrange
        render(
            <InitialFocus>
                <div data-testid="container">
                    <button data-testid="item-0" />
                    <button data-testid="item-1" id="initial-focus-id" />
                    <button data-testid="item-2" />
                </div>
            </InitialFocus>,
        );

        // Act
        const firstFocusableElement = screen.getByTestId("item-0");

        // Fast-forward until all timers have been executed
        jest.runAllTimers();

        // Assert
        expect(firstFocusableElement).toHaveFocus();
    });

    it("should try to focus on the container if no focusable elements are found", () => {
        // Arrange
        render(
            <InitialFocus>
                <div data-testid="container">
                    <p>no focusable elements here</p>
                </div>
            </InitialFocus>,
        );

        // Act
        const firstFocusableElement = screen.getByTestId("container");

        // Fast-forward until all timers have been executed
        jest.runAllTimers();

        // Assert
        expect(firstFocusableElement).toHaveFocus();
    });

    it("should focus on a given element by id after a delay if a delay is provided", () => {
        // Arrange
        render(
            <InitialFocus initialFocusId="initial-focus-id" delay={100}>
                <div data-testid="container">
                    <button data-testid="item-0" />
                    <button data-testid="item-1" id="initial-focus-id" />
                    <button data-testid="item-2" />
                </div>
            </InitialFocus>,
        );

        // Act
        const firstFocusableElement = screen.getByTestId("item-1");

        // Fast-forward until all timers have been executed
        jest.runAllTimers();

        // Assert
        expect(firstFocusableElement).toHaveFocus();
    });

    it("should not focus on a given element by id before a delay if a delay is provided", () => {
        // Arrange
        render(
            <InitialFocus initialFocusId="initial-focus-id" delay={100}>
                <div data-testid="container">
                    <button data-testid="item-0" />
                    <button data-testid="item-1" id="initial-focus-id" />
                    <button data-testid="item-2" />
                </div>
            </InitialFocus>,
        );

        // Act
        const firstFocusableElement = screen.getByTestId("item-1");
        // We don't fast forward the timers here intentionally

        // Assert
        expect(firstFocusableElement).not.toHaveFocus();
    });
});
