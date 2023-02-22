// @flow
// TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
// have fixed:
// https://github.com/import-js/eslint-plugin-import/issues/2073
// eslint-disable-next-line import/named
export {FetchPolicy} from "./util/types";
export type {
    ErrorOptions,
    ResponseCache,
    CachedResponse,
    Result,
    RawScopedCache,
    ValidCacheData,
    ScopedCache,
} from "./util/types";

export * from "./util/hydration-cache-api";
export * from "./util/request-api";
export {purgeCaches} from "./util/purge-caches";
export {default as TrackData} from "./components/track-data";
export {default as Data} from "./components/data";
export {default as InterceptRequests} from "./components/intercept-requests";
export {DataError, DataErrors} from "./util/data-error";
export {useServerEffect} from "./hooks/use-server-effect";
export {useCachedEffect} from "./hooks/use-cached-effect";
export {useSharedCache, SharedCache} from "./hooks/use-shared-cache";
export {
    useHydratableEffect,
    // TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
    // have fixed:
    // https://github.com/import-js/eslint-plugin-import/issues/2073
    // eslint-disable-next-line import/named
    WhenClientSide,
} from "./hooks/use-hydratable-effect";
export {ScopedInMemoryCache} from "./util/scoped-in-memory-cache";
export {SerializableInMemoryCache} from "./util/serializable-in-memory-cache";
export {Status} from "./util/status";

////////////////////////////////////////////////////////////////////////////////
// GraphQL
////////////////////////////////////////////////////////////////////////////////
export {getGqlRequestId} from "./util/get-gql-request-id";
export {getGqlDataFromResponse} from "./util/get-gql-data-from-response";
export {graphQLDocumentNodeParser} from "./util/graphql-document-node-parser";
export {toGqlOperation} from "./util/to-gql-operation";
export {GqlRouter} from "./components/gql-router";
export {useGql} from "./hooks/use-gql";
export {GqlError, GqlErrors} from "./util/gql-error";
export type {
    GqlContext,
    GqlOperation,
    GqlOperationType,
    GqlFetchOptions,
    GqlFetchFn,
} from "./util/gql-types";
