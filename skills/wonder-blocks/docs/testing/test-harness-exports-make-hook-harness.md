# makeHookHarness()

```ts
makeHookHarness<TAdapters: TestHarnessAdapters>(
    adapters: TAdapters,
    defaultConfigs: TestHarnessConfigs<TAdapters>,
): ((
    configs?: $Shape<TestHarnessConfigs<TAdapters>>,
) => React.AbstractComponent<any, any>);
```

This method takes a set of adapters (such as [`harnessAdapters.DefaultAdapters`](./?path=/docs/packages-testing-test-harness-exports-harnessadapters--docs)) and a set of default configurations for those adapters (such as [`harnessAdapters.DefaultConfigs`](./?path=/docs/packages-testing-test-harness-exports-harnessadapters--docs)), and returns a function that can be called to create a component that applys those adapters with those default configs, or overrides to those configs.

This returned method can then be used for the `wrapper` option of calls like `renderHook()` from `@testing-library/react-hooks` when writing tests for React hooks.


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
- [Test Harness Exports Make Test Harness](test-harness-exports-make-test-harness.md)
- [Test Harness Exports Test Harness](test-harness-exports-test-harness.md)
- [Test Harness Overview](test-harness-overview.md)
- [Test Harness Types Test Harness Adapter](test-harness-types-test-harness-adapter.md)
- [Test Harness Types Test Harness Adapters](test-harness-types-test-harness-adapters.md)
- [Test Harness Types Test Harness Config](test-harness-types-test-harness-config.md)
- [Test Harness Types Test Harness Configs](test-harness-types-test-harness-configs.md)
- [Utilities Exports Render Hook Static](utilities-exports-render-hook-static.md)
- [Utilities Overview](utilities-overview.md)
