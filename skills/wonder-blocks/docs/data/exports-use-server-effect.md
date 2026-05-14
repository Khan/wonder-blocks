# useServerEffect()

```ts
function useServerEffect<TData: ValidCacheData>(
    requestId: string,
    handler: () => Promise<TData>,
    options?: ServerEffectOptions,
): ?Result<TData>;
```

The `useServerEffect` hook is an integral part of server-side rendering. It has different behavior depending on whether it is running on the server (and in what context) or the client.

```ts
type ServerEffectOptions = {|
    skip?: boolean,
    hydrate?: boolean,
|};
```

| Option    | Default | Description                                                                                                                                                                                                        |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hydrate` | `true`  | When `true`, the result of the effect when fulfilled using Wonder Blocks Data will be stored in the hydration cache for hydrating client-side; otherwise, the result will be stored in the server-side-only cache. |
| `skip`    | `false` | When `true`, the effect will not be tracked for fulfillment; otherwise, the effect will be tracked for fulfillment.                                                                                                |

## Server-side behavior

First, this hook checks the server-side rendering cache for the request identifier; if it finds a cached value, it will return that.

If there is no cached value, it will return a "loading" state. In addition, if the current rendering component has a [`TrackData`](./?path=/docs/packages-data-exports-trackdata--docs) ancestor, `useServerEffect` will register the request for fulfillment.

This then allows that pending request to be fulfilled with [`fetchTrackedRequests`](./?path=/docs/packages-data-exports-fetchtrackddatarequests--docs), the response to be placed into the cache, and the render to be reexecuted, at which point, this hook will be able to provide that result instead of "loading.

More details about server-side rendering with Wonder Blocks Data can be found in the [relevant overview section](./?path=/docs/packages-data-server-side-rendering-and-hydration--docs).

## Client-side behavior

On initial render in the client, this hook will look for a corresponding value in the Wonder Blocks Data hydration cache. If there is one, it will delete it from the hydration cache and return that value.

Otherwise, it will return `null`.


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
