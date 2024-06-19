import * as React from "react";
import {View, Server} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";

import MediaLayout from "../media-layout";
import MediaLayoutContext from "../media-layout-context";
import {resizeWindow, matchMedia} from "../../util/test-util";

import {
    MEDIA_DEFAULT_SPEC,
    MEDIA_INTERNAL_SPEC,
    MEDIA_MODAL_SPEC,
} from "../../util/specs";

describe("MediaLayoutContext", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        window.matchMedia = matchMedia as any;
    });

    describe("overrideSize", () => {
        it("should override the currentSize", () => {
            // Arrange
            resizeWindow("large");
            const capturePropsFn = jest.fn();

            // Act
            render(
                <MediaLayoutContext.Provider
                    value={{
                        overrideSize: "small",
                        ssrSize: "large",
                        mediaSpec: MEDIA_DEFAULT_SPEC,
                    }}
                >
                    <MediaLayout styleSheets={{}}>
                        {({mediaSize, mediaSpec, styles}: any) => {
                            capturePropsFn({mediaSize, mediaSpec, styles});
                            return <View>Hello, world!</View>;
                        }}
                    </MediaLayout>
                </MediaLayoutContext.Provider>,
            );

            // Assert
            expect(capturePropsFn).toHaveBeenCalledWith(
                expect.objectContaining({mediaSize: "small"}),
            );
        });
    });

    describe("ssrSize", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should use the default ssrSize on initial render", () => {
            // Arrange
            const capturePropsFn = jest.fn();

            // Act
            render(
                <MediaLayout styleSheets={{}}>
                    {({mediaSize, mediaSpec, styles}: any) => {
                        capturePropsFn({mediaSize, mediaSpec, styles});
                        return <View>Hello, world!</View>;
                    }}
                </MediaLayout>,
            );

            // Assert
            expect(capturePropsFn).toHaveBeenNthCalledWith(
                1,
                expect.objectContaining({mediaSize: "large"}),
            );
        });

        it("should use the provided ssrSize on initial render", () => {
            // Arrange
            const capturePropsFn = jest.fn();

            // Act
            render(
                <MediaLayoutContext.Provider
                    value={{
                        overrideSize: undefined,
                        ssrSize: "small",
                        mediaSpec: MEDIA_DEFAULT_SPEC,
                    }}
                >
                    <MediaLayout styleSheets={{}}>
                        {({mediaSize, mediaSpec, styles}: any) => {
                            capturePropsFn({mediaSize, mediaSpec, styles});
                            return <View>Hello, world!</View>;
                        }}
                    </MediaLayout>
                </MediaLayoutContext.Provider>,
            );

            // Assert
            expect(capturePropsFn).toHaveBeenNthCalledWith(
                1,
                expect.objectContaining({mediaSize: "small"}),
            );
        });
    });

    describe("mediaSpec", () => {
        it("MEDIA_INTERNAL_SPEC is always large", async () => {
            // Arrange
            resizeWindow("small");
            const capturePropsFn = jest.fn();

            // Act
            render(
                <MediaLayoutContext.Provider
                    value={{
                        overrideSize: undefined,
                        ssrSize: "small",
                        mediaSpec: MEDIA_INTERNAL_SPEC,
                    }}
                >
                    <MediaLayout styleSheets={{}}>
                        {({mediaSize, mediaSpec, styles}: any) => {
                            capturePropsFn({mediaSize, mediaSpec, styles});
                            return <View>Hello, world!</View>;
                        }}
                    </MediaLayout>
                </MediaLayoutContext.Provider>,
            );

            // Assert
            expect(capturePropsFn).toHaveBeenLastCalledWith(
                expect.objectContaining({mediaSize: "large"}),
            );
        });

        it("MEDIA_MODAL_SPEC is not medium", async () => {
            // Arrange
            resizeWindow("medium");
            const capturePropsFn = jest.fn();

            // Act
            render(
                <MediaLayoutContext.Provider
                    value={{
                        overrideSize: undefined,
                        ssrSize: "small",
                        mediaSpec: MEDIA_MODAL_SPEC,
                    }}
                >
                    <MediaLayout styleSheets={{}}>
                        {({mediaSize, mediaSpec, styles}: any) => {
                            capturePropsFn({mediaSize, mediaSpec, styles});
                            return <View>Hello, world!</View>;
                        }}
                    </MediaLayout>
                </MediaLayoutContext.Provider>,
            );

            // Assert
            expect(capturePropsFn).toHaveBeenLastCalledWith(
                expect.objectContaining({mediaSize: "large"}),
            );
        });
    });
});
