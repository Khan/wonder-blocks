import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import PopoverAnchor from "../popover-anchor";

describe("PopoverAnchor", () => {
    it("should set child node as ref", async () => {
        // Arrange
        const updateRef = jest.fn();

        render(
            <PopoverAnchor anchorRef={updateRef} onClick={jest.fn()}>
                <button>test</button>
            </PopoverAnchor>,
        );

        // Act
        const triggerElement = await screen.findByRole("button");

        // Assert
        expect(updateRef).toBeCalledWith(triggerElement);
    });

    it("should add onClick handler if child is a function", async () => {
        // Arrange
        const onClickMock = jest.fn();

        render(
            <PopoverAnchor anchorRef={jest.fn()} onClick={onClickMock}>
                {({open}: any) => <button onClick={open}>open</button>}
            </PopoverAnchor>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(onClickMock).toBeCalled();
    });

    it("should add onClick handler if child is a Node", async () => {
        // Arrange
        const onClickMock = jest.fn();
        const onClickInnerMock = jest.fn();

        render(
            <PopoverAnchor anchorRef={jest.fn()} onClick={onClickMock}>
                <button onClick={onClickInnerMock}>test</button>
            </PopoverAnchor>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        // both custom and internal click should be called
        expect(onClickInnerMock).toBeCalled();
        expect(onClickMock).toBeCalled();
    });
});
