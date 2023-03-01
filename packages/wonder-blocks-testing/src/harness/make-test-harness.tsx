// @ts-expect-error [FEI-5019] - TS2307 - Cannot find module 'flow-to-typescript-codemod' or its corresponding type declarations.
import {Flow} from "flow-to-typescript-codemod";
import * as React from "react";

import {renderAdapters} from "./render-adapters";

import type {TestHarnessAdapters, TestHarnessConfigs} from "./types";

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
export const makeTestHarness = <TAdapters extends TestHarnessAdapters>(
    adapters: TAdapters,
    defaultConfigs: TestHarnessConfigs<TAdapters>,
): (<TProps, Instance = unknown>(
    Component: Flow.AbstractComponent<TProps, Instance>,
    configs?: Partial<TestHarnessConfigs<TAdapters>>,
) => Flow.AbstractComponent<TProps, Instance>) => {
    /**
     * Create a harnessed version of the given component.
     *
     * @param {React.AbstractComponent<TProps, Instance>} component The
     * component to be wrapped.
     * @param {$Shape<Configs<TAdapters>>} [configs] Any adapter
     * configuration that you want to override from the `defaultConfigs` values.
     */
    return <TProps extends unknown, Instance extends unknown = unknown>(
        Component: Flow.AbstractComponent<TProps, Instance>,
        configs?: Partial<TestHarnessConfigs<TAdapters>>,
    ): Flow.AbstractComponent<TProps, Instance> => {
        const fullConfig: TestHarnessConfigs<TAdapters> = {
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
