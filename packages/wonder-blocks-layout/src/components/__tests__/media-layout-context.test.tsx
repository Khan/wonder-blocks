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
        it("should override the currentSize", async () => {
            // Arrange
            resizeWindow("large");

            // Act
            const args: any = await new Promise((resolve: any, reject: any) => {
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
                                resolve({mediaSize, mediaSpec, styles});
                                return <View>Hello, world!</View>;
                            }}
                        </MediaLayout>
                    </MediaLayoutContext.Provider>,
                );
            });

            // Assert
            expect(args.mediaSize).toEqual("small");
        });
    });

    describe("ssrSize", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should use the default ssrSize on the server", async () => {
            // Arrange
            const promise = new Promise((resolve: any, reject: any) => {
                render(
                    <MediaLayout styleSheets={{}}>
                        {({mediaSize, mediaSpec, styles}: any) => {
                            resolve({mediaSize, mediaSpec, styles});
                            return <View>Hello, world!</View>;
                        }}
                    </MediaLayout>,
                );
            });

            // Act
            const args: any = await promise;

            // Assert
            expect(args.mediaSize).toEqual("large");
        });

        it("should use the provided ssrSize on the server", async () => {
            // Arrange

            // Act
            const args: any = await new Promise((resolve: any, reject: any) => {
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
                                resolve({mediaSize, mediaSpec, styles});
                                return <View>Hello, world!</View>;
                            }}
                        </MediaLayout>
                    </MediaLayoutContext.Provider>,
                );
            });

            // Assert
            expect(args.mediaSize).toEqual("small");
        });
    });

    describe("mediaSpec", () => {
        it("MEDIA_INTERNAL_SPEC is always large", async () => {
            // Arrange
            resizeWindow("small");

            // Act
            const args: any = await new Promise((resolve: any, reject: any) => {
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
                                resolve({mediaSize, mediaSpec, styles});
                                return <View>Hello, world!</View>;
                            }}
                        </MediaLayout>
                    </MediaLayoutContext.Provider>,
                );
            });

            // Assert
            expect(args.mediaSize).toEqual("large");
        });

        it("MEDIA_MODAL_SPEC is not medium", async () => {
            // Arrange
            resizeWindow("medium");

            // Act
            const args: any = await new Promise((resolve: any, reject: any) => {
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
                                resolve({mediaSize, mediaSpec, styles});
                                return <View>Hello, world!</View>;
                            }}
                        </MediaLayout>
                    </MediaLayoutContext.Provider>,
                );
            });

            // Assert
            expect(args.mediaSize).toEqual("large");
        });
    });
});
