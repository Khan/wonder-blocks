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
    });

    it("should set timeoutId be null when TooltipBubble is active", () => {
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        wrapper.setState({active: true});

        const bubbleWrapper = wrapper.find(TooltipBubble);
        expect(bubbleWrapper.length).toEqual(1);

        bubbleWrapper.simulate("mouseenter");

        expect(wrapper).toHaveState("timeoutID", null);
    });

    it("should set a timeout on mouseleave", () => {
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        wrapper.setState({active: true});

        const bubbleWrapper = wrapper.find(TooltipBubble);
        expect(bubbleWrapper.length).toEqual(1);

        const anchorWrapper = wrapper.find(TooltipAnchor);
        expect(anchorWrapper.length).toEqual(1);

        const anchor = anchorWrapper.getDOMNode();
        // start hovering
        anchor && anchor.dispatchEvent(new FocusEvent("mouseenter"));
        anchor && anchor.dispatchEvent(new FocusEvent("mouseleave"));

        jest.advanceTimersByTime(TooltipDisappearanceDelay / 2);
        expect(wrapper.state("timeoutID")).toEqual(expect.any(Number));
        expect(wrapper.state("active")).toEqual(true);
    });

    it("should eventually disable the TooltipBubble after mouseleave", () => {
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        wrapper.setState({active: true});

        const bubbleWrapper = wrapper.find(TooltipBubble);
        expect(bubbleWrapper.length).toEqual(1);

        const anchorWrapper = wrapper.find(TooltipAnchor);
        expect(anchorWrapper.length).toEqual(1);

        const anchor = anchorWrapper.getDOMNode();
        // start hovering
        anchor && anchor.dispatchEvent(new FocusEvent("mouseenter"));
        anchor && anchor.dispatchEvent(new FocusEvent("mouseleave"));
        expect(wrapper.state("timeoutID")).toEqual(expect.any(Number));

        jest.advanceTimersByTime(TooltipDisappearanceDelay + 10);
        expect(wrapper.state("timeoutID")).toEqual(null);
        expect(wrapper.state("active")).toEqual(false);
    });

    it("should disable the timeout if the mouse hovers over anchor within the TooltipDisappearanceDelay", () => {
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        wrapper.setState({active: true});

        const bubbleWrapper = wrapper.find(TooltipBubble);
        expect(bubbleWrapper.length).toEqual(1);

        const anchorWrapper = wrapper.find(TooltipAnchor);
        expect(anchorWrapper.length).toEqual(1);

        const anchor = anchorWrapper.getDOMNode();
        // start hovering
        anchor && anchor.dispatchEvent(new FocusEvent("mouseenter"));
        anchor && anchor.dispatchEvent(new FocusEvent("mouseleave"));
        expect(wrapper.state("timeoutID")).toEqual(expect.any(Number));

        jest.advanceTimersByTime(TooltipDisappearanceDelay / 2);
        anchor && anchor.dispatchEvent(new FocusEvent("mouseenter"));

        expect(wrapper.state("timeoutID")).toEqual(null);
        expect(wrapper.state("active")).toEqual(true);
    });
});
