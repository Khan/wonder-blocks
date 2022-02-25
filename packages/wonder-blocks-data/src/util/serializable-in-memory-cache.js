// @flow
import {KindError, Errors, clone} from "@khanacademy/wonder-stuff-core";
import {ScopedInMemoryCache} from "./scoped-in-memory-cache.js";
import type {ValidCacheData, ScopedCache} from "./types.js";

/**
 * Describe an in-memory cache.
 */
export class SerializableInMemoryCache extends ScopedInMemoryCache {
    constructor(initialCache: ScopedCache = {}) {
        try {
            super(clone(initialCache));
        } catch (e) {
            throw new KindError(
                `An error occurred trying to initialize from a response cache snapshot: ${e}`,
                Errors.InvalidInput,
            );
        }
    }

    /**
     * Set a value in the cache.
     */
    set<TValue: ValidCacheData>(
        scope: string,
        id: string,
        value: TValue,
    ): void {
        super.set(scope, id, Object.freeze(clone(value)));
    }

    /**
     * Clone the cache.
     */
    clone(): ScopedCache {
        try {
            return clone(this._cache);
        } catch (e) {
            throw new KindError(
                "An error occurred while trying to clone the cache",
                Errors.Internal,
                {
                    cause: e,
                },
            );
        }
    }
}
