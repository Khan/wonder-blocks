// @flow
import {GqlError, GqlErrors} from "./gql-error.js";
import type {ValidCacheData, CachedResponse, Result} from "./types.js";

/**
 * Turns a cache entry into a stateful result.
 */
export const resultFromCachedResponse = <TData: ValidCacheData>(
    cacheEntry: ?CachedResponse<TData>,
): Result<TData> => {
    // No cache entry means we didn't load one yet.
    if (cacheEntry == null) {
        return {
            status: "loading",
        };
    }

    const {data, error} = cacheEntry;
    if (error != null) {
        return {
            status: "error",
            error: new GqlError(error, GqlErrors.Hydrated),
        };
    }

    if (data != null) {
        return {
            status: "success",
            data,
        };
    }

    return {
        status: "aborted",
    };
};
