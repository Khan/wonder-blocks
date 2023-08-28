import * as React from "react";
import {renderHook} from "@testing-library/react-hooks";
import {renderToString} from "react-dom/server";

import Server from "../../util/server";

import {useIsomorphicLayoutEffect} from "../use-isomorphic-layout-effect";

// We need to make useLayoutEffect spy-able.
jest.mock("react", () => {
    const ActualReact = jest.requireActual("react");
    return {
        ...ActualReact,
        useLayoutEffect: jest.fn(),
    };
});

describe("useIsomorphicLayoutEffect", () => {
    describe("when client side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        it("should invoke React.useLayoutEffect with the given arguments", () => {
            // Arrange
            const useLayoutEffectSpy = jest.spyOn(React, "useLayoutEffect");
            const effect = () => {};
            const deps = ["foo", "bar"];

            // Act
            renderHook(() => useIsomorphicLayoutEffect(effect, deps));

            // assert
            expect(useLayoutEffectSpy).toHaveBeenCalledWith(effect, deps);
        });
    });

    describe("when server side, the returned function", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should not throw", () => {
            // Arrange
            const Component = () => {
                useIsomorphicLayoutEffect(() => {}, []);
                return null;
            };

            // Act
            const underTest = () => renderToString(<Component />);

            // Assert
            expect(underTest).not.toThrowError();
        });
    });
});
