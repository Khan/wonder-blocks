// @flow
import * as React from "react";

import InterceptContext from "./intercept-context.js";

import type {ValidCacheData} from "../util/types.js";

type Props<TData: ValidCacheData> = {|
    /**
     * Called to intercept and possibly handle the request.
     * If this returns null, the request will be handled by ancestor
     * any ancestor interceptors, and ultimately, the original request
     * handler, otherwise, this interceptor is handling the request.
     *
     * Interceptors are called in ancestor precedence, with the closest
     * interceptor ancestor being called first, and the furthest ancestor
     * being called last.
     *
     * Beware: Interceptors do not care about what data they are intercepting,
     * so make sure to only intercept requests that you recognize from the
     * identifier.
     */
    interceptor: (requestId: string) => ?Promise<TData>,

    /**
     * The children to render within this component. Any requests by `Data`
     * components that use same ID as this component will be intercepted.
     * If `InterceptRequests` is used within `children`, that interception will
     * be given a chance to intercept first.
     */
    children: React.Node,
|};

/**
 * This component provides a mechanism to intercept data requests.
 * This is for use in testing.
 *
 * This component is not recommended for use in production code as it
 * can prevent predictable functioning of the Wonder Blocks Data framework.
 * One possible side-effect is that inflight requests from the interceptor could
 * be picked up by `Data` component requests from outside the children of this
 * component.
 *
 * Interceptions within the same component tree are chained such that the
 * interceptor closest to the intercepted request is called first, and the
 * furthest interceptor is called last.
 */
const InterceptRequests = <TData: ValidCacheData>({
    interceptor,
    children,
}: Props<TData>): React.Node => {
    const interceptors = React.useContext(InterceptContext);

    const updatedInterceptors = React.useMemo(
        // We could build this in reverse order so that our hook that does
        // the interception didn't have to use reduceRight, but I think it
        // is easier to think about if we do this in component tree order.
        () => [...interceptors, interceptor],
        [interceptors, interceptor],
    );

    return (
        <InterceptContext.Provider value={updatedInterceptors}>
            {children}
        </InterceptContext.Provider>
    );
};

export default InterceptRequests;
