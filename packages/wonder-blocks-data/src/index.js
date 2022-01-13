// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {ResponseCache as ResCache} from "./util/response-cache.js";
import {RequestTracker} from "./util/request-tracking.js";

import type {
    ValidData,
    CacheEntry,
    IRequestHandler,
    ResponseCache,
} from "./util/types.js";

export type {
    Cache,
    CacheEntry,
    Result,
    IRequestHandler,
    ResponseCache,
} from "./util/types.js";

export const initializeCache = (source: ResponseCache): void =>
    ResCache.Default.initialize(source);

export const fulfillAllDataRequests = (): Promise<ResponseCache> => {
    if (!Server.isServerSide()) {
        return Promise.reject(
            new Error("Data requests are not tracked when client-side"),
        );
    }
    return RequestTracker.Default.fulfillTrackedRequests();
};

export const hasUnfulfilledRequests = (): boolean => {
    if (!Server.isServerSide()) {
        throw new Error("Data requests are not tracked when client-side");
    }
    return RequestTracker.Default.hasUnfulfilledRequests;
};

export const removeFromCache = <TOptions, TData: ValidData>(
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
): boolean => ResCache.Default.remove<TOptions, TData>(handler, options);

export const removeAllFromCache = <TOptions, TData: ValidData>(
    handler: IRequestHandler<TOptions, TData>,
    predicate?: (
        key: string,
        cacheEntry: ?$ReadOnly<CacheEntry<TData>>,
    ) => boolean,
): number => ResCache.Default.removeAll<TOptions, TData>(handler, predicate);

export {default as RequestHandler} from "./util/request-handler.js";
export {default as TrackData} from "./components/track-data.js";
export {default as Data} from "./components/data.js";
export {default as InterceptData} from "./components/intercept-data.js";
export {useData} from "./hooks/use-data.js";

// GraphQL
export {GqlRouter} from "./components/gql-router.js";
export type {GqlContext, GqlOperation} from "./util/gql-types.js";
