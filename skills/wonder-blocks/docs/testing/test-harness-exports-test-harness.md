# testHarness()

```ts
testHarness<-TProps, +Instance = mixed>(
    Component: React.AbstractComponent<TProps, Instance>,
    configs?: $Shape<TestHarnessConfigs<typeof DefaultAdapters>>,
): React.AbstractComponent<TProps, Instance>
```

This method can be used to create a test harness for a given component. The resultant harnessed component will take the same props as the original component, but will render that component nested inside whatever boilerplate the various harness adapters provide for the given or default configurations.

This method is created by using [`makeTestHarness`](./?path=/docs/packages-testing-test-harness-exports-maketestharness--docs) with [`harnessAdapters.DefaultAdapters` and `harnessAdapters.DefaultConfigs`](./?path=/docs/packages-testing-test-harness-exports-harnessadapters--docs).


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
- [Test Harness Overview](test-harness-overview.md)
- [Test Harness Types Test Harness Adapter](test-harness-types-test-harness-adapter.md)
- [Test Harness Types Test Harness Adapters](test-harness-types-test-harness-adapters.md)
- [Test Harness Types Test Harness Config](test-harness-types-test-harness-config.md)
- [Test Harness Types Test Harness Configs](test-harness-types-test-harness-configs.md)
- [Utilities Exports Render Hook Static](utilities-exports-render-hook-static.md)
- [Utilities Overview](utilities-overview.md)
