import * as React from "react";

import {makeAdapter} from "./make-adapter";

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
    // We start at the end of the adapter list and work backwards to be
    // compatible with previous releases.
    const thisAdapterName = Object.keys(adapters).at(-1);
    if (thisAdapterName == null) {
        // There are no adapters. Just render the children.
        return <>{children}</>;
    }

    const thisAdapter = adapters[thisAdapterName];
    const thisConfig = configs[thisAdapterName];

    // NOTE: We could simplify this by using an array of tuples as the input
    // prop, but that complicates other things like testing and I think
    // for simplicities sake elsewhere, this is good enough.
    const restAdapters = Object.fromEntries(
        Object.entries(adapters).slice(0, -1),
    );
    const restConfigs = Object.fromEntries(
        // The config object may not be ordered the same as the adapters so
        // we must filter by adapter name here.
        Object.entries(configs).filter(([name]) => name !== thisAdapterName),
    );
    const Adapter = makeAdapter(thisAdapterName, thisAdapter);
    return (
        <Adapter config={thisConfig}>
            <Adapt adapters={restAdapters} configs={restConfigs}>
                {children}
            </Adapt>
        </Adapter>
    );
};
