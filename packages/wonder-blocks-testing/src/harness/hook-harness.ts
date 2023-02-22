// @ts-expect-error [FEI-5019] - TS2307 - Cannot find module 'flow-to-typescript-codemod' or its corresponding type declarations.
import {Flow} from "flow-to-typescript-codemod";
import * as React from "react";

import {makeHookHarness} from "./make-hook-harness";
import {DefaultAdapters, DefaultConfigs} from "./adapters/adapters";

import type {TestHarnessConfigs} from "./types";

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
    configs?: Partial<TestHarnessConfigs<typeof DefaultAdapters>>,
) => Flow.AbstractComponent<any, any> = makeHookHarness(
    DefaultAdapters,
    DefaultConfigs,
);
