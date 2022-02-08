// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import MemoryCache from "./memory-cache.js";

import type {
    ValidData,
    CacheEntry,
    Cache,
    ResponseCache as ResCache,
} from "./types.js";

/**
 * The default instance is stored here.
 * It's created below in the Default() static property.
 */
let _default: ResponseCache;

/**
 * Implements the response cache.
 *
 * INTERNAL USE ONLY
 */
export class ResponseCache {
    static get Default(): ResponseCache {
        if (!_default) {
            _default = new ResponseCache();
        }
        return _default;
    }

    _hydrationCache: MemoryCache;
    _ssrOnlyCache: ?MemoryCache;

    constructor(
        hydrationCache: ?MemoryCache = null,
        ssrOnlyCache: ?MemoryCache = null,
    ) {
        this._ssrOnlyCache = Server.isServerSide()
            ? ssrOnlyCache || new MemoryCache()
            : undefined;
        this._hydrationCache = hydrationCache || new MemoryCache();
    }

    _setCacheEntry<TData: ValidData>(
        id: string,
        entry: CacheEntry<TData>,
        hydrate: boolean,
    ): CacheEntry<TData> {
        const frozenEntry = Object.freeze(entry);
        if (Server.isServerSide()) {
            // We are server-side.
            // We need to store this value.
            if (hydrate) {
                this._hydrationCache.store(id, frozenEntry);
            } else {
                // Usually, when server-side, this cache will always be present.
                // We do fake server-side in our doc example though, when it
                // won't be.
                this._ssrOnlyCache?.store(id, frozenEntry);
            }
        }
        return frozenEntry;
    }

    /**
     * Initialize the cache from a given cache state.
     *
     * This can only be called if the cache is not already in use.
     */
    initialize: (source: ResCache) => void = (source) => {
        if (this._hydrationCache.inUse) {
            throw new Error(
                "Cannot initialize data response cache more than once",
            );
        }

        try {
            this._hydrationCache = new MemoryCache(source);
        } catch (e) {
            throw new Error(
                `An error occurred trying to initialize the data response cache: ${e}`,
            );
        }
    };

    /**
     * Cache data for a specific response.
     *
     * This is a noop when client-side.
     */
    cacheData: <TData: ValidData>(
        id: string,
        data: TData,
        hydrate: boolean,
    ) => CacheEntry<TData> = <TData: ValidData>(
        id: string,
        data: TData,
        hydrate: boolean,
    ): CacheEntry<TData> => this._setCacheEntry(id, {data}, hydrate);

    /**
     * Cache an error for a specific response.
     *
     * This is a noop when client-side.
     */
    cacheError: <TData: ValidData>(
        id: string,
        error: Error | string,
        hydrate: boolean,
    ) => CacheEntry<TData> = <TData: ValidData>(
        id: string,
        error: Error | string,
        hydrate: boolean,
    ): CacheEntry<TData> => {
        const errorMessage = typeof error === "string" ? error : error.message;
        return this._setCacheEntry(id, {error: errorMessage}, hydrate);
    };

    /**
     * Retrieve data from our cache.
     */
    getEntry: <TData: ValidData>(id: string) => ?$ReadOnly<CacheEntry<TData>> =
        <TData: ValidData>(id: string): ?$ReadOnly<CacheEntry<TData>> => {
            // Get the cached entry for this value.

            // We first look in the ssr cache and then the hydration cache.
            const internalEntry =
                this._ssrOnlyCache?.retrieve(id) ??
                this._hydrationCache.retrieve(id);

            // If we are not server-side and we hydrated something, let's clear
            // that from the hydration cache to save memory.
            if (this._ssrOnlyCache == null && internalEntry != null) {
                // We now delete this from our hydration cache as we don't need it.
                // This does mean that if another handler of the same type but
                // without some sort of linked cache won't get the value, but
                // that's not an expected use-case. If two different places use the
                // same handler and options (i.e. the same request), then the
                // handler should cater to that to ensure they share the result.
                this._hydrationCache.remove(id);
            }
            return internalEntry;
        };

    /**
     * Remove from cache, the entry matching the given handler and options.
     *
     * This will, if present therein, remove the value from the custom cache
     * associated with the handler and the framework in-memory cache.
     *
     * Returns true if something was removed from any cache; otherwise, false.
     */
    remove: (id: string) => boolean = (id: string): boolean => {
        // NOTE(somewhatabstract): We could invoke removeAll with a predicate
        // to match the key of the entry we're removing, but that's an
        // inefficient way to remove a single item, so let's not do that.

        // Delete the entry from the appropriate cache.
        return (
            this._hydrationCache.remove(id) ||
            (this._ssrOnlyCache?.remove(id) ?? false)
        );
    };

    /**
     * Remove from cache, any entries matching the given handler and predicate.
     *
     * This will, if present therein, remove matching values from the framework
     * in-memory cache.
     *
     * It returns a count of all records removed.
     */
    removeAll: (
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<ValidData>>,
        ) => boolean,
    ) => number = (
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<ValidData>>,
        ) => boolean,
    ): number => {
        // Apply the predicate to what we have in our caches.
        return (
            this._hydrationCache.removeAll(predicate) +
            (this._ssrOnlyCache?.removeAll(predicate) ?? 0)
        );
    };

    /**
     * Deep clone the hydration cache.
     *
     * By design, this only clones the data that is to be used for hydration.
     */
    cloneHydratableData: () => $ReadOnly<Cache> = (): $ReadOnly<Cache> => {
        // We return our hydration cache only.
        return this._hydrationCache.cloneData();
    };
}
