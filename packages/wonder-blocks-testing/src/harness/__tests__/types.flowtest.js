// @flow
import * as React from "react";

import type {
    TestHarnessAdapter,
    TestHarnessAdapters,
    TestHarnessConfig,
    TestHarnessConfigs,
} from "../types.js";

/**
 * TestHarnessAdapter<TConfig>
 */

//>  should assert type of config.
((
    children: React.Node,
    // TConfig is string, but we typed this arg as a number
    // $FlowExpectedError[incompatible-cast]
    config: number,
): React.Element<any> => <div />: TestHarnessAdapter<string>);
//<

//>  should work for correct definition
((children: React.Node, config: string): React.Element<any> => (
    <div />
): TestHarnessAdapter<string>);
//<

/**
 * TestHarnessAdapters
 */

//>  should work for empty case
({}: TestHarnessAdapters);
//<

//>  should assert if adapter is not Adapter<TConfig>
({
    // String is not a adapter function
    // $FlowExpectedError[incompatible-cast]
    adapterString: "string",
}: TestHarnessAdapters);
//<

//>  should work for a function matching Adapter<TConfig>
({
    adapterA: (children, config) => <div>test</div>,
}: TestHarnessAdapters);
//<

/**
 * TestHarnessConfig<TAdapter>
 */
//> should give the config type of an adapter
("string": TestHarnessConfig<TestHarnessAdapter<string>>);
//<

//> should error if the config type is wrong
// 45 is not a string
// $FlowExpectedError[incompatible-cast]
(45: TestHarnessConfig<TestHarnessAdapter<string>>);
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
const adapterA: TestHarnessAdapter<string> = (
    children: React.Node,
    config: ?string,
): React.Element<any> => <div />;
const adapterB: TestHarnessAdapter<number> = (
    children: React.Node,
    config: ?number,
): React.Element<any> => <div />;
const adapters = {
    adapterA,
    adapterB,
};

//>  should assert if parameterized type is not valid Adapters
// string is not a valid Adapter
// $FlowExpectedError[incompatible-use]
// $FlowExpectedError[incompatible-type-arg]
({}: TestHarnessConfigs<typeof notadapters>);
//<

//>  should expect one config per adapter
// both adapter configs missing
// $FlowExpectedError[incompatible-exact]
({}: TestHarnessConfigs<typeof adapters>);
// adapterB config missing
// $FlowExpectedError[prop-missing]
({adapterA: "test"}: TestHarnessConfigs<typeof adapters>);
//<

//>  should assert if config does not match adapter config
({
    adapterA: "a string, this is correct",
    // the config type here is a number, not a string
    // $FlowExpectedError[incompatible-cast]
    adapterB: "a string, but it should be a number",
}: TestHarnessConfigs<typeof adapters>);
//<
