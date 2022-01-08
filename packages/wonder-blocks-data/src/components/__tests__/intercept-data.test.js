// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";

import InterceptContext from "../intercept-context.js";
import InterceptData from "../intercept-data.js";

import type {IRequestHandler} from "../../util/types.js";

describe("InterceptData", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should update context with fulfillRequest method", () => {
        // Arrange
        const fakeHandler: IRequestHandler<string, string> = {
            fulfillRequest: () => Promise.resolve("data"),
            getKey: (o) => o,
            type: "MY_HANDLER",
            hydrate: true,
        };
        const props = {
            handler: fakeHandler,
            fulfillRequest: jest.fn(),
        };
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
                    fulfillRequest: props.fulfillRequest,
                },
            }),
        );
    });

    it("should override parent InterceptData", () => {
        // Arrange
        const fakeHandler: IRequestHandler<string, string> = {
            fulfillRequest: () => Promise.resolve("data"),
            getKey: (o) => o,
            type: "MY_HANDLER",
            cache: null,
            hydrate: true,
        };
        const fulfillRequest1Fn = jest.fn();
        const fulfillRequest2Fn = jest.fn();
        const captureContextFn = jest.fn();

        // Act
        mount(
            <InterceptData
                handler={fakeHandler}
                fulfillRequest={fulfillRequest1Fn}
            >
                <InterceptData
                    handler={fakeHandler}
                    fulfillRequest={fulfillRequest2Fn}
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
                },
            }),
        );
    });
});
