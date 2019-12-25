// @flow
import * as React from "react";

import InterceptContext from "./intercept-context.js";

import type {IRequestHandler, InterceptCacheFn} from "../util/types.js";

type Props<TOptions, TData> = {|
    /**
     * A handler of the type to be intercepted.
     */
    handler: IRequestHandler<TOptions, TData>,

    /**
     * The children to render within this component. Any cache lookups by `Data`
     * components that use a handler of the same type as the handler for this
     * component that are rendered within these children will be intercepted by
     * this component (unless another `InterceptData` component overrides this
     * one).
     */
    children: React.Node,

    /**
     * Called to retrieve a cache entry.
     *
     * The method takes a key, the options for a request, and the existing
     * cached entry if one exists.
     *
     * If this returns null, the default behavior occurs.
     */
    getEntry: InterceptCacheFn<TOptions, TData>,
|};

/**
 * This component provides a mechanism to intercept cache lookups for the
 * type of a given handler and provide alternative values. This is mostly
 * useful for testing.
 *
 * This does not modify the cache in any way. If you want to intercept
 * requests and cache based on the intercept, then use `InterceptData`.
 *
 * This component is generally not suitable for use in production code as it
 * can prevent predictable functioning of the Wonder Blocks Data framework.
 *
 * These components do not chain. If a different `InterceptCache` instance is
 * rendered within this one that intercepts the same handler type, then that
 * new instance will replace this interceptor for its children.
 */
export default class InterceptCache<TOptions, TData> extends React.Component<
    Props<TOptions, TData>,
> {
    render() {
        const handlerType = this.props.handler.type;
        return (
            <InterceptContext.Consumer>
                {(value) => {
                    const interceptor = {
                        ...value[handlerType],
                    };
                    interceptor.getEntry = this.props.getEntry;
                    return (
                        <InterceptContext.Provider
                            value={{
                                ...value,
                                [handlerType]: interceptor,
                            }}
                        >
                            {this.props.children}
                        </InterceptContext.Provider>
                    );
                }}
            </InterceptContext.Consumer>
        );
    }
}
