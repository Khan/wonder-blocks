// @flow
import * as React from "react";

import {AbortError} from "../util/abort-error.js";

import {useServerEffect} from "./use-server-effect.js";
import {useSharedCache} from "./use-shared-cache.js";
import {useCachedEffect} from "./use-cached-effect.js";

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
     * Default is `WhenClientSide.ExecuteWhenNoSuccessResult`.
     *
     * Changing this value after the first call is irrelevant as it only
     * affects the initial render behavior.
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

const DefaultScope = "useHydratableEffect";

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
        scope = DefaultScope,
    } = options;

    // Now we instruct the server to perform the operation.
    // When client-side, this will look up any response for hydration; it does
    // not invoke the handler.
    const serverResult = useServerEffect(
        requestId,

        // If we're skipped (unlikely in server worlds, but maybe),
        // just give an aborted response.
        skip ? () => Promise.reject(new AbortError("skipped")) : handler,

        // Only hydrate if our behavior isn't telling us not to.
        clientBehavior !== WhenClientSide.DoNotHydrate,
    );

    const getDefaultCacheValue: () => ?Result<TData> = React.useCallback(() => {
        // If we don't have a requestId, it's our first render, the one
        // where we hydrated. So defer to our clientBehavior value.
        switch (clientBehavior) {
            case WhenClientSide.DoNotHydrate:
            case WhenClientSide.AlwaysExecute:
                // Either we weren't hydrating at all, or we don't care
                // if we hydrated something or not, either way, we're
                // doing a request.
                return null;

            case WhenClientSide.ExecuteWhenNoResult:
                // We only execute if we didn't hydrate something.
                // So, returning the hydration result as default for our
                // cache, will then prevent the cached effect running.
                return serverResult;

            case WhenClientSide.ExecuteWhenNoSuccessResult:
                // We only execute if we didn't hydrate a success result.
                if (serverResult?.status === "success") {
                    // So, returning the hydration result as default for our
                    // cache, will then prevent the cached effect running.
                    return serverResult;
                }
                return null;
        }
        // There is no reason for this to change after the first render,
        // you might think, but the function closes around serverResult and if
        // the requestId changes, it still returns the hydrate result of the
        // first render of the previous requestId. This then means that the
        // hydrate result is still the same, and the effect is not re-executed
        // because the cache gets incorrectly defaulted.
        // However, we don't want to bother doing anything with this on
        // client behavior changing since that truly is irrelevant.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serverResult]);

    // Instead of using state, which would be local to just this hook instance,
    // we use a shared in-memory cache.
    useSharedCache<Result<TData>>(
        requestId, // The key of the cached item
        scope, // The scope of the cached items
        getDefaultCacheValue,
    );

    // When we're client-side, we ultimately want the result from this call.
    const clientResult = useCachedEffect(requestId, handler, {
        skip,
        onResultChanged,
        retainResultOnChange,
        scope,
    });

    // OK, now which result do we return.
    // Well, we return the serverResult on our very first call and then
    // the clientResult thereafter. The great thing is that after the very
    // first call, the serverResult is going to be `null` anyway.
    return serverResult ?? clientResult;
};
