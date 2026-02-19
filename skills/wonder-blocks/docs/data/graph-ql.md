# GraphQL in Wonder Blocks Data

Wonder Blocks Data provides some utility types and functionality to assist in performing GraphQL requests. To use them, your React app should include the [`GqlRouter`](./?path=/docs/packages-data-exports-gqlrouter--docs) component to specify the method responsible for actually making the GraphQL requests, as well as any default context that requests should include.

The [`GqlRouter`](./?path=/docs/packages-data-exports-gqlrouter--docs) component uses React context to convey this information to the [`useGql`](./?path=/docs/packages-data-exports-usegql--docs) hook, which provides a wrapper to the fetch function, allowing for simplified invocation of requests that can merge context changes with the default context as well as only provide context and variables when needed.

## Testing

By using the [`GqlRouter`](./?path=/docs/packages-data-exports-gqlrouter--docs) in combination with the [`mockGqlFetch()`](./?path=/docs/packages-testing-exports-mockgqlfetch) API from Wonder Blocks Testing, you can easily mock your GraphQL responses in tests and stories.

```tsx
const mockFetch = mockGqlFetch()
    .mockOperation(...);

<GqlRouter fetch={mockFetch} defaultContext={{}}>
    <MyComponent />
</GqlRouter>
```

## Server-side rendering and hydration of GraphQL

Server-side rendering and hydration of GraphQL data can be achieved by combining the [`useGql`](./?path=/docs/packages-data-exports-usegql--docs) hook with the [`useHydrationEffect`](./?path=/docs/packages-data-exports/usehydrationeffect--docs) hook.

More details about server-side rendering with Wonder Blocks Data can be found in the [relevant overview section](./?path=/docs/packages-data-server-side-rendering-and-hydration--docs).


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
