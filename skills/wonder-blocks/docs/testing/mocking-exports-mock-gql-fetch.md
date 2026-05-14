# mockGqlFetch()

```ts
mockGqlFetch(): GqlFetchMockFn;
```

The `mockGqlFetch` function provides an API to easily mock GraphQL responses for use with the [Wonder Blocks Data GraphQL API](./?path=/docs/packages-data-graphql--docs). It follows the similar patterns of `jest.fn()` and jest mocks whereby the returned value is both a proxy for the fetch function that is used by [`GqlRouter`](./?path=/docs/packages-data-exports-gqlrouter--docs) as well as an API for modifying the behavior of that function.

# API

Besides being a function that fits the [`GqlFetchFn`](./?path=/docs/packages-data-types-gqlfetchfn--docs) signature, the return value of `mockGqlFetch()` has an API to customize the behavior of that function. Used in conjunction with the [`RespondWith`](./?path=/docs/packages-testing-mocking-exports-respondwith--docs) API, this can create a variety of GraphQL responses for testing and stories.

| Function | Purpose |
| - | - |
| `mockOperation` | When called, any GraphQL operation that matches the defined mock operation will respond with the given response. |
| `mockOperationOnce` | When called, the first GraphQL operation that matches the defined mock operation will respond with the given response. The mock is only used once. |
| `configure` | This allows you to configure the behavior of the mock fetch function. |

Both of these functions have the same signature:

```ts
type GqlMockOperationFn = <
    TData: {...},
    TVariables: {...},
    TContext: GqlContext,
    TResponseData: GraphQLJson<TData>,
>(
    operation: GqlMockOperation<TData, TVariables, TContext>,
    response: MockResponse<TResponseData>,
) => GqlFetchMockFn;
```

## Configuration

The `configure` function allows you to configure the behavior of the mocked fetch function. It takes a partial configuration and applies that to the existing
configuration. This changes the behavior of all calls to the mocked function.

The full configuration is:

```ts
{
    hardFailOnUnmockedRequests: boolean;
}
```

| Configuration Key | Purpose |
| - | - |
| `hardFailOnUnmockedRequests` | When set to `true`, any unmocked request will throw an error, causing tests to fail. When set to `false`, unmocked requests will reject, which in turn gets handled by the relevant error handling in the code under test - this is the default behavior and is usually what you want so that you don't need to mock every single request that may be invoked during your tests. |

## Operation Matching

The `matchOperation` parameter given to a `mockOperation` or `mockOperationOnce` function is a `GqlMockOperation` defining the actual GraphQL operation to be matched by the mock. The variables and context of the mocked operation change how the mock is matched against requests.

```ts
type GqlMockOperation<
    TData: {...},
    TVariables: {...},
    TContext: GqlContext,
> = {|
    operation: GqlOperation<TData, TVariables>,
    variables?: TVariables,
    context?: TContext,
|};
```

1. When `matchOperation.operation` is present but `matchOperation.variables` and `matchOperation.context` are not, the mock will match any request for the
   same operation, regardless of variables or context on the request.
2. When `matchOperation.variables` is present but `matchOperation.context` is not, the mock will match any request for the same operation with matching variables, regardless of context on the request.
3. When `matchOperation.context` is present but `matchOperation.variables` is not, the mock will match any request for the same operation with matching context, regardless of variables on the request.
4. When `matchOperation.variables` and `matchOperation.context` are present, the mock will match any request for the same operation with matching variables and context.


---

## Related docs

- [Overview](overview.md)
- [Mocking Exports Mock Fetch](mocking-exports-mock-fetch.md)
- [Mocking Exports Respond With](mocking-exports-respond-with.md)
- [Mocking Exports Settle Controller](mocking-exports-settle-controller.md)
- [Mocking Overview](mocking-overview.md)
- [Mocking Types Fetch Mock Fn](mocking-types-fetch-mock-fn.md)
- [Mocking Types Fetch Mock Operation](mocking-types-fetch-mock-operation.md)
- [Mocking Types Gql Fetch Mock Fn](mocking-types-gql-fetch-mock-fn.md)
- [Mocking Types Gql Mock Operation](mocking-types-gql-mock-operation.md)
- [Mocking Types Mock Response](mocking-types-mock-response.md)
- [Test Harness Exports Harness Adapters](test-harness-exports-harness-adapters.md)
- [Test Harness Exports Hook Harness](test-harness-exports-hook-harness.md)
- [Test Harness Exports Make Hook Harness](test-harness-exports-make-hook-harness.md)
- [Test Harness Exports Make Test Harness](test-harness-exports-make-test-harness.md)
- [Test Harness Exports Test Harness](test-harness-exports-test-harness.md)
- [Test Harness Overview](test-harness-overview.md)
- [Test Harness Types Test Harness Adapter](test-harness-types-test-harness-adapter.md)
- [Test Harness Types Test Harness Adapters](test-harness-types-test-harness-adapters.md)
- [Test Harness Types Test Harness Config](test-harness-types-test-harness-config.md)
- [Test Harness Types Test Harness Configs](test-harness-types-test-harness-configs.md)
- [Utilities Exports Render Hook Static](utilities-exports-render-hook-static.md)
- [Utilities Overview](utilities-overview.md)
