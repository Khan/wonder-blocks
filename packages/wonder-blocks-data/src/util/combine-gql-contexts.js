// @flow
import type {GqlContext} from "./gql-types.js";

/**
 * Combine a partial context with a given default context.
 */
export const combineGqlContexts = <TContext: GqlContext>(
    defaultContext: TContext,
    partialContext: ?Partial<TContext>,
): TContext => ({
    ...defaultContext,
    ...partialContext,
});
