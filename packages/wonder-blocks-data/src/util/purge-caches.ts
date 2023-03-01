import {SharedCache} from "../hooks/use-shared-cache";
import {purgeHydrationCache} from "./hydration-cache-api";

/**
 * Purge all caches managed by Wonder Blocks Data.
 *
 * This is a convenience method that purges the shared cache and the hydration
 * cache. It is useful for testing purposes to avoid having to reason about
 * which caches may have been used during a given test run.
 */
export const purgeCaches = () => {
    SharedCache.purgeAll();
    purgeHydrationCache();
};
