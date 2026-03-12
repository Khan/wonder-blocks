# TestHarnessAdapters

```ts
type TestHarnessAdapters = {|
    [adapterID: string]: TestHarnessAdapter<any>,
|};
```

Defines a generic collection of test harness adapters.

Only use `TestHarnessAdapters` in input locations to verify a set of adapters conforms to that type, but avoid using it in output locations as it can erase useful type information.

For example, the [`harnessAdapters.DefaultAdapters`](./?path=/docs/packages-testing-test-harness-exports-harnessadapters--docs) type is specific to the adapters it contains.

```ts
const DefaultAdapters = {
    css: css.adapter,
    data: data.adapter,
    portal: portal.adapter,
    router: router.adapter,
    renderState: renderState.adapter,
};
```

`DefaultAdapters` is not strongly typed to `TestHarnessAdapters`. Instead, its type is:

```ts
type DefaultAdaptersType = {|
   css: typeof css.adapter,
   data: typeof data.adapter,
   portal: typeof portal.adapter,
   router: typeof router.adapter,
   renderState: typeof renderState.adapter,
|};
```

It conforms to the `TestHarnessAdapters` type because each key is a string and the value of each property is a variation of `TestHarnessAdapter<TConfig>` with a different type for `TConfig` in each case, but it is not equivalent to the `TestHarnessAdapters` type where each key is a string and each value is exactly `TestHarnessAdapter<any>`.


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
- [Test Harness Types Test Harness Config](test-harness-types-test-harness-config.md)
- [Test Harness Types Test Harness Configs](test-harness-types-test-harness-configs.md)
- [Utilities Exports Render Hook Static](utilities-exports-render-hook-static.md)
- [Utilities Overview](utilities-overview.md)
