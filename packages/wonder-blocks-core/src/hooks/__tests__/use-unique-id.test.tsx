import * as React from "react";
import {render} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks/server";

import SsrIDFactory from "../../util/ssr-id-factory";
import UniqueIDFactory from "../../util/unique-id-factory";
import {useUniqueIdWithMock, useUniqueIdWithoutMock} from "../use-unique-id";
import {RenderStateRoot} from "../../components/render-state-root";

describe("useUniqueIdWithoutMock", () => {
    test("server-side render returns null", () => {
        // Arrange
        const wrapper = ({children}: any) => (
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
        const factoryValues: Array<any> = [];
        const TestComponent = (): React.ReactElement | null => {
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
        const factoryValues: Array<any> = [];
        const TestComponent = (): React.ReactElement | null => {
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
        const factoryValues: Array<any> = [];
        const TestComponent = (): React.ReactElement | null => {
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

    it("Should minimize the number of renders it does", () => {
        // Arrange
        const values1: Array<any> = [];
        const TestComponent1 = (): React.ReactElement | null => {
            const ids = useUniqueIdWithoutMock();
            values1.push(ids ? ids.get("TestComponent1") : "null");
            return null;
        };

        const values2: Array<any> = [];
        const TestComponent2 = () => {
            const ids = useUniqueIdWithoutMock();
            values2.push(ids ? ids.get("TestComponent2") : "null");
            return <TestComponent1 />;
        };

        // Act
        render(
            <RenderStateRoot>
                <TestComponent2 />
            </RenderStateRoot>,
        );

        // Assert
        expect(values1).toHaveLength(2);
        expect(values2).toHaveLength(2);
    });
});

describe("useUniqueIdWithMock", () => {
    test("server-side render returns SsrIDFactory", () => {
        // Arrange
        const wrapper = ({children}: any) => (
            <RenderStateRoot>{children}</RenderStateRoot>
        );

        // Act
        const {result} = renderHook(() => useUniqueIdWithMock(), {wrapper});

        // Assert
        expect(result.current).toBe(SsrIDFactory);
    });

    test("initial client render returns SsrIDFactory", () => {
        // Arrange
        const factoryValues: Array<any> = [];
        const TestComponent = (): React.ReactElement | null => {
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
        const factoryValues: Array<any> = [];
        const TestComponent = (): React.ReactElement | null => {
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
        const factoryValues: Array<any> = [];
        const TestComponent = (): React.ReactElement | null => {
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

    it("Should minimize the number of renders it does", () => {
        // Arrange
        const values1: Array<any> = [];
        const TestComponent1 = (): React.ReactElement | null => {
            const ids = useUniqueIdWithMock();
            values1.push(ids.get("TestComponent1"));
            return null;
        };

        const values2: Array<any> = [];
        const TestComponent2 = () => {
            const ids = useUniqueIdWithMock();
            values2.push(ids.get("TestComponent2"));
            return <TestComponent1 />;
        };

        // Act
        render(
            <RenderStateRoot>
                <TestComponent2 />
            </RenderStateRoot>,
        );

        // Assert
        expect(values1).toHaveLength(2);
        expect(values2).toHaveLength(2);
    });
});
