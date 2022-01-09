// @flow
import * as React from "react";
import {render} from "@testing-library/react";
import {renderHook as clientRenderHook} from "@testing-library/react-hooks";
import {renderHook as serverRenderHook} from "@testing-library/react-hooks/server";

import {Server} from "@khanacademy/wonder-blocks-core";

import TrackData from "../../components/track-data.js";
import {RequestFulfillment} from "../../util/request-fulfillment.js";
import {ResponseCache} from "../../util/response-cache.js";
import {RequestTracker} from "../../util/request-tracking.js";
import {resultFromCacheEntry} from "../../util/result-from-cache-entry.js";

import {useDataInternal} from "../use-data-internal.js";

describe("#useDataInternal", () => {
    beforeEach(() => {
        const responseCache = new ResponseCache();
        jest.spyOn(ResponseCache, "Default", "get").mockReturnValue(
            responseCache,
        );
        jest.spyOn(RequestFulfillment, "Default", "get").mockReturnValue(
            new RequestFulfillment(responseCache),
        );
        jest.spyOn(RequestTracker, "Default", "get").mockReturnValue(
            new RequestTracker(responseCache),
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should retrieve the cached entry", () => {});

    it("should initialize useState with cached entry", () => {});

    it("should get the TrackerContext", () => {});

    it("should track request when server-side and there is no result", () => {});

    it("should call useRef twice", () => {});

    it("should call useEffect", () => {});

    describe("useEffect when client-side", () => {
        describe("when handlerRef and keyRef match current handler and options", () => {
            it("should not update handlerRef", () => {});

            it("should not update keyRef", () => {});

            it("should not call setResult", () => {});

            it("should not fulfill the request", () => {});
        });

        describe("when handler or options change", () => {
            it("should set result to null if not rehydrating cachedData", () => {});

            it("should not set result to null when rehydrating cachedData", () => {});

            it("should fulfill the request", () => {});

            it("should set result to the resolved request value", () => {});

            it("should set result to the error if fulfillment rejects", () => {});

            it("should return a function", () => {});

            it("should not set the result if cancel function called and fulfillment resolves", () => {});

            it("should not set the result if cancel function called and fulfillment rejects", () => {});
        });
    });

    describe("useEffect when server-side", () => {
        it("should not update handlerRef", () => {});

        it("should not update keyRef", () => {});

        it("should not call setResult", () => {});

        it("should not fulfill the request", () => {});
    });

    it("should call resultFromCacheEntry with result state", () => {});

    it("should return the result of resultFromCacheEntry", () => {});
});
