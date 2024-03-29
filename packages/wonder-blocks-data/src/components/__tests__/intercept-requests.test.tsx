import * as React from "react";
import {render} from "@testing-library/react";

import InterceptContext from "../intercept-context";
import InterceptRequests from "../intercept-requests";

describe("InterceptRequests", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should update context with fulfillRequest method", () => {
        // Arrange
        const fakeHandler = (requestId: any): Promise<string> =>
            Promise.resolve("data");
        const props = {
            interceptor: fakeHandler,
        } as const;
        const captureContextFn = jest.fn();

        // Act
        render(
            <InterceptRequests {...props}>
                <InterceptContext.Consumer>
                    {captureContextFn}
                </InterceptContext.Consumer>
            </InterceptRequests>,
        );

        // Assert
        expect(captureContextFn).toHaveBeenCalledWith([fakeHandler]);
    });

    it("should override parent InterceptRequests", () => {
        // Arrange
        const fakeHandler1 = jest.fn();
        const fakeHandler2 = jest.fn();
        const captureContextFn = jest.fn();

        // Act
        render(
            <InterceptRequests interceptor={fakeHandler1}>
                <InterceptRequests interceptor={fakeHandler2}>
                    <InterceptContext.Consumer>
                        {captureContextFn}
                    </InterceptContext.Consumer>
                </InterceptRequests>
            </InterceptRequests>,
        );

        // Assert
        expect(captureContextFn).toHaveBeenCalledWith([
            fakeHandler1,
            fakeHandler2,
        ]);
    });
});
