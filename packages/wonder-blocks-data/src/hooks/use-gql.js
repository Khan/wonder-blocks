// @flow
import {useContext, useMemo} from "react";

import {GqlRouterContext} from "../util/gql-router-context.js";
import {getGqlDataFromResponse} from "../util/get-gql-data-from-response.js";
import {GqlError, GqlErrors} from "../util/gql-error.js";

import type {
    GqlContext,
    GqlOperation,
    GqlFetchOptions,
    GqlOperationType,
} from "../util/gql-types.js";

/**
 * Hook to obtain a gqlFetch function for performing GraphQL requests.
 *
 * The fetch function will resolve null if the request was aborted, otherwise
 * it will resolve the data returned by the GraphQL server.
 */
export const useGql = (): (<
    TType: GqlOperationType,
    TData,
    TVariables: {...},
    TContext: GqlContext,
>(
    operation: GqlOperation<TData, TVariables>,
    options?: GqlFetchOptions<TVariables, TContext>,
) => Promise<?TData>) => {
    // This hook only works if the `GqlRouter` has been used to setup context.
    const gqlRouterContext = useContext(GqlRouterContext);
    if (gqlRouterContext == null) {
        throw new GqlError("No GqlRouter", GqlErrors.Internal);
    }
    const {fetch, defaultContext} = gqlRouterContext;

    // Let's memoize the gqlFetch function we create based off our context.
    // That way, even if the context happens to change, if its values don't
    // we give the same function instance back to our callers instead of
    // making a new one. That then means they can safely use the return value
    // in hooks deps without fear of it triggering extra renders.
    const gqlFetch = useMemo(
        () =>
            <TData, TVariables: {...}, TContext: GqlContext>(
                operation: GqlOperation<TData, TVariables>,
                options: GqlFetchOptions<TVariables, TContext> = Object.freeze(
                    {},
                ),
            ) => {
                const {variables, context} = options;

                // Invoke the fetch and extract the data.
                return fetch(operation, variables, {
                    ...defaultContext,
                    ...context,
                }).then(getGqlDataFromResponse, (error) => {
                    // Return null if the request was aborted.
                    // The only way to detect this reliably, it seems, is to
                    // check the error name and see if it's "AbortError" (this
                    // is also what Apollo does).
                    // Even then, it's reliant on the fetch supporting aborts.
                    if (error.name === "AbortError") {
                        return null;
                    }
                    // Need to make sure we pass other errors along.
                    throw error;
                });
            },
        [fetch, defaultContext],
    );
    return gqlFetch;
};
