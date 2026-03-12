# useGql()

```ts
type FetchFn = <TData, TVariables: {...}>(
    operation: GqlOperation<TData, TVariables>,
    options?: GqlFetchOptions<TVariables, TContext>,
) => Promise<TData>;

function useGql<TContext: GqlContext>(
    context: Partial<TContext> = ({}: $Shape<TContext>),
): FetchFn;
```

The `useGql` hook requires that the calling component has been rendered with a [`GqlRouter`](./?path=/docs/packages-data-exports-gqlrouter--docs) as an ancestor component since it relies on the default context and fetch operation that is specified therein.

The `useGql` hook can take a partial context value which will be combined with the default context to create the context used for a specific request.

The return value of `useGql` is a fetch function that can be used to invoke a GraphQL request. It takes as arguments the [`GqlOperation`](./?path=/docs/packages-data-types-gqloperation--docs) operation to be performed and some options (which, by their nature, are optional). These options can be used to provide variables for the operation as well as additional customization of the context.

The result of calling the function returned by `useGql` is a promise of the data that the request will return. This is compatible with the [`useServerEffect`](./?path=/docs/packages-data-exports-useservereffect--docs), [`useCachedEffect`](./?path=/docs/packages-data-exports-usecachedeffect--docs), and [`useHydratableEffect`](./?path=/docs/packages-data-exports-usehydratableeffect--docs) hooks, allowing a variety of scenarios to be easily constructed.

Use [`getGqlRequestId`](./?path=/docs/packages-data-exports-getgqlrequestid--docs) to get a request ID that can be used with these hooks.

## Context Merging

Context overrides are combined such that any values that are explicitly or implicitly `undefined` on the partial context will be ignored. Any values that are explicitly `null` on the partial context will be removed from the merged context. The order of precedence is as follows:

1. Values from the fetch partial context, then,
2. Values from the `useGql` partial context, then,
3. Values from the default context.


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
