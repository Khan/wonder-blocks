import * as React from "react";

/**
 * Options injected to the function that returns the fixture props.
 * @deprecated Use CSFv3 style stories instead. This API was for migration
 * from our old fixtures framework and will be removed in a future release.
 */
export type GetPropsOptions = {
    /**
     * A function to call that will log output.
     */
    log: (message: string, ...args: Array<any>) => void;
    /**
     * A function to make a handler that will log all arguments with the given
     * name or message. Useful for logging events as it avoids the boilerplate
     * of the `log` function.
     */
    logHandler: (name: string) => (...args: Array<any>) => void;
};

/**
 * The props for a fixture.
 *
 * This can be either a static object or a function that returns an object.
 *
 * @deprecated Use CSFv3 style stories instead. This API was for migration
 * from our old fixtures framework and will be removed in a future release.
 */
export type FixtureProps<TProps extends object> =
    | Readonly<TProps>
    | ((options: Readonly<GetPropsOptions>) => Readonly<TProps>);

/**
 * A function for defining a fixture.
 * @deprecated Use CSFv3 style stories instead. This API was for migration
 * from our old fixtures framework and will be removed in a future release.
 */
export type FixtureFn<TProps extends object> = (
    /**
     * The name of the fixture.
     */
    description: string,
    /**
     * The props for the fixture or a function that returns the props.
     * The function is injected with an API to facilitate logging.
     */
    props: FixtureProps<TProps>,
    /**
     * An alternative component to render for the fixture.
     * Useful if the fixture requires some additional setup for testing the
     * component.
     */
    wrapper?: React.ComponentType<TProps>,
) => unknown;
