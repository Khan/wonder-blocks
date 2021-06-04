// @flow
import * as React from "react";
import {mount} from "enzyme";

import TextField from "../text-field.js";

const wait = (delay: number = 0) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-restricted-syntax
        return setTimeout(resolve, delay);
    });

describe("TextField", () => {
    it("textfield is focused", () => {
        // Arrange
        const wrapper = mount(
            <TextField id="tf-1" value="" onChange={() => {}} />,
        );

        // Act
        wrapper.simulate("focus");

        // Assert
        expect(wrapper).toHaveState("focused", true);
    });

    it("onFocus is called after textfield is focused", () => {
        // Arrange
        const handleOnFocus = jest.fn(() => {});

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                onChange={() => {}}
                onFocus={handleOnFocus}
            />,
        );

        // Act
        wrapper.simulate("focus");

        // Assert
        expect(handleOnFocus).toHaveBeenCalled();
    });

    it("textfield is blurred", async () => {
        // Arrange
        const wrapper = mount(
            <TextField id="tf-1" value="" onChange={() => {}} />,
        );

        // Act
        wrapper.simulate("focus");
        await wait(0);
        wrapper.simulate("blur");

        // Assert
        expect(wrapper).toHaveState("focused", false);
    });

    it("onBlur is called after textfield is blurred", async () => {
        // Arrange
        const handleOnBlur = jest.fn(() => {});

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                onChange={() => {}}
                onBlur={handleOnBlur}
            />,
        );

        // Act
        wrapper.simulate("focus");
        await wait(0);
        wrapper.simulate("blur");

        // Assert
        expect(handleOnBlur).toHaveBeenCalled();
    });

    it("id prop is passed to the input element", () => {
        // Arrange
        const id: string = "tf-1";

        // Act
        const wrapper = mount(
            <TextField id={id} value="" onChange={() => {}} />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(`[id="${id}"]`);
    });

    it("type prop is passed to the input element", () => {
        // Arrange
        const type = "number";

        // Act
        const wrapper = mount(
            <TextField id={"tf-1"} type={type} value="" onChange={() => {}} />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(`[type="${type}"]`);
    });

    it("value prop is passed to the input element", () => {
        // Arrange
        const value = "Text";

        // Act
        const wrapper = mount(
            <TextField id={"tf-1"} value={value} onChange={() => {}} />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(`[value="${value}"]`);
    });

    it("disabled prop disables the input element", () => {
        // Arrange
        const wrapper = mount(
            <TextField
                id="tf-1"
                value=""
                onChange={() => {}}
                disabled={true}
            />,
        );
        const input = wrapper.find("input");

        // Act

        // Assert
        expect(input).toBeDisabled();
    });

    it("onChange is called when value changes", () => {
        // Arrange
        const handleOnChange = jest.fn();

        const wrapper = mount(
            <TextField id={"tf-1"} value="Text" onChange={handleOnChange} />,
        );

        // Act
        const newValue = "Test2";
        wrapper.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleOnChange).toHaveBeenCalledWith(newValue);
    });

    it("validation is called when value changes", () => {
        // Arrange
        const handleValidation = jest.fn((value: string): ?string => {});

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="Text"
                validation={handleValidation}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "Text2";
        wrapper.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleValidation).toHaveBeenCalledWith(newValue);
    });

    it("validation is given a valid input", () => {
        // Arrange
        const handleValidation = jest.fn((value: string): ?string => {
            if (value.length < 8) {
                return "Value is too short";
            }
        });

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="TextIsLong"
                validation={handleValidation}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "TextIsLongerThan8";
        wrapper.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleValidation).toHaveReturnedWith(undefined);
    });

    it("validation is given an invalid input", () => {
        // Arrange
        const errorMessage = "Value is too short";
        const handleValidation = jest.fn((value: string): ?string => {
            if (value.length < 8) {
                return errorMessage;
            }
        });

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                validation={handleValidation}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "Text";
        wrapper.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleValidation).toHaveReturnedWith(errorMessage);
    });

    it("onValidation is called after input validation", () => {
        // Arrange
        const errorMessage = "Value is too short";
        const handleOnValidation = jest.fn((errorMessage: ?string) => {});
        const validation = jest.fn((value: string): ?string => {
            if (value.length < 8) {
                return errorMessage;
            }
        });

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                validation={validation}
                onValidation={handleOnValidation}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "Text";
        wrapper.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleOnValidation).toHaveBeenCalledWith(errorMessage);
    });

    it("onValidation is called on input's initial value", () => {
        // Arrange
        const errorMessage = "Value is too short";
        const handleOnValidation = jest.fn((errorMessage: ?string) => {});
        const validation = jest.fn((value: string): ?string => {
            if (value.length < 8) {
                return errorMessage;
            }
        });

        // Act
        mount(
            <TextField
                id={"tf-1"}
                value="Short"
                validation={validation}
                onValidation={handleOnValidation}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(handleOnValidation).toHaveBeenCalledWith(errorMessage);
    });

    it("onKeyDown is called after keyboard key press", () => {
        // Arrange
        const handleOnKeyDown = jest.fn(
            (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
                return event.key;
            },
        );

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                onChange={() => {}}
                onKeyDown={handleOnKeyDown}
            />,
        );

        // Act
        const key = "Enter";
        const input = wrapper.find("input");
        input.simulate("keyDown", {key: key});

        // Assert
        expect(handleOnKeyDown).toHaveReturnedWith(key);
    });

    it("placeholder prop is passed to the input element", () => {
        // Arrange
        const placeholder = "Placeholder";

        // Act
        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="Text"
                placeholder={placeholder}
                onChange={() => {}}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(
            `[placeholder="${placeholder}"]`,
        );
    });

    it("required prop is passed to the input element", () => {
        // Arrange
        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="Text"
                onChange={() => {}}
                required={true}
            />,
        );

        // Act

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement("[required=true]");
    });

    it("testId is passed to the input element", () => {
        // Arrange
        const testId = "some-test-id";
        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="Text"
                onChange={() => {}}
                testId={testId}
            />,
        );

        // Act

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(`[data-test-id="${testId}"]`);
    });

    it("aria props are passed to the input element", () => {
        // Arrange
        const ariaLabel = "example-text-field";
        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="Text"
                onChange={() => {}}
                aria-label={ariaLabel}
            />,
        );

        // Act

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(`[aria-label="${ariaLabel}"]`);
    });
});
