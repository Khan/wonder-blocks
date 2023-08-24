import * as React from "react";

import type {TestHarnessAdapter} from "./types";

type Props<TConfig> = {
    children: React.ReactNode;
    config: TConfig | null | undefined;
};

/**
 * Make a component to optionally render a given adapter with the given config.
 *
 * If the config is nullish, then the children are rendered in a fragment,
 * otherwise the children are rendered within the given adapter with the
 * given config.
 */
export const makeAdapter = <
    TConfig,
    TAdapter extends TestHarnessAdapter<TConfig> = TestHarnessAdapter<TConfig>,
>(
    name: string,
    adapter: TAdapter,
): React.FunctionComponent<Props<TConfig>> => {
    const AdapterComponent = ({
        children,
        config,
    }: Props<TConfig>): React.ReactElement => {
        if (config == null) {
            return <>{children}</>;
        }
        return adapter(children, config);
    };
    AdapterComponent.displayName = `Adapter(${name})`;
    return AdapterComponent;
};
