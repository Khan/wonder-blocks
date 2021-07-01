// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import MemoryCache from "./memory-cache.js";
import NoCache from "./no-cache.js";

import type {
    ValidData,
    CacheEntry,
    Cache,
    ICache,
    IRequestHandler,
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

    _hydrationAndDefaultCache: MemoryCache<any, any>;
    _ssrOnlyCache: ?MemoryCache<any, any>;

    constructor(
        memoryCache: ?MemoryCache<any, any> = null,
        ssrOnlyCache: ?MemoryCache<any, any> = null,
    ) {
        this._ssrOnlyCache = Server.isServerSide()
            ? ssrOnlyCache || new MemoryCache()
            : undefined;
        this._hydrationAndDefaultCache = memoryCache || new MemoryCache();
    }

    /**
     * Returns the default cache to use for the given handler.
     */
    _defaultCache<TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
    ): ICache<TOptions, TData> {
        if (handler.hydrate) {
            return this._hydrationAndDefaultCache;
        }

        // If the handler doesn't want to hydrate, we return the SSR-only cache.
        // If we are client-side, we return our non-caching implementation.
        return this._ssrOnlyCache || NoCache.Default;
    }

    _setCacheEntry<TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): CacheEntry<TData> {
        const frozenEntry = Object.freeze(entry);

        if (this._ssrOnlyCache == null && handler.cache != null) {
            // We are not server-side, and our handler has its own cache,
            // so we use that to store values.
            handler.cache.store(handler, options, frozenEntry);
        } else {
            // We are either server-side, or our handler doesn't provide
            // a caching override.
            this._defaultCache(handler).store(handler, options, frozenEntry);
        }
        return frozenEntry;
    }

    /**
     * Initialize the cache from a given cache state.
     *
     * This can only be called if the cache is not already in use.
     */
    initialize: (source: ResCache) => void = (source) => {
        if (this._hydrationAndDefaultCache.inUse) {
            throw new Error(
                "Cannot initialize data response cache more than once",
            );
        }

        try {
            this._hydrationAndDefaultCache = new MemoryCache(source);
        } catch (e) {
            throw new Error(
                `An error occurred trying to initialize the data response cache: ${e}`,
            );
        }
    };

    /**
     * Cache data for a specific response.
     */
    cacheData: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        data: TData,
    ) => CacheEntry<TData> = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        data: TData,
    ): CacheEntry<TData> => {
        return this._setCacheEntry(handler, options, {data});
    };

    /**
     * Cache an error for a specific response.
     */
    cacheError: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        error: Error | string,
    ) => CacheEntry<TData> = <TOptions, TData: ValidData>(
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
    getEntry: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ) => ?$ReadOnly<CacheEntry<TData>> = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?$ReadOnly<CacheEntry<TData>> => {
        // If we're not server-side, and the handler has a custom cache
        // let's try to use it.
        if (this._ssrOnlyCache == null && handler.cache != null) {
            const entry = handler.cache.retrieve(handler, options);
            if (entry != null) {
                // Custom cache has an entry, so use it.
                return entry;
            }
        }

        // Get the internal entry for the handler.
        // This allows us to use our hydrated cache during hydration.
        // If we just returned null when the custom cache didn't have it,
        // we would never hydrate properly.
        const internalEntry = this._defaultCache<TOptions, TData>(
            handler,
        ).retrieve(handler, options);

        // If we hydrated something that the custom cache didn't have,
        // we need to make sure the custom cache contains that value.
        if (handler.cache != null && internalEntry != null) {
            // Yes, if this throws, we will have a problem. We want that.
            // Bad cache implementations should be overt.
            handler.cache.store(handler, options, internalEntry);

            // We now delete this from our in-memory cache as we don't need it.
            // This does mean that if another handler of the same type but
            // without a custom cache won't get the value, but that's not an
            // expected valid usage of this framework - two handlers with
            // different caching options shouldn't be using the same type name.
            this._hydrationAndDefaultCache.remove(handler, options);
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
    remove: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ) => boolean = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): boolean => {
        // NOTE(somewhatabstract): We could invoke removeAll with a predicate
        // to match the key of the entry we're removing, but that's an
        // inefficient way to remove a single item, so let's not do that.

        // If we're not server-side, and the handler has a custom cache
        // let's try to use it.
        const customCache = this._ssrOnlyCache == null ? handler.cache : null;
        const removedCustom: boolean = !!customCache?.remove(handler, options);

        // Delete the entry from our internal cache.
        // Even if we have a custom cache, we want to make sure we still
        // removed the same value from internal cache since this could be
        // getting called before hydration for some complex advanced usage
        // reason.
        return (
            this._defaultCache(handler).remove(handler, options) ||
            removedCustom
        );
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
    removeAll: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ) => number = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ): number => {
        // If we're not server-side, and the handler has a custom cache
        // let's try to use it.
        const customCache = this._ssrOnlyCache == null ? handler.cache : null;
        const removedCountCustom: number =
            customCache?.removeAll(handler, predicate) || 0;

        // Apply the predicate to what we have in our internal cached.
        // Even if we have a custom cache, we want to make sure we still
        // removed the same value from internal cache since this could be
        // getting called before hydration for some complex advanced usage
        // reason.
        const removedCount = this._defaultCache(handler).removeAll(
            handler,
            predicate,
        );

        // We have no idea which keys were removed from which caches,
        // so we can't dedupe the remove counts based on keys.
        // That's why we return the total records deleted rather than the
        // total keys deleted.
        return removedCount + removedCountCustom;
    };

    /**
     * Deep clone the hydration cache.
     *
     * By design, this does not clone anything held in custom caches.
     */
    cloneHydratableData: () => $ReadOnly<Cache> = (): $ReadOnly<Cache> => {
        // We return our hydration cache only.
        return this._hydrationAndDefaultCache.cloneData();
    };
}
