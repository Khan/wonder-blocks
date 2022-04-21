// @flow
import * as React from "react";
import {useForceUpdate} from "@khanacademy/wonder-blocks-core";

import {RequestFulfillment} from "../util/request-fulfillment.js";
import {Status} from "../util/status.js";

import {useSharedCache} from "./use-shared-cache.js";
import {useRequestInterception} from "./use-request-interception.js";

import type {Result, ValidCacheData} from "../util/types.js";

// TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
// have fixed:
// https://github.com/import-js/eslint-plugin-import/issues/2073
// eslint-disable-next-line import/named
import {FetchPolicy} from "../util/types.js";

type CachedEffectOptions<TData: ValidCacheData> = {|
    /**
     * The policy to use when determining how to retrieve the request data from
     * cache and network.
     *
     * Defaults to `FetchPolicy.CacheBeforeNetwork`.
     */
    fetchPolicy?: FetchPolicy,

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
): [Result<TData>, () => void] => {
    const {
        fetchPolicy = FetchPolicy.CacheBeforeNetwork,
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
    const forceUpdate = useForceUpdate();
    // For the NetworkOnly fetch policy, we bypass the shared cache entirely.
    // So we need somewhere else to store the value, but we only use this
    // if there's no onResultChanged callback.
    const [networkOnlyResult, setNetworkOnlyResult] = React.useState();

    // Set up the function that will do the fetching.
    const inflightRequestRef = React.useRef();
    const fetchRequest = React.useMemo(() => {
        // We aren't using useCallback here because we need to make sure that
        // if we are rememo-izing, we cancel any inflight request for the old
        // callback.
        inflightRequestRef.current?.cancel();
        inflightRequestRef.current = null;

        // Now we can return the new fetch function.
        return () => {
            // TODO(somewhatabstract, FEI-4276):
            // Until our RequestFulfillment API supports cancelling/aborting, we
            // will have to do it.
            let cancel = false;

            // We use our request fulfillment here so that in-flight
            // requests are shared.
            const request = RequestFulfillment.Default.fulfill(requestId, {
                handler: interceptedHandler,
            });

            if (request === inflightRequestRef.current?.request) {
                // The request inflight is the same, so do nothing.
                // NOTE: Perhaps if invoked via a refetch, we will want to
                // override this behavior and force a new request?
                return;
            }

            if (fetchPolicy === FetchPolicy.NetworkOnly) {
                // For the NetworkOnly fetch policy, we need to clear the
                // state so we'll render a loading state if necessary.
                setNetworkOnlyResult(null);
            }

            // Cancel the previous request.
            inflightRequestRef.current?.cancel();
            inflightRequestRef.current = null;

            // NOTE: Our request fulfillment handles the error cases here.
            // Catching shouldn't serve a purpose.
            // eslint-disable-next-line promise/catch-or-return
            request.then((result) => {
                if (cancel) {
                    // We don't modify our result if the request was cancelled
                    // as it means that this hook no longer cares about that old
                    // request.
                    return;
                }

                // We don't have an inflight request to worry about anymore.
                inflightRequestRef.current = null;

                // Now we need to update the cache and notify or force a rerender.
                setMostRecentResult(result);

                if (onResultChanged != null) {
                    // If we have a callback, call it to let our caller know we
                    // got a result.
                    onResultChanged(result);
                } else if (fetchPolicy === FetchPolicy.NetworkOnly) {
                    // For the NetworkOnly fetch policy, we don't use the cached
                    // value, so we need to store it in state.
                    setNetworkOnlyResult(result);
                } else {
                    // If there's no callback, and this is using cache in some
                    // capacity, just force a rerender.
                    forceUpdate();
                }
                return; // Shut up eslint always-return rule.
            });

            inflightRequestRef.current = {
                request,
                cancel() {
                    cancel = true;
                },
            };
        };
    }, [
        requestId,
        interceptedHandler,
        setMostRecentResult,
        setNetworkOnlyResult,
        onResultChanged,
        forceUpdate,
        fetchPolicy,
    ]);

    // We need to trigger a re-render when the request ID changes as that
    // indicates its a different request.
    const requestIdRef = React.useRef(requestId);

    // Calculate if we want to fetch the result or not.
    // If this is true, we will do a new fetch, cancelling the previous fetch
    // if there is one inflight.
    const shouldFetch = React.useMemo(() => {
        if (hardSkip) {
            // We don't fetch if we've been told to hard skip.
            return false;
        }

        switch (fetchPolicy) {
            case FetchPolicy.CacheOnly:
                // Don't want to do a network request if we're only
                // interested in the cache.
                return false;

            case FetchPolicy.CacheBeforeNetwork:
                // If we don't a cached value or this is a new requestId,
                // then we need to fetch.
                return (
                    mostRecentResult == null ||
                    requestId !== requestIdRef.current
                );

            case FetchPolicy.CacheAndNetwork:
            case FetchPolicy.NetworkOnly:
                // We don't care about the cache. We need to fetch.
                return true;
        }

        // Default, just in case a bad fetch policy is given.
        return true;
    }, [requestId, mostRecentResult, fetchPolicy, hardSkip]);

    // Let's make sure our ref is set to the most recent requestId.
    requestIdRef.current = requestId;

    React.useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        fetchRequest();
    }, [shouldFetch, fetchRequest]);

    // We track the last result we returned in order to support the
    // "retainResultOnChange" option.
    const lastResultAgnosticOfIdRef = React.useRef(Status.loading());
    const loadingResult = retainResultOnChange
        ? lastResultAgnosticOfIdRef.current
        : Status.loading();

    // Loading is a transient state, so we only use it here; it's not something
    // we cache.
    const result = React.useMemo(
        () =>
            (fetchPolicy === FetchPolicy.NetworkOnly
                ? networkOnlyResult
                : mostRecentResult) ?? loadingResult,
        [fetchPolicy, networkOnlyResult, mostRecentResult, loadingResult],
    );
    lastResultAgnosticOfIdRef.current = result;

    // We return the result and a function for triggering a refetch.
    return [result, fetchRequest];
};
