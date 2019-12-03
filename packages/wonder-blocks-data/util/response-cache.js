// @flow
import type {CacheEntry, ResponseCache, IRequestHandler} from "./types.js";

/**
 * The response cache itself. Not to be exposed directly.
 */
const responseCache: ResponseCache = ({}: any);

function setCacheEntry<TOptions, TData>(
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
    entry: CacheEntry,
): void {
    const requestType = handler.type;

    // Ensure we have a cache location for this handler type.
    responseCache[requestType] = responseCache[requestType] || {};

    // Cache the data.
    const key = handler.getKey(options);
    responseCache[requestType][key] = entry;
}

/**
 * Add data to our response cache.
 *
 * INTERNAL USE ONLY
 */
export function cacheData<TOptions, TData>(
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
    data: TData,
): void {
    setCacheEntry(handler, options, {data});
}

export function cacheError<TOptions, TData>(
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
    error: Error,
): void {
    setCacheEntry(handler, options, {error});
}

/**
 * Retrieve data from our response cache.
 *
 * INTERNAL USE ONLY
 */
export function getEntry<TOptions, TData>(
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
): ?CacheEntry {
    const requestType = handler.type;

    // Get the subcache for the handler.
    const handlerCache = responseCache[requestType];
    if (!handlerCache) {
        return null;
    }

    // Get the response.
    const key = handler.getKey(options);
    const entry = handlerCache[key];
    return entry == null ? null : entry;
}

/**
 * Initialize the data response cache from a given cache state.
 */
export function initialize(sourceCache: ResponseCache): void {
    if (Object.keys(responseCache).length !== 0) {
        throw new Error("Cannot initialize data response cache more than once");
    }

    try {
        /**
         * We want to deep clone the source cache to dodge mutations by external
         * references. However, Object.assign only performs a shallow clone.
         * So we serialize the source cache to JSON and parse it back into a new
         * object, then assign it's values to our internal cache.
         */
        const serializedInitCache = JSON.stringify(sourceCache);
        const cloneInitCache = JSON.parse(serializedInitCache);
        Object.assign(responseCache, cloneInitCache);
    } catch (e) {
        throw new Error(
            `An error occurred trying to initialize the data response cache: ${e}`,
        );
    }
}
