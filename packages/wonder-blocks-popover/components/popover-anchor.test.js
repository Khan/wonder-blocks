// @flow
import * as React from "react";

import {mount} from "../../../utils/testing/mount.js";
import PopoverAnchor from "./popover-anchor.js";

describe("PopoverAnchor", () => {
    it("should set child node as ref", () => {
        // Arrange
        const updateRef = jest.fn();

        const wrapper = mount(
            <PopoverAnchor anchorRef={updateRef} onClick={jest.fn()}>
                <button data-anchor>test</button>
            </PopoverAnchor>,
        );

        // Act
        const triggerElement = wrapper.find("[data-anchor]").getDOMNode();

        // Assert
        expect(updateRef).toBeCalledWith(triggerElement);
    });

    it("should add onClick handler if child is a Node", () => {
        // Arrange
        const onClickMock = jest.fn();

        const wrapper = mount(
            <PopoverAnchor anchorRef={jest.fn()} onClick={onClickMock}>
                <button data-anchor>test</button>
            </PopoverAnchor>,
        );

        // Act
        wrapper.find("[data-anchor]").simulate("click");

        // Assert
        expect(onClickMock).toBeCalled();
    });
});
