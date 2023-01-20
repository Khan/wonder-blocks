// @flow
import {DataError, DataErrors} from "./data-error";
import type {ScopedCache, RawScopedCache, ValidCacheData} from "./types";

/**
 * Describe an in-memory cache.
 */
export class ScopedInMemoryCache implements ScopedCache {
    _cache: RawScopedCache;

    constructor(initialCache: RawScopedCache = {}) {
        this._cache = initialCache;
    }

    /**
     * Indicate if this cache is being used or not.
     *
     * When the cache has entries, returns `true`; otherwise, returns `false`.
     */
    get inUse(): boolean {
        return Object.keys(this._cache).length > 0;
    }

    /**
     * Set a value in the cache.
     */
    set(scope: string, id: string, value: ValidCacheData): void {
        if (!id || typeof id !== "string") {
            throw new DataError(
                "id must be non-empty string",
                DataErrors.InvalidInput,
            );
        }

        if (!scope || typeof scope !== "string") {
            throw new DataError(
                "scope must be non-empty string",
                DataErrors.InvalidInput,
            );
        }

        if (typeof value === "function") {
            throw new DataError(
                "value must be a non-function value",
                DataErrors.InvalidInput,
            );
        }

        this._cache[scope] = this._cache[scope] ?? {};
        this._cache[scope][id] = value;
    }

    /**
     * Retrieve a value from the cache.
     */
    get(scope: string, id: string): ?ValidCacheData {
        return this._cache[scope]?.[id] ?? null;
    }

    /**
     * Purge an item from the cache.
     */
    purge(scope: string, id: string): void {
        if (!this._cache[scope]?.[id]) {
            return;
        }
        delete this._cache[scope][id];
        if (Object.keys(this._cache[scope]).length === 0) {
            delete this._cache[scope];
        }
    }

    /**
     * Purge a scope of items that match the given predicate.
     *
     * If the predicate is omitted, then all items in the scope are purged.
     */
    purgeScope(
        scope: string,
        predicate?: (id: string, value: ValidCacheData) => boolean,
    ): void {
        if (!this._cache[scope]) {
            return;
        }

        if (predicate == null) {
            delete this._cache[scope];
            return;
        }

        for (const key of Object.keys(this._cache[scope])) {
            if (predicate(key, this._cache[scope][key])) {
                delete this._cache[scope][key];
            }
        }
        if (Object.keys(this._cache[scope]).length === 0) {
            delete this._cache[scope];
        }
    }

    /**
     * Purge all items from the cache that match the given predicate.
     *
     * If the predicate is omitted, then all items in the cache are purged.
     */
    purgeAll(
        predicate?: (
            scope: string,
            id: string,
            value: ValidCacheData,
        ) => boolean,
    ): void {
        if (predicate == null) {
            this._cache = {};
            return;
        }

        for (const scope of Object.keys(this._cache)) {
            this.purgeScope(scope, (id, value) => predicate(scope, id, value));
        }
    }
}
