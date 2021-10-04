// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
// eslint-disable-next-line import/no-unassigned-import
import "@testing-library/jest-dom/extend-expect";

import InitialFocus from "../initial-focus.js";

describe("InitialFocus", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("should try to focus on a given element by id", () => {
        // Arrange
        render(
            <InitialFocus initialFocusId="initial-focus-id">
                <div data-test-id="container">
                    <button data-test-id="item-0" />
                    <button data-test-id="item-1" id="initial-focus-id" />
                    <button data-test-id="item-2" />
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
                <div data-test-id="container">
                    <button data-test-id="item-0" />
                    <button data-test-id="item-1" id="initial-focus-id" />
                    <button data-test-id="item-2" />
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
                <div data-test-id="container">
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
});
