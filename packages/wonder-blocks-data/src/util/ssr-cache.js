// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {SerializableInMemoryCache} from "./serializable-in-memory-cache.js";

import type {ValidCacheData, CachedResponse, ResponseCache} from "./types.js";

const DefaultScope = "default";

/**
 * The default instance is stored here.
 * It's created below in the Default() static property.
 */
let _default: SsrCache;

/**
 * Implements the response cache.
 *
 * INTERNAL USE ONLY
 */
export class SsrCache {
    static get Default(): SsrCache {
        if (!_default) {
            _default = new SsrCache();
        }
        return _default;
    }

    _hydrationCache: SerializableInMemoryCache;
    _ssrOnlyCache: SerializableInMemoryCache;

    constructor(
        hydrationCache: ?SerializableInMemoryCache = null,
        ssrOnlyCache: ?SerializableInMemoryCache = null,
    ) {
        this._ssrOnlyCache = ssrOnlyCache || new SerializableInMemoryCache();
        this._hydrationCache =
            hydrationCache || new SerializableInMemoryCache();
    }

    _setCachedResponse<TData: ValidCacheData>(
        id: string,
        entry: CachedResponse<TData>,
        hydrate: boolean,
    ): CachedResponse<TData> {
        const frozenEntry = Object.freeze(entry);
        if (Server.isServerSide()) {
            // We are server-side.
            // We need to store this value.
            if (hydrate) {
                this._hydrationCache.set(DefaultScope, id, frozenEntry);
            } else {
                // Usually, when server-side, this cache will always be present.
                // We do fake server-side in our doc example though, when it
                // won't be.
                this._ssrOnlyCache.set(DefaultScope, id, frozenEntry);
            }
        }
        return frozenEntry;
    }

    /**
     * Initialize the cache from a given cache state.
     *
     * This can only be called if the cache is not already in use.
     */
    initialize: (source: ResponseCache) => void = (source) => {
        if (this._hydrationCache.inUse) {
            throw new Error(
                "Cannot initialize data response cache more than once",
            );
        }
        this._hydrationCache = new SerializableInMemoryCache({
            // $FlowIgnore[incompatible-call]
            [DefaultScope]: source,
        });
    };

    /**
     * Cache data for a specific response.
     *
     * This is a noop when client-side.
     */
    cacheData: <TData: ValidCacheData>(
        id: string,
        data: TData,
        hydrate: boolean,
    ) => CachedResponse<TData> = <TData: ValidCacheData>(
        id: string,
        data: TData,
        hydrate: boolean,
    ): CachedResponse<TData> => this._setCachedResponse(id, {data}, hydrate);

    /**
     * Cache an error for a specific response.
     *
     * This is a noop when client-side.
     */
    cacheError: <TData: ValidCacheData>(
        id: string,
        error: Error | string,
        hydrate: boolean,
    ) => CachedResponse<TData> = <TData: ValidCacheData>(
        id: string,
        error: Error | string,
        hydrate: boolean,
    ): CachedResponse<TData> => {
        const errorMessage = typeof error === "string" ? error : error.message;
        return this._setCachedResponse(id, {error: errorMessage}, hydrate);
    };

    /**
     * Retrieve data from our cache.
     */
    getEntry: <TData: ValidCacheData>(
        id: string,
    ) => ?$ReadOnly<CachedResponse<TData>> = <TData: ValidCacheData>(
        id: string,
    ): ?$ReadOnly<CachedResponse<TData>> => {
        // Get the cached entry for this value.

        // We first look in the ssr cache, if we need to.
        const ssrEntry = Server.isServerSide()
            ? this._ssrOnlyCache.get(DefaultScope, id)
            : null;

        // Now we defer to the SSR value, and fallback to the hydration cache.
        const internalEntry =
            ssrEntry ?? this._hydrationCache.get(DefaultScope, id);

        // If we are not server-side and we hydrated something, let's clear
        // that from the hydration cache to save memory.
        if (!Server.isServerSide() && internalEntry != null) {
            // We now delete this from our hydration cache as we don't need it.
            // This does mean that if another handler of the same type but
            // without some sort of linked cache won't get the value, but
            // that's not an expected use-case. If two different places use the
            // same handler and options (i.e. the same request), then the
            // handler should cater to that to ensure they share the result.
            this._hydrationCache.purge(DefaultScope, id);
        }
        // Getting the typing right between the in-memory cache and this
        // is hard. Just telling flow it's OK.
        // $FlowIgnore[incompatible-return]
        return internalEntry;
    };

    /**
     * Remove from cache, any entries matching the given handler and predicate.
     *
     * This will, if present therein, remove matching values from the framework
     * in-memory cache.
     *
     * It returns a count of all records removed.
     */
    purgeData: (
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CachedResponse<ValidCacheData>>,
        ) => boolean,
    ) => void = (predicate) => {
        const realPredicate = predicate
            ? // We know what we're putting into the cache so let's assume it
              // conforms.
              // $FlowIgnore[incompatible-call]
              (_, key, cachedEntry) => predicate(key, cachedEntry)
            : undefined;

        // Apply the predicate to what we have in our caches.
        this._hydrationCache.purgeAll(realPredicate);
        this._ssrOnlyCache.purgeAll(realPredicate);
    };

    /**
     * Deep clone the hydration cache.
     *
     * By design, this only clones the data that is to be used for hydration.
     */
    cloneHydratableData: () => ResponseCache = (): ResponseCache => {
        // We return our hydration cache only.
        const cache = this._hydrationCache.clone();

        // If we're empty, we still want to return an object, so we default
        // to an empty object.
        // We only need the default scope out of our scoped in-memory cache.
        // We know that it conforms to our expectations.
        // $FlowIgnore[incompatible-return]
        return cache[DefaultScope] ?? {};
    };
}
