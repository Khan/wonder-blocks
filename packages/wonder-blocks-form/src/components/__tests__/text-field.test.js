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
            <TextField id="tf-1" value="" onChange={() => void 0} />,
        );

        // Act
        wrapper.simulate("focus");

        // Assert
        expect(wrapper).toHaveState("focused", true);
    });

    it("textfield is blurred", async () => {
        // Arrange
        const wrapper = mount(
            <TextField id="tf-1" value="" onChange={() => void 0} />,
        );

        // Act
        wrapper.simulate("focus");
        await wait(0);
        wrapper.simulate("blur");

        // Assert
        expect(wrapper).toHaveState("focused", false);
    });

    it("id prop is passed to input", () => {
        // Arrange
        const id: string = "tf-1";

        // Act
        const wrapper = mount(
            <TextField
                id={id}
                value=""
                onChange={() => void 0}
                disabled={true}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toHaveProp("id", id);
    });

    it("type prop is passed to input", () => {
        // Arrange
        const type = "number";

        // Act
        const wrapper = mount(
            <TextField
                id={"tf-1"}
                type={type}
                value=""
                onChange={() => void 0}
                disabled={true}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toHaveProp("type", type);
    });

    it("value prop is passed to input", () => {
        // Arrange
        const value = "Text";

        // Act
        const wrapper = mount(
            <TextField
                id={"tf-1"}
                value={value}
                onChange={() => void 0}
                disabled={true}
            />,
        );

        // Assert
        const input = wrapper.find("input");
        expect(input).toHaveValue(value);
    });

    it("disabled prop is true", () => {
        // Arrange
        const wrapper = mount(
            <TextField
                id="tf-1"
                value=""
                onChange={() => void 0}
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
            <TextField
                id={"tf-1"}
                value="Text"
                onChange={handleOnChange}
                disabled={true}
            />,
        );

        // Act
        wrapper.simulate("change", {target: {value: "Text2"}});

        // Assert
        expect(handleOnChange).toHaveBeenCalled();
    });
});
