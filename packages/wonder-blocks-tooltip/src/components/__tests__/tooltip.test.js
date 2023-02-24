// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";

import Tooltip from "../tooltip";

const mockIDENTIFIER = "mock-identifier";
jest.mock("@khanacademy/wonder-blocks-core", () => {
    const Core = jest.requireActual("@khanacademy/wonder-blocks-core");
    // We want all of Core to be the regular thing except for UniqueIDProvider
    return {
        ...Core,
        UniqueIDProvider: (props) =>
            // NOTE(kevinb): We aren't actually access the DOM here.  The logic
            // used by this lint rule to determine DOM access could be more
            // precise.
            // eslint-disable-next-line testing-library/no-node-access
            props.children({
                get: () => mockIDENTIFIER,
            }),
    };
});

describe("Tooltip", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
        jest.useFakeTimers();
    });

    describe("basic operations", () => {
        it("should not show the tooltip to being with", () => {
            // Arrange
            render(
                <View>
                    <Tooltip title="Title" content="Content">
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );

            // Act
            const tooltip = screen.queryByRole("tooltip");

            // Assert
            expect(tooltip).not.toBeInTheDocument();
        });

        it("should show the tooltip on hover", async () => {
            // Arrange
            render(
                <View>
                    <Tooltip title="Title" content="Content">
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );

            const node = screen.getByText("Anchor");
            userEvent.hover(node);
            jest.runOnlyPendingTimers();

            // Act
            const tooltip = screen.getByRole("tooltip");

            // Assert
            expect(tooltip).toBeInTheDocument();
        });

        it("should hide the tooltip on unhover", async () => {
            // Arrange
            render(
                <View>
                    <Tooltip title="Title" content="Content">
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );

            const node = screen.getByText("Anchor");
            userEvent.hover(node);
            jest.runOnlyPendingTimers();
            userEvent.unhover(node);
            jest.runOnlyPendingTimers();

            // Act
            const tooltip = screen.queryByRole("tooltip");

            // Assert
            expect(tooltip).not.toBeInTheDocument();
        });

        it("should work when the anchor is text", async () => {
            // Arrange
            render(
                <View>
                    <Tooltip title="Title" content="Content">
                        Anchor
                    </Tooltip>
                </View>,
            );

            const node = screen.getByText("Anchor");
            userEvent.hover(node);
            jest.runOnlyPendingTimers();

            // Act
            const tooltip = screen.getByRole("tooltip");

            // Assert
            expect(tooltip).toBeInTheDocument();
        });
    });

    describe("accessibility", () => {
        test("no id, sets identifier of TooltipBubble with UniqueIDProvider", async () => {
            // Arrange
            render(
                <View>
                    <Tooltip title="Title" content="Content">
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );
            const node = screen.getByText("Anchor");
            userEvent.hover(node);
            jest.runOnlyPendingTimers();

            // Act
            // eslint-disable-next-line testing-library/no-node-access
            const result = document.querySelector("#" + mockIDENTIFIER);

            // Assert
            expect(result).toBeInTheDocument();
        });

        test("custom id, sets identifier of TooltipBubble", async () => {
            // Arrange
            render(
                <View>
                    <Tooltip id="tooltip-1" title="Title" content="Content">
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );
            const node = screen.getByText("Anchor");
            userEvent.hover(node);
            jest.runOnlyPendingTimers();

            // Act
            // eslint-disable-next-line testing-library/no-node-access
            const result = document.querySelector("#tooltip-1");

            // Assert
            expect(result).toBeInTheDocument();
        });

        describe("text-only anchor", () => {
            test("wraps with element", async () => {
                // Arrange
                render(
                    <View>
                        <Tooltip content="Content">Anchor</Tooltip>
                    </View>,
                );

                // Act
                const result = screen.getByText("Anchor");

                // Assert
                expect(result).toBeInstanceOf(HTMLSpanElement);
                expect(result.innerHTML).toBe("Anchor");
            });

            test("id provided, does not attach aria-describedby", async () => {
                // Arrange
                render(
                    <View>
                        <Tooltip id="tooltip-2" content="Content">
                            Anchor
                        </Tooltip>
                    </View>,
                );
                const node = screen.getByText("Anchor");

                // Act
                const result = node.getAttribute("aria-describedby");

                // Assert
                expect(result).toBeNull();
            });

            test("no id provided, attaches aria-describedby", async () => {
                // Arrange
                render(
                    <View>
                        <Tooltip content="Content">Anchor</Tooltip>
                    </View>,
                );
                const node = screen.getByText("Anchor");

                // Act

                // Assert
                expect(node).toHaveAttribute(
                    "aria-describedby",
                    mockIDENTIFIER,
                );
            });
        });

        describe("element anchor", () => {
            test("does not wrap", async () => {
                // Arrange
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref = await new Promise((resolve) => {
                    render(
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                {anchor}
                            </Tooltip>
                        </View>,
                    );
                });

                // Act
                const result = (ReactDOM.findDOMNode(ref): any);

                // Assert
                expect(result).toBeInstanceOf(HTMLDivElement);
                expect(result.innerHTML).not.toBe("Anchor");
                // eslint-disable-next-line testing-library/no-node-access
                expect(result.children[0].innerHTML).toBe("Anchor");
            });

            test("id provided, does not attach aria-describedby", async () => {
                // Arrange
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref = await new Promise((resolve) => {
                    render(
                        <View>
                            <Tooltip
                                id="tooltip-3"
                                ref={resolve}
                                content="Content"
                            >
                                {anchor}
                            </Tooltip>
                        </View>,
                    );
                });
                const node = (ReactDOM.findDOMNode(ref): any);

                // Act
                const result = node.getAttribute("aria-describedby");

                // Assert
                expect(result).toBeNull();
            });

            test("no id provided, attaches aria-describedby", async () => {
                // Arrange
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref = await new Promise((resolve) => {
                    render(
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                {anchor}
                            </Tooltip>
                        </View>,
                    );
                });
                const node = (ReactDOM.findDOMNode(ref): any);

                // Act
                const result = node.getAttribute("aria-describedby");

                // Assert
                expect(result).toBe(mockIDENTIFIER);
            });
        });
    });

    describe("Controlled", () => {
        test("can be opened programmatically", async () => {
            // Arrange
            render(
                <View>
                    <Tooltip id="tooltip" content="Content" opened={true}>
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );

            // Act
            jest.runOnlyPendingTimers();

            // Assert
            expect(screen.getByText("Content")).toBeInTheDocument();
        });

        test("can be closed programmatically", async () => {
            // Arrange
            render(
                <View>
                    <Tooltip id="tooltip" content="Content" opened={false}>
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );

            // Act
            jest.runOnlyPendingTimers();

            // Assert
            expect(screen.queryByText("Content")).not.toBeInTheDocument();
        });
    });
});
