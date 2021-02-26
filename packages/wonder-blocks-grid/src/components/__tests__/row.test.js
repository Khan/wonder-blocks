// @flow

import * as React from "react";

import {
    MEDIA_DEFAULT_SPEC,
    MediaLayoutContext,
} from "@khanacademy/wonder-blocks-layout";
import Row from "../row.js";
import Cell from "../cell.js";
import {mount, unmountAll} from "../../../../../utils/testing/mount.js";

describe("Row", () => {
    beforeEach(() => {
        unmountAll();
    });

    describe("large", () => {
        it("should render Cells with largeCols and cols", () => {
            // Arrange

            // Act
            const wrapper = mount(
                <div>
                    <MediaLayoutContext.Provider
                        value={{
                            overrideSize: undefined,
                            ssrSize: "large",
                            mediaSpec: MEDIA_DEFAULT_SPEC,
                        }}
                    >
                        <Row>
                            <Cell cols={1}>cols</Cell>
                            <Cell largeCols={1}>largeCols</Cell>
                            <Cell mediumCols={1}>mediumCols</Cell>
                            <Cell smallCols={1}>smallCols</Cell>
                        </Row>
                    </MediaLayoutContext.Provider>
                </div>,
            );
            const text = wrapper.text();

            // Assert
            expect(text).toEqual("colslargeCols");
        });

        it("should throw if there are too many columns", async () => {
            // Arrange
            const render = () => {
                mount(
                    <div>
                        <MediaLayoutContext.Provider
                            value={{
                                overrideSize: undefined,
                                ssrSize: "large",
                                mediaSpec: MEDIA_DEFAULT_SPEC,
                            }}
                        >
                            <Row>
                                <Cell cols={13}>cols</Cell>
                            </Row>
                        </MediaLayoutContext.Provider>
                    </div>,
                );
            };

            // Act, Assert
            expect(render).toThrow();
        });
    });

    describe("medium", () => {
        it("should render Cells with largeCols and cols", async () => {
            // Arrange

            // Act
            const wrapper = mount(
                <div>
                    <MediaLayoutContext.Provider
                        value={{
                            overrideSize: undefined,
                            ssrSize: "medium",
                            mediaSpec: MEDIA_DEFAULT_SPEC,
                        }}
                    >
                        <Row>
                            <Cell cols={1}>cols</Cell>
                            <Cell largeCols={1}>largeCols</Cell>
                            <Cell mediumCols={1}>mediumCols</Cell>
                            <Cell smallCols={1}>smallCols</Cell>
                        </Row>
                    </MediaLayoutContext.Provider>
                </div>,
            );
            const text = wrapper.text();

            // Assert
            expect(text).toEqual("colsmediumCols");
        });

        it("should throw if there are too many columns", () => {
            // Arrange
            const render = () => {
                mount(
                    <div>
                        <MediaLayoutContext.Provider
                            value={{
                                overrideSize: undefined,
                                ssrSize: "medium",
                                mediaSpec: MEDIA_DEFAULT_SPEC,
                            }}
                        >
                            <Row>
                                <Cell cols={9}>cols</Cell>
                            </Row>
                        </MediaLayoutContext.Provider>
                    </div>,
                );
            };

            // Act, Assert
            expect(render).toThrow();
        });
    });

    describe("small", () => {
        it("should render Cells with largeCols and cols", () => {
            // Arrange

            // Act
            const wrapper = mount(
                <div>
                    <MediaLayoutContext.Provider
                        value={{
                            overrideSize: undefined,
                            ssrSize: "small",
                            mediaSpec: MEDIA_DEFAULT_SPEC,
                        }}
                    >
                        <Row>
                            <Cell cols={1}>cols</Cell>
                            <Cell largeCols={1}>largeCols</Cell>
                            <Cell mediumCols={1}>mediumCols</Cell>
                            <Cell smallCols={1}>smallCols</Cell>
                        </Row>
                    </MediaLayoutContext.Provider>
                </div>,
            );
            const text = wrapper.text();

            // Assert
            expect(text).toEqual("colssmallCols");
        });

        it("should throw if there are too many columns", () => {
            // Arrange
            const render = () => {
                mount(
                    <div>
                        <MediaLayoutContext.Provider
                            value={{
                                overrideSize: undefined,
                                ssrSize: "small",
                                mediaSpec: MEDIA_DEFAULT_SPEC,
                            }}
                        >
                            <Row>
                                <Cell cols={5}>cols</Cell>
                            </Row>
                        </MediaLayoutContext.Provider>
                    </div>,
                );
            };

            // Act, Assert
            expect(render).toThrow();
        });
    });
});
