//@flow
import * as React from "react";
import {mount} from "enzyme";

import {StyleSheet} from "aphrodite";
import LabeledTextField from "../labeled-text-field.js";

const wait = (delay: number = 0) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-restricted-syntax
        return setTimeout(resolve, delay);
    });

describe("LabeledTextField", () => {
    it("labeledtextfield becomes focused", () => {
        // Arrange
        const wrapper = mount(
            <LabeledTextField label="Label" value="" onChange={() => {}} />,
        );
        const field = wrapper.find("TextFieldInternal");

        // Act
        field.simulate("focus");

        // Assert
        expect(wrapper.find("LabeledTextFieldInternal")).toHaveState(
            "focused",
            true,
        );
    });

    it("labeledtextfield becomes blurred", async () => {
        // Arrange
        const wrapper = mount(
            <LabeledTextField label="Label" value="" onChange={() => {}} />,
        );
        const field = wrapper.find("TextFieldInternal");

        // Act
        field.simulate("focus");
        await wait(0);
        field.simulate("blur");

        // Assert
        expect(wrapper.find("LabeledTextFieldInternal")).toHaveState(
            "focused",
            false,
        );
    });

    it("id prop is passed to input", () => {
        // Arrange
        const id = "exampleid";

        // Act
        const wrapper = mount(
            <LabeledTextField
                id={id}
                label="Label"
                value=""
                onChange={() => {}}
                disabled={true}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(`[id="${id}-field"]`);
    });

    it("auto-generated id is passed to input when id prop is not set", () => {
        // Arrange

        // Act
        const wrapper = mount(
            <LabeledTextField label="Label" value="" onChange={() => {}} />,
        );

        // Assert
        // Since the generated id is unique, we cannot know what it will be.
        // We only test if the id attribute starts with "uid-" and ends with "-field".
        const input = wrapper.find("input");
        expect(input.props()["id"]).toMatch(/uid-.*-field/);
    });

    it("type prop is passed to input", () => {
        // Arrange
        const type = "email";

        // Act
        const wrapper = mount(
            <LabeledTextField
                type={type}
                label="Label"
                value=""
                onChange={() => {}}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(`[type="${type}"]`);
    });

    it("label prop is rendered", () => {
        // Arrange
        const label = "Label";

        // Act
        const wrapper = mount(
            <LabeledTextField label={label} value="" onChange={() => {}} />,
        );

        // Assert
        expect(wrapper).toIncludeText(label);
    });

    it("description prop is rendered", () => {
        // Arrange
        const description = "Description";

        // Act
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                description={description}
                value=""
                onChange={() => {}}
            />,
        );

        // Assert
        expect(wrapper).toIncludeText(description);
    });

    it("value prop is set on mount", () => {
        // Arrange
        const value = "Value";

        // Act
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value={value}
                onChange={() => {}}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toHaveValue(value);
    });

    it("value prop change from parent reflects on input value", async () => {
        // Arrange
        const handleChange = jest.fn((newValue: string) => {});

        const wrapper = mount(
            <LabeledTextField label="Label" value="" onChange={handleChange} />,
        );

        // Act
        const newValue = "new value";
        wrapper.setProps({value: newValue});

        // Assert
        const input = wrapper.find("input");
        expect(input).toHaveValue(newValue);
    });

    it("disabled prop disables the input", () => {
        // Arrange

        // Act
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                disabled={true}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toBeDisabled();
    });

    it("validate prop is called when input changes", () => {
        // Arrange
        const validate = jest.fn((value: string): ?string => {});
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                validate={validate}
            />,
        );

        // Act
        const newValue = "New Value";
        const input = wrapper.find("input");
        input.simulate("change", {target: {value: newValue}});

        // Assert
        expect(validate).toHaveBeenCalledWith(newValue);
    });

    it("onValidate prop is called on new validated input", () => {
        // Arrange
        const handleValidate = jest.fn((errorMessage: ?string) => {});
        const errorMessage = "Password must be at least 8 characters long";

        const validate = (value: string): ?string => {
            if (value.length < 8) {
                return errorMessage;
            }
        };

        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value="LongerThan8Chars"
                onChange={() => {}}
                validate={validate}
                onValidate={handleValidate}
            />,
        );

        // Act
        const input = wrapper.find("input");
        input.simulate("change", {target: {value: "Short"}});

        // Assert
        expect(handleValidate).toHaveBeenCalledWith(errorMessage);
    });

    it("onChange prop is called on input change", () => {
        // Arrange
        const handleChange = jest.fn((newValue: string) => {});

        const wrapper = mount(
            <LabeledTextField label="Label" value="" onChange={handleChange} />,
        );

        // Act
        const newValue = "new value";
        const input = wrapper.find("input");
        input.simulate("change", {target: {value: newValue}});

        // Assert
        expect(handleChange).toHaveBeenCalledWith(newValue);
    });

    it("onKeyDown prop is called on keyboard keypress", () => {
        // Arrange
        const handleKeyDown = jest.fn(
            (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
                return event.key;
            },
        );

        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                onKeyDown={handleKeyDown}
            />,
        );

        // Act
        const key = "Enter";
        const input = wrapper.find("input");
        input.simulate("keyDown", {key: key});

        // Assert
        expect(handleKeyDown).toHaveReturnedWith(key);
    });

    it("onFocus prop is called when field is focused", () => {
        // Arrange
        const handleFocus = jest.fn(() => {});
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                onFocus={handleFocus}
            />,
        );

        // Act
        const field = wrapper.find("TextFieldInternal");
        field.simulate("focus");

        // Assert
        expect(handleFocus).toHaveBeenCalled();
    });

    it("onBlur prop is called when field is blurred", async () => {
        // Arrange
        const handleBlur = jest.fn(() => {});
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                onBlur={handleBlur}
            />,
        );

        // Act
        const field = wrapper.find("TextFieldInternal");
        field.simulate("focus");
        await wait(0);
        field.simulate("blur");

        // Assert
        expect(handleBlur).toHaveBeenCalled();
    });

    it("placeholder prop is passed to input", async () => {
        // Arrange
        const placeholder = "Placeholder";

        // Act
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                placeholder={placeholder}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(
            `[placeholder="${placeholder}"]`,
        );
    });

    it("light prop is passed to textfield", async () => {
        // Arrange

        // Act
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                light={true}
            />,
        );

        // Assert
        const textField = wrapper.find("TextFieldInternal");
        expect(textField).toHaveProp("light", true);
    });

    it("style prop is passed to fieldheading", async () => {
        // Arrange
        const styles = StyleSheet.create({
            style1: {
                minWidth: 250,
                background: "blue",
            },
        });

        // Act
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                style={styles.style1}
            />,
        );

        // Assert
        const fieldHeading = wrapper.find("FieldHeading");
        expect(fieldHeading).toHaveStyle(styles.style1);
    });

    it("testId prop is passed to textfield", async () => {
        // Arrange
        const testId = "example-testid";

        // Act
        const wrapper = mount(
            <LabeledTextField
                label="Label"
                value=""
                onChange={() => {}}
                testId={testId}
            />,
        );

        // Assert
        const textField = wrapper.find(`[data-test-id="${testId}-field"]`);
        expect(textField).toExist();
    });
});
