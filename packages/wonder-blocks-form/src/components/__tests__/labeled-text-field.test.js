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
        // Since the generated id is unique, we cannot know what it will be
        // so we only test if the id attribute is set.
        const input = wrapper.find("input");
        expect(input).toContainMatchingElement("[id]");
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
        expect(input).toContainMatchingElement(`[value="${initialValue}"]`);
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
});
