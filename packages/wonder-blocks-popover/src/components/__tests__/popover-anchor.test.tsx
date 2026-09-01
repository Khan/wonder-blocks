import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {FloatingReferenceAttributeName} from "@khanacademy/wonder-blocks-floating";

import PopoverAnchor from "../popover-anchor";

describe("PopoverAnchor", () => {
    it("should pass the floating reference attribute to the child", async () => {
        // Arrange
        // `Floating` injects this attribute into the anchor to identify the
        // trigger's element in the DOM.
        const referenceProps = {
            [FloatingReferenceAttributeName]: "reference-id",
        };

        // Act
        render(
            <PopoverAnchor onClick={jest.fn()} {...referenceProps}>
                <button>test</button>
            </PopoverAnchor>,
        );

        // Assert
        const triggerElement = await screen.findByRole("button");
        expect(triggerElement).toHaveAttribute(
            FloatingReferenceAttributeName,
            "reference-id",
        );
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

    it("should pass the floating reference attribute to a child that can't receive a ref", async () => {
        // Arrange
        // A plain function component can't receive a ref, so it only spreads
        // the props it is given onto the element it renders.
        function FunctionComponentTrigger(props: {label: string}) {
            const {label, ...otherProps} = props;
            return <button {...otherProps}>{label}</button>;
        }
        const referenceProps = {
            [FloatingReferenceAttributeName]: "reference-id",
        };

        // Act
        render(
            <PopoverAnchor onClick={jest.fn()} {...referenceProps}>
                <FunctionComponentTrigger label="test" />
            </PopoverAnchor>,
        );

        // Assert
        const triggerElement = await screen.findByRole("button");
        expect(triggerElement).toHaveAttribute(
            FloatingReferenceAttributeName,
            "reference-id",
        );
    });

    it("should not inject a ref into a function component trigger", async () => {
        // Arrange
        const consoleErrorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});
        // A plain function component can't receive a ref, so React would warn
        // about `Function components cannot be given refs` if the anchor
        // injected a ref into the trigger.
        function FunctionComponentTrigger(props: {label: string}) {
            const {label, ...otherProps} = props;
            return <button {...otherProps}>{label}</button>;
        }

        // Act
        render(
            <PopoverAnchor onClick={jest.fn()}>
                <FunctionComponentTrigger label="test" />
            </PopoverAnchor>,
        );

        // Assert
        expect(consoleErrorSpy).not.toHaveBeenCalled();
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
