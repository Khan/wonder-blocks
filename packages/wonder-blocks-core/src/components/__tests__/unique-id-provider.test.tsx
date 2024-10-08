import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import {render} from "@testing-library/react";

import View from "../view";

import SsrIDFactory from "../../util/ssr-id-factory";
import UniqueIDFactory from "../../util/unique-id-factory";
import UniqueIDProvider from "../unique-id-provider";
import InitialFallback from "../initial-fallback";
import {RenderStateRoot} from "../render-state-root";

describe("UniqueIDProvider", () => {
    describe("mockOnFirstRender is default (false)", () => {
        test("initial render is nothing on server", () => {
            // Arrange
            const children = jest.fn(() => null);
            const nodes = (
                <UniqueIDProvider mockOnFirstRender={false}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            expect(children).not.toHaveBeenCalled();
        });

        test("initial render is skipped on client", () => {
            // Arrange
            const children = jest.fn(() => null);
            const nodes = (
                <UniqueIDProvider mockOnFirstRender={false}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            render(nodes);

            // Assert
            // Called once; for real render.
            // Compare with case where mock factory is provided and note that
            // children gets called twice, once for initial render, and once
            // for real render with unique ID factory.
            expect(children).toHaveBeenCalledTimes(1);
            // @ts-expect-error [FEI-5019] - TS2493 - Tuple type '[]' of length '0' has no element at index '0'.
            expect(children.mock.calls[0][0]).toBeInstanceOf(UniqueIDFactory);
        });

        test("all renders get same unique id factory", () => {
            // Arrange
            const children = jest.fn(() => <View />);
            const UnderTest = () => (
                <UniqueIDProvider mockOnFirstRender={false}>
                    {children}
                </UniqueIDProvider>
            );
            const {rerender} = render(<UnderTest />);

            // Act
            rerender(<UnderTest />);

            // Assert
            // Check our forced render worked and we rendered three times.
            expect(children).toHaveBeenCalledTimes(2);
            // Check the first render gets a UniqueIDFactory instance.
            // @ts-expect-error [FEI-5019] - TS2493 - Tuple type '[]' of length '0' has no element at index '0'.
            expect(children.mock.calls[0][0]).toBeInstanceOf(UniqueIDFactory);
            // Check the second render gets the same UniqueIDFactory instance.
            // @ts-expect-error [FEI-5019] - TS2493 - Tuple type '[]' of length '0' has no element at index '0'. | TS2493 - Tuple type '[]' of length '0' has no element at index '0'.
            expect(children.mock.calls[1][0]).toBe(children.mock.calls[1][0]);
        });
    });

    describe("mockOnFirstRender is true", () => {
        test("initial server render, children called with SsrIDFactory", () => {
            // Arrange
            const children = jest.fn(() => null);
            const nodes = (
                <UniqueIDProvider mockOnFirstRender={true}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            ReactDOMServer.renderToStaticMarkup(nodes);

            // Assert
            // Called twice; once for initial mock render only.
            expect(children).toHaveBeenCalledTimes(1);
            expect(children).toHaveBeenCalledWith(SsrIDFactory);
        });

        test("initial client render, children called with SsrIDFactory", () => {
            // Arrange
            const children = jest.fn(() => null);
            const nodes = (
                <UniqueIDProvider mockOnFirstRender={true}>
                    {children}
                </UniqueIDProvider>
            );

            // Act
            render(nodes);

            // Assert
            // Called twice; once for initial mock render, and again for real
            // render.
            expect(children).toHaveBeenCalledTimes(2);
            expect(children).toHaveBeenCalledWith(SsrIDFactory);
        });

        test("children calls after first get same unique id factory", () => {
            // Arrange
            const children = jest.fn(() => null);
            const UnderTest = () => (
                <UniqueIDProvider mockOnFirstRender={true}>
                    {children}
                </UniqueIDProvider>
            );
            const {rerender} = render(<UnderTest />);

            // Act
            rerender(<UnderTest />);

            // Assert
            // Check our forced render worked and we rendered three times.
            expect(children).toHaveBeenCalledTimes(3);
            // Check the second render gets a UniqueIDFactory instance.
            // @ts-expect-error [FEI-5019] - TS2493 - Tuple type '[]' of length '0' has no element at index '0'.
            expect(children.mock.calls[1][0]).toBeInstanceOf(UniqueIDFactory);
            // // Check the third render gets the same UniqueIDFactory instance.
            // @ts-expect-error [FEI-5019] - TS2493 - Tuple type '[]' of length '0' has no element at index '0'. | TS2493 - Tuple type '[]' of length '0' has no element at index '0'.
            expect(children.mock.calls[2][0]).toBe(children.mock.calls[1][0]);
        });
    });

    describe("inside a InitialFallback", () => {
        test("it should pass an id to its children", () => {
            // Arrange
            const foo = jest.fn(() => null);
            const nodes = (
                <InitialFallback fallback={null}>
                    {() => (
                        <UniqueIDProvider mockOnFirstRender={false}>
                            {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. | TS2554 - Expected 0 arguments, but got 1. */}
                            {(ids: any) => foo(ids.get(""))}
                        </UniqueIDProvider>
                    )}
                </InitialFallback>
            );

            // Act
            render(nodes);

            // Assert
            expect(foo).toHaveBeenCalled();
            // @ts-expect-error [FEI-5019] - TS2493 - Tuple type '[]' of length '0' has no element at index '0'.
            expect(foo.mock.calls[0][0]).toBeTruthy();
        });
    });

    describe("inside a RenderStateRoot", () => {
        test("it should pass an id to its children", () => {
            // Arrange
            const foo = jest.fn(() => null);
            const nodes = (
                <RenderStateRoot>
                    <UniqueIDProvider mockOnFirstRender={false}>
                        {/* @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call. | TS2554 - Expected 0 arguments, but got 1. */}
                        {(ids: any) => foo(ids.get(""))}
                    </UniqueIDProvider>
                </RenderStateRoot>
            );

            // Act
            render(nodes);

            // Assert
            expect(foo).toHaveBeenCalled();
            // @ts-expect-error [FEI-5019] - TS2493 - Tuple type '[]' of length '0' has no element at index '0'.
            expect(foo.mock.calls[0][0]).toBeTruthy();
        });
    });
});
