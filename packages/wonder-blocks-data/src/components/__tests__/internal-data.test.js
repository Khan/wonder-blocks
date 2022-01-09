/* eslint-disable max-lines */
// @flow
import * as React from "react";
import {render} from "@testing-library/react";

import * as UseDataInternal from "../../hooks/use-data-internal.js";
import InternalData from "../internal-data.js";

import type {IRequestHandler, Result} from "../../util/types.js";

jest.mock("../../hooks/use-data-internal.js");

describe("InternalData", () => {
    it("should invoke useDataInternal hook", () => {
        // Arrange
        const fakeHandler: IRequestHandler<string, string> = {
            fulfillRequest: jest.fn(),
            getKey: jest.fn(),
            type: "MY_HANDLER",
            hydrate: true,
        };
        const useDataInternalSpy = jest.spyOn(
            UseDataInternal,
            "useDataInternal",
        );

        // Act
        render(
            <InternalData handler={fakeHandler} options="OPTIONS">
                {() => null}
            </InternalData>,
        );

        // Assert
        expect(useDataInternalSpy).toHaveBeenCalledWith(fakeHandler, "OPTIONS");
    });

    it("should render children with value from useDataInternal", () => {
        // Arrange
        const fakeHandler: IRequestHandler<string, string> = {
            fulfillRequest: jest.fn(),
            getKey: jest.fn(),
            type: "MY_HANDLER",
            hydrate: true,
        };
        const result: Result<string> = {
            status: "success",
            data: "DATA",
        };
        jest.spyOn(UseDataInternal, "useDataInternal").mockReturnValue(result);
        const childrenStub = jest.fn().mockReturnValue(null);

        // Act
        render(
            <InternalData handler={fakeHandler} options="OPTIONS">
                {childrenStub}
            </InternalData>,
        );

        // Assert
        expect(childrenStub).toHaveBeenCalledWith(result);
    });
});
