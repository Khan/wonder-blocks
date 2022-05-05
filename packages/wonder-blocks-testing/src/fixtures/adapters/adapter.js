// @flow
import {AdapterGroup, type CloseGroupFn} from "./adapter-group.js";
import type {
    FixturesAdapter,
    FixturesAdapterGroup,
    FixturesAdapterGroupOptions,
} from "../types.js";

/**
 * Class for implementing a custom adapter.
 */
export class Adapter<Options: {...}, Exports: {...}>
    implements FixturesAdapter<Options, Exports>
{
    +_name: string;
    +_closeGroupFn: CloseGroupFn<any, Options, Exports>;

    /**
     * @param {string} name The name of the adapter.
     * @param {CloseGroupFn<any, Options, Exports>} closeGroupFn The function
     * an adapter group should call when the group is closed. This is invoked
     * by an adapter group when it is closed. This function is where an
     * adapter implements the logic to generate the actual fixtures for the
     * adapter's target framework.
     */
    constructor(
        name: string,
        closeGroupFn: CloseGroupFn<any, Options, Exports>,
    ) {
        if (typeof name !== "string") {
            throw new TypeError("name must be a string");
        }
        if (name.trim() === "") {
            throw new Error("name must be a non-empty string");
        }
        if (typeof closeGroupFn !== "function") {
            throw new TypeError("closeGroupFn must be a function");
        }

        this._name = name;
        this._closeGroupFn = closeGroupFn;
    }

    /**
     * The name of the adapter.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Declare a new fixture group.
     *
     * @param {FixturesAdapterGroupOptions} options The options describing the fixture
     * group.
     * @returns {FixturesAdapterGroup} The new fixture group.
     */
    declareGroup<Config: {...}>(
        options: $ReadOnly<FixturesAdapterGroupOptions>,
    ): FixturesAdapterGroup<Config, Options, Exports> {
        return new AdapterGroup(this._closeGroupFn, options);
    }
}
