import * as React from "react";

import type {TestHarnessConfigs, TestHarnessAdapters} from "./types";

/**
 * Render test adapters around a child component.
 */
export const renderAdapters = <TAdapters extends TestHarnessAdapters>(
    adapters: TAdapters,
    configs: TestHarnessConfigs<TAdapters>,
    children: React.ReactNode,
): React.ReactElement => {
    let currentChildren = children;
    for (const adapterName of Object.keys(adapters)) {
        const adapter = adapters[adapterName];
        const config = configs[adapterName];
        /**
         * Some adapters support a null config, some don't, either way
         * we always assume that null config means no adapter.
         */
        if (config != null) {
            currentChildren = adapter(currentChildren, config);
        }
    }
    // @ts-expect-error [FEI-5019] - TS2322 - Type 'ReactNode' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
    return currentChildren;
};
