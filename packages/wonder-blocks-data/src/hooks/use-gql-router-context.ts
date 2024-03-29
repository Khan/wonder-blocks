import {useContext, useRef, useMemo} from "react";

import {mergeGqlContext} from "../util/merge-gql-context";
import {GqlRouterContext} from "../util/gql-router-context";
import {GqlError, GqlErrors} from "../util/gql-error";

import type {GqlRouterConfiguration, GqlContext} from "../util/gql-types";

/**
 * Construct a GqlRouterContext from the current one and partial context.
 */
export const useGqlRouterContext = <TContext extends GqlContext>(
    contextOverrides: Partial<TContext> = {} as Partial<TContext>,
): GqlRouterConfiguration<TContext> => {
    // This hook only works if the `GqlRouter` has been used to setup context.
    const gqlRouterContext = useContext(GqlRouterContext);
    if (gqlRouterContext == null) {
        throw new GqlError("No GqlRouter", GqlErrors.Internal);
    }

    const {fetch, defaultContext} = gqlRouterContext;
    const contextRef = useRef<TContext>(defaultContext);
    const mergedContext = mergeGqlContext(defaultContext, contextOverrides);

    // Now, we can see if this represents a new context and if so,
    // update our ref and return the merged value.
    const refKeys = Object.keys(contextRef.current);
    const mergedKeys = Object.keys(mergedContext);
    const shouldWeUpdateRef =
        refKeys.length !== mergedKeys.length ||
        mergedKeys.every(
            (key) => contextRef.current[key] !== mergedContext[key],
        );
    if (shouldWeUpdateRef) {
        contextRef.current = mergedContext;
    }

    // OK, now we're up-to-date, let's memoize our final result.
    const finalContext = contextRef.current;
    const finalRouterContext = useMemo(
        () => ({
            fetch,
            defaultContext: finalContext,
        }),
        [fetch, finalContext],
    );

    return finalRouterContext;
};
