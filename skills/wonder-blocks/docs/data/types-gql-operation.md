# GqlOperation\<>

```ts
type GqlOperation<
    TData,
    TVariables: {...} = Empty,
> = {
    type: GqlOperationType,
    id: string,
    [key: string]: mixed,
    ...
};
```

The `GqlOperation<>` type provides the Wonder Blocks Data definition of a GraphQL query or mutation. It has two required fields:

-   `type`: The type of operation. It can be either `"query"` or `"mutation"`.
-   `id`: The unique identifier of the operation.

Unlike some GraphQL clients, the definition of the operation (the document node, for example) is not required by the Wonder Blocks Data implementation. If a specific use requires that information, the calling code is able to provide it.

Consider the following GraphQL query (using `graphql-tag`):

```ts
const MyQuery = gql`
    query myQuery {
        user {
            id
            name
        }
    }
`;
```

Rather than using the full `DocumentNode` at runtime, one could envisage a build step that converts it to a `GqlOperation<>` at compile time by parsing the `DocumentNode` to determine the operation type and extract the name of the operation. If the actual definition is needed for sending to the server in the request, this can be obtained from `graphql/language/printer`. This would then reduce the dependencies needed to perform GraphQL operations at runtime.

The resulting `GqlOperation<>` would look like this:

```ts
{
    type: "query",
    id: "myQuery",
}
```

Or, if say, the query definition were needed (for example, Apollo will send requests with the `query` field):

```ts
{
    type: "query",
    id: "myQuery",
    query: "query myQuery { user { id name } }",
}
```

See the section on [GraphQL](./?path=/docs/packages-data-graphql--docs) for more information.


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
- [Types Fetch Policy](types-fetch-policy.md)
- [Types Gql Context](types-gql-context.md)
- [Types Gql Fetch Fn](types-gql-fetch-fn.md)
- [Types Gql Fetch Options](types-gql-fetch-options.md)
- [Types Gql Operation Type](types-gql-operation-type.md)
- [Types Raw Scoped Cache](types-raw-scoped-cache.md)
- [Types Response Cache](types-response-cache.md)
- [Types Result](types-result.md)
- [Types Scoped Cache](types-scoped-cache.md)
- [Types Valid Cache Data](types-valid-cache-data.md)
