// @flow
import React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

import {mount, unmountAll} from "../../../utils/testing/mount.js";
import MediaLayout from "./media-layout.js";
import MediaLayoutContext from "./media-layout-context.js";
import {
    MEDIA_DEFAULT_SPEC,
    MEDIA_INTERNAL_SPEC,
    MEDIA_MODAL_SPEC,
} from "../util/specs.js";
import type {MediaSize} from "../util/types.js";

const resizeWindow = (size: MediaSize) => {
    if (size === "large") {
        window.innerWidth = 1200;
    } else if (size === "medium") {
        window.innerWidth = 800;
    } else if (size === "small") {
        window.innerWidth = 640;
    }

    window.dispatchEvent(new Event("resize"));
};

const queries = {
    small: "(max-width: 767px)",
    medium: "(min-width: 768px) and (max-width: 1023px)",
    large: "(min-width: 1024px)",
};

const checkQuery = (query, width) => {
    return (
        (width < 768 && query === queries.small) ||
        (width < 1024 && query === queries.medium) ||
        query === queries.large
    );
};

const matchMedia = (query) => {
    const listeners = new Set();

    window.addEventListener("resize", () => {
        for (const listener of listeners) {
            listener({
                matches: checkQuery(query, window.innerWidth),
            });
        }
    });

    return {
        get matches() {
            return checkQuery(query, window.innerWidth);
        },
        addListener: (listener) => {
            listeners.add(listener);
        },
        removeListener: (listener) => {
            listeners.delete(listener);
        },
    };
};

const getArgsToChildren = async (styleSheets) =>
    new Promise((resolve, reject) => {
        mount(
            <MediaLayout styleSheets={styleSheets}>
                {({mediaSize, mediaSpec, styles}) => {
                    resolve({mediaSize, mediaSpec, styles});
                    return <View style={styles.test}>Hello, world!</View>;
                }}
            </MediaLayout>,
        );
    });

const getStyle = (styleSheets) => {
    const wrapper = mount(
        <MediaLayout styleSheets={styleSheets}>
            {({mediaSize, mediaSpec, styles}) => {
                return <View style={styles.test}>Hello, world!</View>;
            }}
        </MediaLayout>,
    );
    const style = wrapper.find("div").prop("style");

    return style;
};

global.SNAPSHOT_INLINE_APHRODITE = true;

