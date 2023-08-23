import * as React from "react";
import {KindError, Errors} from "@khanacademy/wonder-stuff-core";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

import type {TestHarnessAdapter} from "../types";

// We only support one configuration for this adapter; the default
// behavior - it's either on or off.
type Config = true | null;

// The default configuration is off since this will likely cause state changes
// and add Testing Library act/waitFor calls in tests using the harness when
// its enabled.
export const defaultConfig: Config = null;

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
): React.ReactElement<any> => {
    if (config !== true) {
        throw new KindError(
            "Unexpected configuration: set config to null to turn this adapter off",
            Errors.InvalidInput,
            {
                metadata: {config},
            },
        );
    }
    return <RenderStateRoot>{children}</RenderStateRoot>;
};
