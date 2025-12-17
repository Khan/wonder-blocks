import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import PopoverAnchor from "../popover-anchor";

describe("PopoverAnchor", () => {
    it("should set child node as ref", async () => {
        // Arrange
        const ref = React.createRef<HTMLElement>();

        // Act
        render(
            <PopoverAnchor ref={ref} onClick={jest.fn()}>
                <button>test</button>
            </PopoverAnchor>,
        );

        // Act
        const triggerElement = await screen.findByRole("button");

        // Assert
        expect(ref.current).toBe(triggerElement);
    });

    it("should allow passing a custom ref to the child", async () => {
        // Arrange
        const ref = React.createRef<HTMLButtonElement>();

        // Act
        render(
            <PopoverAnchor onClick={jest.fn()}>
                <button ref={ref}>test</button>
            </PopoverAnchor>,
        );

        // Assert
        const triggerElement = await screen.findByRole("button");
        expect(ref.current).toBe(triggerElement);
    });

    it("should allow passing a custom ref to the child with children as a function", async () => {
        // Arrange
        const ref = React.createRef<HTMLButtonElement>();

        // Act
        render(
            <PopoverAnchor onClick={jest.fn()}>
                {({open}: any) => (
                    <button ref={ref} onClick={open}>
                        test
                    </button>
                )}
            </PopoverAnchor>,
        );

        // Assert
        const triggerElement = await screen.findByRole("button");
        expect(ref.current).toBe(triggerElement);
    });

    it("should add onClick handler if child is a function", async () => {
        // Arrange
        const onClickMock = jest.fn();

        render(
            <PopoverAnchor onClick={onClickMock}>
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
            <PopoverAnchor onClick={onClickMock}>
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
