import {useCallback} from "react";

import {mergeGqlContext} from "../util/merge-gql-context";
import {useGqlRouterContext} from "./use-gql-router-context";
import {getGqlDataFromResponse} from "../util/get-gql-data-from-response";

import type {
    GqlContext,
    GqlOperation,
    GqlFetchOptions,
} from "../util/gql-types";

interface GqlFetchFn<TContext extends GqlContext> {
    <TData, TVariables extends Record<any, any>>(
        operation: GqlOperation<TData, TVariables>,
        options?: GqlFetchOptions<TVariables, TContext>,
    ): Promise<TData>;
}

/**
 * Hook to obtain a gqlFetch function for performing GraphQL requests.
 *
 * The fetch function will resolve null if the request was aborted, otherwise
 * it will resolve the data returned by the GraphQL server.
 *
 * Context is merged with the default context provided to the GqlRouter.
 * Values in the partial context given to the returned fetch function will
 * only be included if they have a value other than undefined.
 */
export const useGql = <TContext extends GqlContext>(
    context: Partial<TContext> = {} as Partial<TContext>,
): GqlFetchFn<TContext> => {
    // This hook only works if the `GqlRouter` has been used to setup context.
    const gqlRouterContext = useGqlRouterContext(context);

    // Let's memoize the gqlFetch function we create based off our context.
    // That way, even if the context happens to change, if its values don't
    // we give the same function instance back to our callers instead of
    // making a new one. That then means they can safely use the return value
    // in hooks deps without fear of it triggering extra renders.
    const gqlFetch: GqlFetchFn<TContext> = useCallback(
        <TData, TVariables extends Record<any, any>>(
            operation: GqlOperation<TData, TVariables>,
            options: GqlFetchOptions<TVariables, TContext> = Object.freeze({}),
        ): Promise<TData> => {
            const {fetch, defaultContext} = gqlRouterContext;
            const {variables, context = {}} = options;
            const finalContext = mergeGqlContext(defaultContext, context);

            // Invoke the fetch and extract the data.
            return fetch(operation, variables, finalContext).then((response) =>
                getGqlDataFromResponse<TData>(response),
            );
        },
        [gqlRouterContext],
    );
    return gqlFetch;
};
