// @flow
import * as React from "react";

import {renderAdapters} from "./render-adapters.js";

import type {Adapters, Configs} from "./types.js";

/**
 * Create a test harness method for use with React components.
 *
 * This returns a test harness method that applies the default configurations
 * to the given adapters, wrapping a given component.
 *
 * @param {TAdapters} adapters All the adapters to be supported by the returned
 * test harness.
 * @param {Configs<TAdapters>} defaultConfigs Default configuration values for
 * the adapters.
 * @returns {<-TProps, +Instance = mixed>(
 *     Component: React.AbstractComponent<TProps, Instance>,
 *     configs?: $Shape<Configs<TAdapters>>,
 * ) => React.AbstractComponent<TProps, Instance>} A test harness.
 */
export const makeTestHarness = <TAdapters: Adapters>(
    adapters: TAdapters,
    defaultConfigs: Configs<TAdapters>,
): (<-TProps, +Instance = mixed>(
    Component: React.AbstractComponent<TProps, Instance>,
    configs?: $Shape<Configs<TAdapters>>,
) => React.AbstractComponent<TProps, Instance>) => {
    /**
     * Create a harnessed version of the given component.
     *
     * @param {React.AbstractComponent<TProps, Instance>} component The
     * component to be wrapped.
     * @param {$Shape<Configs<TAdapters>>} [configs] Any adapter
     * configuration that you want to override from the `defaultConfigs` values.
     */
    return <-TProps, +Instance = mixed>(
        Component: React.AbstractComponent<TProps, Instance>,
        configs?: $Shape<Configs<TAdapters>>,
    ): React.AbstractComponent<TProps, Instance> => {
        /**
         * $FlowIgnore[cannot-spread-indexer]
         * We know `configs` may overwrite `DefaultConfigs` and we're ok with it.
         * The interface definition handles the typing for us so we're ok
         * with it not being inferred here.
         */
        const fullConfig: Configs<TAdapters> = {
            ...defaultConfigs,
            ...configs,
        };
        const harnessedComponent = React.forwardRef((props, ref) =>
            renderAdapters<TAdapters>(
                adapters,
                fullConfig,
                <Component {...props} ref={ref} />,
            ),
        );

        // We add a name for the component here so that we can detect that
        // later and also see it in traces and what have you.
        harnessedComponent.displayName = `testHarness(${
            Component.displayName || Component.name || "Component"
        })`;

        return harnessedComponent;
    };
};
