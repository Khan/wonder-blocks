// @flow
import * as React from "react";
import {KindError, Errors} from "@khanacademy/wonder-stuff-core";
import {ScopedInMemoryCache} from "../util/scoped-in-memory-cache.js";
import type {ValidCacheData} from "../util/types.js";

/**
 * A function for inserting a value into the cache or clearing it.
 */
type CacheValueFn<TValue: ValidCacheData> = (value: ?TValue) => void;

/**
 * This is the cache.
 * It's incredibly complex.
 * Very in-memory. So cache. Such complex. Wow.
 */
const cache = new ScopedInMemoryCache();

/**
 * Clear the in-memory cache or a single scope within it.
 */
export const clearSharedCache = (scope: string = "") => {
    // If we have a valid scope (empty string is falsy), then clear that scope.
    if (scope && typeof scope === "string") {
        cache.purgeScope(scope);
    } else {
        // Just reset the object. This should be sufficient.
        cache.purgeAll();
    }
};

/**
 * Hook to retrieve data from and store data in an in-memory cache.
 *
 * @returns {[?ReadOnlyCacheValue, CacheValueFn]}
 * Returns an array containing the current cache entry (or undefined), a
 * function to set the cache entry (passing null or undefined to this function
 * will delete the entry).
 *
 * To clear a single scope within the cache or the entire cache,
 * the `clearScopedCache` export is available.
 *
 * NOTE: Unlike useState or useReducer, we don't automatically update folks
 * if the value they reference changes. We might add it later (if we need to),
 * but the likelihood here is that things won't be changing in this cache in a
 * way where we would need that. If we do (and likely only in specific
 * circumstances), we should consider adding a simple boolean useState that can
 * be toggled to cause a rerender whenever the referenced cached data changes
 * so that callers can re-render on cache changes. However, we should make
 * sure this toggling is optional - or we could use a callback argument, to
 * achieve this on an as-needed basis.
 */
export const useSharedCache = <TValue: ValidCacheData>(
    id: string,
    scope: string,
    initialValue?: ?TValue | (() => ?TValue),
): [?TValue, CacheValueFn<TValue>] => {
    // Verify arguments.
    if (!id || typeof id !== "string") {
        throw new KindError(
            "id must be a non-empty string",
            Errors.InvalidInput,
        );
    }

    if (!scope || typeof scope !== "string") {
        throw new KindError(
            "scope must be a non-empty string",
            Errors.InvalidInput,
        );
    }

    // Memoize our APIs.
    // This one allows callers to set or replace the cached value.
    const cacheValue = React.useCallback(
        (value: ?TValue) =>
            value == null
                ? cache.purge(scope, id)
                : cache.set(scope, id, value),
        [id, scope],
    );

    // We don't memo-ize the current value, just in case the cache was updated
    // since our last run through. Also, our cache does not know what type it
    // stores, so we have to cast it to the type we're exporting. This is a
    // dev time courtesy, rather than a runtime thing.
    // $FlowIgnore[incompatible-type]
    let currentValue: ?TValue = cache.get(scope, id);

    // If we have an initial value, we need to add it to the cache
    // and use it as our current value.
    if (currentValue == null && initialValue !== undefined) {
        // Get the initial value.
        const value =
            typeof initialValue === "function" ? initialValue() : initialValue;

        // Update the cache.
        cacheValue(value);

        // Make sure we return this value as our current value.
        currentValue = value;
    }

    // Now we have everything, let's return it.
    return [currentValue, cacheValue];
};
