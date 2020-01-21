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

    // TODO(somewhatabstract): tests for remove/removeAll
    // TODO(somewhatabstract): tests for store to custom on retrieve
    // TODO(somewhatabstract): tests for store to custom on store
    // TODO(somewhatabstract): tets for retrieve from custom on retrieve

    _setCacheEntry<TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): CacheEntry<TData> {
        const requestType = handler.type;

        // We don't support custom caches during SSR.
        const customCache = Server.isServerSide() ? null : handler.cache;
        const frozenEntry = Object.freeze(entry);

        // If we have a custom cache, use that and skip our own.
        if (customCache != null) {
            customCache.store(handler, options, frozenEntry);
        } else {
            // Ensure we have a cache location for this handler type.
            this._cache[requestType] = this._cache[requestType] || {};

            // Cache the data.
            const key = handler.getKey(options);
            this._cache[requestType][key] = frozenEntry;
        }
        return frozenEntry;
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
        const key = handler.getKey(options);
        const internalEntry = handlerCache[key];
        if (internalEntry == null) {
            return null;
        }

        // If we have a custom cache on the handler, make sure it has the entry.
        if (customCache != null) {
            // Yes, if this throws, we will have a problem. We want that.
            // Bad cache implementations should be overt.
            customCache.store(handler, options, internalEntry);

            // We now delete this from our in-memory cache as we don't need it.
            // This does mean that if another handler of the same type but
            // without a custom cache won't get the value, but that's not an
            // expected valid usage of this framework.
            delete handlerCache[key];
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
    remove = <TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): boolean => {
        const requestType = handler.type;

        // NOTE(somewhatabstract): We could invoke removeAll with a predicate
        // to match the key of the entry we're removing, but that's an
        // inefficient way to remove a single item, so let's not do that.

        // We don't use custom caches during SSR.
        const customCache = Server.isServerSide() ? null : handler.cache;
        const removedCustom: boolean = !!(
            customCache && customCache.remove(handler, options)
        );

        // Get the internal subcache for the handler.
        const handlerCache = this._cache[requestType];
        if (!handlerCache) {
            return removedCustom;
        }

        // Get the entry.
        const key = handler.getKey(options);
        const internalEntry = handlerCache[key];
        if (internalEntry == null) {
            return removedCustom;
        }

        // Delete the entry.
        delete handlerCache[key];
        return true;
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
    removeAll = <TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ): number => {
        const requestType = handler.type;

        // We don't use custom caches during SSR.
        const customCache = Server.isServerSide() ? null : handler.cache;
        const removedCountCustom: number =
            (customCache && customCache.removeAll(handler, predicate)) || 0;

        // Get the internal subcache for the handler.
        const handlerCache = this._cache[requestType];
        if (!handlerCache) {
            return removedCountCustom;
        }

        // Apply the predicate to what we have cached.
        let removedCount = 0;
        for (const [key, entry] of Object.entries(handlerCache)) {
            if (
                typeof predicate !== "function" ||
                predicate(key, (entry: any))
            ) {
                removedCount++;
                delete handlerCache[key];
            }
        }
        return removedCount + removedCountCustom;
    };

    /**
     * Deep clone the cache.
     *
     * By design, this does not clone anything held in custom caches.
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
