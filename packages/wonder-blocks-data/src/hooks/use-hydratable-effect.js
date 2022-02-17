// @flow
import * as React from "react";
import {useForceUpdate} from "@khanacademy/wonder-blocks-core";

import {AbortError} from "../util/abort-error.js";
import {RequestFulfillment} from "../util/request-fulfillment.js";
import {Status} from "../util/status.js";

import {useServerEffect} from "./use-server-effect.js";
import {useSharedCache} from "./use-shared-cache.js";
import {useRequestInterception} from "./use-request-interception.js";

import type {Result, ValidCacheData} from "../util/types.js";

/**
 * Policies to define how a hydratable effect should behave client-side.
 */
export enum WhenClientSide {
    // TODO(somewhatabstract, FEI-4172): Update eslint-plugin-flowtype when
    // they've fixed https://github.com/gajus/eslint-plugin-flowtype/issues/502
    /* eslint-disable no-undef */
    /**
     * The result from executing the effect server-side will not be hydrated.
     * The effect will always be executed client-side.
     *
     * This should only be used if there is something else that is responsible
     * for properly hydrating this component (for example, the action invokes
     * Apollo which manages its own cache to ensure things render properly).
     */
    DoNotHydrate,

    /**
     * The result from executing the effect server-side will be hydrated.
     * The effect will only execute client-side if there was no result to
     * be hydrated (i.e. both error and success hydration results prevent the
     * effect running client-side).
     */
    ExecuteWhenNoResult,

    /**
     * The result from executing the effect server-side will be hydrated.
     * If the hydrated result is a success result, the effect will not be
     * executed client-side.
     * If the hydrated result was not a success result, or there was no
     * hydrated result, the effect will not be executed.
     */
    ExecuteWhenNoSuccessResult,

    /**
     * The result from executing the effect server-side will be hydrated.
     * The effect will always be executed client-side, regardless of the
     * hydrated result status.
     */
    AlwaysExecute,
    /* eslint-enable no-undef */
}

type HydratableEffectOptions<TData: ValidCacheData> = {|
    /**
     * How the hook should behave when rendering client-side for the first time.
     *
     * This controls how the hook hydrates and executes when client-side.
     *
     * Default is `OnClientRender.ExecuteWhenNoSuccessResult`.
     */
    clientBehavior?: WhenClientSide,

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
     * while executing if the requestID or handler changes, instead, returning
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
     */
    scope?: string,
|};

/**
 * Hook to execute an async operation on server and client.
 *
 * This hook executes the given handler on the server and on the client,
 * and, depending on the given options, can hydrate the server-side result.
 *
 * Results are cached on the client so they can be shared between equivalent
 * invocations. Cache changes from one hook instance do not trigger renders
 * in components that use the same requestID.
 */
export const useHydratableEffect = <TData: ValidCacheData>(
    requestId: string,
    handler: () => Promise<TData>,
    options: HydratableEffectOptions<TData> = ({}: $Shape<
        HydratableEffectOptions<TData>,
    >),
): Result<TData> => {
    const {
        clientBehavior = WhenClientSide.ExecuteWhenNoSuccessResult,
        skip = false,
        retainResultOnChange = false,
        onResultChanged,
        scope = "useHydrateableEffect",
    } = options;

    // Plug in to the request interception framework for code that wants
    // to use that.
    const interceptedHandler = useRequestInterception(requestId, handler);

    // Now we instruct the server to perform the operation.
    // When client-side, this will look up any response for hydration; it does
    // not invoke the handler.
    const hydrateValue = useServerEffect(
        requestId,

        // If we're skipped (unlikely in server worlds, but maybe),
        // just give an aborted response.
        skip
            ? () => Promise.reject(new AbortError("skipped"))
            : interceptedHandler,

        // Only hydrate if our behavior isn't telling us not to.
        clientBehavior !== WhenClientSide.DoNotHydrate,
    );

    // Instead of using state, which would be local to just this hook instance,
    // we use a shared in-memory cache.
    const [mostRecentResult, setMostRecentResult] = useSharedCache<
        Result<TData>,
    >(
        requestId, // The key of the cached item
        scope, // The scope of the cached items
        hydrateValue, // The default value to cache if nothing is already cached
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

    // At this point, the server has done its part and we can even hydrate
    // a value, but the client-side is still not going to do anything.

    // We need to trigger a re-render when the request ID changes as that
    // indicates its a different request. This is also a proxy for the
    // hydration step, hence why we don't default it.
    const requestIdRef = React.useRef();

    // So now we make sure the client-side request happens per our various
    // options.
    React.useEffect(() => {
        let cancel = false;

        // We don't do anything if we've been told to skip.
        if (skip) {
            return;
        }

        // If the requestId is unchanged, it means we already rendered at least
        // once and so we already made the request at least once. So we can
        // bail out right here.
        if (requestId === requestIdRef.current) {
            return;
        }

        // Now, determine if we need to do a request or not.
        if (requestIdRef.current == null) {
            // If we don't have a requestId, it's our first render, the one
            // where we hydrated. So defer to our clientBehavior value.
            switch (clientBehavior) {
                case WhenClientSide.DoNotHydrate:
                case WhenClientSide.AlwaysExecute:
                    // Either we weren't hydrating at all, or we don't care
                    // if we hydrated something or not, either way, we're
                    // doing a request.
                    break;

                case WhenClientSide.ExecuteWhenNoResult:
                    // We only execute if we didn't hydrate something.
                    if (hydrateValue != null) {
                        // We hydrated something; bail.
                        return;
                    }
                    break;

                case WhenClientSide.ExecuteWhenNoSuccessResult:
                    // We only execute if we didn't hydrate a success result.
                    if (hydrateValue?.status === "success") {
                        // We hydrated a success result; bail.
                        return;
                    }
                    break;
            }
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
        // changes, as that is not a supported use.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip, requestId]);

    // We track the last result we returned in order to support the
    // "retainResultOnChange" option.
    const lastResultAgnosticOfIdRef = React.useRef(Status.Loading());
    const loadingResult = retainResultOnChange
        ? lastResultAgnosticOfIdRef.current
        : Status.Loading();

    // Loading is a transient state, so we only use it here; it's not something
    // we cache.
    const result = React.useMemo(
        () => mostRecentResult ?? loadingResult,
        [mostRecentResult, loadingResult],
    );
    lastResultAgnosticOfIdRef.current = result;

    return result;
};
