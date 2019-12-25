// @flow
import * as React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import InterceptContext from "./intercept-context.js";
import InterceptData from "./intercept-data.js";
import InterceptCache from "./intercept-cache.js";

import type {IRequestHandler} from "../util/types.js";

describe("InterceptData", () => {
    afterEach(() => {
        unmountAll();
        jest.resetAllMocks();
    });

    it.each([
        ["with only fulfillRequest method", {fulfillRequest: jest.fn()}],
        [
            "with only shouldRefreshCache method",
            {shouldRefreshCache: jest.fn()},
        ],
        [
            "with both fulfillRequest and shouldRefreshCache methods",
            {fulfillRequest: jest.fn(), shouldRefreshCache: jest.fn()},
        ],
    ])("should update context %s", (_, props) => {
        // Arrange
        const fakeHandler: IRequestHandler<string, string> = {
            fulfillRequest: () => Promise.resolve("data"),
            getKey: (o) => o,
            shouldRefreshCache: () => false,
            type: "MY_HANDLER",
        };
        props.handler = fakeHandler;
        const captureContextFn = jest.fn();

        // Act
        mount(
            <InterceptData {...props}>
                <InterceptContext.Consumer>
                    {captureContextFn}
                </InterceptContext.Consumer>
            </InterceptData>,
        );

        // Assert
        expect(captureContextFn).toHaveBeenCalledWith(
            expect.objectContaining({
                MY_HANDLER: {
                    fulfillRequest: props.fulfillRequest || null,
                    shouldRefreshCache: props.shouldRefreshCache || null,
                },
            }),
        );
    });

    it("should not change InterceptCache methods on existing interceptor", () => {
        // Arrange
        const fakeHandler: IRequestHandler<string, string> = {
            fulfillRequest: () => Promise.resolve("data"),
            getKey: (o) => o,
            shouldRefreshCache: () => false,
            type: "MY_HANDLER",
        };
        const fulfillRequestFn = jest.fn();
        const getEntryFn = jest.fn();
        const captureContextFn = jest.fn();

        // Act
        mount(
            <InterceptCache handler={fakeHandler} getEntry={getEntryFn}>
                <InterceptData
                    handler={fakeHandler}
                    fulfillRequest={fulfillRequestFn}
                >
                    <InterceptContext.Consumer>
                        {captureContextFn}
                    </InterceptContext.Consumer>
                </InterceptData>
            </InterceptCache>,
        );

        // Assert
        expect(captureContextFn).toHaveBeenCalledWith(
            expect.objectContaining({
                MY_HANDLER: {
                    fulfillRequest: fulfillRequestFn,
                    shouldRefreshCache: null,
                    getEntry: getEntryFn,
                },
            }),
        );
    });
});
