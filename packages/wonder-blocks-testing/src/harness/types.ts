import {Flow} from "flow-to-typescript-codemod";
import * as React from "react";

/**
 * A adapter to be composed with our test harnass infrastructure.
 */
export type TestHarnessAdapter<TConfig> = (
    children: React.ReactNode,
    config: TConfig,
) => React.ReactElement<any>;

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
    [adapterID: string]: TestHarnessAdapter<any>;
};

/**
 * Mapping functions from a adapter-like function to config type.
 */
type ExtractConfig = <TConfig>(arg1: TestHarnessAdapter<TConfig>) => TConfig;
type ExtractMaybeConfig = <TConfig>(
    arg1: TestHarnessAdapter<TConfig>,
) => TConfig | null | undefined;

/**
 * Type for easily defining an adapter's config type.
 *
 * This is the `TestHarnessAdapter` equivalent of `React.ElementConfig`.
 */
export type TestHarnessConfig<TAdapter> = ReturnType<ExtractConfig>;

/**
 * The `TestHarnessConfigs` type as defined by parsing a given set of adapters.
 *
 * NOTE: This only works if the properties of the passed `TAdapters` type
 * are explicitly typed as `TestHarnessAdapter<TConfig>` so if passing in a
 * non-Adapters type (which we should be, to get strong `TConfig` types instead
 * of `any`), then that object should make sure that each adapter is strongly
 * marked as `TestHarnessAdapter<TConfig>` - flow does not appear to pattern
 * match against the type definition when invoking the `ExtractConfig` type and I
 * haven't worked out how to get it to multi-dispatch so that it matches
 * functions too. Even worse, if the type doesn't match, it just allows `any`
 * in the `Configs` object, rather than indicating any kind of problem.
 */
export type TestHarnessConfigs<TAdapters extends TestHarnessAdapters> =
    Flow.ObjMap<TAdapters, ExtractMaybeConfig>;