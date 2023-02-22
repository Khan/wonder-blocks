import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
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
        // @ts-expect-error [FEI-5019] - TS2322 - Type '(query: "(max-width: 767px)" | "(min-width: 768px) and (max-width: 1023px)" | "(min-width: 1024px)") => MatchMedia' is not assignable to type '((query: string) => MediaQueryList) & ((query: string) => MediaQueryList)'.
        window.matchMedia = matchMedia;
    });

    describe("overrideSize", () => {
        it("should override the currentSize", async () => {
            // Arrange
            resizeWindow("large");

            // Act
            const args = await new Promise((resolve: any, reject: any) => {
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
            // @ts-expect-error [FEI-5019] - TS2571 - Object is of type 'unknown'.
            expect(args.mediaSize).toEqual("small");
        });
    });

    describe("ssrSize", () => {
        it("should use the default ssrSize on the server", async () => {
            // Arrange
            // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
            delete window.matchMedia;
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
            const args = await promise;

            // Assert
            // @ts-expect-error [FEI-5019] - TS2571 - Object is of type 'unknown'.
            expect(args.mediaSize).toEqual("large");
        });

        it("should use the provided ssrSize on the server", async () => {
            // Arrange
            // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
            delete window.matchMedia;

            // Act
            const args = await new Promise((resolve: any, reject: any) => {
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
            // @ts-expect-error [FEI-5019] - TS2571 - Object is of type 'unknown'.
            expect(args.mediaSize).toEqual("small");
        });
    });

    describe("mediaSpec", () => {
        it("MEDIA_INTERNAL_SPEC is always large", async () => {
            // Arrange
            resizeWindow("small");

            // Act
            const args = await new Promise((resolve: any, reject: any) => {
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
            // @ts-expect-error [FEI-5019] - TS2571 - Object is of type 'unknown'.
            expect(args.mediaSize).toEqual("large");
        });

        it("MEDIA_MODAL_SPEC is not medium", async () => {
            // Arrange
            resizeWindow("medium");

            // Act
            const args = await new Promise((resolve: any, reject: any) => {
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
            // @ts-expect-error [FEI-5019] - TS2571 - Object is of type 'unknown'.
            expect(args.mediaSize).toEqual("large");
        });
    });
});
