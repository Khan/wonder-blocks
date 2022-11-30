// @flow
declare module "@storybook/react" {
    /**
     * Ported from the CSF typings in `@storybook/csf`.
     * @see https://github.com/ComponentDriven/csf/blob/b170e3d459d5619384fdf181b91c0867c62fbd7a/src/story.ts#L69-L84
     */
    declare type Renderer = {
        /** What is the type of the `component` annotation in this renderer? */
        component: any,

        /** What does the story function return in this renderer? */
        storyResult: any,

        /** What type of element does this renderer render to? */
        canvasElement: any,
        ...
    };

    /**
     * Ported from the CSF typings in `@storybook/csf`.
     * @see https://github.com/ComponentDriven/csf/blob/b170e3d459d5619384fdf181b91c0867c62fbd7a/src/story.ts#L132-L139
     */
    declare type StoryContext<TRenderer> = {
        canvasElement: TRenderer["canvasElement"],
        ...
    };

    /**
     * Made up type to decorate a React component with the story field.
     */
    declare type StoryComponentType = React$ComponentType<*> & {
        args?: {[key: string]: any, ...},
        parameters?: {[key: string]: any, ...},
        storyName?: string,
        decorators?: Array<Function>,
        play?: (context: StoryContext<Renderer>) => Promise<void> | void,
        ...
    };
}
