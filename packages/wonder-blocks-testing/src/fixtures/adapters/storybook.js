// @flow
import * as React from "react";
import {action} from "@storybook/addon-actions";
import {Adapter} from "./adapter.js";

import type {
    FixturesAdapterGroupOptions,
    FixturesAdapterFixtureOptions,
    FixturesAdapterFactory,
} from "../types.js";

type StoryContext = {|
    args: $ReadOnly<any>,
    argTypes: $ReadOnly<any>,
    globals: $ReadOnlyArray<any>,
    hooks: $ReadOnlyArray<any>,
    parameters: $ReadOnly<any>,
    viewMode: mixed,
|};

export type StorybookOptions = {|
    decorators?: Array<
        (story: React.ComponentType<any>, context: StoryContext) => React.Node,
    >,
    parameters?: $ReadOnly<any>,
|};

type DefaultExport = {|
    title?: ?string,
    ...StorybookOptions,
|};

type Exports<TProps: {...}> = {|
    default: DefaultExport,
    [story: string]: React.ComponentType<TProps>,
|};

/**
 * Get a fixture framework adapter for Storybook support.
 */
export const getAdapter: FixturesAdapterFactory<
    StorybookOptions,
    Exports<any>,
> = (MountingComponent = null) =>
    new Adapter<StorybookOptions, Exports<any>>(
        "storybook",
        <TProps: {...}>(
            {
                title,
                description: groupDescription,
                // We don't use the default title in Storybook as storybook
                // will generate titles for us if we pass a nullish title.
                getDefaultTitle: _,
            }: $ReadOnly<FixturesAdapterGroupOptions>,
            adapterOptions: ?$ReadOnly<StorybookOptions>,
            declaredFixtures: $ReadOnlyArray<
                FixturesAdapterFixtureOptions<TProps>,
            >,
        ): ?$ReadOnly<Exports<TProps>> => {
            const templateMap = new WeakMap();

            const getPropsOptions = {
                log: (message, ...args) => action(message)(...args),
                logHandler: action,
            };

            const exports = declaredFixtures.reduce(
                (acc, {description, getProps, component: Component}, i) => {
                    const storyName = `${i + 1} ${description}`;
                    const exportName = storyName
                        // Make word boundaries start with an upper case letter.
                        .replace(/\b\w/g, (c) => c.toUpperCase())
                        // Remove all non-alphanumeric characters.
                        .replace(/[^\w]+/g, "")
                        // Remove all underscores.
                        .replace(/[_]+/g, "");

                    // We create a “template” of how args map to rendering
                    // for each type of component as the component here could
                    // be the component under test, or wrapped in a wrapper
                    // component. We don't use decorators for the wrapper
                    // because we may not be in a storybook context and it
                    // keeps the framework API simpler this way.
                    let Template = templateMap.get((Component: any));
                    if (Template == null) {
                        // The MountingComponent is a bit different than just a
                        // Storybook decorator. It's a React component that
                        // takes over rendering the component in the fixture
                        // with the given args, allowing for greater
                        // customization in a platform-agnostic manner (i.e.
                        // not just story format).
                        Template = MountingComponent
                            ? (args) => (
                                  <MountingComponent
                                      component={Component}
                                      props={args}
                                      log={getPropsOptions.log}
                                  />
                              )
                            : (args) => <Component {...args} />;
                        templateMap.set((Component: any), Template);
                    }

                    // Each story that shares that component then reuses that
                    // template.
                    acc[exportName] = Template.bind({});
                    acc[exportName].args = getProps(getPropsOptions);
                    // Adding a story name here means that we don't have to
                    // care about naming the exports correctly, if we don't
                    // want (useful if we need to autogenerate or manually
                    // expose ESM exports).
                    acc[exportName].storyName = storyName;

                    return acc;
                },
                {
                    default: {
                        title,
                        // TODO(somewhatabstract): Use groupDescription
                        // Possibly via a decorator?
                        ...adapterOptions,
                    },
                },
            );

            return Object.freeze(exports);
        },
    );
