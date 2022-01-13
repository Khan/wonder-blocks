// @flow
import * as React from "react";
import {renderHook, act} from "@testing-library/react-hooks";

import {GqlRouterContext} from "../../util/gql-router-context.js";
import {useGql} from "../use-gql.js";

describe("#useGql", () => {
    it("should throw if there is no GqlRouterContext available", () => {
        // Arrange

        // Act
        const {
            result: {error: result},
        } = renderHook(() => useGql());

        // Assert
        expect(result).toMatchInlineSnapshot(`[Error: No GqlRouter]`);
    });

    it("should return a function", () => {
        // Arrange
        const gqlRouterContext = {
            fetch: jest.fn(),
            getURLForOperation: jest.fn(),
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
        it("should generate a URL", () => {});

        it("should POST the generated URL", () => {});

        it("should return a promise resolving to the fetched data", () => {});
    });
});
