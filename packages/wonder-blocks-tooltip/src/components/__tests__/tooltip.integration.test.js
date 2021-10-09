// @flow
import * as React from "react";

import {render, screen, fireEvent} from "@testing-library/react";
// eslint-disable-next-line import/no-unassigned-import
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import Tooltip from "../tooltip.js";

describe("tooltip integration tests", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("should set timeoutId be null when TooltipBubble is active", () => {
        // Arrange
        render(<Tooltip content="hello, world">an anchor</Tooltip>);
        const anchor = screen.getByText("an anchor");

        // Act
        userEvent.hover(anchor);
        // There's a 100ms delay before TooltipAnchor calls _setActiveState with
        // instant set to true.  This second call is what actually triggers the
        // call to this.props.onActiveChanged() which updates Tooltip's active
        // state.
        jest.runAllTimers();

        // Assert
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("should hide the bubble on mouseleave on TooltipAnchor", () => {
        // Arrange
        render(<Tooltip content="hello, world">an anchor</Tooltip>);

        const anchor = screen.getByText("an anchor");
        userEvent.hover(anchor);

        // Act
        userEvent.unhover(anchor);
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
        render(<Tooltip content="hello, world">an anchor</Tooltip>);

        const anchor = screen.getByText("an anchor");
        userEvent.hover(anchor);
        // hover on bubble to keep it active
        const bubbleWrapper = await screen.findByRole("tooltip");
        userEvent.unhover(anchor);

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
