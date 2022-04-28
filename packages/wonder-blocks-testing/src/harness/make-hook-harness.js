// @flow
import * as React from "react";

import {makeTestHarness} from "./make-test-harness.js";

import type {Adapters, Configs} from "./types.js";

const HookHarness = ({children}) => children;

/**
 * Create a test harness method for use with React hooks.
 *
 * This returns a test harness method that applies the default configurations
 * to the given adapters, wrapping a given component.
 *
 * @param {TAdapters} adapters All the adapters to be supported by the returned
 * test harness.
 * @param {Configs<TAdapters>} defaultConfigs Default configuration values for
 * the adapters.
 * @returns {(
 *     configs?: $Shape<Configs<TAdapters>>,
 * ) => React.AbstractComponent<any, any>} A test harness.
 */
export const makeHookHarness = <TAdapters: Adapters>(
    adapters: TAdapters,
    defaultConfigs: Configs<TAdapters>,
): ((
    configs?: $Shape<Configs<TAdapters>>,
) => React.AbstractComponent<any, any>) => {
    const testHarness = makeTestHarness<TAdapters>(adapters, defaultConfigs);
    return (configs?: $Shape<Configs<TAdapters>>) =>
        testHarness<any, any>(HookHarness, configs);
};
