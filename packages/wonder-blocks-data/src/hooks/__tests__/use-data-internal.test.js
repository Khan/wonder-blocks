// @flow
import * as React from "react";
import {render} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks/server";

// eslint-disable-next-line import/extensions
import * as ReactDOMServer from "react-dom/server";
import {Server, View} from "@khanacademy/wonder-blocks-core";

import TrackData from "../../components/track-data.js";
import {RequestFulfillment} from "../../util/request-fulfillment.js";
import {ResponseCache} from "../../util/response-cache.js";
import {RequestTracker} from "../../util/request-tracking.js";

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

    describe("when server-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        it.todo("ALL THESE TESTS");
    });

    describe("when client-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        it.todo("ALL THESE TESTS");
    });
});
