import {harnessAdapters} from "@khanacademy/wonder-blocks-testing-core";
import type {TestHarnessConfigs} from "@khanacademy/wonder-blocks-testing-core";
import * as data from "./data";
import * as renderState from "./render-state";

/**
 * NOTE: We do not type `DefaultAdapters` with `Adapters` here because we want
 * the individual config types of each adapter to remain intact rather than
 * getting changed to `any`.
 */

/**
 * The default adapters provided by Wonder Blocks.
 */
export const DefaultAdapters = {
    // The error boundary is as close to the component under test as possible,
    // so that other adapters don't soil it with their own errors, if that
    // should happen.
    boundary: harnessAdapters.DefaultAdapters.boundary,
    css: harnessAdapters.DefaultAdapters.css,
    data: data.adapter,
    portal: harnessAdapters.DefaultAdapters.portal,
    router: harnessAdapters.DefaultAdapters.router,
    renderState: renderState.adapter,
} as const;

/**
 * The default configurations to use with the `DefaultAdapters`.
 */
export const DefaultConfigs: TestHarnessConfigs<typeof DefaultAdapters> = {
    ...harnessAdapters.DefaultConfigs,
    data: data.defaultConfig,
    renderState: renderState.defaultConfig,
} as const;
