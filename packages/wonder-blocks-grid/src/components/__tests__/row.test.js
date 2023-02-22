// @flow

import * as React from "react";
import {render} from "@testing-library/react";

import {
    MEDIA_DEFAULT_SPEC,
    MediaLayoutContext,
} from "@khanacademy/wonder-blocks-layout";
import Row from "../row";
import Cell from "../cell";

describe("Row", () => {
    describe("large", () => {
        it("should render Cells with largeCols and cols", () => {
            // Arrange

            // Act
            const {container} = render(
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

            // Assert
            expect(container).toHaveTextContent("colslargeCols");
        });

        it("should throw if there are too many columns", async () => {
            // Arrange
            const underTest = () => {
                render(
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
            expect(underTest).toThrow();
        });
    });

    describe("medium", () => {
        it("should render Cells with largeCols and cols", async () => {
            // Arrange

            // Act
            const {container} = render(
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

            // Assert
            expect(container).toHaveTextContent("colsmediumCols");
        });

        it("should throw if there are too many columns", () => {
            // Arrange
            const underTest = () => {
                render(
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
            expect(underTest).toThrow();
        });
    });

    describe("small", () => {
        it("should render Cells with largeCols and cols", () => {
            // Arrange

            // Act
            const {container} = render(
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

            // Assert
            expect(container).toHaveTextContent("colssmallCols");
        });

        it("should throw if there are too many columns", () => {
            // Arrange
            const underTest = () => {
                render(
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
            expect(underTest).toThrow();
        });
    });
});
