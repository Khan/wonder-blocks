// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {SsrCache} from "./util/ssr-cache.js";
import {RequestTracker} from "./util/request-tracking.js";

import type {
    ValidCacheData,
    CachedResponse,
    ResponseCache,
} from "./util/types.js";

export type {
    ErrorOptions,
    ResponseCache,
    CachedResponse,
    Result,
    ScopedCache,
    ValidCacheData,
} from "./util/types.js";

/**
 * Initialize the hydration cache.
 *
 * @param {ResponseCache} source The cache content to use for initializing the
 * cache.
 * @throws {Error} If the cache is already initialized.
 */
export const initializeCache = (source: ResponseCache): void =>
    SsrCache.Default.initialize(source);

/**
 * Fulfill all tracked data requests.
 *
 * This is for use with the `TrackData` component during server-side rendering.
 *
 * @throws {Error} If executed outside of server-side rendering.
 * @returns {Promise<void>} A promise that resolves when all tracked requests
 * have been fulfilled.
 */
export const fulfillAllDataRequests = (): Promise<ResponseCache> => {
    if (!Server.isServerSide()) {
        return Promise.reject(
            new Error("Data requests are not tracked when client-side"),
        );
    }
    return RequestTracker.Default.fulfillTrackedRequests();
};

/**
 * Indicate if there are unfulfilled tracked requests.
 *
 * This is used in conjunction with `TrackData`.
 *
 * @throws {Error} If executed outside of server-side rendering.
 * @returns {boolean} `true` if there are unfulfilled tracked requests;
 * otherwise, `false`.
 */
export const hasUnfulfilledRequests = (): boolean => {
    if (!Server.isServerSide()) {
        throw new Error("Data requests are not tracked when client-side");
    }
    return RequestTracker.Default.hasUnfulfilledRequests;
};

/**
 * Remove the request identified from the cached hydration responses.
 *
 * @param {string} id The request ID of the response to remove from the cache.
 */
export const removeFromCache = (id: string): boolean =>
    SsrCache.Default.remove(id);

/**
 * Remove all cached hydration responses that match the given predicate.
 *
 * @param {(id: string) => boolean} [predicate] The predicate to match against
 * the cached hydration responses. If no predicate is provided, all cached
 * hydration responses will be removed.
 */
export const removeAllFromCache = (
    predicate?: (
        key: string,
        cacheEntry: ?$ReadOnly<CachedResponse<ValidCacheData>>,
    ) => boolean,
): void => SsrCache.Default.removeAll(predicate);

export {default as TrackData} from "./components/track-data.js";
export {default as Data} from "./components/data.js";
export {default as InterceptRequests} from "./components/intercept-requests.js";
export {DataError, DataErrors} from "./util/data-error.js";
export {useServerEffect} from "./hooks/use-server-effect.js";
export {useCachedEffect} from "./hooks/use-cached-effect.js";
export {useSharedCache, clearSharedCache} from "./hooks/use-shared-cache.js";
export {
    useHydratableEffect,
    // TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
    // have fixed:
    // https://github.com/import-js/eslint-plugin-import/issues/2073
    // eslint-disable-next-line import/named
    WhenClientSide,
} from "./hooks/use-hydratable-effect.js";
export {ScopedInMemoryCache} from "./util/scoped-in-memory-cache.js";
export {SerializableInMemoryCache} from "./util/serializable-in-memory-cache.js";
export {RequestFulfillment} from "./util/request-fulfillment.js";
export {Status} from "./util/status.js";

// GraphQL
export {GqlRouter} from "./components/gql-router.js";
export {useGql} from "./hooks/use-gql.js";
export {GqlError, GqlErrors} from "./util/gql-error.js";
export type {
    GqlContext,
    GqlOperation,
    GqlOperationType,
    GqlFetchOptions,
    GqlFetchFn,
} from "./util/gql-types.js";
