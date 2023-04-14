import * as React from "react";
import {action} from "@storybook/addon-actions";

import type {FixtureFn, FixtureProps} from "./types";

/**
 * Describe a group of fixtures for a given component.
 *
 * Only one `fixtures` call should be used per fixture file as it returns
 * the exports for that file.
 *
 * @param {React.ComponentType<any>} Component The component we want to create
 * stories for.
 * @returns {FixtureFn<TProps>} A function to create a CSF compatible story.
 */
export const fixtures = <
    TComponent extends React.ComponentType<any>,
    TProps extends JSX.LibraryManagedAttributes<
        TComponent,
        React.ComponentProps<TComponent>
    >,
>(
    Component: TComponent,
): FixtureFn<TProps> => {
    const templateMap = new WeakMap();
    // We use this to make sure each story gets a unique name.
    let storyNumber = 1;

    const getPropsOptions = {
        // @ts-expect-error [FEI-5019] - TS7006 - Parameter 'message' implicitly has an 'any' type. | TS7019 - Rest parameter 'args' implicitly has an 'any[]' type.
        log: (message, ...args) => action(message)(...args),
        logHandler: action,
    } as const;

    const makeStory = (
        description: string,
        props: FixtureProps<TProps>,
        wrapper: React.ComponentType<TProps> | null = null,
    ): unknown => {
        const storyName = `${storyNumber++} ${description}`;
        const getProps = (options: {
            log: (message: string, ...args: Array<any>) => any;
            logHandler: any;
        }) => (typeof props === "function" ? props(options) : props);

        const RealComponent = wrapper || Component;

        // We create a “template” of how args map to rendering
        // for each type of component as the component here could
        // be the component under test, or wrapped in a wrapper
        // component. We don't use decorators for the wrapper
        // because we may not be in a storybook context and it
        // keeps the framework API simpler this way.
        let Template = templateMap.get(RealComponent as any);
        if (Template == null) {
            Template = (args: any) => <RealComponent {...args} />;
            templateMap.set(RealComponent as any, Template);
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
