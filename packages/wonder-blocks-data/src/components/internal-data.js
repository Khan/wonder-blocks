// @flow
import * as React from "react";
import {Server} from "@khanacademy/wonder-blocks-core";

import {RequestFulfillment} from "../util/request-fulfillment.js";
import {TrackerContext} from "../util/request-tracking.js";
import {resultFromCacheEntry} from "../util/result-from-cache-entry.js";

import type {
    ValidData,
    CacheEntry,
    Result,
    IRequestHandler,
} from "../util/types.js";

type Props<TOptions, TData> = {|
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
    getEntry: (
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ) => ?$ReadOnly<CacheEntry<TData>>,
    children: (result: Result<TData>) => React.Node,
|};

type State<TData> = {|
    current: ?CacheEntry<TData>,
|};

/**
 * This component is responsible for actually handling the data request.
 * It is wrapped by Data in order to support intercepts and be exported for use.
 *
 * INTERNAL USE ONLY
 */
export default class InternalData<
    TOptions,
    TData: ValidData,
> extends React.Component<Props<TOptions, TData>, State<TData>> {
    _mounted: boolean;

    constructor(props: Props<TOptions, TData>) {
        super(props);

        this.state = this._buildStateAndfulfillNeeds(props);
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
            const newState = this._buildStateAndfulfillNeeds(nextProps);
            this.setState(newState);
        }

        return (
            this.state.current !== nextState.current ||
            this.state.current?.data !== nextState.current?.data ||
            this.state.current?.error !== nextState.current?.error
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

    _buildStateAndfulfillNeeds(
        propsAtFulfillment: $ReadOnly<Props<TOptions, TData>>,
    ): State<TData> {
        const {getEntry, handler, options} = propsAtFulfillment;
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
                            current: cacheEntry,
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
                            current: {
                                data: null,
                                error: typeof e === "string" ? e : e.message,
                            },
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
            current: cachedData,
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

    render(): React.Node {
        const result = resultFromCacheEntry(this.state.current);
        // We only track data requests when we are server-side and we don't
        // already have a result. The existence of a result is indicated by the
        // loading flag being false.
        if (result.status === "loading" && Server.isServerSide()) {
            return this._renderWithTrackingContext(result);
        }

        return this._renderContent(result);
    }
}
