// @flow
import * as React from "react";

import {makeTestHarness} from "./make-test-harness.js";

import type {TestHarnessAdapters, TestHarnessConfigs} from "./types.js";

const HookHarness = ({children}) => children;

/**
 * Create a test harness method for use with React hooks.
 *
 * This returns a test harness method that applies the default configurations
 * to the given adapters, wrapping a given component.
 *
 * @param {TAdapters} adapters All the adapters to be supported by the returned
 * test harness.
 * @param {TestHarnessConfigs<TAdapters>} defaultConfigs Default configuration values for
 * the adapters.
 * @returns {(
 *     configs?: $Shape<TestHarnessConfigs<TAdapters>>,
 * ) => React.AbstractComponent<any, any>} A test harness.
 */
export const makeHookHarness = <TAdapters: TestHarnessAdapters>(
    adapters: TAdapters,
    defaultConfigs: TestHarnessConfigs<TAdapters>,
): ((
    configs?: $Shape<TestHarnessConfigs<TAdapters>>,
) => React.AbstractComponent<any, any>) => {
    const testHarness = makeTestHarness<TAdapters>(adapters, defaultConfigs);
    /**
     * Create a harness to use as a wrapper when rendering hooks.
     *
     * @param {$Shape<Configs<typeof DefaultAdapters>>} [configs] Any adapter
     * configuration that you want to override from the DefaultConfigs values.
     */
    return (configs?: $Shape<TestHarnessConfigs<TAdapters>>) =>
        testHarness<any, any>(HookHarness, configs);
};
