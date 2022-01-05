// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {useState, useEffect, useContext} from "react";
import {RequestFulfillment} from "../util/request-fulfillment.js";
import {TrackerContext} from "../util/request-tracking.js";
import {resultFromCacheEntry} from "../util/result-from-cache-entry.js";

import type {
    CacheEntry,
    Result,
    IRequestHandler,
    ValidData,
} from "../util/types.js";

export const useDataInternal = <TOptions, TData: ValidData>(
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
    getCacheEntry: (
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ) => ?$ReadOnly<CacheEntry<TData>>,
): Result<TData> => {
    const cachedData = getCacheEntry(handler, options);
    const maybeTrack = useContext(TrackerContext);
    const [localError, setLocalError] = useState();

    // We only track data requests when we are server-side and we don't
    // already have a result.
    if (cachedData == null && Server.isServerSide()) {
        maybeTrack?.(handler, options);
    }

    // This effect will ensure that we fulfill the request as desired.
    useEffect(() => {
        // If we are server-side, or we have cached data and we don't need
        // to refresh the cache, then just skip the effect.
        // NOTE: Server-side requests are fulfilled outside of the render loop.
        if (
            Server.isServerSide() ||
            (cachedData != null &&
                !handler.shouldRefreshCache(options, cachedData))
        ) {
            return;
        }

        // We aren't server-side and either we don't have a cached data value
        // or we have been asked to refresh the cache, so let's make the
        // request.
        let cancel = false;
        RequestFulfillment.Default.fulfill(handler, options)
            .then((updateEntry) => {
                if (cancel) {
                    return;
                }

                // Updating the local error state is a proxy for the cached
                // data changing that avoids us double-caching the same data.
                setLocalError(null);
                return;
            })
            .catch((e) => {
                if (cancel) {
                    return;
                }
                /**
                 * We should never get here as errors in fulfillment are part
                 * of the `then`, but if we do.
                 */
                // eslint-disable-next-line no-console
                console.error(
                    `Unexpected error occurred during data fulfillment: ${e}`,
                );
                setLocalError(typeof e === "string" ? e : e.message);
                return;
            });

        return () => {
            cancel = true;
        };
    }, [cachedData, handler, options]);

    if (localError != null) {
        return {
            status: "error",
            error: localError,
        };
    }

    const result = resultFromCacheEntry(cachedData);
    return result;
};
