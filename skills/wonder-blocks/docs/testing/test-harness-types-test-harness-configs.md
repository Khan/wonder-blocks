# TestHarnessConfigs\<>

```ts
type TestHarnessConfigs<TAdapters: TestHarnessAdapters>;
```

When given the type of a set of adapters conforming to [`TestHarnessAdapters`](./?path=/docs/packages-testing-test-harness-types-testharnessadapters--docs), this type will represent a set of configurations for those adapters.

It is important to note here that if the `TAdapters` type passed in is the actual `TestHarnessAdapters` type, then the resulting configuration type will have each adapter's config being set to `any`. Instead of using the `TestHarnessAdapters` type directly, the passed object should not be typed as that, but should merely conform to that type.

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

It conforms to the `TestHarnessAdapters` type, but it is not equivalent to the `TestHarnessAdapters` type. This is important when we consider the companion export, [`harnessAdapters.DefaultConfigs`](./?path=/docs/packages-testing-test-harness-exports-harnessadapters--docs).

```ts
const DefaultConfigs: TestHarnessConfigs<typeof DefaultAdapters> = {
    css: css.defaultConfig,
    data: data.defaultConfig,
    portal: portal.defaultConfig,
    router: router.defaultConfig,
    renderState: renderState.defaultConfig,
};
```

`DefaultConfigs` is typed using `TestHarnessConfigs<typeof DefaultAdapters>`. Because `DefaultAdapters` is strongly typed specifically to each adapter it contains, the type that `TestHarnessConfigs<>` creates ensures that there is one configuration per adapter key, and that the configuration type for each adapter key is correct for the corresponding adapter.

If we had typed `DefaultAdapters` as `TestHarnessAdapters`, then although we would still enforce one configuration per adapter key, we would allow `any` type to provide that configuration, which does not give us any real type safety.

So, to summarize, use `TestHarnessAdapters` in input locations to verify a set of adapters conforms to that type, but avoid using it in output locations as it can erase useful type information.


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
- [Utilities Exports Render Hook Static](utilities-exports-render-hook-static.md)
- [Utilities Overview](utilities-overview.md)
