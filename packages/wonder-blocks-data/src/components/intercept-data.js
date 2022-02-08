// @flow
import * as React from "react";

import InterceptContext from "./intercept-context.js";

import type {ValidData} from "../util/types.js";

type Props<TData: ValidData> = {|
    /**
     * The ID of the request to intercept.
     */
    id: string,

    /**
     * Called to intercept and fulfill the request.
     * If this returns null, the request will be fulfilled by the
     * handler of the original request being intercepted.
     */
    handler: () => ?Promise<?TData>,

    /**
     * The children to render within this component. Any requests by `Data`
     * components that use same ID as this component will be intercepted.
     * (unless another `InterceptData` component overrides this one).
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
 * These components do not chain. If a different `InterceptData` instance is
 * rendered within this one that intercepts the same id, then that
 * new instance will replace this interceptor for its children. All methods
 * will be replaced.
 */
const InterceptData = <TData: ValidData>(props: Props<TData>): React.Node => {
    const interceptMap = React.useContext(InterceptContext);

    const {id, handler, children} = props;
    const updatedInterceptMap = React.useMemo(
        () => ({
            ...interceptMap,
            [id]: handler,
        }),
        [interceptMap, id, handler],
    );

    return (
        <InterceptContext.Provider value={updatedInterceptMap}>
            {children}
        </InterceptContext.Provider>
    );
};

export default InterceptData;
