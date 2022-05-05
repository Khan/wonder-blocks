// @flow
import type {
    FixturesAdapterGroup,
    FixturesAdapterGroupOptions,
    FixturesAdapterFixtureOptions,
} from "../types.js";

export type CloseGroupFn<TProps: {...}, Options: {...}, Exports: {...}> = (
    options: $ReadOnly<FixturesAdapterGroupOptions>,
    adapterOptions: ?$ReadOnly<Options>,
    declaredFixtures: $ReadOnlyArray<FixturesAdapterFixtureOptions<TProps>>,
) => ?$ReadOnly<Exports>;

/**
 * Simple adapter group implementation.
 */
export class AdapterGroup<TProps: {...}, Options: {...}, Exports: {...}>
    implements FixturesAdapterGroup<TProps, Options, Exports>
{
    _closeGroupFn: ?CloseGroupFn<TProps, Options, Exports>;
    +_fixtures: Array<FixturesAdapterFixtureOptions<TProps>>;
    +_options: $ReadOnly<FixturesAdapterGroupOptions>;

    /**
     * Create an adapter group.
     *
     * @param {CloseGroupFn<TProps, Options, Exports>} closeGroupFn A function
     * to invoke when the group is closed.
     * @param {AdapterGroupOptions} options The options for the group.
     */
    constructor(
        closeGroupFn: CloseGroupFn<TProps, Options, Exports>,
        options: $ReadOnly<FixturesAdapterGroupOptions>,
    ) {
        if (typeof closeGroupFn !== "function") {
            throw new TypeError("closeGroupFn must be a function");
        }
        if (typeof options !== "object" || options === null) {
            throw new TypeError("options must be an object");
        }
        this._closeGroupFn = closeGroupFn;
        this._options = options;
        this._fixtures = [];
    }

    /**
     * Close the group.
     *
     * This declares that no more fixtures are to be added to the group,
     * and will call the parent adapter with the declared fixtures so that they
     * can be adapted for the target fixture framework, such as Storybook.
     */
    +closeGroup: (
        adapterOptions: ?$ReadOnly<Partial<Options>>,
    ) => ?$ReadOnly<Exports> = (adapterOptions = null) => {
        if (this._closeGroupFn == null) {
            throw new Error("Group already closed");
        }

        try {
            return this._closeGroupFn(
                this._options,
                adapterOptions,
                this._fixtures,
            );
        } finally {
            this._closeGroupFn = null;
        }
    };

    /**
     * Declare a fixture within the group.
     *
     * @param {FixturesAdapterFixtureOptions<TProps>} fixtureOptions The options
     * describing the fixture.
     */
    +declareFixture: (
        options: $ReadOnly<FixturesAdapterFixtureOptions<TProps>>,
    ) => void = (options) => {
        if (typeof options !== "object" || options === null) {
            throw new TypeError("options must be an object");
        }
        if (this._closeGroupFn == null) {
            throw new Error("Cannot declare fixtures after closing the group");
        }
        this._fixtures.push(options);
    };
}
