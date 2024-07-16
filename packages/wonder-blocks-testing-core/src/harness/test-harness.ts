import {makeTestHarness} from "./make-test-harness";
import {DefaultAdapters, DefaultConfigs} from "./adapters/adapters";

/**
 * Wrap a component with a test harness using Wonder Blocks default adapters.
 *
 * This is primarily useful for tests within Wonder Blocks.
 *
 * If you want to expand the range of adapters or change the default
 * configurations, use `makeTestHarness` to create a new `testHarness`
 * function.
 */
export const testHarness = makeTestHarness(DefaultAdapters, DefaultConfigs);
