// @flow
import type {ValidData, ICache, CacheEntry, IRequestHandler} from "./types.js";

let defaultInstance: ?ICache<any, any> = null;
/**
 * This is a cache implementation to use when no caching is wanted.
 *
 * Use this with your request handler if you want to support server-side
 * rendering of your data requests, but want to ensure data is never cached
 * on the client-side.
 *
 * This is better than having `shouldRefreshCache` always return `true` in the
 * handler as this ensures that cache space and memory are never used for the
 * requested data after hydration has finished.
 */
export default class NoCache<TOptions, TData: ValidData>
    implements ICache<TOptions, TData> {
    static get Default(): ICache<TOptions, TData> {
        if (defaultInstance == null) {
            defaultInstance = new NoCache<TOptions, TData>();
        }
        return defaultInstance;
    }

    store: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ) => void = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): void => {
        /* empty */
    };

    retrieve: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ) => ?CacheEntry<TData> = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?CacheEntry<TData> => null;

    remove: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ) => boolean = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): boolean => false;

    removeAll: <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ) => number = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ): number => 0;
}
