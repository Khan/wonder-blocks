// @flow
import * as React from "react";
import {render} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks/server";

import SsrIDFactory from "../../util/ssr-id-factory.js";
import UniqueIDFactory from "../../util/unique-id-factory.js";
import {useUniqueIdWithMock, useUniqueIdWithoutMock} from "../use-unique-id.js";
import {RenderStateRoot} from "../../components/render-state-root.js";

describe("useUniqueIdWithoutMock", () => {
    test("server-side render returns null", () => {
        // Arrange
        const wrapper = ({children}) => (
            <RenderStateRoot>{children}</RenderStateRoot>
        );

        // Act
        const {result} = renderHook(() => useUniqueIdWithoutMock(), {
            wrapper,
        });

        // Assert
        expect(result.current).toEqual(null);
    });

    test("initial client render returns null", () => {
        // Arrange
        const factoryValues = [];
        const TestComponent = (): React.Node => {
            const factory = useUniqueIdWithoutMock();
            factoryValues.push(factory);
            return null;
        };

        // Act
        render(
            <RenderStateRoot>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Assert
        expect(factoryValues[0]).toBe(null);
    });

    test("second client render retursn a unique id factory", () => {
        // Arrange
        const factoryValues = [];
        const TestComponent = (): React.Node => {
            const factory = useUniqueIdWithoutMock();
            factoryValues.push(factory);
            return null;
        };

        // Act
        render(
            <RenderStateRoot>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Assert
        expect(factoryValues[1]).not.toBe(SsrIDFactory);
        expect(factoryValues[1]).toBeInstanceOf(UniqueIDFactory);
    });

    test("second render returns the same unique id factory", () => {
        // Arrange
        const factoryValues = [];
        const TestComponent = (): React.Node => {
            const factory = useUniqueIdWithoutMock();
            factoryValues.push(factory);
            return null;
        };
        const {rerender} = render(
            <RenderStateRoot>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Act
        rerender(
            <RenderStateRoot>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Assert
        expect(factoryValues[1]).toBe(factoryValues[2]);
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
    test("server-side render returns SsrIDFactory", () => {
        // Arrange
        const wrapper = ({children}) => (
            <RenderStateRoot>{children}</RenderStateRoot>
        );

        // Act
        const {result} = renderHook(() => useUniqueIdWithMock(), {wrapper});

        // Assert
        expect(result.current).toBe(SsrIDFactory);
    });

    test("initial client render returns SsrIDFactory", () => {
        // Arrange
        const factoryValues = [];
        const TestComponent = (): React.Node => {
            const factory = useUniqueIdWithMock();
            factoryValues.push(factory);
            return null;
        };

        // Act
        render(
            <RenderStateRoot>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Assert
        expect(factoryValues[0]).toBe(SsrIDFactory);
    });

    test("second client render retursn a unique id factory", () => {
        // Arrange
        const factoryValues = [];
        const TestComponent = (): React.Node => {
            const factory = useUniqueIdWithMock();
            factoryValues.push(factory);
            return null;
        };

        // Act
        render(
            <RenderStateRoot>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Assert
        expect(factoryValues[1]).not.toBe(SsrIDFactory);
        expect(factoryValues[1]).toBeInstanceOf(UniqueIDFactory);
    });

    test("second render returns the same unique id factory", () => {
        // Arrange
        const factoryValues = [];
        const TestComponent = (): React.Node => {
            const factory = useUniqueIdWithMock();
            factoryValues.push(factory);
            return null;
        };
        const {rerender} = render(
            <RenderStateRoot>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Act
        rerender(
            <RenderStateRoot>
                <TestComponent />
            </RenderStateRoot>,
        );

        // Assert
        expect(factoryValues[1]).toBe(factoryValues[2]);
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
