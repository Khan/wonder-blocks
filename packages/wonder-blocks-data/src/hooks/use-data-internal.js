// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {useState, useEffect, useContext, useRef} from "react";
import {RequestFulfillment} from "../util/request-fulfillment.js";
import {TrackerContext} from "../util/request-tracking.js";
import {resultFromCacheEntry} from "../util/result-from-cache-entry.js";
import {ResponseCache} from "../util/response-cache.js";

import type {
    Result,
    IRequestHandler,
    ValidData,
    CacheEntry,
} from "../util/types.js";

export const useDataInternal = <TOptions, TData: ValidData>(
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
): Result<TData> => {
    // If we're server-side or hydrating, we'll have a cached entry to use.
    // So we get that and use it to initialize our state.
    // This works in both hydration and SSR because the very first call to
    // this will have cached data in those cases as it will be present on the
    // initial render - and subsequent renders on the client it will be null.
    const cachedData = ResponseCache.Default.getEntry<TOptions, TData>(
        handler,
        options,
    );
    const [result, setResult] = useState<?CacheEntry<TData>>(cachedData);

    // We only track data requests when we are server-side and we don't
    // already have a result.
    const maybeTrack = useContext(TrackerContext);
    if (result == null && Server.isServerSide()) {
        maybeTrack?.(handler, options);
    }

    // We need to update our request when the handler changes or the key
    // to the options change, so we keep track of those.
    // However, even if we are hydrating from cache, we still need to make the
    // request at least once, so we do not initialize these references.
    const handlerRef = useRef();
    const keyRef = useRef();

    // This effect will ensure that we fulfill the request as desired.
    useEffect(() => {
        // If we are server-side, then just skip the effect. We track requests
        // during SSR and fulfill them outside of the React render cycle.
        if (Server.isServerSide()) {
            return;
        }

        // If the handler hasn't changed and the key that the options represent
        // hasn't changed, then we don't need to make our request.
        if (
            handler === handlerRef.current &&
            handler.getKey(options) === keyRef.current
        ) {
            return;
        }

        // Update our refs to the current handler and key.
        handlerRef.current = handler;
        keyRef.current = handler.getKey(options);

        // If we're not hydrating a result, we want to make sure we set our
        // result to null so that we're in the loading state.
        if (cachedData == null) {
            // Mark ourselves as loading.
            setResult(null);
        }

        // We aren't server-side, so let's make the request.
        // The request handler is in control of whether that request actually
        // happens or not.
        let cancel = false;
        RequestFulfillment.Default.fulfill(handler, options)
            .then((updateEntry) => {
                if (cancel) {
                    return;
                }
                setResult(updateEntry);
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
                setResult({
                    data: null,
                    error: typeof e === "string" ? e : e.message,
                });
                return;
            });

        return () => {
            cancel = true;
        };
    }, [handler, options, handlerRef, keyRef, cachedData]);

    // If we are server-side
    return resultFromCacheEntry(result);
};
