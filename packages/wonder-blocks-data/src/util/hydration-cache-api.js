// @flow
import {SsrCache} from "./ssr-cache.js";

import type {ValidCacheData, CachedResponse, ResponseCache} from "./types.js";

/**
 * Initialize the hydration cache.
 *
 * @param {ResponseCache} source The cache content to use for initializing the
 * cache.
 * @throws {Error} If the cache is already initialized.
 */
export const initializeHydrationCache = (source: ResponseCache): void =>
    SsrCache.Default.initialize(source);

/**
 * Purge cached hydration responses that match the given predicate.
 *
 * @param {(id: string) => boolean} [predicate] The predicate to match against
 * the cached hydration responses. If no predicate is provided, all cached
 * hydration responses will be purged.
 */
export const purgeHydrationCache = (
    predicate?: (
        key: string,
        cacheEntry: ?$ReadOnly<CachedResponse<ValidCacheData>>,
    ) => boolean,
): void => SsrCache.Default.purgeData(predicate);
