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
    ResponseCache,
    CachedResponse,
    Result,
    ScopedCache,
} from "./util/types.js";

export const initializeCache = (source: ResponseCache): void =>
    SsrCache.Default.initialize(source);

export const fulfillAllDataRequests = (): Promise<ResponseCache> => {
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
    SsrCache.Default.remove(id);

export const removeAllFromCache = (
    predicate?: (
        key: string,
        cacheEntry: ?$ReadOnly<CachedResponse<ValidCacheData>>,
    ) => boolean,
): void => SsrCache.Default.removeAll(predicate);

export {default as TrackData} from "./components/track-data.js";
export {default as Data} from "./components/data.js";
export {default as InterceptRequests} from "./components/intercept-requests.js";
export {useServerEffect} from "./hooks/use-server-effect.js";
export {useRequestInterception} from "./hooks/use-request-interception.js";
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
export {RequestFulfillment} from "./util/request-fulfillment.js";
export {Status} from "./util/status.js";

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
