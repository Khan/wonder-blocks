import * as React from "react";

/**
 * A adapter to be composed with our test harness infrastructure.
 */
export type TestHarnessAdapter<TConfig> = (
    children: React.ReactNode,
    config: TConfig,
) => React.ReactElement;

/**
 * A general map of adapters by their identifiers.
 *
 * It's OK that this has `any` for the config type as this is the very base
 * version of a adapter set. In reality, a more specific type will be used
 * with the harness functions that use more specific definitions of known
 * adapters. This is just to support the base reality of not knowing.
 *
 * Use this on input positions only. Output positions for adapters
 * should infer their type in most cases to ensure the strongest typing of
 * the adapters.
 */
export type TestHarnessAdapters = {
    readonly [adapterID: string]: TestHarnessAdapter<any>;
};

/**
 * Type for easily defining an adapter's config type.
 */
export type TestHarnessConfig<TAdapter> =
    TAdapter extends TestHarnessAdapter<infer TConfig> ? TConfig : never;

/**
 * The `TestHarnessConfigs` type as defined by parsing a given set of adapters.
 *
 * NOTE: This only works if the properties of the passed `TAdapters` type
 * are explicitly typed as `TestHarnessAdapter<TConfig>` so if passing in a
 * non-Adapters type (which we should be, to get strong `TConfig` types instead
 * of `any`), then that object should make sure that each adapter is strongly
 * marked as `TestHarnessAdapter<TConfig>`
 */
export type TestHarnessConfigs<TAdapters extends TestHarnessAdapters> = {
    [K in keyof TAdapters]: TestHarnessConfig<TAdapters[K]> | null | undefined;
};
