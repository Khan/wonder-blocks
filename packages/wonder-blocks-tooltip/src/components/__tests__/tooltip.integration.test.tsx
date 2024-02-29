import * as React from "react";

import {render, screen, fireEvent} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import Tooltip from "../tooltip";

describe("tooltip integration tests", () => {
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
        // There's a 100ms delay before TooltipAnchor calls _setActiveState with
        // instant set to true.  This second call is what actually triggers the
        // call to this.props.onActiveChanged() which updates Tooltip's active
        // state.
        jest.runAllTimers();

        // Assert
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("should close TooltipBubble on mouseleave on TooltipBubble", async () => {
        // Arrange
        const ue = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
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
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
});
