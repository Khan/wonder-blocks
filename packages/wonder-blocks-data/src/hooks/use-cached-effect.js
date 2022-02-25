// @flow
import * as React from "react";
import {useForceUpdate} from "@khanacademy/wonder-blocks-core";

import {RequestFulfillment} from "../util/request-fulfillment.js";
import {Status} from "../util/status.js";

import {useSharedCache} from "./use-shared-cache.js";
import {useRequestInterception} from "./use-request-interception.js";

import type {Result, ValidCacheData} from "../util/types.js";

type CachedEffectOptions<TData: ValidCacheData> = {|
    /**
     * When `true`, the effect will not be executed; otherwise, the effect will
     * be executed.
     *
     * If this is set to `true` while the effect is still pending, the pending
     * effect will be cancelled.
     *
     * Default is `false`.
     */
    skip?: boolean,

    /**
     * When `true`, the effect will not reset the result to the loading status
     * while executing if the requestId changes, instead, returning
     * the existing result from before the change; otherwise, the result will
     * be set to loading status.
     *
     * If the status is loading when the changes are made, it will remain as
     * loading; old pending effects are discarded on changes and as such this
     * value has no effect in that case.
     */
    retainResultOnChange?: boolean,

    /**
     * Callback that is invoked if the result for the given hook has changed.
     *
     * When defined, the hook will invoke this callback whenever it has reason
     * to change the result and will not otherwise affect component rendering
     * directly.
     *
     * When not defined, the hook will ensure the component re-renders to pick
     * up the latest result.
     */
    onResultChanged?: (result: Result<TData>) => void,

    /**
     * Scope to use with the shared cache.
     *
     * When specified, the given scope will be used to isolate this hook's
     * cached results. Otherwise, a shared default scope will be used.
     *
     * Changing this value after the first call is not supported.
     */
    scope?: string,
|};

const DefaultScope = "useCachedEffect";

/**
 * Hook to execute and cache an async operation on the client.
 *
 * This hook executes the given handler on the client if there is no
 * cached result to use.
 *
 * Results are cached so they can be shared between equivalent invocations.
 * In-flight requests are also shared, so that concurrent calls will
 * behave as one might exect. Cache updates invoked by one hook instance
 * do not trigger renders in components that use the same requestID; however,
 * that should not matter since concurrent requests will share the same
 * in-flight request, and subsequent renders will grab from the cache.
 *
 * Once the request has been tried once and a non-loading response has been
 * cached, the request will not executed made again.
 */
export const useCachedEffect = <TData: ValidCacheData>(
    requestId: string,
    handler: () => Promise<TData>,
    options: CachedEffectOptions<TData> = ({}: $Shape<
        CachedEffectOptions<TData>,
    >),
): Result<TData> => {
    const {
        skip: hardSkip = false,
        retainResultOnChange = false,
        onResultChanged,
        scope = DefaultScope,
    } = options;

    // Plug in to the request interception framework for code that wants
    // to use that.
    const interceptedHandler = useRequestInterception(requestId, handler);

    // Instead of using state, which would be local to just this hook instance,
    // we use a shared in-memory cache.
    const [mostRecentResult, setMostRecentResult] = useSharedCache<
        Result<TData>,
    >(
        requestId, // The key of the cached item
        scope, // The scope of the cached items
        // No default value. We don't want the loading status there; to ensure
        // that all calls when the request is in-flight will update once that
        // request is done, we want the cache to be empty until that point.
    );

    // Build a function that will update the cache and either invoke the
    // callback provided in options, or force an update.
    const forceUpdate = useForceUpdate();
    const setCacheAndNotify = React.useCallback(
        (value: Result<TData>) => {
            setMostRecentResult(value);

            // If our caller provided a cacheUpdated callback, we use that.
            // Otherwise, we toggle our little state update.
            if (onResultChanged != null) {
                onResultChanged(value);
            } else {
                forceUpdate();
            }
        },
        [setMostRecentResult, onResultChanged, forceUpdate],
    );

    // We need to trigger a re-render when the request ID changes as that
    // indicates its a different request. We don't default the current id as
    // this is a proxy for the first render, where we will make the request
    // if we don't already have a cached value.
    const requestIdRef = React.useRef();
    const previousRequestId = requestIdRef.current;

    // Calculate our soft skip state.
    // Soft skip changes are things that should skip the effect if something
    // else triggers the effect to run, but should not itself trigger the effect
    // (which would cancel a previous invocation).
    const softSkip = React.useMemo(() => {
        if (requestId === previousRequestId) {
            // If the requestId is unchanged, it means we already rendered at
            // least once and so we already made the request at least once. So
            // we can bail out right here.
            return true;
        }

        // If we already have a cached value, we're going to skip.
        if (mostRecentResult != null) {
            return true;
        }

        return false;
    }, [requestId, previousRequestId, mostRecentResult]);

    // So now we make sure the client-side request happens per our various
    // options.
    React.useEffect(() => {
        let cancel = false;

        // We don't do anything if we've been told to hard skip (a hard skip
        // means we should cancel the previous request and is therefore a
        // dependency on that), or we have determined we have already done
        // enough and can soft skip (a soft skip doesn't trigger the request
        // to re-run; we don't want to cancel the in progress effect if we're
        // soft skipping.
        if (hardSkip || softSkip) {
            return;
        }

        // If we got here, we're going to perform the request.
        // Let's make sure our ref is set to the most recent requestId.
        requestIdRef.current = requestId;

        // OK, we've done all our checks and things. It's time to make the
        // request. We use our request fulfillment here so that in-flight
        // requests are shared.
        // NOTE: Our request fulfillment handles the error cases here.
        // Catching shouldn't serve a purpose.
        // eslint-disable-next-line promise/catch-or-return
        RequestFulfillment.Default.fulfill(requestId, {
            handler: interceptedHandler,
        }).then((result) => {
            if (cancel) {
                // We don't modify our result if an earlier effect was
                // cancelled as it means that this hook no longer cares about
                // that old request.
                return;
            }

            setCacheAndNotify(result);
            return; // Shut up eslint always-return rule.
        });

        return () => {
            // TODO(somewhatabstract, FEI-4276): Eventually, we will want to be
            // able abort in-flight requests, but for now, we don't have that.
            // (Of course, we will only want to abort them if no one is waiting
            // on them)
            // For now, we just block cancelled requests from changing our
            // cache.
            cancel = true;
        };
        // We only want to run this effect if the requestId, or skip values
        // change. These are the only two things that should affect the
        // cancellation of a pending request. We do not update if the handler
        // changes, in order to simplify the API - otherwise, callers would
        // not be able to use inline functions with this hook.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hardSkip, requestId]);

    // We track the last result we returned in order to support the
    // "retainResultOnChange" option.
    const lastResultAgnosticOfIdRef = React.useRef(Status.loading());
    const loadingResult = retainResultOnChange
        ? lastResultAgnosticOfIdRef.current
        : Status.loading();

    // Loading is a transient state, so we only use it here; it's not something
    // we cache.
    const result = React.useMemo(
        () => mostRecentResult ?? loadingResult,
        [mostRecentResult, loadingResult],
    );
    lastResultAgnosticOfIdRef.current = result;

    return result;
};
