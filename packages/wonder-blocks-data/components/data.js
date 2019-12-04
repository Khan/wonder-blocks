// @flow
import * as React from "react";
import {Server} from "@khanacademy/wonder-blocks-core";

import {ResponseCache} from "../util/response-cache.js";
import {TrackerContext} from "../util/request-tracking.js";

import type {Result, IRequestHandler} from "../util/types.js";

type Props<TOptions, TData> = {|
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
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
         * We only want to update if our state changed, or we were given
         * a set of options or handkler that means a new cache key.
         */
        return (
            !this._propsMatch(nextProps) ||
            this.state.loading !== nextState.loading ||
            this.state.data !== nextState.data ||
            this.state.error !== nextState.error
        );
    }

    componentDidUpdate(prevProps: Props<TOptions, TData>) {
        /**
         * We only bother updating things if our props changed in a meaningful
         * manner.
         */
        if (!this._propsMatch(prevProps)) {
            const newState = this._buildStateAndfulfillNeeds();

            /**
             * It's ok to setState from componentDidUpdate as long as it is
             * guarded with a check to avoid infinite loops, which this is.
             */
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(newState);
        }
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

    _buildStateFromCache(): State<TData> {
        const {handler, options} = this.props;
        const cachedData = ResponseCache.Default.getEntry(handler, options);

        if (cachedData == null) {
            return {
                loading: true,
                data: null,
                error: null,
            };
        }

        if (cachedData.data != null) {
            return {
                loading: false,
                data: cachedData.data,
                error: null,
            };
        }

        // Must be an error.
        return {
            loading: false,
            data: null,
            error: cachedData.error,
        };
    }

    _buildStateAndfulfillNeeds(): State<TData> {
        const propsAtFulfillment = this.props;
        const {handler, options} = propsAtFulfillment;
        const {getEntry, cacheData, cacheError} = ResponseCache.Default;

        const cachedData = getEntry(handler, options);
        if (
            !Server.isServerSide() &&
            (cachedData == null ||
                handler.cacheHitBehavior(options) === "refresh")
        ) {
            /**
             * We're not on the server and the cache missed, or we're supposed
             * to refresh the cache.
             * Therefore, we need to request data.
             *
             * We have to do this here from the constructor so that this
             * data request is tracked when performing server-side rendering.
             */
            // eslint-disable-next-line promise/catch-or-return
            handler
                .fulfillRequest(options)
                .then((data) => cacheData(handler, options, data))
                .catch((error) => cacheError(handler, options, error))
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
                });
        }

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

    _renderContent(): React.Node {
        return this.props.children(this._resultFromState());
    }

    _renderWithTrackingContext(): React.Node {
        return (
            <TrackerContext.Consumer>
                {(track) => {
                    if (track != null) {
                        track(this.props.handler, this.props.options);
                    }
                    return this._renderContent();
                }}
            </TrackerContext.Consumer>
        );
    }

    render() {
        if (Server.isServerSide()) {
            return this._renderWithTrackingContext();
        }

        return this._renderContent();
    }
}
