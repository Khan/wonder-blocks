# Testing Support

Wonder Blocks Data has been designed to support testing in a variety of environments including jest and storybook. In order to support the various ways in which folks need to test their code, we have considered a number of approaches to testing Wonder Blocks Data.

## Spies

If you are writing unit tests, you may just want to spy on the methods you are calling using `jest.spyOn` or similar. This can be a really easy way to intercept the request handler passed to the [`useCachedEffect`](./?path=/docs/packages-data-exports-usecachedeffect--docs) hook, for example, and check that it is the handler you expect.

## Interceptors

Each request used by Wonder Blocks Data has to have an identifier. The [`InterceptRequests`](./?path=/docs/packages-data-exports-interceptrequests--docs) component allows you to wrap the code under test with an interceptor. Interceptors are given the request identifier and get to choose, based off that identifier, if they want to provide their own response rather than let the original request handler deal with it.

Multiple interceptors can be registered by nesting the [`InterceptRequests`](./?path=/docs/packages-data-exports-interceptrequests--docs) component as is necessary. Registered interceptors are invoked in ancestral order, with the nearest ancestor to the intercepted request being invoked first.

When hooks like [`useServerEffect`](./?path=/docs/packages-data-exports-useservereffect--docs), [`useCachedEffect`](./?path=/docs/packages-data-exports-usecachedeffect--docs), or [`useHydratedEffect`](./?path=/docs/packages-data-exports-usehydratedeffect--docs) run, they get the chain of registered interceptors and chain those with the original handler in order to determine what to actually do when executing the request.

This allows you to mock out requests in unit tests, stories, and other scenarios.

## GqlRouter, mockGqlFetch, and RespondWith

If you are testing GraphQL operations, you can configure [`GqlRouter`](./?path=/docs/packages-data-exports-gqlrouter--docs) with your own function for the `fetch` prop. However, crafting the right response to give
the result you want is a bit tricky.

```tsx
const myFakeGqlFetch = (
    operation: GqlOperation<TData, TVariables>,
    variables: ?TVariables,
    context: TContext,
): Promise<Response> {
    if (operation.id === "myQuery" && variables?.someVar === 5) {
        return Promise.resolve({
            status: 200,
            text: () =>
                Promise.resolve(
                    JSON.stringify({
                        data: {
                            myQuery: {
                                someField: "someValue",
                            },
                        },
                    }),
                ),
        });
    }

    return Promise.resolve({
        status: 404,
        text: () => Promise.resolve(JSON.stringify({})),
    });
}

<GqlRouter fetch={myFakeGqlFetch} defaultContext={{some: "sort of context"}}>
    <ComponentUnderTest />
</GqlRouter>
```

As shown above, you can interrogate parts of the requested operation to decide how to respond. However, this can get cumbersome if you have GraphQL requests nested in more complex components as each test has to mock out suitable responses for each one. To help with this the Wonder Blocks Testing package provides a [`RespondWith`](./?path=/docs/packages-testing-exports-respondwith--docs) type for defining responses that fit a specific scenario, and the [`mockGqlFetch()`](./?path=/docs/packages-testing-exports-mockgqlfetch--docs) API.

```tsx
const myFakeGqlFetch = mockGqlFetch().mockOperationOnce(
    {
        operation: MyQueryOperation,
        variables: {
            someVar: 5,
        },
    },
    RespondWith.success({
        data: {
            myQuery: {
                someField: "someValue",
            },
        },
    }),
);

<GqlRouter fetch={myFakeGqlFetch} defaultContext={{some: "sort of context"}}>
    <ComponentUnderTest />
</GqlRouter>;
```

In the above example, we now only mock our specific operation once. If something
tries to request this data a second time, it will give an error instead. Not only that, but with a little refactoring, we can create a helper to set this mock up that others can call if they need to mock our operation for their own tests.

```ts
const mockMyQuery = (mockGqlFetchFn: GqlFetchMockFn): GqlFetchMockFn =>
    mockGqlFetchFn().mockOperationOnce(
        {
            operation: MyQueryOperation,
            variables: {
                someVar: 5,
            },
        },
        RespondWith.success({
            data: {
                myQuery: {
                    someField: "someValue",
                },
            },
        }),
    );

const myFakeGqlFetch = mockMyQuery(mockGqlFetch());

<GqlRouter fetch={myFakeGqlFetch} defaultContext={{some: "sort of context"}}>
    <ComponentUnderTest />
</GqlRouter>;
```

Now, using a compose function, multiple mocks can be setup on the same `mockGqlFetch` instance.

For more details on this and other testing utilities, see the [Wonder Blocks Testing documentation](./?path=/docs/packages-testing-overview--docs).


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
