import * as React from "react";

import {GqlRouterContext} from "../util/gql-router-context";

import type {
    GqlContext,
    GqlFetchFn,
    GqlRouterConfiguration,
} from "../util/gql-types";

type Props<TContext extends GqlContext> = {
    /**
     * The default context to be used by operations when no context is provided.
     */
    defaultContext: TContext;
    /**
     * The function to use when fetching requests.
     */
    fetch: GqlFetchFn<any, any, TContext>;
    /**
     * The children to be rendered inside the router.
     */
    children: React.ReactNode;
};

/**
 * Configure GraphQL routing for GraphQL hooks and components.
 *
 * These can be nested. Components and hooks relying on the GraphQL routing
 * will use the configuration from their closest ancestral GqlRouter.
 */
export const GqlRouter: React.FC<Props<TContext>> = <
    TContext extends GqlContext,
>({
    // @ts-expect-error [FEI-5019] - TS7031 - Binding element 'thisDefaultContext' implicitly has an 'any' type.
    defaultContext: thisDefaultContext,
    // @ts-expect-error [FEI-5019] - TS7031 - Binding element 'thisFetch' implicitly has an 'any' type.
    fetch: thisFetch,
    // @ts-expect-error [FEI-5019] - TS7031 - Binding element 'children' implicitly has an 'any' type.
    children,
}): React.ReactElement => {
    // We don't care if we're nested. We always force our callers to define
    // everything. It makes for a clearer API and requires less error checking
    // code (assuming our flow types are correct). We also don't default fetch
    // to anything - our callers can tell us what function to use quite easily.
    // If code that consumes this wants more nuanced nesting, it can implement
    // it within its own GqlRouter than then defers to this one.

    // We want to always use the same object if things haven't changed to avoid
    // over-rendering consumers of our context, let's memoize the configuration.
    // By doing this, if a component under children that uses this context
    // uses React.memo, we won't force it to re-render every time we render
    // because we'll only change the context value if something has actually
    // changed.
    const configuration: GqlRouterConfiguration<TContext> = React.useMemo(
        () => ({
            fetch: thisFetch,
            defaultContext: thisDefaultContext,
        }),
        [thisDefaultContext, thisFetch],
    );

    return (
        <GqlRouterContext.Provider value={configuration}>
            {children}
        </GqlRouterContext.Provider>
    );
};
