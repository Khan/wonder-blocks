// @flow
import * as React from "react";
import {getConfiguration} from "./setup.js";
import {combineOptions} from "./combine-options.js";

import type {FixturesOptions, GetPropsOptions} from "./types.js";

type FixtureProps<TProps: {...}> =
    | $ReadOnly<TProps>
    | ((options: $ReadOnly<GetPropsOptions>) => $ReadOnly<TProps>);

/**
 * Describe a group of fixtures for a given component.
 *
 * Only one `fixtures` call should be used per fixture file as it returns
 * the exports for that file.
 *
 * @param {FixtureOptions<TProps>} options Options describing the
 * fixture group.
 * @param {FixtureFn<TProps> => void} fn A function that provides a `fixture`
 * function for defining fixtures.
 * @returns {Exports} The object to be exported as `module.exports`.
 *
 * TODO(somewhatabstract): Determine a way around this requirement so we
 * can support named exports and default exports via the adapters in a
 * deterministic way. Currently this is imposed on us because of how
 * storybook, the popular framework, uses both default and named exports for
 * its interface.
 */
export const fixtures = <TProps: {...}>(
    options: $ReadOnly<FixturesOptions<TProps>>,
    fn: (
        fixture: (
            description: string,
            props: FixtureProps<TProps>,
            wrapper?: React.ComponentType<TProps>,
        ) => void,
    ) => void,
): ?$ReadOnly<mixed> => {
    const {adapter, defaultAdapterOptions} = getConfiguration();
    const {
        title,
        component,
        description: groupDescription,
        defaultWrapper,
        additionalAdapterOptions,
    } = options;

    // 1. Create a new adapter group.
    const group = adapter.declareGroup<TProps>({
        title,
        description: groupDescription,
        getDefaultTitle: () =>
            component.displayName || component.name || "Component",
    });

    // 2. Invoke fn with a function that can add a new fixture.
    const addFixture = (description, props, wrapper = null): void => {
        group.declareFixture({
            description,
            getProps: (options) =>
                typeof props === "function" ? props(options) : props,
            component: wrapper ?? defaultWrapper ?? component,
        });
    };
    fn(addFixture);

    // 3. Combine the adapter options from the fixture group with the
    //    defaults from our setup.
    const groupAdapterOverrides =
        additionalAdapterOptions?.[adapter.name] ?? {};
    const combinedAdapterOptions = combineOptions(
        defaultAdapterOptions,
        groupAdapterOverrides,
    );

    // 4. Call close on the group and return the result.
    return group.closeGroup(combinedAdapterOptions);
};
