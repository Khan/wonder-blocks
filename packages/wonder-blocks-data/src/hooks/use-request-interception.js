// @flow
import * as React from "react";

import InterceptContext from "../components/intercept-context.js";
import type {ValidCacheData} from "../util/types.js";

/**
 * Allow request handling to be intercepted.
 *
 * Hook to take a uniquely identified request handler and return a
 * method that will support request interception from the InterceptRequest
 * component.
 *
 * If you want request interception to be supported with `useServerEffect` or
 * any client-side effect that uses the handler, call this first to generate
 * an intercepted handler, and then invoke `useServerEffect` (or other things)
 * with that intercepted handler.
 */
export const useRequestInterception = <TData: ValidCacheData>(
    requestId: string,
    handler: () => Promise<TData>,
): (() => Promise<TData>) => {
    // Get the interceptors that have been registered.
    const interceptors = React.useContext(InterceptContext);

    // Now, we need to create a new handler that will check if the
    // request is intercepted before ultimately calling the original handler
    // if nothing intercepted it.
    // We memoize this so that it only changes if something related to it
    // changes.
    const interceptedHandler = React.useCallback((): Promise<TData> => {
        // Call the interceptors from closest to furthest.
        // If one returns a non-null result, then we keep that.
        const interceptResponse = interceptors.reduceRight(
            (prev, interceptor) => {
                if (prev != null) {
                    return prev;
                }
                return interceptor(requestId);
            },
            null,
        );
        // If nothing intercepted this request, invoke the original handler.
        // NOTE: We can't guarantee all interceptors return the same type
        // as our handler, so how can flow know? Let's just suppress that.
        // $FlowFixMe[incompatible-return]
        return interceptResponse ?? handler();
    }, [handler, interceptors, requestId]);

    return interceptedHandler;
};
