# WhenClientSide

This enumeration is used with [`useHydratableEffect`](./?path=/docs/packages-data-exports-usehydratableeffect--docs). It defines how the hook should behave when rendering on the client.

## WhenClientSide.DoNotHydrate

The effect will not be hydrated and as such the effect will always be executed on initial render in the client. This is an advanced use-case that you should avoid unless you are certain of what you are doing.

Without hydration support to ensure the data is available for hydration on the client, your server and client rendered pages may differ and the hydration will fail. This option is useful if something else is responsible for data capture and hydration of the action that gets executed. For example, if the action uses Apollo Client to perform the asynchronous action executed by this effect, then that may be also performing hydration responsibilities. However, be cautious; the code that calls `useHydratableEffect` will have to have access to that data on hydration as `useHydratableEffect` will return a "loading" state on initial render, which is not what you will want.

## WhenClientSide.ExecuteWhenNoResult

On initial render in the client, the effect is hydrated from the server-side rendered result. However, it is only executed if there was no server-side render result to hydrate (this can happen if the server-side rendered request was aborted, or if the component is rendering for the first time on the client and was never part of the server-side rendered content).

## WhenClientSide.ExecuteWhenNoSuccessResult

This behavior will hydrate the server-side result, but it will only execute the effect on the client if the hydrated result is not a success result.

## WhenClientSide.AlwaysExecute

When the effect is executed with this behavior, the server-side result will be hydrated and the effect will be executed on the initial client-side render, regardless of the hydrated result status.


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
