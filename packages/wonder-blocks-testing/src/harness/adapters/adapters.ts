import * as css from "./css";
import * as data from "./data";
import * as portal from "./portal";
import * as router from "./router";
import * as ssr from "./ssr";

import type {TestHarnessConfigs} from "../types";

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
    ssr: ssr.adapter,
} as const;

/**
 * The default configurations to use with the `DefaultAdapters`.
 */
export const DefaultConfigs: TestHarnessConfigs<typeof DefaultAdapters> = {
    css: css.defaultConfig,
    data: data.defaultConfig,
    portal: portal.defaultConfig,
    router: router.defaultConfig,
    ssr: ssr.defaultConfig,
} as const;
