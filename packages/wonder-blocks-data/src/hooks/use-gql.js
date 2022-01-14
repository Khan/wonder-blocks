// @flow
import {useContext, useMemo} from "react";

import {GqlRouterContext} from "../util/gql-router-context.js";
import {getGqlDataFromResponse} from "../util/get-gql-data-from-response.js";

import type {
    GqlContext,
    GqlOperation,
    GqlFetchOptions,
    GqlOperationType,
} from "../util/gql-types.js";

/**
 * Hook to obtain a gqlFetch function for performing GraphQL requests.
 */
export const useGql = (): (<
    TType: GqlOperationType,
    TData,
    TVariables: {...},
    TContext: GqlContext,
>(
    operation: GqlOperation<TType, TData, TVariables>,
    options?: GqlFetchOptions<TVariables, TContext>,
) => Promise<TData>) => {
    // This hook only works if the `GqlRouter` has been used to setup context.
    const gqlRouterContext = useContext(GqlRouterContext);
    if (gqlRouterContext == null) {
        throw new Error("No GqlRouter");
    }
    const {fetch, defaultContext} = gqlRouterContext;

    // Let's memoize the gqlFetch function we create based off our context.
    // That way, even if the context happens to change, if its values don't
    // we give the same function instance back to our callers instead of
    // making a new one. That then means they can safely use the return value
    // in hooks deps without fear of it triggering extra renders.
    const gqlFetch = useMemo(
        () =>
            <
                TType: GqlOperationType,
                TData,
                TVariables: {...},
                TContext: GqlContext,
            >(
                operation: GqlOperation<TType, TData, TVariables>,
                options: GqlFetchOptions<TVariables, TContext> = Object.freeze(
                    {},
                ),
            ) => {
                const {variables, context} = options ?? {};

                // Invoke the fetch.
                return fetch(operation, variables, {
                    ...defaultContext,
                    ...context,
                }).then((r) => getGqlDataFromResponse(r));
            },
        [fetch, defaultContext],
    );
    return gqlFetch;
};
