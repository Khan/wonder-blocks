import {useEffect, useMemo, useRef} from "react";
import {ClearPolicy, ActionPolicy} from "../util/policies";

import type {IAnimationFrame, HookOptions} from "../util/types";

import AnimationFrame from "../util/animation-frame";

/**
 * Hook providing access to a scheduled animation frame request.
 *
 * @param action The action to be invoked when the animation frame fires.
 * By default, this will not cause the request to restart if it changes.
 * This makes it easier to use with inline lambda functions rather than
 * requiring consumers to wrap their action in a `useCallback`. To change
 * this behavior, see the `actionPolicy` option.
 * @param options Options for the hook. By default the frame is scheduled
 * immediately on mount and cancelled on unmount. Use `schedulePolicy` to
 * specify when the request is scheduled. Use `clearPolicy` to
 * specify how the request is cleared when the component is unmounted
 * or the request is recreated. Use `actionPolicy` to determine how the action
 * is handled when it changes.
 * @returns An `IAnimationFrame` API for interacting with the given request.
 * This API is a no-op if called when not mounted. This means that any calls
 * prior to mounting or after unmounting will not have any effect. This API is
 * not reactive, so do not deconstruct the return value, but instead
 * dereference it at the time of use.
 */
export function useAnimationFrame(
    action: (time: DOMHighResTimeStamp) => unknown,
    options: HookOptions = {},
): IAnimationFrame {
    const {actionPolicy, clearPolicy, schedulePolicy} = options;
    const actionProxyRef =
        useRef<(time: DOMHighResTimeStamp) => unknown>(action);
    const animationFrameRef = useRef<IAnimationFrame | null>(null);

    // Since we are passing our proxy function to the animation frame instance,
    // its check that the action is a function will never fail. So, we have to
    // do that check ourselves, and we do it here.
    if (typeof action !== "function") {
        throw new Error("Action must be a function");
    }

    // If we're rendered with an updated action, we want to update the ref
    // so the existing request gets the new action, and then reset the
    // request if our action policy calls for it.
    if (action !== actionProxyRef.current) {
        actionProxyRef.current = action;
        if (actionPolicy === ActionPolicy.Reset) {
            animationFrameRef.current?.set();
        }
    }

    // This effect updates the animation frame when the clearPolicy or
    // schedulePolicy changes.
    useEffect(() => {
        // Make a new animation frame request.
        animationFrameRef.current = new AnimationFrame((time) => {
            actionProxyRef.current?.(time);
        }, schedulePolicy);

        // Clear the request when the effect is cleaned up, if necessary,
        // making sure to use the clear policy.
        return () => {
            animationFrameRef.current?.clear(clearPolicy);
            animationFrameRef.current = null;
        };
    }, [clearPolicy, schedulePolicy]);

    // This is the API we expose to the consumer. We expose this rather than
    // the animation frame instance itself so that the API we give back is
    // stable even if the underlying instance changes.
    const externalApi = useMemo(
        () => ({
            set: () => {
                animationFrameRef.current?.set();
            },
            clear: (policy: ClearPolicy | undefined = clearPolicy) => {
                // Note that we default to the clear policy passed to the hook
                // so that this works as folks might expect.
                animationFrameRef.current?.clear(policy);
            },
            get isSet() {
                return animationFrameRef.current?.isSet ?? false;
            },
        }),
        [clearPolicy],
    );

    return externalApi;
}
