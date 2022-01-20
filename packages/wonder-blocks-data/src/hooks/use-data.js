// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {useState, useEffect, useContext, useRef} from "react";
import {RequestFulfillment} from "../util/request-fulfillment.js";
import InterceptContext from "../components/intercept-context.js";
import {TrackerContext} from "../util/request-tracking.js";
import {resultFromCacheEntry} from "../util/result-from-cache-entry.js";
import {ResponseCache} from "../util/response-cache.js";

import type {
    Result,
    IRequestHandler,
    ValidData,
    CacheEntry,
} from "../util/types.js";

export const useData = <TOptions, TData: ValidData>(
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
): Result<TData> => {
    // If we're server-side or hydrating, we'll have a cached entry to use.
    // So we get that and use it to initialize our state.
    // This works in both hydration and SSR because the very first call to
    // this will have cached data in those cases as it will be present on the
    // initial render - and subsequent renders on the client it will be null.
    const cachedResult = ResponseCache.Default.getEntry<TOptions, TData>(
        handler,
        options,
    );
    const [result, setResult] = useState<?CacheEntry<TData>>(cachedResult);

    // Lookup to see if there's an interceptor for the handler.
    // If we have one, we need to replace the handler with one that
    // uses the interceptor.
    const interceptorMap = useContext(InterceptContext);
    const interceptor = interceptorMap[handler.type];

    // If we have an interceptor, we need to replace the handler with one that
    // uses the interceptor. This helper function generates a new handler.
    // We need this before we track the request as we want the interceptor
    // to also work for tracked requests to simplify testing the server-side
    // request fulfillment.
    const getMaybeInterceptedHandler = () => {
        if (interceptor == null) {
            return handler;
        }

        const fulfillRequestFn = (options) =>
            interceptor.fulfillRequest(options) ??
            handler.fulfillRequest(options);
        return {
            fulfillRequest: fulfillRequestFn,
            getKey: (options) => handler.getKey(options),
            type: handler.type,
            hydrate: handler.hydrate,
        };
    };

    // We only track data requests when we are server-side and we don't
    // already have a result, as given by the cachedData (which is also the
    // initial value for the result state).
    const maybeTrack = useContext(TrackerContext);
    if (result == null && Server.isServerSide()) {
        maybeTrack?.(getMaybeInterceptedHandler(), options);
    }

    // We need to update our request when the handler changes or the key
    // to the options change, so we keep track of those.
    // However, even if we are hydrating from cache, we still need to make the
    // request at least once, so we do not initialize these references.
    const handlerRef = useRef();
    const keyRef = useRef();
    const interceptorRef = useRef();

    // This effect will ensure that we fulfill the request as desired.
    useEffect(() => {
        // If we are server-side, then just skip the effect. We track requests
        // during SSR and fulfill them outside of the React render cycle.
        // NOTE: This shouldn't happen since effects would not run on the server
        // but let's be defensive - I think it makes the code clearer.
        /* istanbul ignore next */
        if (Server.isServerSide()) {
            return;
        }

        // Update our refs to the current handler and key.
        handlerRef.current = handler;
        keyRef.current = handler.getKey(options);
        interceptorRef.current = interceptor;

        // If we're not hydrating a result, we want to make sure we set our
        // result to null so that we're in the loading state.
        if (cachedResult == null) {
            // Mark ourselves as loading.
            setResult(null);
        }

        // We aren't server-side, so let's make the request.
        // The request handler is in control of whether that request actually
        // happens or not.
        let cancel = false;
        RequestFulfillment.Default.fulfill(
            getMaybeInterceptedHandler(),
            options,
        )
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
        // - handler.getKey is a proxy for options
        // - We don't want to trigger on cachedResult changing, we're
        //   just using that as a flag for render state if the other things
        //   trigger this effect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handler, handler.getKey(options), interceptor]);

    return resultFromCacheEntry(result);
};
