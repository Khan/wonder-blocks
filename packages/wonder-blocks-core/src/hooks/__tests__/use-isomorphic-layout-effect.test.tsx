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
        // Make sure we call the real useLayoutEffect in our tests so that
        // the development error shows up.
        useLayoutEffect: jest.fn(ActualReact.useLayoutEffect),
    };
});

describe("useIsomorphicLayoutEffect", () => {
    describe("client side mode", () => {
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

        it("should cause an error if statically rendered (i.e. rendered server-side)", () => {
            // Arrange
            // In prod, React throws, but in dev, it just logs a console error.
            const errorSpy = jest
                .spyOn(console, "error")
                .mockImplementation(() => {
                    // We don't want the error to get recorded - we're going to
                    // assert it happens instead.
                    /* no-op */
                });
            const Component = () => {
                useIsomorphicLayoutEffect(() => {}, []);
                return null;
            };

            // Act
            renderToString(<Component />);

            // Assert
            expect(errorSpy).toHaveBeenCalled();
        });
    });

    describe("server side mode", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should not cause an error if statically rendered (i.e. rendered server-side)", () => {
            // Arrange
            // In prod, React throws, but in dev, it just logs a console error.
            const errorSpy = jest
                .spyOn(console, "error")
                .mockImplementation(() => {
                    // We don't want the error to get recorded - we're going to
                    // assert it happens instead.
                    /* no-op */
                });
            const Component = () => {
                useIsomorphicLayoutEffect(() => {}, []);
                return null;
            };

            // Act
            renderToString(<Component />);

            // Assert
            expect(errorSpy).not.toHaveBeenCalled();
        });
    });
});
