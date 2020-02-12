// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import MemoryCache from "./memory-cache.js";

import type {ValidData, CacheEntry, Cache, IRequestHandler} from "./types.js";

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
    static get Default() {
        if (!_default) {
            _default = new ResponseCache();
        }
        return _default;
    }

    _cache: MemoryCache<any, any>;

    constructor(memoryCache: ?MemoryCache<any, any> = null) {
        this._cache = memoryCache || new MemoryCache();
    }

    _setCacheEntry<TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): CacheEntry<TData> {
        // We don't support custom caches during SSR.
        const customCache = Server.isServerSide() ? null : handler.cache;
        const frozenEntry = Object.freeze(entry);

        // If we have a custom cache, use that and skip our own.
        if (customCache != null) {
            customCache.store(handler, options, frozenEntry);
        } else {
            this._cache.store(handler, options, frozenEntry);
        }
        return frozenEntry;
    }

    /**
     * Initialize the cache from a given cache state.
     *
     * This can only be called if the cache is not already in use.
     */
    initialize = (source: $ReadOnly<Cache>): void => {
        if (this._cache.inUse) {
            throw new Error(
                "Cannot initialize data response cache more than once",
            );
        }

        try {
            this._cache = new MemoryCache(source);
        } catch (e) {
            throw new Error(
                `An error occurred trying to initialize the data response cache: ${e}`,
            );
        }
    };

    /**
     * Cache data for a specific response.
     */
    cacheData = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        data: TData,
    ): CacheEntry<TData> => {
        return this._setCacheEntry(handler, options, {data});
    };

    /**
     * Cache an error for a specific response.
     */
    cacheError = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        error: Error | string,
    ): CacheEntry<TData> => {
        const errorMessage = typeof error === "string" ? error : error.message;
        return this._setCacheEntry(handler, options, {error: errorMessage});
    };

    /**
     * Retrieve data from our cache.
     */
    getEntry = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?$ReadOnly<CacheEntry<TData>> => {
        // We don't use custom caches during SSR.
        const customCache = Server.isServerSide() ? null : handler.cache;
        const entry = customCache && customCache.retrieve(handler, options);
        if (entry != null) {
            // Custom cache has an entry, so use it.
            return entry;
        }

        // Get the internal entry for the handler.
        const internalEntry = this._cache.retrieve<TOptions, TData>(
            handler,
            options,
        );

        // If we have a custom cache on the handler, make sure it has the entry.
        if (customCache != null && internalEntry != null) {
            // Yes, if this throws, we will have a problem. We want that.
            // Bad cache implementations should be overt.
            customCache.store(handler, options, internalEntry);

            // We now delete this from our in-memory cache as we don't need it.
            // This does mean that if another handler of the same type but
            // without a custom cache won't get the value, but that's not an
            // expected valid usage of this framework.
            this._cache.remove(handler, options);
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
    remove = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): boolean => {
        // NOTE(somewhatabstract): We could invoke removeAll with a predicate
        // to match the key of the entry we're removing, but that's an
        // inefficient way to remove a single item, so let's not do that.

        // We don't use custom caches during SSR.
        const customCache = Server.isServerSide() ? null : handler.cache;
        const removedCustom: boolean = !!(
            customCache && customCache.remove(handler, options)
        );

        // Delete the entry from our internal cache.
        return this._cache.remove(handler, options) || removedCustom;
    };

    /**
     * Remove from cache, any entries matching the given handler and predicate.
     *
     * This will, if present therein, remove matching values from the custom
     * cache associated with the handler and the framework in-memory cache.
     *
     * It returns a count of all records removed. This is not a count of unique
     * keys, but of unique entries. So if the same key is removed from both the
     * framework and custom caches, that will be 2 records removed.
     */
    removeAll = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ): number => {
        // We don't use custom caches during SSR.
        const customCache = Server.isServerSide() ? null : handler.cache;
        const removedCountCustom: number =
            (customCache && customCache.removeAll(handler, predicate)) || 0;

        // Apply the predicate to what we have in ourn internal cached.
        const removedCount = this._cache.removeAll(handler, predicate);
        return removedCount + removedCountCustom;
    };

    /**
     * Deep clone the cache.
     *
     * By design, this does not clone anything held in custom caches.
     */
    cloneCachedData = (): $ReadOnly<Cache> => {
        return this._cache.cloneData();
    };
}
