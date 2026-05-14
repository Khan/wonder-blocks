# FetchPolicy

```ts
/**
 * Defines the various fetch policies that can be applied to requests.
 *
 * If a policy fetches from the server, then the cache will be updated with
 * the result of that fetch, once it completes. Inflight fetches are shared
 * so that multiple requests for the same resource do not cause multiple
 * fetches while one fetch is already in progress.
 *
 * It is up to the implementation to decide how to handle cache misses, but
 * most cases likely return a `no-data` or, in the case where a request is
 * being made for the data, a `loading` result.
 */
export enum FetchPolicy {
    /**
     * If the data is in the cache, use that data and do not fetch.
     * Otherwise, provide `loading` while data is fetched from the server.
     */
    CacheBeforeNetwork = "CacheBeforeNetwork",

    /**
     * If the data is in the cache, use that data, but also fetch an update
     * from the server (inflight requests are shared).
     * Otherwise, provide `loading` while data is fetched from the server.
     */
    CacheAndNetwork = "CacheAndNetwork",

    /**
     * If the data is in the cache, use that; otherwise, provide `no-data`.
     */
    CacheOnly = "CacheOnly",

    /**
     * Ignore any existing cached result; fetch data from the server, if it
     * wasn't already fetched. While there is no data, provide `loading`.
     */
    NetworkOnly = "NetworkOnly",
}
```

The `FetchPolicy` type is used with our request framework to define how a request should be fulfilled with respect to the cache and the network.

## Policies

### `FetchPolicy.CacheBeforeNetwork`

This is often the default policy and is the one you likely want in most circumstances. This indicates that the latest cached value should be used, and if there isn't one, then a request should be made to fetch the data from the server and cache it. This is equivalent to the `cache-first` policy in Apollo Client.

### `FetchPolicy.CacheAndNetwork`

This request acts like `NetworkOnly` except that if there is a cached value, it will be used immediately while the request is made to fetch an updated value from the server. This is useful when you want to show something immediately but also want to ensure that the data is up-to-date. This is equivalent to the `cache-and-network` policy in Apollo Client.

### `FetchPolicy.CacheOnly`

This policy will only use the cached value if it exists, and will not make a network request. If there is no cached value, it will return `no-data`. This is useful when you want to ensure that you are only using cached data and not making any network requests. This is equivalent to the `cache-only` policy in Apollo Client.

### `FetchPolicy.NetworkOnly`

This policy will ignore any cached value and always make a network request. While the request is in flight, it will return `loading`. This is useful when you want to ensure that you are always getting the latest data from the server, regardless of any cached values. This is equivalent to the `network-only` policy in Apollo Client.


---

## Related docs

- [Overview](overview.md)
- [Exports Abort Inflight Requests](exports-abort-inflight-requests.md)
- [Exports Data](exports-data.md)
- [Exports Data Error](exports-data-error.md)
- [Exports Data Errors](exports-data-errors.md)
- [Exports Fetch Tracked Requests](exports-fetch-tracked-requests.md)
- [Exports Get Gql Request Id](exports-get-gql-request-id.md)
- [Exports Gql Error](exports-gql-error.md)
- [Exports Gql Errors](exports-gql-errors.md)
- [Exports Gql Router](exports-gql-router.md)
- [Exports Has Tracked Requests To Be Fetched](exports-has-tracked-requests-to-be-fetched.md)
- [Exports Initialize Hydration Cache](exports-initialize-hydration-cache.md)
- [Exports Intercept Requests](exports-intercept-requests.md)
- [Exports Purge Caches](exports-purge-caches.md)
- [Exports Purge Hydration Cache](exports-purge-hydration-cache.md)
- [Exports Scoped In Memory Cache](exports-scoped-in-memory-cache.md)
- [Exports Serializable In Memory Cache](exports-serializable-in-memory-cache.md)
- [Exports Shared Cache](exports-shared-cache.md)
- [Exports Status](exports-status.md)
- [Exports Track Data](exports-track-data.md)
- [Exports Use Cached Effect](exports-use-cached-effect.md)
- [Exports Use Gql](exports-use-gql.md)
- [Exports Use Hydratable Effect](exports-use-hydratable-effect.md)
- [Exports Use Server Effect](exports-use-server-effect.md)
- [Exports Use Shared Cache](exports-use-shared-cache.md)
- [Exports When Client Side](exports-when-client-side.md)
- [Graph Ql](graph-ql.md)
- [Server Side Rendering And Hydration](server-side-rendering-and-hydration.md)
- [Testing](testing.md)
- [Types Cached Response](types-cached-response.md)
- [Types Error Options](types-error-options.md)
- [Types Gql Context](types-gql-context.md)
- [Types Gql Fetch Fn](types-gql-fetch-fn.md)
- [Types Gql Fetch Options](types-gql-fetch-options.md)
- [Types Gql Operation](types-gql-operation.md)
- [Types Gql Operation Type](types-gql-operation-type.md)
- [Types Raw Scoped Cache](types-raw-scoped-cache.md)
- [Types Response Cache](types-response-cache.md)
- [Types Result](types-result.md)
- [Types Scoped Cache](types-scoped-cache.md)
- [Types Valid Cache Data](types-valid-cache-data.md)
