// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PopoverAnchor from "../popover-anchor";

describe("PopoverAnchor", () => {
    it("should set child node as ref", () => {
        // Arrange
        const updateRef = jest.fn();

        render(
            <PopoverAnchor anchorRef={updateRef} onClick={jest.fn()}>
                <button>test</button>
            </PopoverAnchor>,
        );

        // Act
        const triggerElement = screen.getByRole("button");

        // Assert
        expect(updateRef).toBeCalledWith(triggerElement);
    });

    it("should add onClick handler if child is a function", () => {
        // Arrange
        const onClickMock = jest.fn();

        render(
            <PopoverAnchor anchorRef={jest.fn()} onClick={onClickMock}>
                {({open}) => <button onClick={open}>open</button>}
            </PopoverAnchor>,
        );

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(onClickMock).toBeCalled();
    });

    it("should add onClick handler if child is a Node", () => {
        // Arrange
        const onClickMock = jest.fn();
        const onClickInnerMock = jest.fn();

        render(
            <PopoverAnchor anchorRef={jest.fn()} onClick={onClickMock}>
                <button onClick={onClickInnerMock}>test</button>
            </PopoverAnchor>,
        );

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        // both custom and internal click should be called
        expect(onClickInnerMock).toBeCalled();
        expect(onClickMock).toBeCalled();
    });
});
