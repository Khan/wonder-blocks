import * as React from "react";

import type {TestHarnessAdapter} from "./types";

type Props<TConfig = any> = {
    children: React.ReactNode;
    config: TConfig;
    adapter: TestHarnessAdapter<TConfig>;
};

const componentCache = new Map<string, React.FunctionComponent<Props>>();

/**
 * Get a component tagged with the given name for rendering an adapter.
 *
 * We can share these across invocations because only the name is used.
 * The rest is configured at render time. This way we don't recreate new
 * components on the fly and cause remounting to occur.
 */
export const getNamedAdapterComponent = (name: string) => {
    // If we already have this component, just return it.
    const existing = componentCache.get(name);
    if (existing != null) {
        return existing;
    }

    // Otherwise, create a new component, name it, cache it, and return it.
    const newComponent: React.FunctionComponent<Props> = ({
        children,
        config,
        adapter,
    }: any) => adapter(children, config);
    newComponent.displayName = `Adapter(${name})`;
    componentCache.set(name, newComponent);
    return newComponent;
};
