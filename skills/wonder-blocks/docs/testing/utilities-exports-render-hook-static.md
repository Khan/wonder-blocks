# renderHookStatic()

```ts
renderHookStatic<Result, Props>(
    render: (initialProps?: Props) => Result,
    {wrapper, initialProps}: Options<Props> = {},
): RenderHookStaticResult<Result>;
```

This method is a companion to `renderHook` from `@testing-library/react`. It renders uses `renderToString` from `react-dom/server` to render the hook. The result of the hook is then provided via the returned result object. This is useful for verifying how a hook renders on the very first initial render cycle, such as when server-side rendering, or when rendering for the first time on the client.

`renderHookStatic` is intended as a simple replacement for the `renderHook` from `@testing-library/react-hooks/server`. The main difference is that it does not support capturing errors as part of its render; to do that, use in conjunction with a hook test harness such as [`hookHarness`](./?path=/docs/packages-testing-test-harness-exports-hookharness--docs) and the [`boundary`](./?path=/docs/packages-testing-test-harness-exports-harnessadapters--docs#boundary) adapter, which adds an error boundary around the rendering hook.

This method can be used to create a test harness for use with the `wrapper` option of calls like `renderHook()` from `@testing-library/react-hooks` when writing tests for React hooks.


---

## Related docs

- [Overview](overview.md)
- [Mocking Exports Mock Fetch](mocking-exports-mock-fetch.md)
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
- [Utilities Overview](utilities-overview.md)
