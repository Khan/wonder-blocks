// @flow
import * as React from "react";

import {Server} from "@khanacademy/wonder-blocks-core";
import {RequestFulfillment} from "../util/request-fulfillment.js";
import {useServerEffect} from "../hooks/use-server-effect.js";
import {useRequestInterception} from "../hooks/use-request-interception.js";
import {resultFromCachedResponse} from "../util/result-from-cache-response.js";

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
const Data = <TData: ValidCacheData>({
    requestId,
    handler,
    children,
    hydrate,
    showOldDataWhileLoading,
    alwaysRequestOnHydration,
}: Props<TData>): React.Node => {
    const interceptedHandler = useRequestInterception(requestId, handler);

    const hydrateResult = useServerEffect(
        requestId,
        interceptedHandler,
        hydrate,
    );
    const [currentResult, setResult] = React.useState<Result<TData>>(() =>
        resultFromCachedResponse(hydrateResult),
    );

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
        if (!showOldDataWhileLoading && currentResult.status !== "loading") {
            // Mark ourselves as loading.
            setResult({status: "loading"});
        }

        // We aren't server-side, so let's make the request.
        // We don't need to use our built-in request fulfillment here if we
        // don't want, but it does mean we'll share inflight requests for the
        // same ID and the result will be in the same format as the
        // hydrated value.
        let cancel = false;
        RequestFulfillment.Default.fulfill<TData>(requestId, {
            handler: interceptedHandler,
        })
            .then((data) => {
                if (cancel) {
                    return;
                }
                if (data == null) {
                    setResult({status: "aborted"});
                    return;
                }
                setResult({
                    status: "success",
                    data,
                });
                return;
            })
            .catch((e) => {
                if (cancel) {
                    return;
                }
                setResult({
                    status: "error",
                    error: e,
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
    }, [requestId]);

    return children(currentResult);
};

export default Data;
