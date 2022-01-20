// @flow
import * as React from "react";
import {renderHook} from "@testing-library/react-hooks";

import * as GetGqlDataFromResponse from "../../util/get-gql-data-from-response.js";
import {GqlRouterContext} from "../../util/gql-router-context.js";
import {useGql} from "../use-gql.js";

describe("#useGql", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should throw if there is no GqlRouterContext available", () => {
        // Arrange

        // Act
        const {
            result: {error: result},
        } = renderHook(() => useGql());

        // Assert
        expect(result).toMatchInlineSnapshot(
            `[GqlInternalError: No GqlRouter]`,
        );
    });

    it("should return a function", () => {
        // Arrange
        const gqlRouterContext = {
            fetch: jest.fn(),
            defaultContext: {},
        };

        // Act
        const {
            result: {current: result},
        } = renderHook(() => useGql(), {
            wrapper: ({children}) => (
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
                .mockResolvedValue(("FAKE_RESPONSE": any));
            const gqlRouterContext = {
                fetch: fetchFake,
                defaultContext: {
                    a: "defaultA",
                    b: "defaultB",
                },
            };
            const {
                result: {current: gqlFetch},
            } = renderHook(() => useGql(), {
                wrapper: ({children}) => (
                    <GqlRouterContext.Provider value={gqlRouterContext}>
                        {children}
                    </GqlRouterContext.Provider>
                ),
            });
            const gqlOp = {
                type: "query",
                id: "MyQuery",
            };
            const gqlOpContext = {
                b: "overrideB",
            };
            const gqlOpVariables = {
                var1: "val1",
            };

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
                fetch: jest.fn().mockResolvedValue(("FAKE_RESPONSE": any)),
                defaultContext: {},
            };
            const {
                result: {current: gqlFetch},
            } = renderHook(() => useGql(), {
                wrapper: ({children}) => (
                    <GqlRouterContext.Provider value={gqlRouterContext}>
                        {children}
                    </GqlRouterContext.Provider>
                ),
            });
            const gqlOp = {
                type: "query",
                id: "MyQuery",
            };

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
                fetch: jest.fn().mockResolvedValue(("FAKE_RESPONSE": any)),
                defaultContext: {},
            };
            const {
                result: {current: gqlFetch},
            } = renderHook(() => useGql(), {
                wrapper: ({children}) => (
                    <GqlRouterContext.Provider value={gqlRouterContext}>
                        {children}
                    </GqlRouterContext.Provider>
                ),
            });
            const gqlOp = {
                type: "query",
                id: "MyQuery",
            };

            // Act
            const act = gqlFetch(gqlOp);

            // Assert
            await expect(act).rejects.toThrowErrorMatchingInlineSnapshot(
                `"FAKE_ERROR"`,
            );
        });

        it("should resolve to null if the fetch was aborted", async () => {
            // Arrange
            const abortError = new Error("Aborted");
            abortError.name = "AbortError";
            const gqlRouterContext = {
                fetch: jest.fn().mockRejectedValue(abortError),
                defaultContext: {},
            };
            const {
                result: {current: gqlFetch},
            } = renderHook(() => useGql(), {
                wrapper: ({children}) => (
                    <GqlRouterContext.Provider value={gqlRouterContext}>
                        {children}
                    </GqlRouterContext.Provider>
                ),
            });
            const gqlOp = {
                type: "query",
                id: "MyQuery",
            };

            // Act
            const result = await gqlFetch(gqlOp);

            // Assert
            expect(result).toBeNull();
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
                fetch: jest.fn().mockResolvedValue(("FAKE_RESPONSE": any)),
                defaultContext: {},
            };
            const {
                result: {current: gqlFetch},
            } = renderHook(() => useGql(), {
                wrapper: ({children}) => (
                    <GqlRouterContext.Provider value={gqlRouterContext}>
                        {children}
                    </GqlRouterContext.Provider>
                ),
            });
            const gqlOp = {
                type: "mutation",
                id: "MyMutation",
            };

            // Act
            const result = await gqlFetch(gqlOp);

            // Assert
            expect(result).toEqual({
                some: "data",
            });
        });
    });
});
