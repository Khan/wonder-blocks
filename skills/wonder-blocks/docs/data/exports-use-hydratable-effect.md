# useHydratableEffect()

```ts
function useHydratableEffect<TData: ValidCacheData>(
    requestId: string,
    handler: () => Promise<TData>,
    options?: HydratableEffectOptions<TData>,
): Result<TData>;
```

This hook combines [`useServerEffect`](./?path=/docs/packages-data-exports-useservereffect--docs) and [`useCachedEffect`](./?path=/docs/packages-data-exports-usecachedeffect--docs) to form an effect that can execute on the server and hydrate on the client.

More details about server-side rendering with Wonder Blocks Data can be found in the [relevant overview section](./?path=/docs/packages-data-server-side-rendering-and-hydration--docs).

```ts
type HydratableEffectOptions<TData: ValidCacheData> = {|
    clientBehavior?: WhenClientSide,
    skip?: boolean,
    retainResultOnChange?: boolean,
    onResultChanged?: (result: Result<TData>) => void,
    scope?: string,
|};
```

| Option                 | Default                                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clientBehavior`       | [`WhenClientSide.ExecuteWhenNoSuccessResult`](./?path=/docs/packages-data-exports-whenclientside--docs#whenclientsideexecutewhennosuccessresult) | How the hook should behave when rendering client-side for the first time. This controls the hydration and execution of the effect on the client. Changing this value after the initial render is inert. For more information on other behaviors, see [`WhenClientSide`](./?path=/docs/packages-data-exports-whenclientside--docs).                                                                                                    |
| `skip`                 | `false`                                                                                                                         | When `true`, the effect will not be executed; otherwise, the effect will be executed. If this is set to `true` while the effect is still pending, the pending effect will be cancelled.                                                                                                                                                                                                                              |
| `retainResultOnChange` | `false`                                                                                                                         | When `true`, the effect will not reset the result to the loading status while executing if the requestId changes, instead, returning the existing result from before the change; otherwise, the result will be set to loading status. If the status is loading when the changes are made, it will remain as loading; old pending effects are discarded on changes and as such this value has no effect in that case. |
| `onResultChanged`      | `undefined`                                                                                                                     | Callback that is invoked if the result for the given hook has changed. When defined, the hook will invoke this callback whenever it has reason to change the result and will not otherwise affect component rendering directly. When not defined, the hook will ensure the component re-renders to pick up the latest result.                                                                                        |
| `scope`                | `"useCachedEffect"`                                                                                                             | Scope to use with the shared cache. When specified, the given scope will be used to isolate this hook's cached results. Otherwise, the default scope will be used. Changing this value after the first call is not supported.                                                                                                                                                                                        |


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
