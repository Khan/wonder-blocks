import * as React from "react";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import OptionItem from "../../components/option-item";
import {
    debounce,
    getLabel,
    getSelectOpenerLabel,
    getStringForKey,
} from "../helpers";

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

describe("getLabel", () => {
    it("should return the label if it is a string", () => {
        // Arrange
        const props: PropsFor<typeof OptionItem> = {
            label: "label",
            value: "foo",
        };

        // Act
        const label = getLabel(props);

        // Assert
        expect(label).toBe("label");
    });

    it("should return the value of labelAsText if `label` is a Node", () => {
        // Arrange
        const props: PropsFor<typeof OptionItem> = {
            label: <div>a custom node</div>,
            labelAsText: "plain text",
            value: "foo",
        };

        // Act
        const label = getLabel(props);

        // Assert
        expect(label).toBe("plain text");
    });

    it("should return empty if `label` is a Node and `labelAsText` is not defined", () => {
        // Arrange
        const props: PropsFor<typeof OptionItem> = {
            label: <div>a custom node</div>,
            labelAsText: undefined,
            value: "foo",
        };

        // Act
        const label = getLabel(props);

        // Assert
        expect(label).toBe("");
    });
});

describe("getSelectorLabel", () => {
    it("should return the label if the label is a Node and labelAsText is not defined", () => {
        // Arrange
        const props: PropsFor<typeof OptionItem> = {
            label: <div>a custom node</div>,
            labelAsText: undefined,
            value: "foo",
        };

        // Act
        const label = getSelectOpenerLabel(props);

        // Assert
        expect(label).toStrictEqual(<div>a custom node</div>);
    });

    it("should return a string if the label is a string", () => {
        // Arrange
        const props: PropsFor<typeof OptionItem> = {
            label: "option 1",
            value: "foo",
        };

        // Act
        const label = getSelectOpenerLabel(props);

        // Assert
        expect(label).toBe("option 1");
    });

    it("should return a string if the label is a Node and labelAsText is defined", () => {
        // Arrange
        const props: PropsFor<typeof OptionItem> = {
            label: <div>a custom node</div>,
            labelAsText: "plain text",
            value: "foo",
        };

        // Act
        const label = getSelectOpenerLabel(props);

        // Assert
        expect(label).toBe("plain text");
    });
});
