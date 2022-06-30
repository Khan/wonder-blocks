// @flow
/**
 * Options injected to the function that returns the fixture props.
 */
export type GetPropsOptions = {|
    /**
     * A function to call that will log output.
     */
    log: (message: string, ...args: Array<any>) => void,

    /**
     * A function to make a handler that will log all arguments with the given
     * name or message. Useful for logging events as it avoids the boilerplate
     * of the `log` function.
     */
    logHandler: (name: string) => (...args: Array<any>) => void,
|};

export type FixtureProps<TProps: {...}> =
    | $ReadOnly<TProps>
    | ((options: $ReadOnly<GetPropsOptions>) => $ReadOnly<TProps>);
