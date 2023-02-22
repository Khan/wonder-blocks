import * as React from "react";

import type {TestHarnessAdapter} from "../types";

type Config = string;

// The default configuration is to omit this adapter.
export const defaultConfig: Config | null | undefined = null;

/**
 * Test harness adapter for supporting portals.
 *
 * Some components rely on rendering with a React Portal. This adapter ensures
 * that the DOM contains a mounting point for the portal with the expected
 * identifier.
 */
export const adapter: TestHarnessAdapter<Config> = (
    children: React.ReactNode,
    config: Config,
): React.ReactElement<any> => (
    <>
        <div id={config} data-test-id={config} />
        {children}
    </>
);
