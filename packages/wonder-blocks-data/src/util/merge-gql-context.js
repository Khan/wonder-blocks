// @flow
import type {GqlContext} from "./gql-types.js";

/**
 * Construct a complete GqlContext from current defaults and a partial context.
 */
export const mergeGqlContext = <TContext: GqlContext>(
    defaultContext: TContext,
    overrides: Partial<TContext>,
): TContext => {
    // Let's merge the partial context default context. We deliberately
    // don't spread because spreading would overwrite default context
    // values with undefined if the partial context includes a value
    // explicitly set to undefined
    return Object.keys(overrides).reduce(
        (acc, key) => {
            if (overrides[key] !== undefined) {
                acc[key] = overrides[key];
            }
            return acc;
        },
        {...defaultContext},
    );
};
