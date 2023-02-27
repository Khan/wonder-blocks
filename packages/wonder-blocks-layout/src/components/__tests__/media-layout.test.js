// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";

import MediaLayout from "../media-layout";
import {resizeWindow, matchMedia} from "../../util/test-util";

describe("MediaLayout", () => {
    beforeEach(() => {
        window.matchMedia = matchMedia;
    });

    describe("mediaSize", () => {
        it("should be small when viewport width < 768", async () => {
            // Arrange
            resizeWindow("small");

            // Act
            const args = await new Promise((resolve, reject) => {
                render(
                    <MediaLayout>
                        {({mediaSize, mediaSpec, styles}) => {
                            resolve({mediaSize, mediaSpec, styles});
                            return (
                                <View style={styles.test}>Hello, world!</View>
                            );
                        }}
                    </MediaLayout>,
                );
            });

            // Assert
            expect(args.mediaSize).toEqual("small");
        });

        it("should be medium when viewport 768 < width < 1024", async () => {
            // Arrange
            resizeWindow("medium");

            // Act
            const args = await new Promise((resolve, reject) => {
                render(
                    <MediaLayout>
                        {({mediaSize, mediaSpec, styles}) => {
                            resolve({mediaSize, mediaSpec, styles});
                            return (
                                <View style={styles.test}>Hello, world!</View>
                            );
                        }}
                    </MediaLayout>,
                );
            });

            // Assert
            expect(args.mediaSize).toEqual("medium");
        });

        it("should be medium when viewport width > 1024", async () => {
            // Arrange
            resizeWindow("large");

            // Act
            const args = await new Promise((resolve, reject) => {
                render(
                    <MediaLayout>
                        {({mediaSize, mediaSpec, styles}) => {
                            resolve({mediaSize, mediaSpec, styles});
                            return (
                                <View style={styles.test}>Hello, world!</View>
                            );
                        }}
                    </MediaLayout>,
                );
            });

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
                render(
                    <MediaLayout styleSheets={styleSheets}>
                        {({mediaSize, mediaSpec, styles}) => {
                            return (
                                <View testId="styled-view" style={styles.test}>
                                    Hello, world!
                                </View>
                            );
                        }}
                    </MediaLayout>,
                );
                const style = screen.getByTestId("styled-view").style;

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
                const expectedColor = {
                    small: "blue",
                    medium: "blue",
                    large: "orange",
                }[size];

                // Act
                render(
                    <MediaLayout styleSheets={styleSheets}>
                        {({mediaSize, mediaSpec, styles}) => {
                            return (
                                <View testId="styled-view" style={styles.test}>
                                    Hello, world!
                                </View>
                            );
                        }}
                    </MediaLayout>,
                );
                const style = screen.getByTestId("styled-view").style;

                // Assert
                expect(style.color).toBe(expectedColor);
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
                const expectedColor = {
                    small: "orange",
                    medium: "blue",
                    large: "blue",
                }[size];

                // Act
                render(
                    <MediaLayout styleSheets={styleSheets}>
                        {({mediaSize, mediaSpec, styles}) => {
                            return (
                                <View testId="styled-view" style={styles.test}>
                                    Hello, world!
                                </View>
                            );
                        }}
                    </MediaLayout>,
                );
                const style = screen.getByTestId("styled-view").style;

                // Assert
                expect(style.color).toBe(expectedColor);
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
                const expectedColor = {
                    small: "orange",
                    medium: "teal",
                    large: "magenta",
                }[size];

                // Act
                render(
                    <MediaLayout styleSheets={styleSheets}>
                        {({mediaSize, mediaSpec, styles}) => {
                            return (
                                <View testId="styled-view" style={styles.test}>
                                    Hello, world!
                                </View>
                            );
                        }}
                    </MediaLayout>,
                );
                const style = screen.getByTestId("styled-view").style;

                // Assert
                expect(style.color).toEqual(expectedColor);
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
                const expectedColor = {
                    small: "orange",
                    medium: "teal",
                }[size];

                // Act
                render(
                    <MediaLayout styleSheets={styleSheets}>
                        {({mediaSize, mediaSpec, styles}) => {
                            return (
                                <View testId="styled-view" style={styles.test}>
                                    Hello, world!
                                </View>
                            );
                        }}
                    </MediaLayout>,
                );
                const style = screen.getByTestId("styled-view").style;

                // Assert
                expect(style.color).toEqual(expectedColor);
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
                const expectedColor = {
                    medium: "teal",
                    large: "magenta",
                }[size];

                // Act
                render(
                    <MediaLayout styleSheets={styleSheets}>
                        {({mediaSize, mediaSpec, styles}) => {
                            return (
                                <View testId="styled-view" style={styles.test}>
                                    Hello, world!
                                </View>
                            );
                        }}
                    </MediaLayout>,
                );
                const style = screen.getByTestId("styled-view").style;

                // Assert
                expect(style.color).toEqual(expectedColor);
            });
        }
    });

    describe("window resizing", () => {
        it("should update the style when the window gets smaller", async () => {
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

            const UnderTest = () => (
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, mediaSpec, styles}) => {
                        return (
                            <View testId="styled-view" style={styles.test}>
                                Hello, world!
                            </View>
                        );
                    }}
                </MediaLayout>
            );

            resizeWindow("large");

            const wrapper = render(<UnderTest />);

            // Act
            resizeWindow("small");
            wrapper.rerender(<UnderTest />);
            const style = screen.getByTestId("styled-view").style;

            // Assert
            expect(style.color).toBe("orange");
        });

        it("should update the style when the window gets larger", async () => {
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

            const UnderTest = () => (
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, mediaSpec, styles}) => {
                        return (
                            <View testId="styled-view" style={styles.test}>
                                Hello, world!
                            </View>
                        );
                    }}
                </MediaLayout>
            );

            resizeWindow("small");

            const wrapper = render(<UnderTest />);

            // Act
            resizeWindow("large");
            wrapper.rerender(<UnderTest />);
            const style = screen.getByTestId("styled-view").style;

            // Assert
            expect(style.color).toBe("blue");
        });
    });
});