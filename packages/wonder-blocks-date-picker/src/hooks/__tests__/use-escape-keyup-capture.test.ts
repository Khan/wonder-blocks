import {describe, it, expect, afterEach} from "@jest/globals";
import {act, renderHook} from "@testing-library/react";

import {useEscapeKeyupCapture} from "../use-escape-keyup-capture";

describe("useEscapeKeyupCapture", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns an object with handleEscapeKeyDown function", () => {
        // Arrange
        // Act
        const {result} = renderHook(() => useEscapeKeyupCapture());

        // Assert
        expect(result.current).toHaveProperty("handleEscapeKeyDown");
        expect(typeof result.current.handleEscapeKeyDown).toBe("function");
    });

    it("registers a keyup listener in capture phase", () => {
        // Arrange
        const addSpy = jest.spyOn(window, "addEventListener");

        // Act
        renderHook(() => useEscapeKeyupCapture());

        // Assert
        expect(addSpy).toHaveBeenCalledWith(
            "keyup",
            expect.any(Function),
            true,
        );
    });

    it("removes keyup listener on unmount", () => {
        // Arrange
        const addSpy = jest.spyOn(window, "addEventListener");
        const removeSpy = jest.spyOn(window, "removeEventListener");
        const {unmount} = renderHook(() => useEscapeKeyupCapture());
        const captureHandler = addSpy.mock.calls[0][1];

        // Act
        unmount();

        // Assert
        expect(removeSpy).toHaveBeenCalledWith("keyup", captureHandler, true);
    });

    it("stops keyup propagation when handleEscapeKeyDown was called then Escape keyup fires", () => {
        // Arrange
        const {result} = renderHook(() => useEscapeKeyupCapture());
        const keydownEvent = new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
        });
        act(() => {
            result.current.handleEscapeKeyDown(keydownEvent);
        });
        const keyupEvent = new KeyboardEvent("keyup", {
            key: "Escape",
            bubbles: true,
        });
        const stopPropagationSpy = jest.spyOn(keyupEvent, "stopPropagation");

        // Act
        act(() => {
            window.dispatchEvent(keyupEvent);
        });

        // Assert
        expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it("calls onHandled callback when handleEscapeKeyDown is invoked", () => {
        // Arrange
        const {result} = renderHook(() => useEscapeKeyupCapture());
        const keydownEvent = new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
        });
        const onHandled = jest.fn();

        // Act
        act(() => {
            result.current.handleEscapeKeyDown(keydownEvent, onHandled);
        });

        // Assert
        expect(onHandled).toHaveBeenCalledTimes(1);
    });

    it("does not stop keyup propagation when handleEscapeKeyDown was not called", () => {
        // Arrange
        renderHook(() => useEscapeKeyupCapture());
        const keyupEvent = new KeyboardEvent("keyup", {
            key: "Escape",
            bubbles: true,
        });
        const stopPropagationSpy = jest.spyOn(keyupEvent, "stopPropagation");

        // Act
        act(() => {
            window.dispatchEvent(keyupEvent);
        });

        // Assert
        expect(stopPropagationSpy).not.toHaveBeenCalled();
    });

    it("does not stop propagation for non-Escape keyup after handleEscapeKeyDown was called", () => {
        // Arrange
        const {result} = renderHook(() => useEscapeKeyupCapture());
        const keydownEvent = new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
        });
        act(() => {
            result.current.handleEscapeKeyDown(keydownEvent);
        });
        const keyupEvent = new KeyboardEvent("keyup", {
            key: "Enter",
            bubbles: true,
        });
        const stopPropagationSpy = jest.spyOn(keyupEvent, "stopPropagation");

        // Act
        act(() => {
            window.dispatchEvent(keyupEvent);
        });

        // Assert
        expect(stopPropagationSpy).not.toHaveBeenCalled();
    });

    it("stops keydown propagation when handleEscapeKeyDown is called", () => {
        // Arrange
        const {result} = renderHook(() => useEscapeKeyupCapture());
        const keydownEvent = new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
        });
        const stopPropagationSpy = jest.spyOn(keydownEvent, "stopPropagation");

        // Act
        act(() => {
            result.current.handleEscapeKeyDown(keydownEvent);
        });

        // Assert
        expect(stopPropagationSpy).toHaveBeenCalled();
    });
});
