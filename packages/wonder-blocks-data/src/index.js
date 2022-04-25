// @flow
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

export * from "./util/hydration-cache-api.js";
export * from "./util/request-api.js";
export {purgeCaches} from "./util/purge-caches.js";
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

////////////////////////////////////////////////////////////////////////////////
// GraphQL
////////////////////////////////////////////////////////////////////////////////
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
