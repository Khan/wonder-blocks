// @flow
import type {ValidData, IRequestHandler} from "./types.js";

/**
 * Base implementation for creating a request handler.
 *
 * Provides a base implementation of the `IRequestHandler` base class for
 * use with the Wonder Blocks Data framework.
 */
export default class RequestHandler<TOptions, TData: ValidData>
    implements IRequestHandler<TOptions, TData>
{
    _type: string;
    _hydrate: boolean;

    constructor(type: string, hydrate?: boolean = true) {
        this._type = type;
        this._hydrate = !!hydrate;
    }

    get type(): string {
        return this._type;
    }

    get hydrate(): boolean {
        return this._hydrate;
    }

    getKey(options: TOptions): string {
        try {
            return options === undefined
                ? "undefined"
                : (JSON.stringify(options): any);
        } catch (e) {
            throw new Error(`Failed to auto-generate key: ${e}`);
        }
    }

    fulfillRequest(options: TOptions): Promise<TData> {
        throw new Error("Not implemented");
    }
}
