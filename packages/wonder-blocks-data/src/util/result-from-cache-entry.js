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

    if (data != null) {
        return {
            status: "success",
            data,
        };
    }

    if (error == null) {
        // We should never get here ever.
        return {
            status: "error",
            error: "Loaded result has invalid state where data and error are missing",
        };
    }

    return {
        status: "error",
        error,
    };
};
