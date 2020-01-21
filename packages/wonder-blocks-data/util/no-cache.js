// @flow
import type {ValidData, ICache, CacheEntry, IRequestHandler} from "./types.js";

/**
 * A cache implementation to use when no caching is wanted.
 */
export default class NoCache<TOptions, TData: ValidData>
    implements ICache<TOptions, TData> {
    store = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): void => {
        /* empty */
    };

    retrieve = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?CacheEntry<TData> => null;

    remove = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): boolean => false;

    removeAll = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ): number => 0;
}
