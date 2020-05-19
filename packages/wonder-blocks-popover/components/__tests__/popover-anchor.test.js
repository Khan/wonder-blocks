// @flow
import * as React from "react";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";
import PopoverAnchor from "../popover-anchor.js";

describe("PopoverAnchor", () => {
    afterEach(() => {
        unmountAll();
    });

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

    it("should add onClick handler if child is a function", () => {
        // Arrange
        const onClickMock = jest.fn();

        const wrapper = mount(
            <PopoverAnchor anchorRef={jest.fn()} onClick={onClickMock}>
                {({open}) => (
                    <button onClick={open} data-anchor>
                        open
                    </button>
                )}
            </PopoverAnchor>,
        );

        // Act
        wrapper.find("[data-anchor]").simulate("click");

        // Assert
        expect(onClickMock).toBeCalled();
    });

    it("should add onClick handler if child is a Node", () => {
        // Arrange
        const onClickMock = jest.fn();
        const onClickInnerMock = jest.fn();

        const wrapper = mount(
            <PopoverAnchor anchorRef={jest.fn()} onClick={onClickMock}>
                <button onClick={onClickInnerMock} data-anchor>
                    test
                </button>
            </PopoverAnchor>,
        );

        // Act
        wrapper.find("[data-anchor]").simulate("click");

        // Assert
        // both custom and internal click should be called
        expect(onClickInnerMock).toBeCalled();
        expect(onClickMock).toBeCalled();
    });
});
