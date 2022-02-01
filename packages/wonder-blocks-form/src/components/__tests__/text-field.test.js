// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";

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
        expect(wrapper.find("TextFieldInternal")).toHaveState("focused", true);
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
        expect(wrapper.find("TextFieldInternal")).toHaveState("focused", false);
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

    it("validate is called when value changes", () => {
        // Arrange
        const handleValidate = jest.fn((value: string): ?string => {});

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="Text"
                validate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "Text2";
        wrapper.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(newValue);
    });

    it("validate is given a valid input", () => {
        // Arrange
        const handleValidate = jest.fn((value: string): ?string => {
            if (value.length < 8) {
                return "Value is too short";
            }
        });

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="TextIsLong"
                validate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "TextIsLongerThan8";
        wrapper.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleValidate).toHaveReturnedWith(undefined);
    });

    it("validate is given an invalid input", () => {
        // Arrange
        const errorMessage = "Value is too short";
        const handleValidate = jest.fn((value: string): ?string => {
            if (value.length < 8) {
                return errorMessage;
            }
        });

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                validate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "Text";
        wrapper.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleValidate).toHaveReturnedWith(errorMessage);
    });

    it("onValidate is called after input validate", () => {
        // Arrange
        const errorMessage = "Value is too short";
        const handleValidate = jest.fn((errorMessage: ?string) => {});
        const validate = jest.fn((value: string): ?string => {
            if (value.length < 8) {
                return errorMessage;
            }
        });

        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value="TextIsLongerThan8"
                validate={validate}
                onValidate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Act
        const newValue = "Text";
        wrapper.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(errorMessage);
    });

    it("onValidate is called on input's initial value", () => {
        // Arrange
        const errorMessage = "Value is too short";
        const handleValidate = jest.fn((errorMessage: ?string) => {});
        const validate = jest.fn((value: string): ?string => {
            if (value.length < 8) {
                return errorMessage;
            }
        });

        // Act
        mount(
            <TextField
                id={"tf-1"}
                value="Short"
                validate={validate}
                onValidate={handleValidate}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(errorMessage);
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

    it("readOnly prop is passed to the input element", async () => {
        // Arrange

        // Act
        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value={"Text"}
                onChange={() => {}}
                readOnly={true}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toHaveProp("readOnly");
    });

    it("autoComplete prop is passed to the input element", async () => {
        // Arrange
        const autoComplete = "name";

        // Act
        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value={"Text"}
                onChange={() => {}}
                autoComplete={autoComplete}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toHaveProp("autoComplete", autoComplete);
    });
});
