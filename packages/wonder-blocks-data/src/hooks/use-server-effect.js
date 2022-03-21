// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {useContext} from "react";
import {TrackerContext} from "../util/request-tracking.js";
import {SsrCache} from "../util/ssr-cache.js";
import {resultFromCachedResponse} from "../util/result-from-cache-response.js";
import {useRequestInterception} from "./use-request-interception.js";

import type {Result, ValidCacheData} from "../util/types.js";

type ServerEffectOptions = {|
    /**
     * When `true`, the result of the effect when fulfilled using Wonder Blocks
     * Data will be stored in the hydration cache for hydrating client-side;
     * otherwise, the result will be stored in the server-side-only cache.
     *
     * This should only be set to `false` if something else will be responsible
     * for hydration of the data on the client-side (for example, if Apollo's
     * hydration support is used).
     *
     * Default is `true`.
     */
    hydrate?: boolean,

    /**
     * When `true`, the effect will not be tracked for fulfillment; otherwise,
     * the effect will be tracked for fulfillment.
     *
     * Default is `false`.
     */
    skip?: boolean,
|};

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
    options: ServerEffectOptions = ({}: $Shape<ServerEffectOptions>),
): ?Result<TData> => {
    const {hydrate = true, skip = false} = options;

    // Plug in to the request interception framework for code that wants
    // to use that.
    const interceptedHandler = useRequestInterception(requestId, handler);

    // If we're server-side or hydrating, we'll have a cached entry to use.
    // So we get that and use it to initialize our state.
    // This works in both hydration and SSR because the very first call to
    // this will have cached data in those cases as it will be present on the
    // initial render - and subsequent renders on the client it will be null.
    const cachedResult = SsrCache.Default.getEntry<TData>(requestId);

    // We only track data requests when we are server-side, we are not skipping
    // the request, and we don't already have a result, as given by the
    // cachedData (which is also the initial value for the result state).
    const maybeTrack = useContext(TrackerContext);
    if (!skip && cachedResult == null && Server.isServerSide()) {
        maybeTrack?.(requestId, interceptedHandler, hydrate);
    }

    // A null result means there was no result to hydrate.
    return cachedResult == null ? null : resultFromCachedResponse(cachedResult);
};
