import * as React from "react";

import {getNamedAdapterComponent} from "./get-named-adapter-component";

import type {TestHarnessConfigs, TestHarnessAdapters} from "./types";

type Props<TAdapters extends TestHarnessAdapters> = {
    children: React.ReactNode;
    adapters: TAdapters;
    configs: TestHarnessConfigs<TAdapters>;
};

/**
 * Render a set of adapters around the given children.
 *
 * Adapters are rendered with the last adapter being the outermost and the first
 * adapter being the innermost, with children being the innermost of all. This
 * ensures that we are backwards compatible with previous releases of the
 * test harness.
 */
export const Adapt = <TAdapters extends TestHarnessAdapters>({
    children,
    adapters,
    configs,
}: Props<TAdapters>): React.ReactElement => {
    // Here we reduce the adapters in order, such that each one becomes the
    // child of the next, that way the first adapter in the list is the
    // innermost and the last is the outermost.
    return Object.entries(adapters).reduce(
        (newChildren, [name, adapter]) => {
            const theConfig = configs[name];
            if (theConfig == null) {
                return newChildren;
            }
            const Adapter = getNamedAdapterComponent(name);
            return (
                <Adapter key={name} adapter={adapter} config={theConfig}>
                    {newChildren}
                </Adapter>
            );
        },
        <>{children}</>,
    );
};
