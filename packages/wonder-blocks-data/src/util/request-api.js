// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {RequestTracker} from "./request-tracking.js";
import {DataError, DataErrors} from "./data-error.js";

import type {ResponseCache} from "./types.js";

const SSRCheck = () => {
    if (Server.isServerSide()) {
        return null;
    }

    if (process.env.NODE_ENV === "production") {
        return new DataError("No CSR tracking", DataErrors.NotAllowed);
    } else {
        return new DataError(
            "Data requests are not tracked for fulfillment when when client-side",
            DataErrors.NotAllowed,
        );
    }
};

/**
 * Fetches all tracked data requests.
 *
 * This is for use with the `TrackData` component during server-side rendering.
 *
 * @throws {Error} If executed outside of server-side rendering.
 * @returns {Promise<void>} A promise that resolves when all tracked requests
 * have been fetched.
 */
export const fetchTrackedRequests = (): Promise<ResponseCache> => {
    const ssrCheck = SSRCheck();
    if (ssrCheck != null) {
        return Promise.reject(ssrCheck);
    }
    return RequestTracker.Default.fulfillTrackedRequests();
};

/**
 * Indicate if there are tracked requests waiting to be fetched.
 *
 * This is used in conjunction with `TrackData`.
 *
 * @throws {Error} If executed outside of server-side rendering.
 * @returns {boolean} `true` if there are unfetched tracked requests;
 * otherwise, `false`.
 */
export const hasTrackedRequestsToBeFetched = (): boolean => {
    const ssrCheck = SSRCheck();
    if (ssrCheck != null) {
        throw ssrCheck;
    }
    return RequestTracker.Default.hasUnfulfilledRequests;
};
