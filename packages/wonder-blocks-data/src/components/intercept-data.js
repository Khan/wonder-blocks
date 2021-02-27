// @flow
import * as React from "react";

import InterceptContext from "./intercept-context.js";

import type {
    ValidData,
    IRequestHandler,
    InterceptFulfillRequestFn,
    InterceptShouldRefreshCacheFn,
} from "../util/types.js";

type BaseProps<TOptions, TData> = {|
    /**
     * A handler of the type to be intercepted.
     */
    handler: IRequestHandler<TOptions, TData>,

    /**
     * The children to render within this component. Any requests by `Data`
     * components that use a handler of the same type as the handler for this
     * component that are rendered within these children will be intercepted by
     * this component (unless another `InterceptData` component overrides this
     * one).
     */
    children: React.Node,
|};

// type FulfillRequestProps<TOptions, TData> = {|
//     /**
//      * Called to fulfill a request.
//      * If this returns null, the request will be fulfilled by the
//      * handler of the original request being intercepted.
//      */
//     fulfillRequest: InterceptFulfillRequestFn<TOptions, TData>,
// |};

// type ShouldRefreshCacheProps<TOptions, TData> = {|
//     /**
//      * Called to determine if the cache should be refreshed.
//      * If this returns null, the handler being intercepted will be asked if
//      * the cache should be refreshed.
//      */
//     shouldRefreshCache: InterceptShouldRefreshCacheFn<TOptions, TData>,
// |};

type ConditionalProps<TOptions, TData> =
    | {|
          fulfillRequest: InterceptFulfillRequestFn<TOptions, TData>,
          shouldRefreshCache?: empty,
      |}
    | {|
          fulfillRequest?: empty,
          shouldRefreshCache: InterceptShouldRefreshCacheFn<TOptions, TData>,
      |}
    | {|
          fulfillRequest: InterceptFulfillRequestFn<TOptions, TData>,
          shouldRefreshCache: InterceptShouldRefreshCacheFn<TOptions, TData>,
      |};

type Props<TOptions, TData> = {|
    ...BaseProps<TOptions, TData>,
    ...ConditionalProps<TOptions, TData>,
|};

/**
 * This component provides a mechanism to intercept the data requests for the
 * type of a given handler and provide alternative results. This is mostly
 * useful for testing.
 *
 * Results from this interceptor will end up in the cache. If you
 * wish to only override the cache, use `InterceptCache` instead.
 *
 * This component is not recommended for use in production code as it
 * can prevent predictable functioning of the Wonder Blocks Data framework.
 * One possible side-effect is that inflight requests from the interceptor could
 * be picked up by `Data` component requests of the same handler type from
 * outside the children of this component.
 *
 * These components do not chain. If a different `InterceptData` instance is
 * rendered within this one that intercepts the same handler type, then that
 * new instance will replace this interceptor for its children. All methods
 * will be replaced.
 */
export default class InterceptData<
    TOptions,
    TData: ValidData,
> extends React.Component<Props<TOptions, TData>> {
    render(): React.Node {
        return (
            <InterceptContext.Consumer>
                {(value) => {
                    const handlerType = this.props.handler.type;
                    const interceptor = {
                        ...value[handlerType],
                        fulfillRequest: this.props.fulfillRequest || null,
                        shouldRefreshCache:
                            this.props.shouldRefreshCache || null,
                    };
                    const newValue = {
                        ...value,
                        [handlerType]: interceptor,
                    };
                    return (
                        <InterceptContext.Provider value={newValue}>
                            {this.props.children}
                        </InterceptContext.Provider>
                    );
                }}
            </InterceptContext.Consumer>
        );
    }
}
