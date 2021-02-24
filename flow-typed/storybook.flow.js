// @flow
declare module "@storybook/react" {
    /**
     * Made up type to decorate a React component with the story field.
     */
    declare type StoryComponentType<T> = React$ComponentType<*> & {
        story?: $FlowFixMe,
        ...
    };
}
