import * as css from "./css";
import * as data from "./data";
import * as errorBoundary from "./error-boundary";
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
    // The error boundary is as close to the component under test as possible,
    // so that other adapters don't soil it with their own errors, if that
    // should happen.
    boundary: errorBoundary.adapter,
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
    boundary: errorBoundary.defaultConfig,
    css: css.defaultConfig,
    data: data.defaultConfig,
    portal: portal.defaultConfig,
    router: router.defaultConfig,
    ssr: ssr.defaultConfig,
} as const;
