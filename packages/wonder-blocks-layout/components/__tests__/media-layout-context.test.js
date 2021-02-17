// @flow
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import MediaLayout from "../media-layout.js";
import MediaLayoutContext from "../media-layout-context.js";
import {resizeWindow, matchMedia} from "../../util/test-util.js";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";

import {
    MEDIA_DEFAULT_SPEC,
    MEDIA_INTERNAL_SPEC,
    MEDIA_MODAL_SPEC,
} from "../../util/specs.js";

describe("MediaLayoutContext", () => {
    beforeEach(() => {
        unmountAll();
        window.matchMedia = matchMedia;
    });

    describe("overrideSize", () => {
        it("should override the currentSize", async () => {
            // Arrange
            resizeWindow("large");

            // Act
            const args = await new Promise((resolve, reject) => {
                mount(
                    <MediaLayoutContext.Provider
                        value={{
                            overrideSize: "small",
                            ssrSize: "large",
                            mediaSpec: MEDIA_DEFAULT_SPEC,
                        }}
                    >
                        <MediaLayout styleSheets={{}}>
                            {({mediaSize, mediaSpec, styles}) => {
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
        it("should use the default ssrSize on the server", async () => {
            // Arrange
            delete window.matchMedia;
            const promise = new Promise((resolve, reject) => {
                mount(
                    <MediaLayout styleSheets={{}}>
                        {({mediaSize, mediaSpec, styles}) => {
                            resolve({mediaSize, mediaSpec, styles});
                            return <View>Hello, world!</View>;
                        }}
                    </MediaLayout>,
                );
            });

            // Act
            const args = await promise;

            // Assert
            expect(args.mediaSize).toEqual("large");
        });

        it("should use the provided ssrSize on the server", async () => {
            // Arrange
            delete window.matchMedia;

            // Act
            const args = await new Promise((resolve, reject) => {
                mount(
                    <MediaLayoutContext.Provider
                        value={{
                            overrideSize: undefined,
                            ssrSize: "small",
                            mediaSpec: MEDIA_DEFAULT_SPEC,
                        }}
                    >
                        <MediaLayout styleSheets={{}}>
                            {({mediaSize, mediaSpec, styles}) => {
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
            const args = await new Promise((resolve, reject) => {
                mount(
                    <MediaLayoutContext.Provider
                        value={{
                            overrideSize: undefined,
                            ssrSize: "small",
                            mediaSpec: MEDIA_INTERNAL_SPEC,
                        }}
                    >
                        <MediaLayout styleSheets={{}}>
                            {({mediaSize, mediaSpec, styles}) => {
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
            const args = await new Promise((resolve, reject) => {
                mount(
                    <MediaLayoutContext.Provider
                        value={{
                            overrideSize: undefined,
                            ssrSize: "small",
                            mediaSpec: MEDIA_MODAL_SPEC,
                        }}
                    >
                        <MediaLayout styleSheets={{}}>
                            {({mediaSize, mediaSpec, styles}) => {
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
