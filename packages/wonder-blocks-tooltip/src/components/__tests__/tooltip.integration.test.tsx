import * as React from "react";

import {act, render, screen, fireEvent, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import Tooltip from "../tooltip";

describe("tooltip integration tests", () => {
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
        jest.useFakeTimers();
    });

    it("should set timeoutId be null when TooltipBubble is active", async () => {
        // Arrange
        const ue = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        render(<Tooltip content="hello, world">an anchor</Tooltip>);
        const anchor = await screen.findByText("an anchor");

        // Act
        await ue.hover(anchor);
        // There's a 100ms delay before TooltipAnchor calls _setActiveState with
        // instant set to true.  This second call is what actually triggers the
        // call to this.props.onActiveChanged() which updates Tooltip's active
        // state.
        jest.runAllTimers();

        // Assert
        expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    });

    it("should hide the bubble on mouseleave on TooltipAnchor", async () => {
        // Arrange
        const ue = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        render(<Tooltip content="hello, world">an anchor</Tooltip>);

        const anchor = await screen.findByText("an anchor");
        await ue.hover(anchor);

        // Act
        await ue.unhover(anchor);
        // There's a 75ms delay before TooltipAnchor calls setActiveState with
        // instant set to true.  This second call is what actually triggers the
        // call to onActiveChanged() which updates Tooltip's active state.
        act(() => {
            jest.runAllTimers();
        });

        // Assert
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("should close TooltipBubble on mouseleave on TooltipBubble", async () => {
        // Arrange
        const ue = userEvent.setup({
            advanceTimers: jest.advanceTimersByTimeAsync,
        });
        render(<Tooltip content="hello, world">an anchor</Tooltip>);

        const anchor = await screen.findByText("an anchor");
        await ue.hover(anchor);
        // hover on bubble to keep it active
        // Need to run the timers or we won't get the bubble wrapper to show.
        jest.runAllTimers();
        const bubbleWrapper = await screen.findByRole("tooltip");
        await ue.unhover(anchor);

        // Used because RTL complains about the bubble containing a child
        // element with pointerEvents: none
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseEnter(bubbleWrapper);

        // Act
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseLeave(bubbleWrapper);
        // There's a 100ms delay before TooltipAnchor calls _setActiveState with
        // instant set to true.  This second call is what actually triggers the
        // call to this.props.onActiveChanged() which updates Tooltip's active
        // state.
        jest.runAllTimers();

        // Assert
        await waitFor(() =>
            expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
        );
    });

    it("should have an opened tooltip when subsequent mouseenter, mouseleave, and mouseenter events occur", async () => {
        // This a test case that simulates a bug in Firefox where a tooltip will
        // sometimes flicker and not stay opened due to the browser triggering
        // subsequent mouseenter, mouseleave, and mouseenter events

        // Arrange
        const ue = userEvent.setup({
            advanceTimers: jest.advanceTimersByTimeAsync,
        });
        render(<Tooltip content="hello, world">an anchor</Tooltip>);

        // Act
        const anchor = await screen.findByText("an anchor");
        // Trigger initial mouseenter event on anchor and let the timeout complete
        // to activate the tooltip
        await ue.hover(anchor);
        await jest.runAllTimers();
        // We add `hidden: true` because the tooltip is initially hidden while
        // it is re-positioned
        await screen.findByRole("tooltip", {hidden: true});
        // Trigger mouseleave and mouseenter event and run timers only after
        // both have been triggered. This simulates the mouseenter event being
        // triggered before the tooltip is closed from the mouseleave event
        await ue.unhover(anchor);
        await ue.hover(anchor);
        await jest.runAllTimers();

        // Assert
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
});
