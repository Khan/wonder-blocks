import {describe, it, expect, afterEach} from "@jest/globals";
import {act, renderHook} from "@testing-library/react";

import {useEscapeKeyupCapture} from "../use-escape-keyup-capture";

describe("useEscapeKeyupCapture", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns a ref object with current initially false", () => {
        // Arrange
        // Act
        const {result} = renderHook(() => useEscapeKeyupCapture());

        // Assert
        expect(result.current).toHaveProperty("current", false);
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

    it("stops propagation when ref is true and Escape keyup fires", () => {
        // Arrange
        const {result} = renderHook(() => useEscapeKeyupCapture());
        result.current.current = true;
        const event = new KeyboardEvent("keyup", {
            key: "Escape",
            bubbles: true,
        });
        const stopPropagationSpy = jest.spyOn(event, "stopPropagation");

        // Act
        act(() => {
            window.dispatchEvent(event);
        });

        // Assert
        expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it("sets ref to false when ref is true and Escape keyup fires", () => {
        // Arrange
        const {result} = renderHook(() => useEscapeKeyupCapture());
        result.current.current = true;
        const event = new KeyboardEvent("keyup", {
            key: "Escape",
            bubbles: true,
        });

        // Act
        act(() => {
            window.dispatchEvent(event);
        });

        // Assert
        expect(result.current.current).toBe(false);
    });

    it("does not stop propagation when ref is false and Escape keyup fires", () => {
        // Arrange
        renderHook(() => useEscapeKeyupCapture());
        const event = new KeyboardEvent("keyup", {
            key: "Escape",
            bubbles: true,
        });
        const stopPropagationSpy = jest.spyOn(event, "stopPropagation");

        // Act
        act(() => {
            window.dispatchEvent(event);
        });

        // Assert
        expect(stopPropagationSpy).not.toHaveBeenCalled();
    });

    it("does not stop propagation for non-Escape keyup when ref is true", () => {
        // Arrange
        const {result} = renderHook(() => useEscapeKeyupCapture());
        result.current.current = true;
        const event = new KeyboardEvent("keyup", {key: "Enter", bubbles: true});
        const stopPropagationSpy = jest.spyOn(event, "stopPropagation");

        // Act
        act(() => {
            window.dispatchEvent(event);
        });

        // Assert
        expect(stopPropagationSpy).not.toHaveBeenCalled();
    });

    it("leaves ref true when non-Escape keyup fires", () => {
        // Arrange
        const {result} = renderHook(() => useEscapeKeyupCapture());
        result.current.current = true;
        const event = new KeyboardEvent("keyup", {key: "Enter", bubbles: true});

        // Act
        act(() => {
            window.dispatchEvent(event);
        });

        // Assert
        expect(result.current.current).toBe(true);
    });
});
