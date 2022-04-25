// @flow
import {purgeSharedCache} from "../hooks/use-shared-cache.js";
import {purgeHydrationCache} from "./hydration-cache-api.js";

/**
 * Purge all caches managed by Wonder Blocks Data.
 *
 * This is a convenience method that purges the shared cache and the hydration
 * cache. It is useful for testing purposes to avoid having to reason about
 * which caches may have been used during a given test run.
 */
export const purgeCaches = () => {
    purgeSharedCache();
    purgeHydrationCache();
};
