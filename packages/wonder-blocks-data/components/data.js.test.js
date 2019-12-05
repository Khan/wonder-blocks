// @flow
import * as React from "react";
import {Server, View} from "@khanacademy/wonder-blocks-core";
import {shallow} from "enzyme";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import {ResponseCache} from "../util/response-cache.js";
import Data from "./data.js";

import type {IRequestHandler} from "../util/types.js";

describe("./data.js", () => {
    afterEach(() => {
        unmountAll();
        jest.resetAllMocks();
    });

    describe("CSR: isServerSide false", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        describe("without cache", () => {
            it("should initialize state as loading", () => {
                // Arrange
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue(
                    null,
                );
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    invalidateCache: () => false,
                    type: "STATIC",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                const wrapper = shallow(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(wrapper).toHaveState("loading", true);
                expect(wrapper).toHaveState("data", null);
                expect(wrapper).toHaveState("error", null);
            });

            it("should make request for data on construction", () => {
                // Arrange
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue(
                    null,
                );
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: jest.fn(() => Promise.resolve("data")),
                    getKey: (o) => o,
                    invalidateCache: () => false,
                    type: "STATIC",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                shallow(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledWith(
                    "options",
                );
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledTimes(1);
            });

            it("should initially render children with loading", () => {
                // Arrange
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue(
                    null,
                );
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    invalidateCache: () => false,
                    type: "STATIC",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                shallow(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith(
                    expect.objectContaining({
                        loading: true,
                    }),
                );
            });

            it("should share single request across all uses", () => {
                // Arrange
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue(
                    null,
                );
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: jest.fn(
                        () => new Promise((resolve, reject) => {}),
                    ),
                    getKey: (o) => o,
                    invalidateCache: () => false,
                    type: "STATIC",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                mount(
                    <View>
                        <Data handler={fakeHandler} options={"options"}>
                            {fakeChildrenFn}
                        </Data>
                        <Data handler={fakeHandler} options={"options"}>
                            {fakeChildrenFn}
                        </Data>
                    </View>,
                );

                // Assert
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledWith(
                    "options",
                );
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledTimes(1);
            });
        });

        describe("with cache", () => {
            it.todo("TODO");
        });
    });

    describe("SSR: isServerSide true", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        describe("with cache", () => {
            it.todo("TODO");
        });

        describe("without cache", () => {
            it.todo("TODO");
        });
    });
});
