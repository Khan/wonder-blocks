// @flow
import * as React from "react";
import {render} from "@testing-library/react";

import InterceptContext from "../intercept-context.js";
import InterceptData from "../intercept-data.js";

describe("InterceptData", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should update context with fulfillRequest method", () => {
        // Arrange
        const fakeHandler = () => Promise.resolve("data");
        const props = {
            handler: fakeHandler,
            id: "ID",
        };
        const captureContextFn = jest.fn();

        // Act
        render(
            <InterceptData {...props}>
                <InterceptContext.Consumer>
                    {captureContextFn}
                </InterceptContext.Consumer>
            </InterceptData>,
        );

        // Assert
        expect(captureContextFn).toHaveBeenCalledWith(
            expect.objectContaining({
                ID: props.handler,
            }),
        );
    });

    it("should override parent InterceptData", () => {
        // Arrange
        const fulfillRequest1Fn = jest.fn();
        const fulfillRequest2Fn = jest.fn();
        const captureContextFn = jest.fn();

        // Act
        render(
            <InterceptData handler={fulfillRequest1Fn} id="ID">
                <InterceptData handler={fulfillRequest2Fn} id="ID">
                    <InterceptContext.Consumer>
                        {captureContextFn}
                    </InterceptContext.Consumer>
                </InterceptData>
            </InterceptData>,
        );

        // Assert
        expect(captureContextFn).toHaveBeenCalledWith(
            expect.objectContaining({
                ID: fulfillRequest2Fn,
            }),
        );
    });
});
