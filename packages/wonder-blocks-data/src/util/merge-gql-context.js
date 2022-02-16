// @flow
import type {GqlContext} from "./gql-types.js";

/**
 * Construct a complete GqlContext from current defaults and a partial context.
 *
 * Values in the partial context that are `undefined` will be ignored.
 * Values in the partial context that are `null` will be deleted.
 */
export const mergeGqlContext = <TContext: GqlContext>(
    defaultContext: TContext,
    overrides: Partial<TContext>,
): TContext => {
    // Let's merge the partial context default context. We deliberately
    // don't spread because spreading would overwrite default context
    // values with undefined or null if the partial context includes a value
    // explicitly set to undefined or null.
    return Object.keys(overrides).reduce(
        (acc, key) => {
            // Undefined values are ignored.
            if (overrides[key] !== undefined) {
                if (overrides[key] === null) {
                    // Null indicates we delete this context value.
                    delete acc[key];
                } else {
                    // Otherwise, we set it.
                    acc[key] = overrides[key];
                }
            }
            return acc;
        },
        {...defaultContext},
    );
};
