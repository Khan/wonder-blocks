// @flow
import * as css from "./css.js";
import * as data from "./data.js";
import * as portal from "./portal.js";
import * as router from "./router.js";

import type {TestHarnessConfigs} from "../types.js";

/**
 * NOTE: We do not type `DefaultAdapters` with `Adapters` here because we want
 * the individual config types of each adapter to remain intact rather than
 * getting changed to `any`.
 */

/**
 * The default adapters provided by Wonder Blocks.
 */
export const DefaultAdapters = {
    css: css.adapter,
    data: data.adapter,
    portal: portal.adapter,
    router: router.adapter,
};

/**
 * The default configurations to use with the `DefaultAdapters`.
 */
export const DefaultConfigs: TestHarnessConfigs<typeof DefaultAdapters> = {
    css: css.defaultConfig,
    data: data.defaultConfig,
    portal: portal.defaultConfig,
    router: router.defaultConfig,
};
