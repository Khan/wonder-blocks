// @flow
import * as React from "react";

import InternalData from "./internal-data.js";

import InterceptContext from "./intercept-context.js";

import type {
    Interceptor,
    Result,
    IRequestHandler,
    ValidData,
} from "../util/types.js";

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
export default class Data<TOptions, TData: ValidData> extends React.Component<
    Props<TOptions, TData>,
> {
    _getHandlerFromInterceptor(
        interceptor: ?Interceptor,
    ): IRequestHandler<TOptions, TData> {
        const {handler} = this.props;
        if (!interceptor) {
            return handler;
        }

        const {fulfillRequest} = interceptor;
        const fulfillRequestFn = fulfillRequest
            ? (options: TOptions): Promise<TData> => {
                  const interceptedResult = fulfillRequest(options);
                  return interceptedResult != null
                      ? interceptedResult
                      : handler.fulfillRequest(options);
              }
            : (options) => handler.fulfillRequest(options);

        return {
            fulfillRequest: fulfillRequestFn,
            getKey: (options) => handler.getKey(options),
            type: handler.type,
            hydrate: handler.hydrate,
        };
    }

    render(): React.Node {
        return (
            <InterceptContext.Consumer>
                {(value) => {
                    const handlerType = this.props.handler.type;
                    const interceptor = value[handlerType];
                    const handler =
                        this._getHandlerFromInterceptor(interceptor);

                    /**
                     * Need to share our types with InternalData so Flow
                     * doesn't need to infer them and find mismatches.
                     * However, just deriving a new component creates issues
                     * where InternalData starts rerendering too often.
                     * Couldn't track down why, so suppressing the error
                     * instead.
                     */
                    return (
                        <InternalData
                            // $FlowIgnore[incompatible-type-arg]
                            handler={handler}
                            options={this.props.options}
                        >
                            {(result) => this.props.children(result)}
                        </InternalData>
                    );
                }}
            </InterceptContext.Consumer>
        );
    }
}
