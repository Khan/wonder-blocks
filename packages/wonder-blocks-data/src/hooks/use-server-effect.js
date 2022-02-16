// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {useContext} from "react";
import {TrackerContext} from "../util/request-tracking.js";
import {SsrCache} from "../util/ssr-cache.js";
import {resultFromCachedResponse} from "../util/result-from-cache-response.js";

import type {Result, ValidCacheData} from "../util/types.js";

/**
 * Hook to perform an asynchronous action during server-side rendering.
 *
 * This hook registers an asynchronous action to be performed during
 * server-side rendering. The action is performed only once, and the result
 * is cached against the given identifier so that subsequent calls return that
 * cached result allowing components to render more of the component.
 *
 * This hook requires the Wonder Blocks Data functionality for resolving
 * pending requests, as well as support for the hydration cache to be
 * embedded into a page so that the result can by hydrated (if that is a
 * requirement).
 *
 * The asynchronous action is never invoked on the client-side.
 */
export const useServerEffect = <TData: ValidCacheData>(
    requestId: string,
    handler: () => Promise<TData>,
    hydrate: boolean = true,
): ?Result<TData> => {
    // If we're server-side or hydrating, we'll have a cached entry to use.
    // So we get that and use it to initialize our state.
    // This works in both hydration and SSR because the very first call to
    // this will have cached data in those cases as it will be present on the
    // initial render - and subsequent renders on the client it will be null.
    const cachedResult = SsrCache.Default.getEntry<TData>(requestId);

    // We only track data requests when we are server-side and we don't
    // already have a result, as given by the cachedData (which is also the
    // initial value for the result state).
    const maybeTrack = useContext(TrackerContext);
    if (cachedResult == null && Server.isServerSide()) {
        maybeTrack?.(requestId, handler, hydrate);
    }

    // A null result means there was no result to hydrate.
    return cachedResult == null ? null : resultFromCachedResponse(cachedResult);
};
