// @flow
import * as React from "react";

import {
    useHydratableEffect,
    // TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
    // have fixed:
    // https://github.com/import-js/eslint-plugin-import/issues/2073
    // eslint-disable-next-line import/named
    WhenClientSide,
} from "../hooks/use-hydratable-effect.js";

import type {Result, ValidCacheData} from "../util/types.js";

type Props<
    /**
     * The type of data resolved by the handler's fulfillRequest method.
     */
    TData: ValidCacheData,
> = {|
    /**
     * A unique identifier for the request.
     *
     * This should not be shared by other uses of this component.
     */
    requestId: string,

    /**
     * This defines how the request is fulfilled.
     *
     * If this is changed without changing the ID, there are cases where the
     * old handler result may be given. This is not a supported mode of
     * operation.
     */
    handler: () => Promise<TData>,

    /**
     * How the hook should behave when rendering client-side for the first time.
     *
     * This controls how the hook hydrates and executes when client-side.
     *
     * Default is `OnClientRender.ExecuteWhenNoSuccessResult`.
     */
    clientBehavior?: WhenClientSide,

    /**
     * When true, the children will be rendered with the existing result
     * until the pending load is completed. Otherwise, the children will be
     * given a loading state until the request is fulfilled.
     *
     * Defaults to false.
     */
    retainResultOnChange?: boolean,

    /**
     * A function that will render the content of this component using the
     * loading state and data or error that gets retrieved from cache or loaded
     * via the request if no cached value is available.
     */
    children: (result: Result<TData>) => React.Node,
|};

/**
 * This component is the main component of Wonder Blocks Data. With this, data
 * requirements can be placed in a React application in a manner that will
 * support server-side rendering and efficient caching.
 */
const Data = <TData: ValidCacheData>({
    requestId,
    handler,
    children,
    retainResultOnChange = false,
    clientBehavior = WhenClientSide.ExecuteWhenNoSuccessResult,
}: Props<TData>): React.Node => {
    const result = useHydratableEffect(requestId, handler, {
        retainResultOnChange,
        clientBehavior,
    });
    return children(result);
};

export default Data;
