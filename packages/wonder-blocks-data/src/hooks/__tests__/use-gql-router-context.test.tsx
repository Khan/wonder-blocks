import * as React from "react";
import {renderHook} from "@testing-library/react";

import {GqlRouterContext} from "../../util/gql-router-context";
import {useGqlRouterContext} from "../use-gql-router-context";

describe("#useGqlRouterContext", () => {
    it("should throw if there is no GqlRouterContext", () => {
        // Arrange

        // Act
        const underTest = () => renderHook(() => useGqlRouterContext());

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(`"No GqlRouter"`);
    });

    it("should return an equivalent to the GqlRouterContext if no overrides given", () => {
        // Arrange
        const baseContext = {
            fetch: jest.fn(),
            defaultContext: {
                foo: "bar",
            },
        } as const;
        const Wrapper = ({children}: any) => (
            <GqlRouterContext.Provider value={baseContext}>
                {children}
            </GqlRouterContext.Provider>
        );

        // Act
        const {
            result: {current: result},
        } = renderHook(() => useGqlRouterContext(), {wrapper: Wrapper});

        // Assert
        expect(result).toStrictEqual(baseContext);
    });

    it("should return the same object if nothing has changed", () => {
        // Arrange
        const baseContext = {
            fetch: jest.fn(),
            defaultContext: {
                foo: "bar",
            },
        } as const;
        const Wrapper = ({children}: any) => (
            <GqlRouterContext.Provider value={baseContext}>
                {children}
            </GqlRouterContext.Provider>
        );

        // Act
        const wrapper = renderHook(() => useGqlRouterContext(), {
            wrapper: Wrapper,
        });
        const result1 = wrapper.result.current;
        wrapper.rerender();
        const result2 = wrapper.result.current;

        // Assert
        expect(result1).toBe(result2);
    });

    it("should return the same object if the object adds overrides that don't change the merged context", () => {
        // Arrange
        const baseContext = {
            fetch: jest.fn(),
            defaultContext: {
                foo: "bar",
            },
        } as const;
        const Wrapper = ({children}: any) => (
            <GqlRouterContext.Provider value={baseContext}>
                {children}
            </GqlRouterContext.Provider>
        );

        // Act
        const wrapper = renderHook(
            ({overrides}: any) => useGqlRouterContext(overrides),
            {
                wrapper: Wrapper,
                initialProps: {},
            },
        );
        const result1 = wrapper.result.current;
        wrapper.rerender({overrides: {foo: "bar"}});
        const result2 = wrapper.result.current;

        // Assert
        expect(result1).toBe(result2);
    });

    it("should return an updated object if the object adds overrides that change the merged context", () => {
        // Arrange
        const baseContext = {
            fetch: jest.fn(),
            defaultContext: {
                foo: "bar",
            },
        } as const;
        const Wrapper = ({children}: any) => (
            <GqlRouterContext.Provider value={baseContext}>
                {children}
            </GqlRouterContext.Provider>
        );

        // Act
        const wrapper = renderHook(
            ({overrides}: any) => useGqlRouterContext(overrides),
            {
                wrapper: Wrapper,
                initialProps: {
                    overrides: {fiz: "baz"},
                },
            },
        );
        const result1 = wrapper.result.current;
        wrapper.rerender({overrides: {} as any});
        const result2 = wrapper.result.current;

        // Assert
        expect(result1).not.toBe(result2);
    });
});
