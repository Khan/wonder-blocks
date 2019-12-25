// @flow
import * as React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import InterceptContext from "./intercept-context.js";
import InterceptData from "./intercept-data.js";
import InterceptCache from "./intercept-cache.js";

import type {IRequestHandler} from "../util/types.js";

describe("InterceptCache", () => {
    afterEach(() => {
        unmountAll();
        jest.resetAllMocks();
    });

    it("should update context with getEntry", () => {
        // Arrange
        const fakeHandler: IRequestHandler<string, string> = {
            fulfillRequest: () => Promise.resolve("data"),
            getKey: (o) => o,
            shouldRefreshCache: () => false,
            type: "MY_HANDLER",
        };
        const getEntryFn = jest.fn();
        const captureContextFn = jest.fn();

        // Act
        mount(
            <InterceptCache handler={fakeHandler} getEntry={getEntryFn}>
                <InterceptContext.Consumer>
                    {captureContextFn}
                </InterceptContext.Consumer>
            </InterceptCache>,
        );

        // Assert
        expect(captureContextFn).toHaveBeenCalledWith(
            expect.objectContaining({
                MY_HANDLER: {
                    getEntry: getEntryFn,
                },
            }),
        );
    });

    it("should not change InterceptData methods on existing interceptor", () => {
        // Arrange
        const fakeHandler: IRequestHandler<string, string> = {
            fulfillRequest: () => Promise.resolve("data"),
            getKey: (o) => o,
            shouldRefreshCache: () => false,
            type: "MY_HANDLER",
        };
        const fulfillRequestFn = jest.fn();
        const shouldRefreshCacheFn = jest.fn();
        const getEntryFn = jest.fn();
        const captureContextFn = jest.fn();

        // Act
        mount(
            <InterceptData
                handler={fakeHandler}
                fulfillRequest={fulfillRequestFn}
                shouldRefreshCache={shouldRefreshCacheFn}
            >
                <InterceptCache handler={fakeHandler} getEntry={getEntryFn}>
                    <InterceptContext.Consumer>
                        {captureContextFn}
                    </InterceptContext.Consumer>
                </InterceptCache>
            </InterceptData>,
        );

        // Assert
        expect(captureContextFn).toHaveBeenCalledWith(
            expect.objectContaining({
                MY_HANDLER: {
                    fulfillRequest: fulfillRequestFn,
                    shouldRefreshCache: shouldRefreshCacheFn,
                    getEntry: getEntryFn,
                },
            }),
        );
    });
});
