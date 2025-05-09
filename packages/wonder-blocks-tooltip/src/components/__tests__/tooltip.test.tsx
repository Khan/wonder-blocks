import * as React from "react";
import * as ReactDOM from "react-dom";
import {act, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";

import Tooltip from "../tooltip";

describe("Tooltip", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
        jest.useFakeTimers();
    });

    describe("basic operations", () => {
        it("should not show the tooltip to being with", async () => {
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
            const ue = userEvent.setup({
                advanceTimers: jest.advanceTimersByTimeAsync,
            });
            render(
                <View>
                    <Tooltip title="Title" content="Content">
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );

            // Act
            const node = await screen.findByText("Anchor");
            await ue.hover(node);
            await act(() => jest.runOnlyPendingTimersAsync());

            // Assert
            await screen.findByRole("tooltip");
        });

        it("should hide the tooltip on unhover", async () => {
            // Arrange
            const ue = userEvent.setup({
                advanceTimers: jest.advanceTimersByTimeAsync,
            });
            render(
                <View>
                    <Tooltip title="Title" content="Content">
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );

            const node = await screen.findByText("Anchor");
            await ue.hover(node);
            await act(() => jest.runOnlyPendingTimersAsync());
            await ue.unhover(node);
            await act(() => jest.runOnlyPendingTimersAsync());

            // Act
            const tooltip = screen.queryByRole("tooltip");

            // Assert
            expect(tooltip).not.toBeInTheDocument();
        });

        it("should work when the anchor is text", async () => {
            // Arrange
            const ue = userEvent.setup({
                advanceTimers: jest.advanceTimersByTimeAsync,
            });
            render(
                <View>
                    <Tooltip title="Title" content="Content">
                        Anchor
                    </Tooltip>
                </View>,
            );

            const node = await screen.findByText("Anchor");
            await ue.hover(node);
            await act(() => jest.runOnlyPendingTimersAsync());

            // Act
            const tooltip = await screen.findByRole("tooltip");

            // Assert
            expect(tooltip).toBeInTheDocument();
        });

        it("should have a background color if one is set", async () => {
            // Arrange
            render(
                <View>
                    <Tooltip
                        title="Title"
                        content="Content"
                        backgroundColor="blue"
                        opened={true}
                    >
                        Anchor
                    </Tooltip>
                </View>,
            );

            // Act
            const tooltipContent = await screen.findByRole("tooltip");
            // eslint-disable-next-line testing-library/no-node-access
            const innerTooltipContentView = tooltipContent.firstChild;
            expect(innerTooltipContentView).toBeInTheDocument();

            // Assert
            expect(innerTooltipContentView).toHaveStyle(
                "background-color: rgb(24, 101, 242)",
            );
        });
    });

    describe("accessibility", () => {
        test("no id, sets identifier of TooltipBubble", async () => {
            // Arrange
            const ue = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            render(
                <View>
                    <Tooltip title="Title" content="Content">
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );

            // Act
            const node = await screen.findByText("Anchor");
            await ue.hover(node);
            await act(() => jest.runOnlyPendingTimersAsync());
            const result = await screen.findByRole("tooltip");

            // Assert
            expect(result).toHaveAttribute("id", expect.any(String));
        });

        it("custom id, sets identifier of TooltipBubble", async () => {
            // Arrange
            const ue = userEvent.setup({
                advanceTimers: jest.advanceTimersByTimeAsync,
            });
            render(
                <View>
                    <Tooltip id="tooltip-1" title="Title" content="Content">
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );

            // Act
            const node = await screen.findByText("Anchor");
            await ue.hover(node);
            await act(() => jest.runOnlyPendingTimersAsync());
            const result = await screen.findByRole("tooltip");

            // Assert
            expect(result).toHaveAttribute("id", "tooltip-1-aria-content");
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
                const result = await screen.findByText("Anchor");

                // Assert
                expect(result).toBeInstanceOf(HTMLSpanElement);
                expect(result.innerHTML).toBe("Anchor");
            });

            test("id provided, does not attach aria-describedby when bubble is not displayed", async () => {
                // Arrange
                render(
                    <View>
                        <Tooltip id="tooltip-2" content="Content">
                            Anchor
                        </Tooltip>
                    </View>,
                );

                // Act
                const result = await screen.findByText("Anchor");

                // Assert
                expect(result).not.toHaveAttribute("aria-describedby");
            });

            test("id provided, attaches aria-describedby when bubble is displayed", async () => {
                // Arrange
                const ue = userEvent.setup({
                    advanceTimers: jest.advanceTimersByTimeAsync,
                });
                render(
                    <View>
                        <Tooltip id="tooltip-2" content="Content">
                            Anchor
                        </Tooltip>
                    </View>,
                );

                // Act
                const result = await screen.findByText("Anchor");
                await ue.hover(result);
                await act(() => jest.runOnlyPendingTimersAsync());

                // Assert
                expect(result).toHaveAttribute(
                    "aria-describedby",
                    "tooltip-2-aria-content",
                );
            });

            test("id provided, aria-describedby id matches bubble id", async () => {
                // Arrange
                const ue = userEvent.setup({
                    advanceTimers: jest.advanceTimersByTimeAsync,
                });
                render(
                    <View>
                        <Tooltip id="tooltip-2" content="Content">
                            Anchor
                        </Tooltip>
                    </View>,
                );

                // Act
                const node = await screen.findByText("Anchor");
                await ue.hover(node);
                await act(() => jest.runOnlyPendingTimersAsync());
                const tooltip = await screen.findByRole("tooltip");

                // Assert
                expect(node).toHaveAttribute("aria-describedby", tooltip.id);
            });

            test("no id provided, does not aria-describedby when bubble is not visible", async () => {
                // Arrange
                render(
                    <View>
                        <Tooltip content="Content">Anchor</Tooltip>
                    </View>,
                );
                const node = await screen.findByText("Anchor");

                // Act

                // Assert
                expect(node).not.toHaveAttribute("aria-describedby");
            });

            test("no id provided, attaches aria-describedby when bubble is visible", async () => {
                // Arrange
                const ue = userEvent.setup({
                    advanceTimers: jest.advanceTimersByTimeAsync,
                });
                render(
                    <View>
                        <Tooltip content="Content">Anchor</Tooltip>
                    </View>,
                );

                // Act
                const node = await screen.findByText("Anchor");
                await ue.hover(node);
                await act(() => jest.runOnlyPendingTimersAsync());

                // Assert
                expect(node).toHaveAttribute(
                    "aria-describedby",
                    // We don't know what the generated portion would be,
                    expect.stringMatching(/.*-aria-content/),
                );
            });

            test("no id provided, aria-describedby id matches bubble id", async () => {
                // Arrange
                const ue = userEvent.setup({
                    advanceTimers: jest.advanceTimersByTimeAsync,
                });
                render(
                    <View>
                        <Tooltip content="Content">Anchor</Tooltip>
                    </View>,
                );

                // Act
                const node = await screen.findByText("Anchor");
                await ue.hover(node);
                await act(() => jest.runOnlyPendingTimersAsync());
                const tooltip = await screen.findByRole("tooltip");

                // Assert
                expect(node).toHaveAttribute("aria-describedby", tooltip.id);
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
                const ref: Element = await new Promise((resolve: any) => {
                    render(
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                {anchor}
                            </Tooltip>
                        </View>,
                    );
                });

                // Act
                const result = ReactDOM.findDOMNode(ref) as any;

                // Assert
                expect(result).toBeInstanceOf(HTMLDivElement);
                expect(result.innerHTML).not.toBe("Anchor");
                // eslint-disable-next-line testing-library/no-node-access
                expect(result.children[0].innerHTML).toBe("Anchor");
            });

            test("id provided, does not attach aria-describedby when bubble is not displayed", async () => {
                // Arrange
                const ref: Element = await new Promise((resolve: any) => {
                    render(
                        <View>
                            <Tooltip
                                id="tooltip-3"
                                ref={resolve}
                                content="Content"
                            >
                                <View>
                                    <View>Anchor</View>
                                </View>
                            </Tooltip>
                        </View>,
                    );
                });

                // Act
                const result = ReactDOM.findDOMNode(ref) as any;

                // Assert
                expect(result).not.toHaveAttribute("aria-describedby");
            });

            test("id provided, attaches aria-describedby when bubble is displayed", async () => {
                // Arrange
                const ue = userEvent.setup({
                    advanceTimers: jest.advanceTimersByTimeAsync,
                });
                const ref: Element = await new Promise((resolve: any) => {
                    render(
                        <View>
                            <Tooltip
                                id="tooltip-3"
                                ref={resolve}
                                content="Content"
                            >
                                <View>
                                    <View>Anchor</View>
                                </View>
                            </Tooltip>
                        </View>,
                    );
                });

                // Act
                const result = ReactDOM.findDOMNode(ref) as any;
                await ue.hover(result);
                await act(() => jest.runOnlyPendingTimersAsync());

                // Assert
                expect(result).toHaveAttribute(
                    "aria-describedby",
                    "tooltip-3-aria-content",
                );
            });

            test("id provided, aria-describedby id matches bubble id", async () => {
                // Arrange
                const ue = userEvent.setup({
                    advanceTimers: jest.advanceTimersByTimeAsync,
                });
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref: Element = await new Promise((resolve: any) => {
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

                // Act
                const result = ReactDOM.findDOMNode(ref) as any;
                await ue.hover(result);
                await act(() => jest.runOnlyPendingTimersAsync());
                const tooltip = await screen.findByRole("tooltip");

                // Assert
                expect(result).toHaveAttribute("aria-describedby", tooltip.id);
            });

            test("no id provided, does not attach aria-describedby when bubble is not displayed", async () => {
                // Arrange
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref: Element = await new Promise((resolve: any) => {
                    render(
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                {anchor}
                            </Tooltip>
                        </View>,
                    );
                });

                // Act
                const result = ReactDOM.findDOMNode(ref) as any;

                // Assert
                expect(result).not.toHaveAttribute("aria-describedby");
            });

            test("no id provided, attaches aria-describedby when bubble is displayed", async () => {
                // Arrange
                const ue = userEvent.setup({
                    advanceTimers: jest.advanceTimersByTimeAsync,
                });
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref: Element = await new Promise((resolve: any) => {
                    render(
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                {anchor}
                            </Tooltip>
                        </View>,
                    );
                });

                // Act
                const result = ReactDOM.findDOMNode(ref) as any;
                await ue.hover(result);
                await act(() => jest.runOnlyPendingTimersAsync());

                // Assert
                expect(result).toHaveAttribute(
                    "aria-describedby",
                    expect.stringMatching(/.*-aria-content/),
                );
            });

            test("no id provided, aria-describedby id matches bubble id", async () => {
                // Arrange
                const ue = userEvent.setup({
                    advanceTimers: jest.advanceTimersByTimeAsync,
                });
                const anchor = (
                    <View>
                        <View>Anchor</View>
                    </View>
                );
                const ref: Element = await new Promise((resolve: any) => {
                    render(
                        <View>
                            <Tooltip ref={resolve} content="Content">
                                {anchor}
                            </Tooltip>
                        </View>,
                    );
                });

                // Act
                const result = ReactDOM.findDOMNode(ref) as any;
                await ue.hover(result);
                await act(() => jest.runOnlyPendingTimersAsync());
                const tooltip = await screen.findByRole("tooltip");

                // Assert
                expect(result).toHaveAttribute("aria-describedby", tooltip.id);
            });
        });
    });

    describe("Controlled", () => {
        test("can be opened programmatically", async () => {
            // Arrange

            // Act
            render(
                <View>
                    <Tooltip id="tooltip" content="Content" opened={true}>
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );
            await act(() => jest.runOnlyPendingTimersAsync());

            // Assert
            await screen.findByText("Content");
        });

        test("can be closed programmatically", async () => {
            // Arrange

            // Act
            render(
                <View>
                    <Tooltip id="tooltip" content="Content" opened={false}>
                        <View>Anchor</View>
                    </Tooltip>
                </View>,
            );
            await act(() => jest.runOnlyPendingTimersAsync());

            // Assert
            expect(screen.queryByText("Content")).not.toBeInTheDocument();
        });
    });
});
