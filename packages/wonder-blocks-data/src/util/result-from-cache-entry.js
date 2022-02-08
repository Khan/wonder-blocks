// @flow
import type {ValidData, CacheEntry, Result} from "./types.js";

/**
 * Turns a cache entry into a stateful result.
 */
export const resultFromCacheEntry = <TData: ValidData>(
    cacheEntry: ?CacheEntry<TData>,
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
            error,
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
