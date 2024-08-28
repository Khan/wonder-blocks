import * as React from "react";
import {KindError, Errors} from "@khanacademy/wonder-stuff-core";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

import type {TestHarnessAdapter} from "@khanacademy/wonder-blocks-testing-core";

//
type Config = true;

// The default configuration is off since this will likely cause state changes
// and add Testing Library act/waitFor calls in tests using the harness when
// its enabled.
export const defaultConfig: Config | null = null;

/**
 * Test harness adapter for supporting render state-based hooks and components.
 *
 * Some components and hooks utilize the render state context to manage what
 * they render and when. In order for this to work, a `RenderStateRoot`
 * component must be present to track the current render state.
 *
 * This adapter wraps the children in a `RenderStateRoot` component to enable
 * the render state context. This adapter should be used when testing components
 * that rely on the render state.
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
    // We never want to throw if the test harness is nested.
    return <RenderStateRoot throwIfNested={false}>{children}</RenderStateRoot>;
};
