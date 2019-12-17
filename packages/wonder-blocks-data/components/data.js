// @flow
import * as React from "react";
import {Server} from "@khanacademy/wonder-blocks-core";

import {RequestFulfillment} from "../util/request-fulfillment.js";
import {ResponseCache} from "../util/response-cache.js";
import {TrackerContext} from "../util/request-tracking.js";

import type {Result, IRequestHandler} from "../util/types.js";

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

type State<TData> = {|
    loading: boolean,
    data: ?TData,
    error: ?string,
|};

export default class Data<TOptions, TData> extends React.Component<
    Props<TOptions, TData>,
    State<TData>,
> {
    _mounted: boolean;

    constructor(props: Props<TOptions, TData>) {
        super(props);

        this.state = this._buildStateAndfulfillNeeds();
    }

    componentDidMount() {
        this._mounted = true;
    }

    shouldComponentUpdate(
        nextProps: $ReadOnly<Props<TOptions, TData>>,
        nextState: $ReadOnly<State<TData>>,
    ): boolean {
        /**
         * We only bother updating if our state changed.
         *
         * And we only update the state if props changed
         * or we got new data/error.
         */
        if (!this._propsMatch(nextProps)) {
            const newState = this._buildStateAndfulfillNeeds();
            this.setState(newState);
        }

        return (
            this.state.loading !== nextState.loading ||
            this.state.data !== nextState.data ||
            this.state.error !== nextState.error
        );
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    _propsMatch(otherProps: $Shape<Props<TOptions, TData>>): boolean {
        const {handler, options} = this.props;
        const {handler: prevHandler, options: prevOptions} = otherProps;
        return (
            handler === prevHandler &&
            handler.getKey(options) === prevHandler.getKey(prevOptions)
        );
    }

    _buildStateAndfulfillNeeds(): State<TData> {
        const propsAtFulfillment = this.props;
        const {handler, options} = propsAtFulfillment;
        const {getEntry} = ResponseCache.Default;

        const cachedData = getEntry(handler, options);
        if (
            !Server.isServerSide() &&
            (cachedData == null ||
                handler.shouldRefreshCache(options, cachedData))
        ) {
            /**
             * We're not on the server, the cache missed, or our handler says
             * we should refresh the cache.
             *
             * Therefore, we need to request data.
             *
             * We have to do this here from the constructor so that this
             * data request is tracked when performing server-side rendering.
             */
            RequestFulfillment.Default.fulfill(handler, options)
                .then((cacheEntry) => {
                    /**
                     * We get here, we should have updated the cache.
                     * However, we need to update the component, but we
                     * should only do that if the props are the same as they
                     * were when this was called.
                     */
                    if (this._mounted && this._propsMatch(propsAtFulfillment)) {
                        this.setState({
                            loading: false,
                            data: cacheEntry.data,
                            error: cacheEntry.error,
                        });
                    }
                    return null;
                })
                .catch((e) => {
                    /**
                     * We should never get here, but if we do.
                     */
                    // eslint-disable-next-line no-console
                    console.error(
                        `Unexpected error occurred during data fulfillment: ${e}`,
                    );
                    if (this._mounted && this._propsMatch(propsAtFulfillment)) {
                        this.setState({
                            loading: false,
                            data: null,
                            error: typeof e === "string" ? e : e.message,
                        });
                    }
                    return null;
                });
        }

        /**
         * This is the default response for the server and for the initial
         * client-side render if we have cachedData.
         *
         * This ensures we don't make promises we don't want when doing
         * server-side rendering. Instead, we either have data from the cache
         * or we don't.
         */
        return {
            loading: cachedData == null,
            data: cachedData && cachedData.data,
            error: cachedData && cachedData.error,
        };
    }

    _resultFromState(): Result<TData> {
        const {loading, data, error} = this.state;

        if (!loading) {
            if (data != null) {
                return {
                    loading: false,
                    data,
                };
            } else if (error != null) {
                return {
                    loading: false,
                    error,
                };
            }
        }

        return {
            loading: true,
        };
    }

    _renderContent(result: Result<TData>): React.Node {
        const {children} = this.props;
        return children(result);
    }

    _renderWithTrackingContext(result: Result<TData>): React.Node {
        return (
            <TrackerContext.Consumer>
                {(track) => {
                    /**
                     * If data tracking wasn't enabled, don't do it.
                     */
                    if (track != null) {
                        track(this.props.handler, this.props.options);
                    }
                    return this._renderContent(result);
                }}
            </TrackerContext.Consumer>
        );
    }

    render() {
        const result = this._resultFromState();
        if (result.loading && Server.isServerSide()) {
            return this._renderWithTrackingContext(result);
        }

        return this._renderContent(result);
    }
}
