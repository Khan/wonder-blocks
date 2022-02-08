// @flow
import * as React from "react";

import {Server} from "@khanacademy/wonder-blocks-core";
import {RequestFulfillment} from "../util/request-fulfillment.js";
import InterceptContext from "./intercept-context.js";
import {useServerEffect} from "../hooks/use-server-effect.js";
import {resultFromCacheEntry} from "../util/result-from-cache-entry.js";

import type {Result, ValidData} from "../util/types.js";

type Props<
    /**
     * The type of data resolved by the handler's fulfillRequest method.
     */
    TData: ValidData,
> = {|
    /**
     * A unique identifier for the request.
     *
     * This should not be shared by other uses of this component.
     */
    id: string,

    /**
     * This defines how the request is fulfilled.
     *
     * If this is changed without changing the ID, there are cases where the
     * old handler result may be given. This is not a supported mode of
     * operation.
     */
    handler: () => Promise<?TData>,

    /**
     * When true, the result will be hydrated when client-side. Otherwise,
     * the request will be fulfilled for us in SSR but will be ignored during
     * hydration. Only set this to false if you know some other mechanism
     * will be performing hydration (such as if requests are fulfilled by
     * Apollo Client but you consolidated all SSR requests using WB Data).
     *
     * Defaults to true.
     */
    hydrate?: boolean,

    /**
     * When true, the children will be rendered with the existing result
     * until the pending load is completed. Otherwise, the children will be
     * given a loading state until the request is fulfilled.
     *
     * Defaults to false.
     */
    showOldDataWhileLoading?: boolean,

    /**
     * When true, the handler will always be invoked after hydration.
     * This defaults to false.
     * NOTE: The request is invoked after hydration if the hydrated result
     * is an error.
     */
    alwaysRequestOnHydration?: boolean,

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
const Data = <TData: ValidData>({
    id,
    handler,
    children,
    hydrate,
    showOldDataWhileLoading,
    alwaysRequestOnHydration,
}: Props<TData>): React.Node => {
    // Lookup to see if there's an interceptor for the handler.
    // If we have one, we need to replace the handler with one that
    // uses the interceptor.
    const interceptorMap = React.useContext(InterceptContext);

    // If we have an interceptor, we need to replace the handler with one
    // that uses the interceptor. This helper function generates a new
    // handler.
    const maybeInterceptedHandler = React.useMemo(() => {
        const interceptor = interceptorMap[id];
        if (interceptor == null) {
            return handler;
        }
        return () => interceptor() ?? handler();
    }, [handler, interceptorMap, id]);

    const hydrateResult = useServerEffect(id, maybeInterceptedHandler, hydrate);
    const [currentResult, setResult] = React.useState(hydrateResult);

    // Here we make sure the request still occurs client-side as needed.
    // This is for legacy usage that expects this. Eventually we will want
    // to deprecate.
    React.useEffect(() => {
        // This is here until I can do a better documentation example for
        // the TrackData docs.
        // istanbul ignore next
        if (Server.isServerSide()) {
            return;
        }

        // We don't bother with this if we have hydration data and we're not
        // forcing a request on hydration.
        // We don't care if these things change after the first render,
        // so we don't want them in the inputs array.
        if (!alwaysRequestOnHydration && hydrateResult?.data != null) {
            return;
        }

        // If we're not hydrating a result and we're not going to render
        // with old data until we're loaded, we want to make sure we set our
        // result to null so that we're in the loading state.
        if (!showOldDataWhileLoading) {
            // Mark ourselves as loading.
            setResult(null);
        }

        // We aren't server-side, so let's make the request.
        let cancel = false;
        RequestFulfillment.Default.fulfill(id, {
            handler: maybeInterceptedHandler,
        })
            .then((result) => {
                if (cancel) {
                    return;
                }
                setResult(result);
                return;
            })
            .catch((e) => {
                if (cancel) {
                    return;
                }
                /**
                 * We should never get here as errors in fulfillment are part
                 * of the `then`, but if we do.
                 */
                // eslint-disable-next-line no-console
                console.error(
                    `Unexpected error occurred during data fulfillment: ${e}`,
                );
                setResult({
                    error: typeof e === "string" ? e : e.message,
                });
                return;
            });

        return () => {
            cancel = true;
        };
        // If the handler changes, we don't care. The ID is what indicates
        // the request that should be made and folks shouldn't be changing the
        // handler without changing the ID as well.
        // In addition, we don't want to include hydrateResult nor
        // alwaysRequestOnHydration as them changinng after the first pass
        // is irrelevant.
        // Finally, we don't want to include showOldDataWhileLoading as that
        // changing on its own is also not relevant. It only matters if the
        // request itself changes. All of which is to say that we only
        // run this effect for the ID changing.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return children(resultFromCacheEntry(currentResult));
};

export default Data;
