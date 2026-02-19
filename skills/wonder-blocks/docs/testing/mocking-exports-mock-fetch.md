# mockFetch()

```ts
mockFetch(): FetchMockFn;
```

The `mockFetch` function provides an API to easily mock `fetch()` responses. It follows the similar patterns of `jest.fn()` and jest mocks whereby the returned value is both a proxy for the fetch function as well as an API for modifying the behavior of that function.

# API

Besides being a function that fits the `fetch()` signature, the return value of `mockFetch()` has an API to customize the behavior of that function. Used in conjunction with the [`RespondWith`](./?path=/docs/packages-testing-mocking-exports-respondwith--docs) API, this can create a variety of responses for tests and stories.

| Function | Purpose |
| - | - |
| `mockOperation` | When called, any request that matches the defined mock will respond with the given response. |
| `mockOperationOnce` | When called, the first request that matches the defined mock will respond with the given response. The mock is only used once. |
| `configure` | This allows you to configure the behavior of the mock fetch function. |

Both of these functions have the same signature:

```ts
type FetchMockOperationFn = (
    operation: FetchMockOperation,
    response: MockResponse<any>,
) => FetchMockFn;
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

The `FetchMockOperation` type is either of type `string` or `RegExp`. When specified as a string, the URL of the request must match the string exactly. When specified as a regular expression, the URL of the request must match the regular expression.


---

## Related docs

- [Overview](overview.md)
- [Mocking Exports Mock Gql Fetch](mocking-exports-mock-gql-fetch.md)
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
