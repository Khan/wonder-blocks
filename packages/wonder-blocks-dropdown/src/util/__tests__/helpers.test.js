// @flow
import {debounce, getStringForKey} from "../helpers.js";

describe("getStringForKey", () => {
    it("should get a valid string", () => {
        // Arrange

        // Act
        const key = getStringForKey("a");

        // Assert
        expect(key).toBe("a");
    });

    it("should return empty if we use a glyph modifier key (e.g. Shift)", () => {
        // Arrange

        // Act
        const key = getStringForKey("Shift");

        // Assert
        expect(key).toBe("");
    });
});

describe("debounce", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("should call the debounced function", () => {
        // Arrange
        const callbackFnMock = jest.fn();
        const debounced = debounce(callbackFnMock, 500);

        // Act
        debounced();
        jest.advanceTimersByTime(501);

        // Assert
        expect(callbackFnMock).toHaveBeenCalled();
    });

    it("should call the debounced function only once", () => {
        // Arrange
        const callbackFnMock = jest.fn();
        const debounced = debounce(callbackFnMock, 500);

        // Act
        debounced();
        debounced();
        debounced();
        jest.advanceTimersByTime(501);

        // Assert
        expect(callbackFnMock).toHaveBeenCalledTimes(1);
    });

    it("should execute the last call with the exact args", () => {
        // Arrange
        const callbackFnMock = jest.fn();
        const debounced = debounce(callbackFnMock, 500);

        // Act
        debounced("a");
        debounced("ab");
        debounced("abc");
        jest.advanceTimersByTime(501);

        // Assert
        expect(callbackFnMock).toHaveBeenCalledWith("abc");
    });
});
