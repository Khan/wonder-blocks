// @flow
import * as React from "react";
import {renderHook} from "@testing-library/react-hooks/server";

import SsrIDFactory from "../../util/ssr-id-factory.js";
import UniqueIDFactory from "../../util/unique-id-factory.js";
import {useUniqueIdWithMock, useUniqueIdWithoutMock} from "../use-unique-id.js";
import {RenderStateRoot} from "../../components/render-state-root.js";

describe("useUniqueIdWithoutMock", () => {
    const wrapper = ({children}) => (
        <RenderStateRoot>{children}</RenderStateRoot>
    );

    test("initial render returns null", () => {
        // Arrange

        // Act
        const {result} = renderHook(() => useUniqueIdWithoutMock(), {wrapper});

        // Assert
        expect(result.current).toEqual(null);
    });

    test("rehydration returns null", () => {
        // Arrange
        const {result, hydrate} = renderHook(() => useUniqueIdWithoutMock(), {
            wrapper,
        });

        // Act
        hydrate();

        // Assert
        expect(result.current).toEqual(null);
    });

    test("first render after rehydration gets a unique id factory", () => {
        // Arrange
        const {result, hydrate, rerender} = renderHook(
            () => useUniqueIdWithoutMock(),
            {wrapper},
        );

        // Act
        hydrate();
        rerender();

        // Assert
        expect(result.current).toBeInstanceOf(UniqueIDFactory);
    });

    test("second render returns the same unique id factory", () => {
        const {result, hydrate, rerender} = renderHook(
            () => useUniqueIdWithoutMock(),
            {wrapper},
        );

        // Act
        hydrate();
        rerender();
        const firstFactory = result.current;
        rerender();
        const secondFactory = result.current;

        // Assert
        expect(firstFactory).toBe(secondFactory);
    });

    it("should throw an error if it isn't a descendant of <RenderStateRoot>", () => {
        // Arrange

        // Act
        const {result} = renderHook(() => useUniqueIdWithoutMock());

        // Assert
        expect(result.error).toEqual(
            new Error(
                "Components using useUniqueIdWithoutMock() should be descendants of <RenderStateRoot>",
            ),
        );
    });
});

describe("useUniqueIdWithMock", () => {
    const wrapper = ({children}) => (
        <RenderStateRoot>{children}</RenderStateRoot>
    );

    test("initial server render returns SsrIDFactory", () => {
        // Arrange

        // Act
        const {result} = renderHook(() => useUniqueIdWithMock(), {wrapper});

        // Assert
        expect(result.current).toBe(SsrIDFactory);
    });

    test("rehydration also returns SsrIDFactory", () => {
        // Arrange

        // Arrange
        const {result, hydrate} = renderHook(() => useUniqueIdWithMock(), {
            wrapper,
        });

        // Act
        hydrate();

        // Assert
        expect(result.current).toBe(SsrIDFactory);
    });

    test("first render after rehydration gets a unique id factory", () => {
        const {result, hydrate, rerender} = renderHook(
            () => useUniqueIdWithMock(),
            {wrapper},
        );

        // Act
        hydrate();
        rerender();

        // Assert
        expect(result.current).toBeInstanceOf(UniqueIDFactory);
        expect(result.current).not.toBe(SsrIDFactory);
    });

    test("second render returns the same unique id factory", () => {
        const {result, hydrate, rerender} = renderHook(
            () => useUniqueIdWithMock(),
            {wrapper},
        );

        // Act
        hydrate();
        rerender();
        const firstFactory = result.current;
        rerender();
        const secondFactory = result.current;

        // Assert
        expect(firstFactory).toBe(secondFactory);
    });

    it("should throw an error if it isn't a descendant of <RenderStateRoot>", () => {
        // Arrange

        // Act
        const {result} = renderHook(() => useUniqueIdWithMock());

        // Assert
        expect(result.error).toEqual(
            new Error(
                "Components using useUniqueIdWithMock() should be descendants of <RenderStateRoot>",
            ),
        );
    });
});
