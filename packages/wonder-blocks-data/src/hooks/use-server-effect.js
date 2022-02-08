// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {useContext} from "react";
import {TrackerContext} from "../util/request-tracking.js";
import {ResponseCache} from "../util/response-cache.js";

import type {CacheEntry, ValidData} from "../util/types.js";

export const useServerEffect = <TData: ValidData>(
    id: string,
    handler: () => Promise<?TData>,
    hydrate: boolean = true,
): ?CacheEntry<TData> => {
    // If we're server-side or hydrating, we'll have a cached entry to use.
    // So we get that and use it to initialize our state.
    // This works in both hydration and SSR because the very first call to
    // this will have cached data in those cases as it will be present on the
    // initial render - and subsequent renders on the client it will be null.
    const cachedResult = ResponseCache.Default.getEntry<TData>(id);

    // We only track data requests when we are server-side and we don't
    // already have a result, as given by the cachedData (which is also the
    // initial value for the result state).
    const maybeTrack = useContext(TrackerContext);
    if (cachedResult == null && Server.isServerSide()) {
        maybeTrack?.(id, handler, hydrate);
    }

    return cachedResult;
};
