// @flow
import * as React from "react";

import {makeTestHarness} from "./make-test-harness.js";
import {DefaultAdapters, DefaultConfigs} from "./adapters/adapters.js";

import type {Configs} from "./types.js";

/**
 * Wrap a component with a test harness using Wonder Blocks default adapters.
 *
 * This is primarily useful for tests within Wonder Blocks.
 *
 * If you want to expand the range of adapters or change the default
 * configurations, use `makeTestHarness` to create a new `testHarness`
 * function.
 */
export const testHarness: <-TProps, +Instance = mixed>(
    Component: React.AbstractComponent<TProps, Instance>,
    configs?: $Shape<Configs<typeof DefaultAdapters>>,
) => React.AbstractComponent<TProps, Instance> = makeTestHarness(
    DefaultAdapters,
    DefaultConfigs,
);
