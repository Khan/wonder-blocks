// @flow
import * as React from "react";

import type {TestHarnessAdapter} from "../types.js";

type Config = string;

// The default configuration is to omit this adapter.
export const defaultConfig: ?Config = null;

/**
 * Test harness adapter for supporting portals.
 *
 * Some components rely on rendering with a React Portal. This adapter ensures
 * that the DOM contains a mounting point for the portal with the expected
 * identifier.
 */
export const adapter: TestHarnessAdapter<Config> = (
    children: React.Node,
    config: Config,
): React.Element<any> => (
    <>
        <div id={config} data-test-id={config} />
        {children}
    </>
);
