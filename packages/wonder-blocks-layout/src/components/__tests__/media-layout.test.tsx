import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";

import MediaLayout from "../media-layout";
import {resizeWindow, matchMedia} from "../../util/test-util";
import {MediaSize} from "../../util/types";

describe("MediaLayout", () => {
    beforeEach(() => {
        window.matchMedia = matchMedia as any;
    });

    describe("mediaSize", () => {
        it("should be small when viewport width < 768", async () => {
            // Arrange
            resizeWindow("small");

            // Act
            const args: any = await new Promise((resolve: any, reject: any) => {
                render(
                    <MediaLayout>
                        {({mediaSize, mediaSpec, styles}: any) => {
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
            const args: any = await new Promise((resolve: any, reject: any) => {
                render(
                    <MediaLayout>
                        {({mediaSize, mediaSpec, styles}: any) => {
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
            const args: any = await new Promise((resolve: any, reject: any) => {
                render(
                    <MediaLayout>
                        {({mediaSize, mediaSpec, styles}: any) => {
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

    describe.each`
        size
        ${"small"}
        ${"medium"}
        ${"large"}
    `("styleSheets - $size", ({size}: {size: MediaSize}) => {
        it(`should always provide styles from all`, async () => {
            // Arrange
            const styleSheets = {
                all: StyleSheet.create({
                    test: {
                        color: "blue",
                    },
                }),
            } as const;
            resizeWindow(size);

            // Act
            render(
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, mediaSpec, styles}: any) => {
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
            } as const;
            resizeWindow(size);
            const expectedColor = {
                small: "blue",
                medium: "blue",
                large: "orange",
            }[size];

            // Act
            render(
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, mediaSpec, styles}: any) => {
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
            } as const;
            resizeWindow(size);
            const expectedColor = {
                small: "orange",
                medium: "blue",
                large: "blue",
            }[size];

            // Act
            render(
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, mediaSpec, styles}: any) => {
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

        it(`styles should win over "all" styles`, async () => {
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
            } as const;
            resizeWindow(size);
            const expectedColor = {
                small: "orange",
                medium: "teal",
                large: "magenta",
            }[size];

            // Act
            render(
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, mediaSpec, styles}: any) => {
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

        if (size !== "large") {
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
                } as const;
                resizeWindow(size);
                const expectedColor = {
                    small: "orange",
                    medium: "teal",
                }[size];

                // Act
                render(
                    <MediaLayout styleSheets={styleSheets}>
                        {({mediaSize, mediaSpec, styles}: any) => {
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

        if (size !== "small") {
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
                } as const;
                resizeWindow(size);
                const expectedColor = {
                    medium: "teal",
                    large: "magenta",
                }[size];

                // Act
                render(
                    <MediaLayout styleSheets={styleSheets}>
                        {({mediaSize, mediaSpec, styles}: any) => {
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
            } as const;

            const UnderTest = () => (
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, mediaSpec, styles}: any) => {
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
            } as const;

            const UnderTest = () => (
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, mediaSpec, styles}: any) => {
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
