//@flow
import * as React from "react";
import {mount} from "enzyme";

import LabeledTextField from "../labeled-text-field.js";

const wait = (delay: number = 0) =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-restricted-syntax
        return setTimeout(resolve, delay);
    });

describe("LabeledTextField", () => {
    it("labeledtextfield becomes focused", () => {
        // Arrange
        const wrapper = mount(<LabeledTextField label="Label" />);
        const field = wrapper.find("TextField");

        // Act
        field.simulate("focus");

        // Assert
        expect(wrapper).toHaveState("focused", true);
    });

    it("labeledtextfield becomes blurred", async () => {
        // Arrange
        const wrapper = mount(<LabeledTextField label="Label" />);
        const field = wrapper.find("TextField");

        // Act
        field.simulate("focus");
        await wait(0);
        field.simulate("blur");

        // Assert
        expect(wrapper).toHaveState("focused", false);
    });

    it("value state changes when the user types", () => {
        // Arrange
        const wrapper = mount(<LabeledTextField label="Label" />);
        const input = wrapper.find("input");

        // Act
        const newValue = "New Value";
        input.simulate("change", {target: {value: newValue}});

        // Assert
        expect(wrapper).toHaveState("value", newValue);
    });

    it("id prop is passed to input", () => {
        // Arrange
        const id = "exampleid";

        // Act
        const wrapper = mount(
            <LabeledTextField id={id} label="Label" disabled={true} />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(`[id="${id}-field"]`);
    });

    it("auto-generated id is passed to input when id prop is not set", () => {
        // Arrange

        // Act
        const wrapper = mount(<LabeledTextField label="Label" />);

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
        const wrapper = mount(<LabeledTextField type={type} label="Label" />);

        // Assert
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement(`[type="${type}"]`);
    });

    it("label prop is rendered", () => {
        // Arrange
        const label = "Label";

        // Act
        const wrapper = mount(<LabeledTextField label={label} />);

        // Assert
        expect(wrapper).toIncludeText(label);
    });

    it("description prop is rendered", () => {
        // Arrange
        const description = "Description";

        // Act
        const wrapper = mount(
            <LabeledTextField label="Label" description={description} />,
        );

        // Assert
        expect(wrapper).toIncludeText(description);
    });

    it("initialValue prop is set on mount", () => {
        // Arrange
        const initialValue = "Value";

        // Act
        const wrapper = mount(
            <LabeledTextField initialValue={initialValue} label="Label" />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toHaveValue(initialValue);
    });

    it("disabled prop disables the input", () => {
        // Arrange

        // Act
        const wrapper = mount(
            <LabeledTextField label="Label" disabled={true} />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toBeDisabled();
    });

    it("validation prop is called when input changes", () => {
        // Arrange
        const validation = jest.fn((value: string): ?string => {});
        const wrapper = mount(
            <LabeledTextField label="Label" validation={validation} />,
        );

        // Act
        const newValue = "New Value";
        const input = wrapper.find("input");
        input.simulate("change", {target: {value: newValue}});

        // Assert
        expect(validation).toHaveBeenCalledWith(newValue);
    });

    it("onValidation prop is called on new validated input", () => {
        // Arrange
        const handleValidation = jest.fn((errorMessage: ?string) => {});
        const errorMessage = "Password must be at least 8 characters long";

        const validation = (value: string): ?string => {
            if (value.length < 8) {
                return errorMessage;
            }
        };

        const wrapper = mount(
            <LabeledTextField
                label="Label"
                initialValue="LongerThan8Chars"
                validation={validation}
                onValidation={handleValidation}
            />,
        );

        // Act
        const input = wrapper.find("input");
        input.simulate("change", {target: {value: "Short"}});

        // Assert
        expect(handleValidation).toHaveBeenCalledWith(errorMessage);
    });

    it("onChange prop is called on input change", () => {
        // Arrange
        const handleChange = jest.fn((newValue: string) => {});

        const wrapper = mount(
            <LabeledTextField label="Label" onChange={handleChange} />,
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
            <LabeledTextField label="Label" onKeyDown={handleKeyDown} />,
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
            <LabeledTextField label="Label" onFocus={handleFocus} />,
        );

        // Act
        const field = wrapper.find("TextField");
        field.simulate("focus");

        // Assert
        expect(handleFocus).toHaveBeenCalled();
    });

    it("onBlur prop is called when field is blurred", async () => {
        // Arrange
        const handleBlur = jest.fn(() => {});
        const wrapper = mount(
            <LabeledTextField label="Label" onBlur={handleBlur} />,
        );

        // Act
        const field = wrapper.find("TextField");
        field.simulate("focus");
        await wait(0);
        field.simulate("blur");

        // Assert
        expect(handleBlur).toHaveBeenCalled();
    });
});
