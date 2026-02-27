# useCachedEffect()

```ts
function useCachedEffect<TData: ValidCacheData>(
    requestId: string,
    handler: () => Promise<TData>,
    options?: CachedEffectOptions<TData>,
): [Result<TData>, () => void];
```

This hook invokes the given handler and caches the result using the [`useSharedCache`](./?path=/docs/packages-data-exports-usesharedcache--docs) hook. The `requestId` is used to both identify inflight requests that can be shared, and to identify the cached value to use.

The hook returns an array containing the current state of the request (including data or error if the request has been fulfilled), and a function that can be used to `refetch` that request on demand. Calling `refetch` while an inflight request is in progress for the given `requestId` will be a no-op.

The behavior of the hook can be modified with the options.

The result is cached based on the `requestId` and `scope` options. Changing either of these values will cause the hook to treat it as a new request and invoke the handler again. The `fetchPolicy` option can be used to control how the cache is used in relation to requests. The default fetch policy of [`FetchPolicy.CacheBeforeNetwork`](./?path=/docs/packages-data-types-fetchpolicy--docs) is usually the one you want to use.

Any call that updates the cache will result in a re-render of the component using this hook, unless the `onResultChanged` option is provided, in which case the callback will be invoked instead.

```ts
type CachedEffectOptions<TData: ValidCacheData> = {|
    skip?: boolean,
    retainResultOnChange?: boolean,
    onResultChanged?: (result: Result<TData>) => void,
    scope?: string,
    fetchPolicy?: FetchPolicy,
|};
```

| Option                 | Default                                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `skip`                 | `false`                                                                                            | When `true`, the effect will not be executed; otherwise, the effect will be executed. If this is set to `true` while the effect is still pending, the pending effect will be cancelled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `retainResultOnChange` | `false`                                                                                            | When `true`, the effect will not reset the result to the loading status while executing if the requestId changes, instead, returning the existing result from before the change; otherwise, the result will be set to loading status. If the status is loading when the changes are made, it will remain as loading; old pending effects are discarded on changes and as such this value has no effect in that case.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `onResultChanged`      | `undefined`                                                                                        | Callback that is invoked if the result for the given hook has changed. When defined, the hook will invoke this callback whenever it has reason to change the result and will not otherwise affect component rendering directly. When not defined, the hook will ensure the component re-renders to pick up the latest result.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `scope`                | `"useCachedEffect"`                                                                                | Scope to use with the shared cache. When specified, the given scope will be used to isolate this hook's cached results. Otherwise, the default scope will be used. Changing this value after the first call is not supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `fetchPolicy`          | [`FetchPolicy.CacheBeforeNetwork`](./?path=/docs/packages-data-types-fetchpolicy--docs) | The policy to use when determining how to retrieve the request data from cache and network.  Inflight requests are shared so that multiple requests for the same resource do not cause multiple fetches while one fetch is already in progress.  Network requests update the cache on return, regardless of which policy initiated the request. Cache updates always result in a re-render of the component using this hook, unless the `onResultChanged` option is provided, in which case the callback will be invoked instead.  For fetch policies that use the cache, if the cache does not yet have the data, and a request for the data is in flight, then a `loading` status is returned; if there is no inflight request, then a `no-data` status is returned.  The `FetchPolicy.NetworkOnly` and `FetchPolicy.CacheAndNetwork` only fetch the data once and then reuse that result, unless a re-fetch is explicitly triggered via the fetch function in the returned tuple.  For `FetchPolicy.NetworkOnly`, the cache is ignored (but the cache is still updated with the fetched value). Until a value is available, a `loading` status is returned for this policy. |


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
- [Types Fetch Policy](types-fetch-policy.md)
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
