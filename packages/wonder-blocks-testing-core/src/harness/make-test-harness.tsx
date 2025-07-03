import * as React from "react";

import {Adapt} from "./adapt";

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
 * @returns A test harness.
 */
export const makeTestHarness = <TAdapters extends TestHarnessAdapters>(
    adapters: TAdapters,
    defaultConfigs: TestHarnessConfigs<TAdapters>,
): (<TProps extends object>(
    Component: React.ComponentType<TProps>,
    configs?: Partial<TestHarnessConfigs<TAdapters>>,
) => React.ForwardRefExoticComponent<
    React.PropsWithoutRef<TProps> & React.RefAttributes<unknown>
>) => {
    /**
     * Create a harnessed version of the given component.
     *
     * @param {React.ComponentType<TProps>} component The
     * component to be wrapped.
     * @param {Partial<TestHarnessConfigs<TAdapters>>} [configs] Any adapter
     * configuration that you want to override from the `defaultConfigs` values.
     */
    return <TProps extends object>(
        Component: React.ComponentType<TProps>,
        configs?: Partial<TestHarnessConfigs<TAdapters>>,
    ): React.ForwardRefExoticComponent<
        React.PropsWithoutRef<TProps> & React.RefAttributes<unknown>
    > => {
        const fullConfig: TestHarnessConfigs<TAdapters> = {
            ...defaultConfigs,
            ...configs,
        };
        const harnessedComponent = React.forwardRef((props, ref) => (
            <Adapt adapters={adapters} configs={fullConfig}>
                <Component {...(props as TProps)} ref={ref} />
            </Adapt>
        ));

        // We add a name for the component here so that we can detect that
        // later and also see it in traces and what have you.
        harnessedComponent.displayName = `testHarness(${
            Component.displayName || Component.name || "Component"
        })`;

        return harnessedComponent as React.ForwardRefExoticComponent<
            React.PropsWithoutRef<TProps> & React.RefAttributes<unknown>
        >;
    };
};
