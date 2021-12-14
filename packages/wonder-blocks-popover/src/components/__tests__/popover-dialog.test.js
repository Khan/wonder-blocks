// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";

import {TooltipTail} from "@khanacademy/wonder-blocks-tooltip";

import PopoverDialog from "../popover-dialog.js";
import PopoverContentCore from "../popover-content-core.js";

jest.mock("@khanacademy/wonder-blocks-tooltip");

describe("PopoverDialog", () => {
    it("should update the tail color to match the content's color", () => {
        // Arrange
        const onUpdateMock = jest.fn();

        // Act
        const wrapper = mount(
            <PopoverDialog placement="top" onUpdate={onUpdateMock}>
                <PopoverContentCore color="darkBlue">
                    popover content
                </PopoverContentCore>
            </PopoverDialog>,
        );

        // Assert
        expect(wrapper.find(TooltipTail).prop("color")).toBe("darkBlue");
    });

    it("should call onUpdate if placement is changed", () => {
        // Arrange
        const onUpdateMock = jest.fn();

        const wrapper = mount(
            <PopoverDialog placement="top" onUpdate={onUpdateMock}>
                <PopoverContentCore>popover content</PopoverContentCore>
            </PopoverDialog>,
        );

        // Act
        wrapper.setProps({placement: "bottom"});

        // Assert
        expect(onUpdateMock).toBeCalledWith("bottom");
    });

    it("should not call onUpdate if placement remains the same", () => {
        // Arrange
        const onUpdateMock = jest.fn();

        const wrapper = mount(
            <PopoverDialog placement="top" onUpdate={onUpdateMock}>
                <PopoverContentCore>popover content</PopoverContentCore>
            </PopoverDialog>,
        );

        // Act
        wrapper.setProps({placement: "top"});

        // Assert
        expect(onUpdateMock).not.toBeCalled();
    });
});
