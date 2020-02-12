// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import type {CacheEntry, Cache, IRequestHandler} from "./types.js";

function deepClone<T: {...}>(source: T | $ReadOnly<T>): $ReadOnly<T> {
    /**
     * We want to deep clone the source cache to dodge mutations by external
     * references. So we serialize the source cache to JSON and parse it
     * back into a new object.
     *
     * NOTE: This doesn't work for get/set property accessors.
     */
    const serializedInitCache = JSON.stringify(source);
    const cloneInitCache = JSON.parse(serializedInitCache);
    return Object.freeze(cloneInitCache);
}

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

    _cache: Cache = {};

    constructor(source: ?Cache = undefined) {
        if (source != null) {
            this.initialize(source);
        }
    }

    _setCacheEntry<TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): CacheEntry<TData> {
        const requestType = handler.type;

        // We don't support custom caches during SSR.
        const customCache = Server.isServerSide() ? null : handler.cache;

        // If we have a custom cache, use that and skip our own.
        if (customCache != null) {
            const frozenEntry = Object.freeze(entry);
            customCache.store(handler, options, frozenEntry);
            return frozenEntry;
        }

        // Ensure we have a cache location for this handler type.
        this._cache[requestType] = this._cache[requestType] || {};

        // Cache the data.
        const key = handler.getKey(options);
        this._cache[requestType][key] = Object.freeze(entry);
        return this._cache[requestType][key];
    }

    /**
     * Initialize the cache from a given cache state.
     *
     * This can only be called if the cache is not already in use.
     */
    initialize = (source: $ReadOnly<Cache>): void => {
        if (Object.keys(this._cache).length !== 0) {
            throw new Error(
                "Cannot initialize data response cache more than once",
            );
        }

        try {
            /**
             * Object.assign only performs a shallow clone.
             * So we deep clone it and then assign the clone values to our
             * internal cache.
             */
            const cloneInitCache = deepClone(source);
            Object.assign(this._cache, cloneInitCache);
        } catch (e) {
            throw new Error(
                `An error occurred trying to initialize the data response cache: ${e}`,
            );
        }
    };

    /**
     * Cache data for a specific response.
     */
    cacheData = <TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        data: TData,
    ): CacheEntry<TData> => {
        return this._setCacheEntry(handler, options, {data});
    };

    /**
     * Cache an error for a specific response.
     */
    cacheError = <TOptions, TData>(
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
    getEntry = <TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?$ReadOnly<CacheEntry<TData>> => {
        const requestType = handler.type;

        const key = handler.getKey(options);

        // We don't use custom caches during SSR.
        const customCache = Server.isServerSide() ? null : handler.cache;
        const entry = customCache && customCache.retrieve(handler, options);
        if (entry != null) {
            // Custom cache has an entry, so use it.
            return entry;
        }

        // Get the internal subcache for the handler.
        const handlerCache = this._cache[requestType];
        if (!handlerCache) {
            return null;
        }

        // Get the response.
        const internalEntry = handlerCache[key];
        if (internalEntry == null) {
            return null;
        }

        // If we have a custom cache on the handler, make sure it has the entry.
        if (customCache != null) {
            customCache.store(handler, options, internalEntry);
        }
        return internalEntry;
    };

    /**
     * Deep clone the cache.
     */
    cloneCachedData = (): $ReadOnly<Cache> => {
        try {
            return deepClone(this._cache);
        } catch (e) {
            throw new Error(
                `An error occurred while trying to clone the cache: ${e}`,
            );
        }
    };
}
