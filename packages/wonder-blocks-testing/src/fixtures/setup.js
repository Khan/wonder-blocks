// @flow
import type {FixturesConfiguration} from "./types.js";

let _configuration: ?$ReadOnly<FixturesConfiguration<any, any>> = null;

/**
 * Setup the fixture framework.
 */
export const setup = <TAdapterOptions: {...}, TAdapterExports: {...}>(
    configuration: $ReadOnly<
        FixturesConfiguration<TAdapterOptions, TAdapterExports>,
    >,
) => {
    _configuration = configuration;
};

/**
 * Get the framework configuration.
 *
 * @returns {Configuration} The configuration as provided via setup().
 * @throws {Error} If the configuration has not been set.
 */
export const getConfiguration = (): $ReadOnly<
    FixturesConfiguration<any, any>,
> => {
    if (_configuration == null) {
        throw new Error("Not configured");
    }
    return _configuration;
};
