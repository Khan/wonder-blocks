// @flow
import * as React from "react";
import type {StorybookOptions} from "./adapters/storybook.js";

/**
 * Options injected to the function that returns the fixture props.
 */
export type GetPropsOptions = {|
    /**
     * A function to call that will log output.
     */
    log: (message: string, ...args: Array<any>) => void,
|};

/**
 * Adapter options keyed by the adapter name.
 */
export type AdapterOptions = {|
    storybook?: StorybookOptions,
    [adapterName: string]: {...},
|};

/**
 * Options to describe a collection of fixtures.
 */
export type FixturesOptions<TProps: {...}> = {|
    /**
     * The component being tested by the fixtures.
     */
    component: React.ComponentType<TProps>,

    /**
     * Optional title of the fixture collection.
     */
    title?: string,

    /**
     * Optional description of the fixture collection.
     */
    description?: string,

    /**
     * Optional default wrapper to apply around the component under test.
     */
    defaultWrapper?: React.ComponentType<TProps>,

    /**
     * Additional options to apply to specific adapters.
     */
    additionalAdapterOptions?: AdapterOptions,
|};

/**
 * Describes a single fixture.
 */
export type AdapterFixtureOptions<TProps: {...}> = {|
    /**
     * Description of the fixture.
     */
    +description: string,

    /**
     * Method to obtain props for the fixture.
     */
    +getProps: (options: $ReadOnly<GetPropsOptions>) => $ReadOnly<TProps>,

    /**
     * The component to render for this fixture.
     */
    +component: React.ComponentType<TProps>,
|};

// TODO(somewhatabstract): Allow for adapters to extend group/fixture options
// with specific support. For example, storybook subcomponents, etc.?

/**
 * Describes a group of fixtures.
 */
export type AdapterGroupOptions = {|
    /**
     * The title of the group.
     */
    +title: string,

    /**
     * Description of the group.
     */
    +description: ?string,
|};

/**
 * Describes the props that an adapter will inject for custom wrappers.
 */
export type CustomWrapperProps<TProps: {...}> = {|
    /**
     * The fixture props for the component to be rendered.
     */
    props: TProps,

    /**
     * The component to render.
     */
    component: React.ComponentType<TProps>,

    /**
     * The log callback for logging information.
     */
    log: (message: string, ...args: Array<any>) => mixed,
|};

/**
 * Declares the API for describing a fixture group provided by an adapter.
 */
export interface AdapterGroup<
    TProps: {...},
    TAdapterOptions: {...},
    TAdapterExports: {...},
> {
    /**
     * Declare a fixture.
     */
    declareFixture(options: $ReadOnly<AdapterFixtureOptions<TProps>>): void;

    /**
     * Close the group and obtain the exports, if the adapter requires any.
     *
     * @param {Options} adapterOptions Some options to pass to the adapter.
     * Allows callers to tailor things to a specific adapter. How these options
     * are used is adapter-specific.
     *
     * @returns {?Exports} The exports that the adapter requires fixture files
     * to export.
     */
    closeGroup(
        adapterOptions: $ReadOnly<Partial<TAdapterOptions>>,
    ): ?$ReadOnly<TAdapterExports>;
}

/**
 * Declares the API for an adapter.
 */
export interface Adapter<TAdapterOptions: {...}, TAdapterExports: {...}> {
    /**
     * The name of the adapter.
     */
    get name(): string;

    /**
     * Declare a fixture group.
     *
     * @returns {AdapterGroup<TProps, TAdapterOptions, TAdapterExports>} The
     * declared group.
     */
    declareGroup<TProps: {...}>(
        options: $ReadOnly<AdapterGroupOptions>,
    ): AdapterGroup<TProps, TAdapterOptions, TAdapterExports>;
}

/**
 * Describes the configuration for the fixture framework.
 */
export type Configuration<TAdapterOptions: {...}, TAdapterExports: {...}> = {|
    /**
     * The adapter to use for declaring fixtures.
     */
    +adapter: Adapter<TAdapterOptions, TAdapterExports>,

    /**
     * Default options to apply to every fixture group.
     *
     * Each top-level option in this object will be merged with the equivalent
     * top-level option that a specific fixture requests. Where collisions
     * occur, the fixture options win.
     */
    +defaultAdapterOptions?: $ReadOnly<Partial<TAdapterOptions>>,
|};

export type AdapterFactory<TAdapterOptions: {...}, TAdapterExports: {...}> = (
    MountingComponent: ?React.ComponentType<CustomWrapperProps<any>>,
) => Adapter<TAdapterOptions, TAdapterExports>;
