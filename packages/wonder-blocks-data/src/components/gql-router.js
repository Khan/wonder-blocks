// @flow
import * as React from "react";

import {GqlRouterContext} from "../util/gql-router-context.js";

import type {
    GqlContext,
    FetchFn,
    GetURLForOperation,
    GqlRouterConfiguration,
} from "../util/gql-types.js";

type Props<TContext: GqlContext> = {|
    /**
     * The default context to be used by operations when no context is provided.
     * This is required for the root level `GqlRouter` instance.
     */
    defaultContext?: TContext,

    /**
     * The function to use when fetching requests.
     * Defaults to `fetch` if available.
     */
    fetch?: FetchFn,

    /**
     * The function to use to generate a request URL for a given operation.
     * This is required for the root level `GqlRouter` instance.
     */
    getURLForOperation?: GetURLForOperation,

    /**
     * The children to be rendered inside the router.
     */
    children: React.Node,
|};

/**
 * Configure GraphQL routing for GraphQL hooks and components.
 */
export const GqlRouter = <TContext: GqlContext>({
    defaultContext: thisDefaultContext,
    fetch: thisFetch,
    getURLForOperation: thisGetURLForOperation,
    children,
}: Props<TContext>): React.Node => {
    // There's a chance we are nested inside another `GqlRouter`, so we must
    // inherit from it, if that's the case.
    const existing = React.useContext(GqlRouterContext);

    if (existing == null) {
        if (process.env.NODE_ENV === "production") {
            // Simplified error checking for production.
            if (
                thisDefaultContext == null ||
                thisGetURLForOperation == null ||
                (thisFetch == null && typeof fetch !== "function")
            ) {
                throw new Error("Bad root GqlRouter");
            }
        } else {
            // More detailed errors for dev and test.
            if (thisDefaultContext == null) {
                throw new Error(
                    "defaultContext is required on the root GqlRouter",
                );
            }

            if (thisGetURLForOperation == null) {
                throw new Error(
                    "getURLForOperation is required on the root GqlRouter",
                );
            }

            if (thisFetch == null && typeof fetch !== "function") {
                throw new Error(
                    "No fetch implementation provided and no global fetch detected; please provide one on the root GqlRouter, or install an implementation such as node-fetch",
                );
            }
        }
    }

    // We want to always use the same object if things haven't changed to avoid
    // over-rendering our children, let's memoize the configuration.
    const configuration: GqlRouterConfiguration<TContext> = React.useMemo(
        () => ({
            fetch: thisFetch ?? existing?.fetch ?? fetch,
            getURLForOperation:
                // Our error checking above ensures that we will have a
                // valid value here.
                // $FlowFixMe[incompatible-use]
                thisGetURLForOperation ?? existing.getURLForOperation,
            // Our error checking above ensures that we will have a
            // valid value here.
            // $FlowFixMe[incompatible-use]
            defaultContext: thisDefaultContext ?? existing.defaultContext,
        }),
        [thisDefaultContext, thisFetch, thisGetURLForOperation, existing],
    );

    return (
        <GqlRouterContext.Provider value={configuration}>
            {children}
        </GqlRouterContext.Provider>
    );
};
