// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../../utils/testing/mount.js";

import InitialFocus from "../initial-focus.js";

describe("InitialFocus", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        unmountAll();
    });

    it("should try to focus on a given element by id", () => {
        // Arrange
        const wrapper = mount(
            <InitialFocus initialFocusId="initial-focus-id">
                <div data-container>
                    <button data-tab-index="0" />
                    <button data-tab-index="1" id="initial-focus-id" />
                    <button data-tab-index="2" />
                </div>
            </InitialFocus>,
        );

        // Act
        const firstFocusableElement = wrapper
            .find('[data-tab-index="1"]')
            .getDOMNode();

        // Fast-forward until all timers have been executed
        jest.runAllTimers();

        // Assert
        expect(document.activeElement).toBe(firstFocusableElement);
    });

    it("should try to focus on the first focusable element", () => {
        // Arrange
        const wrapper = mount(
            <InitialFocus>
                <div data-container>
                    <button data-tab-index="0" />
                    <button data-tab-index="1" />
                    <button data-tab-index="2" />
                </div>
            </InitialFocus>,
        );

        // Act
        const firstFocusableElement = wrapper
            .find('[data-tab-index="0"]')
            .getDOMNode();

        // Fast-forward until all timers have been executed
        jest.runAllTimers();

        // Assert
        expect(document.activeElement).toBe(firstFocusableElement);
    });

    it("should try to focus on the container if no focusable elements are found", () => {
        // Arrange
        const wrapper = mount(
            <InitialFocus>
                <div data-container>
                    <p>no focusable elements here</p>
                </div>
            </InitialFocus>,
        );

        // Act
        const firstFocusableElement = wrapper
            .find("[data-container]")
            .getDOMNode();

        // Fast-forward until all timers have been executed
        jest.runAllTimers();

        // Assert
        expect(document.activeElement).toBe(firstFocusableElement);
    });
});
