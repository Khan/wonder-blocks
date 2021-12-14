// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme"; // eslint-disable-line import/no-unassigned-import

import InterceptContext from "../intercept-context.js";
import InterceptData from "../intercept-data.js";
import InterceptCache from "../intercept-cache.js";

import type {IRequestHandler} from "../../util/types.js";

describe("InterceptData", () => {
    afterEach(() => {
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
            cache: null,
            hydrate: true,
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

    it("should override parent InterceptData", () => {
        // Arrange
        const fakeHandler: IRequestHandler<string, string> = {
            fulfillRequest: () => Promise.resolve("data"),
            getKey: (o) => o,
            shouldRefreshCache: () => false,
            type: "MY_HANDLER",
            cache: null,
            hydrate: true,
        };
        const fulfillRequest1Fn = jest.fn();
        const shouldRefreshCache1Fn = jest.fn();
        const fulfillRequest2Fn = jest.fn();
        const shouldRefreshCache2Fn = jest.fn();
        const captureContextFn = jest.fn();

        // Act
        mount(
            <InterceptData
                handler={fakeHandler}
                fulfillRequest={fulfillRequest1Fn}
                shouldRefreshCache={shouldRefreshCache1Fn}
            >
                <InterceptData
                    handler={fakeHandler}
                    fulfillRequest={fulfillRequest2Fn}
                    shouldRefreshCache={shouldRefreshCache2Fn}
                >
                    <InterceptContext.Consumer>
                        {captureContextFn}
                    </InterceptContext.Consumer>
                </InterceptData>
            </InterceptData>,
        );

        // Assert
        expect(captureContextFn).toHaveBeenCalledWith(
            expect.objectContaining({
                MY_HANDLER: {
                    fulfillRequest: fulfillRequest2Fn,
                    shouldRefreshCache: shouldRefreshCache2Fn,
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
            cache: null,
            hydrate: true,
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
