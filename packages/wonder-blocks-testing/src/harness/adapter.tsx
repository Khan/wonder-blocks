import * as React from "react";

import type {TestHarnessAdapter} from "./types";

type Props<TConfig, TAdapter extends TestHarnessAdapter<TConfig>> = {
    children: React.ReactNode;
    adapter: TAdapter;
    config: TConfig | null | undefined;
};

/**
 * Component that optionally renders a given adapter with the given config.
 *
 * If the config is nullish, then the children are rendered in a fragment,
 * otherwise the children are rendered within the given adapter with the
 * given config.
 */
export const Adapter = <TConfig, TAdapter extends TestHarnessAdapter<TConfig>>({
    children,
    adapter,
    config,
}: Props<TConfig, TAdapter>): React.ReactElement => {
    if (config == null) {
        return <>{children}</>;
    }
    return adapter(children, config);
};
