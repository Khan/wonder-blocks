import * as React from "react";
import {useForceUpdate} from "@khanacademy/wonder-blocks-core";
import {DataError, DataErrors} from "../util/data-error";

import {RequestFulfillment} from "../util/request-fulfillment";
import {Status} from "../util/status";

import {useSharedCache} from "./use-shared-cache";
import {useRequestInterception} from "./use-request-interception";

import type {Result, ValidCacheData} from "../util/types";

import {FetchPolicy} from "../util/types";

type CachedEffectOptions<TData extends ValidCacheData> = {
    /**
     * The policy to use when determining how to retrieve the request data from
     * cache and network.
     *
     * Inflight requests are shared so that multiple requests for the same
     * resource do not cause multiple fetches while one fetch is already in
     * progress.
     *
     * Network requests update the cache on return, regardless of which policy
     * initiated the request.
     *
     * For fetch policies that use the cache, if the cache does not yet have
     * the data, then a `no-data` status is returned.
     *
     * The `FetchPolicy.NetworkOnly`  and `FetchPolicy.CacheAndNetwork` only
     * fetch the data once and then reuse that result, unless a re-fetch is
     * explicitly triggered via the fetch function in the returned tuple.
     *
     * For `FetchPolicy.NetworkOnly`, the cache is ignored (but the cache
     * is still updated with the fetched value). Until a value is available,
     * a `loading` status is returned for this policy.
     *
     * Defaults to `FetchPolicy.CacheBeforeNetwork`.
     */
    fetchPolicy?: (typeof FetchPolicy)[keyof typeof FetchPolicy];
    /**
     * When `true`, the effect will not be executed; otherwise, the effect will
     * be executed.
     *
     * If this is set to `true` while the effect is still pending, the pending
     * effect will be cancelled.
     *
     * Default is `false`.
     */
    skip?: boolean;
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
    retainResultOnChange?: boolean;
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
    onResultChanged?: (result: Result<TData>) => void;
    /**
     * Scope to use with the shared cache.
     *
     * When specified, the given scope will be used to isolate this hook's
     * cached results. Otherwise, a shared default scope will be used.
     *
     * Changing this value after the first call is not supported.
     */
    scope?: string;
};

