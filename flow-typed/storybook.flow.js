// @flow
declare module "@storybook/react" {
    /**
     * Made up type to decorate a React component with the story field.
     */
    declare type StoryComponentType = React$ComponentType<*> & {
        args?: {[key: string]: any, ...},
        parameters?: {[key: string]: any, ...},
        storyName?: string,
        decorators?: Array<Function>,
        ...
    };
}
