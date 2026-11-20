import * as React from "react";
import {act, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

import Tooltip from "../tooltip";

describe("Tooltip", () => {
    beforeEach(() => {
        // Provide realistic dimensions so floating-ui's `hide` middleware
        // doesn't treat the anchor as hidden. jsdom reports zero-size rects for
        // every element, which would otherwise cause the tooltip to render with
        // `visibility: hidden` (making role-based queries fail).
        jest.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
            width: 300,
            height: 50,
            top: 100,
            left: 100,
            bottom: 150,
            right: 400,
            x: 100,
            y: 100,
            toJSON: () => {},
        });
        // Give the document a non-zero viewport so floating-ui's `hide`
        // middleware doesn't consider the anchor to be outside the viewport.
        jest.spyOn(
            document.documentElement,
            "clientWidth",
            "get",
        ).mockReturnValue(1024);
        jest.spyOn(
            document.documentElement,
            "clientHeight",
            "get",
        ).mockReturnValue(768);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

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
            // The background is applied to the floating element that wraps
            // the tooltip.
            // eslint-disable-next-line testing-library/no-node-access
            const floatingElement = tooltipContent.parentElement;

            // Assert
            expect(floatingElement).toHaveStyle(
                "background-color: rgb(24, 101, 242)",
            );
        });

        it("should use the strong colors for the strong variant", async () => {
            // Arrange
            render(
                <Tooltip content="Content" variant="strong" opened={true}>
                    Anchor
                </Tooltip>,
            );

            // Act
            const tooltipContent = await screen.findByRole("tooltip");
            // eslint-disable-next-line testing-library/no-node-access
            const floatingElement = tooltipContent.parentElement;

            // Assert
            expect(floatingElement).toHaveStyle({
                backgroundColor:
                    semanticColor.feedback.neutral.strong.background,
                color: semanticColor.feedback.neutral.strong.text,
            });
        });

        it("should position the tooltip with the fixed strategy", async () => {
            // Arrange
            render(
                <Tooltip content="Content" opened={true}>
                    Anchor
                </Tooltip>,
            );

            // Act
            const tooltipContent = await screen.findByRole("tooltip");
            // eslint-disable-next-line testing-library/no-node-access
            const floatingElement = tooltipContent.parentElement;

            // Assert
            expect(floatingElement).toHaveStyle({position: "fixed"});
        });

        it("should render a tail pointing to the anchor", async () => {
            // Arrange
            render(
                <Tooltip content="Content" opened={true}>
                    Anchor
                </Tooltip>,
            );

            // Act
            const tooltipContent = await screen.findByRole("tooltip");
            // eslint-disable-next-line testing-library/no-node-access
            const tail = tooltipContent.parentElement?.querySelector("svg");

            // Assert
            expect(tail).toBeInTheDocument();
        });

        it("should keep the tooltip open while its border or tail is hovered", async () => {
            // Arrange
            const ue = userEvent.setup({
                advanceTimers: jest.advanceTimersByTimeAsync,
            });
            render(<Tooltip content="Content">Anchor</Tooltip>);
            const anchor = await screen.findByText("Anchor");
            await ue.hover(anchor);
            await act(() => jest.runOnlyPendingTimersAsync());
            const tooltip = await screen.findByRole("tooltip");
            // The floating element wraps the tooltip content and also renders
            // the tail.
            // eslint-disable-next-line testing-library/no-node-access
            const floatingElement = tooltip.parentElement as HTMLElement;

            // Act
            await ue.hover(floatingElement);
            await act(() => jest.runOnlyPendingTimersAsync());

            // Assert
            expect(screen.getByRole("tooltip")).toBeInTheDocument();
        });

        it("should keep the tooltip open while the bubble is hovered", async () => {
            // Arrange
            const ue = userEvent.setup({
                advanceTimers: jest.advanceTimersByTimeAsync,
            });
            render(<Tooltip content="Content">Anchor</Tooltip>);
            const anchor = await screen.findByText("Anchor");
            await ue.hover(anchor);
            await act(() => jest.runOnlyPendingTimersAsync());
            const tooltip = await screen.findByRole("tooltip");

            // Act
            await ue.hover(tooltip);
            await act(() => jest.runOnlyPendingTimersAsync());

            // Assert
            expect(screen.getByRole("tooltip")).toBeInTheDocument();
        });
    });

    describe("anchored content", () => {
        it("should show the tooltip for content that spreads the props it is given", async () => {
            // Arrange
            const ue = userEvent.setup({
                advanceTimers: jest.advanceTimersByTimeAsync,
            });
            // A plain function component can't receive a ref, but it passes
            // the props it is given along to its element.
            const Anchor = (props: React.ComponentProps<"span">) => (
                <span {...props}>Anchor</span>
            );
            render(
                <Tooltip content="Content">
                    <Anchor />
                </Tooltip>,
            );

            // Act
            await ue.hover(await screen.findByText("Anchor"));
            await act(() => jest.runOnlyPendingTimersAsync());

            // Assert
            expect(
                await screen.findByRole("tooltip", {hidden: true}),
            ).toBeInTheDocument();
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
                    <View testId="anchor">
                        <View>Anchor</View>
                    </View>
                );
                render(
                    <View>
                        <Tooltip content="Content">{anchor}</Tooltip>
                    </View>,
                );

                // Act
                const result = screen.getByTestId("anchor");

                // Assert
                expect(result).toBeInstanceOf(HTMLDivElement);
                expect(result.innerHTML).not.toBe("Anchor");
                // eslint-disable-next-line testing-library/no-node-access
                expect(result.children[0].innerHTML).toBe("Anchor");
            });

            test("id provided, does not attach aria-describedby when bubble is not displayed", async () => {
                // Arrange
                render(
                    <View>
                        <Tooltip id="tooltip-3" content="Content">
                            <View testId="anchor">
                                <View>Anchor</View>
                            </View>
                        </Tooltip>
                    </View>,
                );

                // Act
                const result = screen.getByTestId("anchor");

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
                        <Tooltip id="tooltip-3" content="Content">
                            <View testId="anchor">
                                <View>Anchor</View>
                            </View>
                        </Tooltip>
                    </View>,
                );

                // Act
                const result = screen.getByTestId("anchor");
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
                    <View testId="anchor">
                        <View>Anchor</View>
                    </View>
                );
                render(
                    <View>
                        <Tooltip id="tooltip-3" content="Content">
                            {anchor}
                        </Tooltip>
                    </View>,
                );

                // Act
                const result = screen.getByTestId("anchor");
                await ue.hover(result);
                await act(() => jest.runOnlyPendingTimersAsync());
                const tooltip = await screen.findByRole("tooltip");

                // Assert
                expect(result).toHaveAttribute("aria-describedby", tooltip.id);
            });

            test("no id provided, does not attach aria-describedby when bubble is not displayed", async () => {
                // Arrange
                const anchor = (
                    <View testId="anchor">
                        <View>Anchor</View>
                    </View>
                );
                render(
                    <View>
                        <Tooltip content="Content">{anchor}</Tooltip>
                    </View>,
                );

                // Act
                const result = screen.getByTestId("anchor");

                // Assert
                expect(result).not.toHaveAttribute("aria-describedby");
            });

            test("no id provided, attaches aria-describedby when bubble is displayed", async () => {
                // Arrange
                const ue = userEvent.setup({
                    advanceTimers: jest.advanceTimersByTimeAsync,
                });
                const anchor = (
                    <View testId="anchor">
                        <View>Anchor</View>
                    </View>
                );
                render(
                    <View>
                        <Tooltip content="Content">{anchor}</Tooltip>
                    </View>,
                );

                // Act
                const result = screen.getByTestId("anchor");
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
                    <View testId="anchor">
                        <View>Anchor</View>
                    </View>
                );
                render(
                    <View>
                        <Tooltip content="Content">{anchor}</Tooltip>
                    </View>,
                );

                // Act
                const result = screen.getByTestId("anchor");
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
