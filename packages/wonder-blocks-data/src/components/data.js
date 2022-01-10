// @flow
import * as React from "react";

import {useData} from "../hooks/use-data.js";

import type {Result, IRequestHandler, ValidData} from "../util/types.js";

type Props<
    /**
     * The type of options that the handler requires to define a request.
     */
    TOptions,
    /**
     * The type of data resolved by the handler's fulfillRequest method.
     */
    TData,
> = {|
    /**
     * An `IRequestHandler` instance of the type this component will use to
     * resolve its requests.
     *
     * The framework deduplicates handlers based on their `type` property.
     * Handlers with the same `type` property are assumed to be the same.
     */
    handler: IRequestHandler<TOptions, TData>,

    /**
     * The handler-specific options that define what requestt is to be made.
     *
     * Changing these options will only cause the data to update if the key
     * from `handler.getKey(options)` changes.
     */
    options: TOptions,

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
const Data = <TOptions, TData: ValidData>(
    props: Props<TOptions, TData>,
): React.Node => {
    const data = useData(props.handler, props.options);
    return props.children(data);
};
export default Data;