type InflightRequest<TData extends ValidCacheData> = {
    requestId: string;
    request: Promise<Result<TData>>;
    cancel(): void;
};

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
export const useCachedEffect = <TData extends ValidCacheData>(
    requestId: string,
    handler: () => Promise<TData>,
    options: CachedEffectOptions<TData> = {} as Partial<
        CachedEffectOptions<TData>
    >,
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
        Result<TData>
    >( // The key of the cached item
        requestId, // The scope of the cached items
        // No default value. We don't want the loading status there; to ensure
        // that all calls when the request is in-flight will update once that
        // request is done, we want the cache to be empty until that point.
        scope,
    );
    const forceUpdate = useForceUpdate();
    // For the NetworkOnly fetch policy, we ignore the cached value.
    // So we need somewhere else to store the network value.
    const networkResultRef = React.useRef<Result<TData> | null>();

    // Set up the function that will do the fetching.
    const currentRequestRef = React.useRef<InflightRequest<TData> | null>();
    const fetchRequest = React.useMemo(() => {
        // We aren't using useCallback here because we need to make sure that
        // if we are rememo-izing, we cancel any inflight request for the old
        // callback.
        currentRequestRef.current?.cancel();
        currentRequestRef.current = null;
        networkResultRef.current = null;

        const fetchFn = () => {
            if (fetchPolicy === FetchPolicy.CacheOnly) {
                throw new DataError(
                    "Cannot fetch with CacheOnly policy",
                    DataErrors.NotAllowed,
                );
            }
            // We use our request fulfillment here so that in-flight
            // requests are shared. In order to ensure that we don't share
            // in-flight requests for different scopes, we add the scope to the
            // requestId.
            // We do this as a courtesy to simplify usage in sandboxed
            // uses like storybook where we want each story to perform their
            // own requests from scratch and not share inflight requests across
            // stories.
            // Since this only occurs here, nothing else will care about this
            // change except the request tracking.
            const request = RequestFulfillment.Default.fulfill(
                `${requestId}|${scope}`,
                {
                    handler: interceptedHandler,
                },
            );

            if (request === currentRequestRef.current?.request) {
                // The request inflight is the same, so do nothing.
                // NOTE: Perhaps if invoked via a refetch, we will want to
                // override this behavior and force a new request?
                return;
            }

            // Clear the last network result.
            networkResultRef.current = null;

            // Cancel the previous request.
            currentRequestRef.current?.cancel();

            // TODO(somewhatabstract, FEI-4276):
            // Until our RequestFulfillment API supports cancelling/aborting, we
            // will have to do it.
            let cancel = false;

            // NOTE: Our request fulfillment handles the error cases here.
            // Catching shouldn't serve a purpose.
            // eslint-disable-next-line promise/catch-or-return
            request.then((result) => {
                currentRequestRef.current = null;
                if (cancel) {
                    // We don't modify our result if the request was cancelled
                    // as it means that this hook no longer cares about that old
                    // request.
                    return;
                }

                // Now we need to update the cache and notify or force a rerender.
                setMostRecentResult(result);
                networkResultRef.current = result;

                if (onResultChanged != null) {
                    // If we have a callback, call it to let our caller know we
                    // got a result.
                    onResultChanged(result);
                } else {
                    // If there's no callback, and this is using cache in some
                    // capacity, just force a rerender.
                    forceUpdate();
                }
                return; // Shut up eslint always-return rule.
            });

            currentRequestRef.current = {
                requestId,
                request,
                cancel() {
                    cancel = true;
                    RequestFulfillment.Default.abort(requestId);
                },
            };
        };

        // Now we can return the new fetch function.
        return fetchFn;

        // We deliberately ignore the handler here because we want folks to use
        // interceptor functions inline in props for simplicity. This is OK
        // since changing the handler without changing the requestId doesn't
        // really make sense - the same requestId should be handled the same as
        // each other.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        requestId,
        onResultChanged,
        forceUpdate,
        setMostRecentResult,
        fetchPolicy,
    ]);

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
                // If we don't have a cached value then we need to fetch.
                return mostRecentResult == null;

            case FetchPolicy.CacheAndNetwork:
            case FetchPolicy.NetworkOnly:
                // We don't care about the cache. If we don't have a network
                // result, then we need to fetch one.
                return networkResultRef.current == null;
        }
    }, [mostRecentResult, fetchPolicy, hardSkip]);

    React.useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        fetchRequest();
        return () => {
            currentRequestRef.current?.cancel();
            currentRequestRef.current = null;
        };
    }, [shouldFetch, fetchRequest]);

    // We track the last result we returned in order to support the
    // "retainResultOnChange" option. To begin, the last result is no-data.
    const lastResultAgnosticOfIdRef = React.useRef<Result<TData>>(
        Status.noData<TData>(),
    );
    // The default return value is:
    // - The last result we returned if we're retaining results on change.
    // - The no-data state if shouldFetch is false, and therefore there is no
    //   in-flight request.
    // - Otherwise, the loading state (we can assume there's an inflight
    //   request if skip is not true).
    const loadingResult = retainResultOnChange
        ? lastResultAgnosticOfIdRef.current
        : shouldFetch
          ? Status.loading<TData>()
          : Status.noData<TData>();

    // Loading and no-data are transient states, so we only use them here;
    // they're not something we cache.
    const result: Result<TData> =
        (fetchPolicy === FetchPolicy.NetworkOnly
            ? networkResultRef.current
            : mostRecentResult) ?? loadingResult;
    lastResultAgnosticOfIdRef.current = result;

    // We return the result and a function for triggering a refetch.
    return [result, fetchRequest];
};
