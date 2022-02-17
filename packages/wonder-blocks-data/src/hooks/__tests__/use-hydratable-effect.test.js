// @flow
import {renderHook as clientRenderHook} from "@testing-library/react-hooks";
import {renderHook as serverRenderHook} from "@testing-library/react-hooks/server";

import {Server} from "@khanacademy/wonder-blocks-core";

import {clearSharedCache} from "../use-shared-cache.js";
import TrackData from "../../components/track-data.js";
import {RequestFulfillment} from "../../util/request-fulfillment.js";
import {SsrCache} from "../../util/ssr-cache.js";
import {RequestTracker} from "../../util/request-tracking.js";
import InterceptRequests from "../../components/intercept-requests.js";

import {useHydratableEffect} from "../use-hydratable-effect.js";

describe("#useHydratableEffect", () => {
    beforeEach(() => {
        clearSharedCache();

        const responseCache = new SsrCache();
        jest.spyOn(SsrCache, "Default", "get").mockReturnValue(responseCache);
        jest.spyOn(RequestFulfillment, "Default", "get").mockReturnValue(
            new RequestFulfillment(),
        );
        jest.spyOn(RequestTracker, "Default", "get").mockReturnValue(
            new RequestTracker(responseCache),
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("when server-side", () => {});

    describe("when client-side", () => {});
});
