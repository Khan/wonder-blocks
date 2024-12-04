import * as React from "react";
import {renderHook} from "@testing-library/react";

import * as GetGqlDataFromResponse from "../../util/get-gql-data-from-response";
import {GqlRouterContext} from "../../util/gql-router-context";
import {useGql} from "../use-gql";

describe("#useGql", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should throw if there is no GqlRouterContext available", () => {
        // Arrange

        // Act
        const underTest = () => renderHook(() => useGql());

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot("No GqlRouter");
    });

    it("should return a function", () => {
        // Arrange
        const gqlRouterContext = {
            fetch: jest.fn(),
            defaultContext: {},
        } as const;

        // Act
        const {
            result: {current: result},
        } = renderHook(() => useGql(), {
            wrapper: ({children}: any) => (
                <GqlRouterContext.Provider value={gqlRouterContext}>
                    {children}
                </GqlRouterContext.Provider>
            ),
        });

        // Assert
        expect(result).toBeInstanceOf(Function);
    });

    describe("returned gqlFetch", () => {
        it("should fetch the operation with combined context", async () => {
            // Arrange
            jest.spyOn(
                GetGqlDataFromResponse,
                "getGqlDataFromResponse",
            ).mockResolvedValue({
                some: "data",
            });
            const fetchFake = jest
                .fn()
                .mockResolvedValue("FAKE_RESPONSE" as any);
            const gqlRouterContext = {
                fetch: fetchFake,
                defaultContext: {
                    a: "defaultA",
                    b: "defaultB",
                },
            } as const;
            const {
                result: {current: gqlFetch},
            } = renderHook(() => useGql(), {
                wrapper: ({children}: any) => (
                    <GqlRouterContext.Provider value={gqlRouterContext}>
                        {children}
                    </GqlRouterContext.Provider>
                ),
            });
            const gqlOp = {
                type: "query",
                id: "MyQuery",
            } as const;
            const gqlOpContext = {
                a: undefined, // This should not get included.
                b: "overrideB",
            } as const;
            const gqlOpVariables = {
                var1: "val1",
            } as const;

            // Act
            await gqlFetch(gqlOp, {
                context: gqlOpContext,
                variables: gqlOpVariables,
            });

            // Assert
            expect(fetchFake).toHaveBeenCalledWith(gqlOp, gqlOpVariables, {
                a: "defaultA",
                b: "overrideB",
            });
        });

        it("should parse the response", async () => {
            // Arrange
            const getGqlDataFromResponseSpy = jest
                .spyOn(GetGqlDataFromResponse, "getGqlDataFromResponse")
                .mockResolvedValue({
                    some: "data",
                });
            const gqlRouterContext = {
                fetch: jest.fn().mockResolvedValue("FAKE_RESPONSE" as any),
                defaultContext: {},
            } as const;
            const {
                result: {current: gqlFetch},
            } = renderHook(() => useGql(), {
                wrapper: ({children}: any) => (
                    <GqlRouterContext.Provider value={gqlRouterContext}>
                        {children}
                    </GqlRouterContext.Provider>
                ),
            });
            const gqlOp = {
                type: "query",
                id: "MyQuery",
            } as const;

            // Act
            await gqlFetch(gqlOp);

            // Assert
            expect(getGqlDataFromResponseSpy).toHaveBeenCalledWith(
                "FAKE_RESPONSE",
            );
        });

        it("should reject if the response parse rejects", async () => {
            // Arrange
            jest.spyOn(
                GetGqlDataFromResponse,
                "getGqlDataFromResponse",
            ).mockRejectedValue(new Error("FAKE_ERROR"));
            const gqlRouterContext = {
                fetch: jest.fn().mockResolvedValue("FAKE_RESPONSE" as any),
                defaultContext: {},
            } as const;
            const {
                result: {current: gqlFetch},
            } = renderHook(() => useGql(), {
                wrapper: ({children}: any) => (
                    <GqlRouterContext.Provider value={gqlRouterContext}>
                        {children}
                    </GqlRouterContext.Provider>
                ),
            });
            const gqlOp = {
                type: "query",
                id: "MyQuery",
            } as const;

            // Act
            const act = gqlFetch(gqlOp);

            // Assert
            await expect(act).rejects.toThrowErrorMatchingInlineSnapshot(
                `"FAKE_ERROR"`,
            );
        });

        it("should resolve to the response data", async () => {
            // Arrange
            jest.spyOn(
                GetGqlDataFromResponse,
                "getGqlDataFromResponse",
            ).mockResolvedValue({
                some: "data",
            });
            const gqlRouterContext = {
                fetch: jest.fn().mockResolvedValue("FAKE_RESPONSE" as any),
                defaultContext: {},
            } as const;
            const {
                result: {current: gqlFetch},
            } = renderHook(() => useGql(), {
                wrapper: ({children}: any) => (
                    <GqlRouterContext.Provider value={gqlRouterContext}>
                        {children}
                    </GqlRouterContext.Provider>
                ),
            });
            const gqlOp = {
                type: "mutation",
                id: "MyMutation",
            } as const;

            // Act
            const result = await gqlFetch(gqlOp);

            // Assert
            expect(result).toEqual({
                some: "data",
            });
        });
    });
});
