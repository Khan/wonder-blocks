// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import MemoryCache from "./memory-cache.js";

import type {
    ValidData,
    CacheEntry,
    Cache,
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

    _hydrationCache: MemoryCache<any, any>;
    _ssrOnlyCache: ?MemoryCache<any, any>;

    constructor(
        hydrationCache: ?MemoryCache<any, any> = null,
        ssrOnlyCache: ?MemoryCache<any, any> = null,
    ) {
        this._ssrOnlyCache = Server.isServerSide()
            ? ssrOnlyCache || new MemoryCache()
            : undefined;
        this._hydrationCache = hydrationCache || new MemoryCache();
    }

    _setCacheEntry<TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): CacheEntry<TData> {
        const frozenEntry = Object.freeze(entry);
        if (this._ssrOnlyCache != null) {
            // We are server-side.
            // We need to store this value.
            if (handler.hydrate) {
                this._hydrationCache.store(handler, options, frozenEntry);
            } else {
                this._ssrOnlyCache.store(handler, options, frozenEntry);
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
    cacheData: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        data: TData,
    ) => CacheEntry<TData> = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        data: TData,
    ): CacheEntry<TData> => this._setCacheEntry(handler, options, {data});

    /**
     * Cache an error for a specific response.
     *
     * This is a noop when client-side.
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
        // Get the cached entry for this value.
        // If the handler wants WB Data to hydrate (i.e. handler.hydrate is
        // true), we use our hydration cache. Otherwise, if we're server-side
        // we use our SSR-only cache. Otherwise, there's no entry to return.
        const cache = handler.hydrate
            ? this._hydrationCache
            : Server.isServerSide()
            ? this._ssrOnlyCache
            : undefined;
        const internalEntry = cache?.retrieve(handler, options);

        // If we are not server-side and we hydrated something, let's clear
        // that from the hydration cache to save memory.
        if (this._ssrOnlyCache == null && internalEntry != null) {
            // We now delete this from our hydration cache as we don't need it.
            // This does mean that if another handler of the same type but
            // without some sort of linked cache won't get the value, but
            // that's not an expected use-case. If two different places use the
            // same handler and options (i.e. the same request), then the
            // handler should cater to that to ensure they share the result.
            this._hydrationCache.remove(handler, options);
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

        // Delete the entry from the appropriate cache.
        return handler.hydrate
            ? this._hydrationCache.remove(handler, options)
            : this._ssrOnlyCache?.remove(handler, options) ?? false;
    };

    /**
     * Remove from cache, any entries matching the given handler and predicate.
     *
     * This will, if present therein, remove matching values from the framework
     * in-memory cache.
     *
     * It returns a count of all records removed.
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
        // Apply the predicate to what we have in the appropriate cache.
        return handler.hydrate
            ? this._hydrationCache.removeAll(handler, predicate)
            : this._ssrOnlyCache?.removeAll(handler, predicate) ?? 0;
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
