// @flow
import * as React from "react";

import {makeHookHarness} from "./make-hook-harness.js";
import {DefaultAdapters, DefaultConfigs} from "./adapters/adapters.js";

import type {TestHarnessConfigs} from "./types.js";

/**
 * Create test wrapper for hook testing with Wonder Blocks default adapters.
 *
 * This is primarily useful for tests within Wonder Blocks.
 *
 * If you want to expand the range of adapters or change the default
 * configurations, use `makeHookHarness` to create a new `hookHarness`
 * function.
 */
export const hookHarness: (
    configs?: $Shape<TestHarnessConfigs<typeof DefaultAdapters>>,
) => React.AbstractComponent<any, any> = makeHookHarness(
    DefaultAdapters,
    DefaultConfigs,
);