describe("MediaLayout", () => {
    beforeEach(() => {
        unmountAll();
        window.matchMedia = matchMedia;
    });

    describe("overrideSize", () => {
        it("should override the currentSize", async () => {
            // Arrange
            resizeWindow("large");
            const promise = new Promise((resolve, reject) => {
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

            // Act
            const args = await promise;

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
            const promise = new Promise((resolve, reject) => {
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

            // Act
            const args = await promise;

            // Assert
            expect(args.mediaSize).toEqual("small");
        });
    });

    describe("mediaSpec", () => {
        it("MEDIA_INTERNAL_SPEC is always large", async () => {
            // Arrange
            resizeWindow("small");
            const promise = new Promise((resolve, reject) => {
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

            // Act
            const args = await promise;

            // Assert
            expect(args.mediaSize).toEqual("large");
        });

        it("MEDIA_MODAL_SPEC is not medium", async () => {
            // Arrange
            resizeWindow("medium");
            const promise = new Promise((resolve, reject) => {
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

            // Act
            const args = await promise;

            // Assert
            expect(args.mediaSize).toEqual("large");
        });
    });

    describe("mediaSize", () => {
        it("should be small when viewport width < 768", async () => {
            // Arrange
            resizeWindow("small");

            // Act
            const args = await getArgsToChildren();

            // Assert
            expect(args.mediaSize).toEqual("small");
        });

        it("should be medium when viewport 768 < width < 1024", async () => {
            // Arrange
            resizeWindow("medium");

            // Act
            const args = await getArgsToChildren();

            // Assert
            expect(args.mediaSize).toEqual("medium");
        });

        it("should be medium when viewport width > 1024", async () => {
            // Arrange
            resizeWindow("large");

            // Act
            const args = await getArgsToChildren();

            // Assert
            expect(args.mediaSize).toEqual("large");
        });
    });

    describe("styleSheets", () => {
        const testSizes = {
            small: [640, 480],
            medium: [800, 600],
            large: [1200, 800],
        };

        for (const size of Object.keys(testSizes)) {
            it(`should always provide styles from all (${size})`, async () => {
                // Arrange
                const styleSheets = {
                    all: StyleSheet.create({
                        test: {
                            color: "blue",
                        },
                    }),
                };
                resizeWindow(size);

                // Act
                const style = getStyle(styleSheets);

                // Assert
                expect(style.color).toBe("blue");
            });

            it(`"mdOrSmaller" should match ${
                size === "large" ? "not" : ""
            } "${size}"`, async () => {
                // Arrange
                const styleSheets = {
                    mdOrSmaller: StyleSheet.create({
                        test: {
                            color: "blue",
                        },
                    }),
                    large: StyleSheet.create({
                        test: {
                            color: "orange",
                        },
                    }),
                };
                resizeWindow(size);

                // Act
                const style = getStyle(styleSheets);
                const color = {
                    small: "blue",
                    medium: "blue",
                    large: "orange",
                }[size];

                // Assert
                expect(style.color).toBe(color);
            });

            it(`"mdOrLarger" should match ${
                size === "small" ? "not" : ""
            } "${size}"`, async () => {
                // Arrange
                const styleSheets = {
                    mdOrLarger: StyleSheet.create({
                        test: {
                            color: "blue",
                        },
                    }),
                    small: StyleSheet.create({
                        test: {
                            color: "orange",
                        },
                    }),
                };
                resizeWindow(size);

                // Act
                const style = getStyle(styleSheets);
                const color = {
                    small: "orange",
                    medium: "blue",
                    large: "blue",
                }[size];

                // Assert
                expect(style.color).toBe(color);
            });

            it(`"${size}" styles should win over "all" styles`, async () => {
                // Arrange
                const styleSheets = {
                    all: StyleSheet.create({
                        test: {
                            color: "blue",
                        },
                    }),
                    small: StyleSheet.create({
                        test: {
                            color: "orange",
                        },
                    }),
                    medium: StyleSheet.create({
                        test: {
                            color: "teal",
                        },
                    }),
                    large: StyleSheet.create({
                        test: {
                            color: "magenta",
                        },
                    }),
                };
                resizeWindow(size);

                // Act
                const style = getStyle(styleSheets);
                const color = {
                    small: "orange",
                    medium: "teal",
                    large: "magenta",
                }[size];

                // Assert
                expect(style.color).toEqual(color);
            });
        }

        for (const size of ["small", "medium"]) {
            it(`"${size}" styles should win over "mdOrSmaller" styles`, async () => {
                // Arrange
                const styleSheets = {
                    mdOrSmaller: StyleSheet.create({
                        test: {
                            color: "blue",
                        },
                    }),
                    small: StyleSheet.create({
                        test: {
                            color: "orange",
                        },
                    }),
                    medium: StyleSheet.create({
                        test: {
                            color: "teal",
                        },
                    }),
                };
                resizeWindow(size);

                // Act
                const style = getStyle(styleSheets);
                const color = {
                    small: "orange",
                    medium: "teal",
                }[size];

                // Assert
                expect(style.color).toEqual(color);
            });
        }

        for (const size of ["medium", "large"]) {
            it(`"${size}" styles should win over "mdOrLarger" styles`, async () => {
                // Arrange
                const styleSheets = {
                    mdOrLarger: StyleSheet.create({
                        test: {
                            color: "blue",
                        },
                    }),
                    medium: StyleSheet.create({
                        test: {
                            color: "teal",
                        },
                    }),
                    large: StyleSheet.create({
                        test: {
                            color: "magenta",
                        },
                    }),
                };
                resizeWindow(size);

                // Act
                const style = getStyle(styleSheets);
                const color = {
                    medium: "teal",
                    large: "magenta",
                }[size];

                // Assert
                expect(style.color).toEqual(color);
            });
        }
    });

    describe("window resizing", () => {
        it("should update the style when the match media query changes", async () => {
            // Arrange
            const styleSheets = {
                large: StyleSheet.create({
                    test: {
                        color: "blue",
                    },
                }),
                small: StyleSheet.create({
                    test: {
                        color: "orange",
                    },
                }),
            };

            resizeWindow("large");

            const wrapper = mount(
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, mediaSpec, styles}) => {
                        return <View style={styles.test}>Hello, world!</View>;
                    }}
                </MediaLayout>,
            );

            resizeWindow("small");

            const style = wrapper.find("div").prop("style");

            // Assert
            expect(style.color).toBe("blue");
        });
    });
});
