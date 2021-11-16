// @flow
import * as React from "react";
import {renderHook} from "@testing-library/react-hooks/server";

import SsrIDFactory from "../../util/ssr-id-factory.js";
import UniqueIDFactory from "../../util/unique-id-factory.js";
import WithSSRPlaceholder from "../../components/with-ssr-placeholder.js";
import {useUniqueIdWithMock, useUniqueIdWithoutMock} from "../use-unique-id.js";

describe("useUniqueIdWithoutMock", () => {
    test("initial render is nothing on server", () => {
        // Arrange

        // Act
        const {result} = renderHook(() => useUniqueIdWithoutMock());

        // Assert
        expect(result.current).toEqual(null);
    });

    test("initial render is skipped on client", () => {
        // Arrange
        const {result, hydrate} = renderHook(() => useUniqueIdWithoutMock());

        // Act
        hydrate();

        // Assert
        expect(result.current).toBeInstanceOf(UniqueIDFactory);
    });

    test("all renders get same unique id factory", () => {
        const {result, hydrate, rerender} = renderHook(() =>
            useUniqueIdWithoutMock(),
        );

        // Act
        hydrate();
        const firstFactory = result.current;
        rerender();
        const secondFactory = result.current;

        // Assert
        expect(firstFactory).toBe(secondFactory);
    });

    describe("inside a WithSSRPlaceholder", () => {
        test("it should pass an id to its children", () => {
            // Arrange
            const wrapper = ({children}: {|children: React.Node|}) => (
                <WithSSRPlaceholder placeholder={null}>
                    {() => children}
                </WithSSRPlaceholder>
            );

            const {result, hydrate} = renderHook(
                () => useUniqueIdWithoutMock(),
                {wrapper},
            );

            // Act
            hydrate();

            // Assert
            expect(result.current).toBeInstanceOf(UniqueIDFactory);
        });
    });
});

describe("useUniqueIdWithMock", () => {
    test("initial server render, children called with SsrIDFactory", () => {
        // Arrange

        // Act
        const {result} = renderHook(() => useUniqueIdWithMock());

        // Assert
        expect(result.current).toEqual(SsrIDFactory);
    });

    test("initial client render, children called with SsrIDFactory", () => {
        // Arrange

        // Arrange
        const {result, hydrate} = renderHook(() => useUniqueIdWithMock());

        // Act
        hydrate();

        // Assert
        expect(result.current).toBeInstanceOf(UniqueIDFactory);
    });

    test("children calls after first get same unique id factory", () => {
        const {result, hydrate, rerender} = renderHook(() =>
            useUniqueIdWithMock(),
        );

        // Act
        hydrate();
        const firstFactory = result.current;
        rerender();
        const secondFactory = result.current;

        // Assert
        expect(firstFactory).toBe(secondFactory);
    });
});
