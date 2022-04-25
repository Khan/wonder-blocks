// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {RequestTracker} from "./util/request-tracking.js";

import type {ResponseCache} from "./util/types.js";

export * from "./util/hydration-cache-api.js";

// TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
// have fixed:
// https://github.com/import-js/eslint-plugin-import/issues/2073
// eslint-disable-next-line import/named
export {FetchPolicy} from "./util/types.js";
export type {
    ErrorOptions,
    ResponseCache,
    CachedResponse,
    Result,
    ScopedCache,
    ValidCacheData,
} from "./util/types.js";

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

export {default as TrackData} from "./components/track-data.js";
export {default as Data} from "./components/data.js";
export {default as InterceptRequests} from "./components/intercept-requests.js";
export {DataError, DataErrors} from "./util/data-error.js";
export {useServerEffect} from "./hooks/use-server-effect.js";
export {useCachedEffect} from "./hooks/use-cached-effect.js";
export {useSharedCache, purgeSharedCache} from "./hooks/use-shared-cache.js";
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
export {getGqlRequestId} from "./util/get-gql-request-id.js";
export {graphQLDocumentNodeParser} from "./util/graphql-document-node-parser.js";
export {toGqlOperation} from "./util/to-gql-operation.js";
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
