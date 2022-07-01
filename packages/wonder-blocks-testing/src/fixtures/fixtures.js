// @flow
import * as React from "react";
import {action} from "@storybook/addon-actions";

import type {FixtureFn, FixtureProps} from "./types.js";

/**
 * Describe a group of fixtures for a given component.
 *
 * Only one `fixtures` call should be used per fixture file as it returns
 * the exports for that file.
 *
 * @param {component: React.ComponentType<any>} options Options describing the
 * fixture group.
 * @param {FixtureFn<TProps> => void} fn A function that provides a `fixture`
 * function for defining fixtures.
 * @returns {(
 *    description: string,
 *    props: FixtureProps<TProps>,
 *    wrapper?: React.ComponentType<TProps>,
 * ) => mixed} A function to create a CSF compatible story.
 */
export const fixtures = <
    TComponent: React.ComponentType<any>,
    TProps: React.ElementConfig<TComponent>,
>(
    Component: TComponent,
): FixtureFn<TProps> => {
    const templateMap = new WeakMap();
    // We use this to make sure each story gets a unique name.
    let storyNumber = 1;

    const getPropsOptions = {
        log: (message, ...args) => action(message)(...args),
        logHandler: action,
    };

    const makeStory = (
        description: string,
        props: FixtureProps<TProps>,
        wrapper: ?React.ComponentType<TProps> = null,
    ): mixed => {
        const storyName = `${storyNumber++} ${description}`;
        const getProps = (options) =>
            typeof props === "function" ? props(options) : props;

        // We create a “template” of how args map to rendering
        // for each type of component as the component here could
        // be the component under test, or wrapped in a wrapper
        // component. We don't use decorators for the wrapper
        // because we may not be in a storybook context and it
        // keeps the framework API simpler this way.
        let Template = templateMap.get((Component: any));
        if (Template == null) {
            Template = (args) => <Component {...args} />;
            templateMap.set((Component: any), Template);
        }

        // Each story that shares that component then reuses that
        // template.
        const story = Template.bind({});
        story.args = getProps(getPropsOptions);
        // Adding a story name here means that we don't have to
        // care about naming the exports correctly, if we don't
        // want (useful if we need to autogenerate or manually
        // expose ESM exports).
        story.storyName = storyName;

        return story;
    };
    return makeStory;
};
