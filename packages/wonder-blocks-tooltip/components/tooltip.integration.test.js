// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../utils/testing/mount.js";
import Tooltip from "./tooltip.js";
import TooltipBubble from "./tooltip-bubble.js";
import TooltipAnchor from "./tooltip-anchor.js";
import {TooltipDisappearanceDelay} from "../util/constants.js";

describe("tooltip integration tests", () => {
    beforeEach(() => {
        unmountAll();
        jest.useFakeTimers();
        // jest.clearAllMocks().resetModules();
    });

    it("should set timeoutId be null when TooltipBubble is active", () => {
        // Arrange
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );
        const anchor = wrapper.find(TooltipAnchor).getDOMNode();

        // Act
        anchor && anchor.dispatchEvent(new FocusEvent("mouseenter"));
        // There's a 100ms delay before TooltipAnchor calls _setActiveState with
        // instant set to true.  This second call is what actually triggers the
        // call to this.props.onActiveChanged() which updates Tooltip's active
        // state.
        jest.runAllTimers();
        // Since the call to update Tooltip's active state happens in a timeout
        // we need to call update b/c it happens outside of the normal React lifecycle
        // methods.
        wrapper.update();

        // Assert
        expect(wrapper).toContainMatchingElement(TooltipBubble);
        expect(wrapper).toHaveState("timeoutID", null);
    });

    it("should set a timeout on mouseleave on TooltipAnchor", () => {
        // Arrange
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );
        const anchor = wrapper.find(TooltipAnchor).getDOMNode();
        anchor && anchor.dispatchEvent(new FocusEvent("mouseenter"));
        jest.runAllTimers();
        wrapper.update();

        // Act
        anchor && anchor.dispatchEvent(new FocusEvent("mouseleave"));
        wrapper.update();

        // Assert
        expect(wrapper.state("timeoutID")).toEqual(expect.any(Number));
        expect(wrapper.state("active")).toEqual(true);
    });

    it("should disable the timeout if the mouse hovers over TooltipAnchor within the TooltipDisappearanceDelay", () => {
        // Arrange
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        const anchor = wrapper.find(TooltipAnchor).getDOMNode();
        anchor && anchor.dispatchEvent(new FocusEvent("mouseenter"));
        jest.runAllTimers();
        wrapper.update();

        const bubbleWrapper = wrapper.find(TooltipBubble);

        // Act
        anchor && anchor.dispatchEvent(new FocusEvent("mouseleave"));
        jest.advanceTimersByTime(TooltipDisappearanceDelay / 2);
        wrapper.update();

        bubbleWrapper.simulate("mouseenter");
        jest.advanceTimersByTime(TooltipDisappearanceDelay + 100);
        wrapper.update();

        // Assert
        expect(wrapper.state("timeoutID")).toEqual(null);
        expect(wrapper).toContainMatchingElement(TooltipBubble);
        expect(wrapper.state("active")).toEqual(true);
    });

    it("should close TooltipBubble on mouseleave on TooltipBubble", () => {
        // Arrange
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        const anchor = wrapper.find(TooltipAnchor).getDOMNode();
        anchor && anchor.dispatchEvent(new FocusEvent("mouseenter"));
        jest.runAllTimers();
        wrapper.update();

        const bubbleWrapper = wrapper.find(TooltipBubble);

        // Act
        bubbleWrapper.simulate("mouseleave");

        // Assert
        expect(wrapper.state("timeoutID")).toEqual(null);
        expect(wrapper).not.toContainMatchingElement(TooltipBubble);
        expect(wrapper.state("active")).toEqual(false);
    });
});
