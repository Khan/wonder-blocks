// @flow
import {GqlError, GqlErrors} from "./gql-error.js";
import type {ValidCacheData, CachedResponse, Result} from "./types.js";

/**
 * Turns a cache entry into a stateful result.
 */
export const resultFromCachedResponse = <TData: ValidCacheData>(
    cacheEntry: ?CachedResponse<TData>,
): ?Result<TData> => {
    // No cache entry means no result to be hydrated.
    if (cacheEntry == null) {
        return null;
    }

    const {data, error} = cacheEntry;
    if (error != null) {
        return {
            status: "error",
            // Let's hydrate the error. We don't persist everything about the
            // original error on the server, hence why we only superficially
            // hydrate it to a GqlHydratedError.
            error: new GqlError(error, GqlErrors.Hydrated),
        };
    }

    if (data != null) {
        return {
            status: "success",
            data,
        };
    }

    // We shouldn't get here since we don't actually cache null data.
    return {
        status: "aborted",
    };
};
