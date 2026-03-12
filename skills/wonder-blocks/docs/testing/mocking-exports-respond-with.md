# RespondWith

```ts
interface RespondWith {
    /**
     * Rejects with an AbortError to simulate an aborted request.
     */
    abortedRequest: (signal: ?SettleSignal = null) => MockResponse<any>;

    /**
     * A non-200 status code with empty text body.
     * Equivalent to calling `ResponseWith.text("", statusCode)`.
     */
    errorStatusCode: (
        statusCode: number,
        signal: ?SettleSignal = null,
    ) => MockResponse<any>;

    /**
     * Response with GraphQL data JSON body and status code 200.
     */
    graphQLData: <TData: {...}>(
        data: TData,
        signal: ?SettleSignal = null,
    ) => MockResponse<GraphQLJson<TData>>;

    /**
     * Response that is a GraphQL errors response with status code 200.
     */
    graphQLErrors: (
        errorMessages: $ReadOnlyArray<string>,
        signal: ?SettleSignal = null,
    ) => MockResponse<any>;

    /**
     * Response with JSON body and status code 200.
     */
    json: <TJson: {...}>(
        json: TJson,
        signal: ?SettleSignal = null,
    ): MockResponse<TJson>;

    /**
     * Response body that is valid JSON but not a valid GraphQL response.
     */
    nonGraphQLBody: (signal: ?SettleSignal = null) => MockResponse<any>;

    /**
     * Rejects with the given error.
     */
    reject: (error: Error, signal: ?SettleSignal = null) => MockResponse<any>;

    /**
     * Response with text body and status code.
     * Status code defaults to 200.
     */
    text: <TData = string>(
        text: string,
        statusCode: number = 200,
        signal: ?SettleSignal = null,
    ) => MockResponse<TData>;

    /**
     * Response with body that will not parse as JSON and status code 200.
     */
    unparseableBody: (signal: ?SettleSignal = null) => MockResponse<any>;
});
```

The `RespondWith` object is a helper for defining mock responses to use with
mock request methods such as [`mockGqlFetch`](./?path=/docs/packages-testing-mocking-exports-mockgqlfetch--docs).

Each call takes an optional `signal` that can be used to control when the promise generated from the call resolves. See [`SettleController`](./?path=/docs/packages-testing-mocking-exports-settlecontroller--docs) for related information.


---

## Related docs

- [Overview](overview.md)
- [Mocking Exports Mock Fetch](mocking-exports-mock-fetch.md)
- [Mocking Exports Mock Gql Fetch](mocking-exports-mock-gql-fetch.md)
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
