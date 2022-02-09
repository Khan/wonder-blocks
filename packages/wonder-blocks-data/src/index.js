// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {ResponseCache} from "./util/response-cache.js";
import {RequestTracker} from "./util/request-tracking.js";

import type {
    ValidCacheData,
    CachedResponse,
    CachedResponses,
} from "./util/types.js";

export type {
    CachedResponses,
    CachedResponse,
    Result,
    ScopedCache,
} from "./util/types.js";

export const initializeCache = (source: CachedResponses): void =>
    ResponseCache.Default.initialize(source);

export const fulfillAllDataRequests = (): Promise<CachedResponses> => {
    if (!Server.isServerSide()) {
        return Promise.reject(
            new Error("Data requests are not tracked when client-side"),
        );
    }
    return RequestTracker.Default.fulfillTrackedRequests();
};

export const hasUnfulfilledRequests = (): boolean => {
    if (!Server.isServerSide()) {
        throw new Error("Data requests are not tracked when client-side");
    }
    return RequestTracker.Default.hasUnfulfilledRequests;
};

export const removeFromCache = (id: string): boolean =>
    ResponseCache.Default.remove(id);

export const removeAllFromCache = (
    predicate?: (
        key: string,
        cacheEntry: ?$ReadOnly<CachedResponse<ValidCacheData>>,
    ) => boolean,
): void => ResponseCache.Default.removeAll(predicate);

export {default as TrackData} from "./components/track-data.js";
export {default as Data} from "./components/data.js";
export {default as InterceptData} from "./components/intercept-data.js";
export {useServerEffect} from "./hooks/use-server-effect.js";
export {useSharedCache, clearSharedCache} from "./hooks/use-shared-cache.js";
export {InMemoryCache} from "./util/in-memory-cache.js";

// GraphQL
export {GqlRouter} from "./components/gql-router.js";
export {useGql} from "./hooks/use-gql.js";
export * from "./util/gql-error.js";
export type {
    GqlContext,
    GqlOperation,
    GqlOperationType,
    GqlFetchOptions,
    GqlFetchFn,
} from "./util/gql-types.js";
