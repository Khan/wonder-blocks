import * as React from "react";

import type {
    TestHarnessAdapter,
    TestHarnessAdapters,
    TestHarnessConfig,
    TestHarnessConfigs,
} from "../types";

/**
 * TestHarnessAdapter<TConfig>
 */

//>  should assert type of config.
// @ts-expect-error Types of parameters 'config' and 'config' are incompatible.
((children: React.ReactNode, config: number): React.ReactElement<any> => (
    <div />
)) as TestHarnessAdapter<string>;
//<

//>  should work for correct definition
((children: React.ReactNode, config: string): React.ReactElement<any> => (
    <div />
)) as TestHarnessAdapter<string>;
//<

/**
 * TestHarnessAdapters
 */

//>  should work for empty case
({}) as TestHarnessAdapters;
//<

//>  should assert if adapter is not Adapter<TConfig>
// @ts-expect-error Type 'string' is not comparable to type 'TestHarnessAdapter<any>'.
({
    adapterString: "string",
}) as TestHarnessAdapters;
//<

//>  should work for a function matching Adapter<TConfig>
({
    adapterA: (children, config) => <div>test</div>,
}) as TestHarnessAdapters;
//<

/**
 * TestHarnessConfig<TAdapter>
 */
//> should give the config type of an adapter
"string" as TestHarnessConfig<TestHarnessAdapter<string>>;
//<

//> should error if the config type is wrong
// 45 is not a string
// @ts-expect-error Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other.
45 as TestHarnessConfig<TestHarnessAdapter<string>>;
//<

/**
 * TestHarnessConfigs<TAdapters>
 *
 * NOTE: This only works if the properties of the passed THarnasses type
 * are explicitly typed as `TestHarnessAdapter<TConfig>` so if passing in a
 * non-Adapters type (which we should be, to get strong TConfig types instead
 * of `any`), then that object should make sure that each adapter is strongly
 * marked as `TestHarnessAdapter<TConfig>`.
 */
const notadapters = "this is wrong";
const adapterA: TestHarnessAdapter<string> = (
    children: React.ReactNode,
    config?: string | null,
): React.ReactElement<any> => <div />;
const adapterB: TestHarnessAdapter<number> = (
    children: React.ReactNode,
    config?: number | null,
): React.ReactElement<any> => <div />;
const adapters = {
    adapterA,
    adapterB,
} as const;

//>  should assert if parameterized type is not valid Adapters
// string is not a valid Adapter
// @ts-expect-error: Type 'string' does not satisfy the constraint 'TestHarnessAdapters'
({}) as TestHarnessConfigs<typeof notadapters>;
//<

//>  should expect one config per adapter
// both adapter configs missing
({}) as TestHarnessConfigs<typeof adapters>;
// adapterB config missing
({adapterA: "test"}) as TestHarnessConfigs<typeof adapters>;
//<

//>  should assert if config does not match adapter config
// @ts-expect-error Types of property 'adapterB' are incompatible
({
    adapterA: "a string, this is correct",
    adapterB: "a string, but it should be a number",
}) as TestHarnessConfigs<typeof adapters>;
//<
