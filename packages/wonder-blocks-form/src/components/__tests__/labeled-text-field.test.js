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
        const wrapper = mount(<LabeledTextField />);
        const field = wrapper.find("TextField");

        // Act
        field.simulate("focus");

        // Assert
        expect(wrapper).toHaveState("focused", true);
    });

    it("labeledtextfield becomes blurred", async () => {
        // Arrange
        const wrapper = mount(<LabeledTextField />);
        const field = wrapper.find("TextField");

        // Act
        field.simulate("focus");
        await wait(0);
        field.simulate("blur");

        // Assert
        expect(wrapper).toHaveState("focused", false);
    });

    it("disabled prop disables the input", async () => {
        // Arrange

        // Act
        const wrapper = mount(<LabeledTextField disabled={true} />);

        // Assert
        const input = wrapper.find("input");
        expect(input).toBeDisabled();
    });
});
