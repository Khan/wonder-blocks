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
// @ts-expect-error [FEI-5019] - TS2352 - Conversion of type '(children: React.ReactNode, config: number) => React.ReactElement<any>' to type 'TestHarnessAdapter<string>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
(((
    children: React.ReactNode,
    // TConfig is string, but we typed this arg as a number
    // $FlowExpectedError[incompatible-cast]
    config: number,
): React.ReactElement<any> => <div />) as TestHarnessAdapter<string>);
//<

//>  should work for correct definition
(((children: React.ReactNode, config: string): React.ReactElement<any> => <div />) as TestHarnessAdapter<string>);
//<

/**
 * TestHarnessAdapters
 */

//>  should work for empty case
({} as TestHarnessAdapters);
//<

//>  should assert if adapter is not Adapter<TConfig>
// @ts-expect-error [FEI-5019] - TS2352 - Conversion of type '{ adapterString: string; }' to type 'TestHarnessAdapters' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
({
    // String is not a adapter function
    // $FlowExpectedError[incompatible-cast]
    adapterString: "string",
} as TestHarnessAdapters);
//<

//>  should work for a function matching Adapter<TConfig>
({
    adapterA: (children, config) => <div>test</div>,
} as TestHarnessAdapters);
//<

/**
 * TestHarnessConfig<TAdapter>
 */
//> should give the config type of an adapter
("string" as TestHarnessConfig<TestHarnessAdapter<string>>);
//<

//> should error if the config type is wrong
// 45 is not a string
45 as TestHarnessConfig<TestHarnessAdapter<string>>;
//<

/**
 * TestHarnessConfigs<TAdapters>
 *
 * NOTE: This only works if the properties of the passed THarnasses type
 * are explicitly typed as `TestHarnessAdapter<TConfig>` so if passing in a
 * non-Adapters type (which we should be, to get strong TConfig types instead
 * of `any`), then that object should make sure that each adapter is strongly
 * marked as `TestHarnessAdapter<TConfig>` - flow does not appear to pattern
 * match against the type definition when invoking the ExtractConfig type and I
 * haven't worked out how to get it to multi-dispatch so that it matches
 * functions too. Even worse, if the type doesn't match, it just allows `any`
 * in the configs object, rather than indicating any kind of problem.
 */
const notadapters = "this is wrong";
const adapterA: TestHarnessAdapter<string> = (children: React.ReactNode, config?: string | null): React.ReactElement<any> => <div />;
const adapterB: TestHarnessAdapter<number> = (children: React.ReactNode, config?: number | null): React.ReactElement<any> => <div />;
const adapters = {
    adapterA,
    adapterB,
} as const;

//>  should assert if parameterized type is not valid Adapters
// string is not a valid Adapter
{} as TestHarnessConfigs<typeof notadapters>;
//<

//>  should expect one config per adapter
// both adapter configs missing
{} as TestHarnessConfigs<typeof adapters>;
// adapterB config missing
{adapterA: "test"} as TestHarnessConfigs<typeof adapters>;
//<

//>  should assert if config does not match adapter config
({
    adapterA: "a string, this is correct",
    // the config type here is a number, not a string
    // $FlowExpectedError[incompatible-cast]
    adapterB: "a string, but it should be a number",
} as TestHarnessConfigs<typeof adapters>);
//<
