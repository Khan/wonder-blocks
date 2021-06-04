//@flow
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
        const wrapper = mount(<TextField />);

        // Act
        wrapper.simulate("focus");

        // Assert
        expect(wrapper).toHaveState("focused", true);
    });

    it("textfield is blurred", async () => {
        // Arrange
        const wrapper = mount(<TextField />);

        // Act
        wrapper.simulate("focus");
        await wait(0);
        wrapper.simulate("blur");

        // Assert
        expect(wrapper).toHaveState("focused", false);
    });

    it("disabled prop is true", () => {
        // Arrange
        const wrapper = mount(<TextField disabled={true} />);
        const input = wrapper.find("input");

        // Act

        // Assert
        expect(input).toBeDisabled();
    });
});
