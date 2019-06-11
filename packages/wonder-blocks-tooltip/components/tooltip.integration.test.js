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

        expect(wrapper).toHaveState("timeoutID", null);
    });

    it("should set a timeout on mouseleave on TooltipAnchor", () => {
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        wrapper.setState({active: true});

        const bubbleWrapper = wrapper.find(TooltipBubble);
        expect(bubbleWrapper.length).toEqual(1);

        const anchorWrapper = wrapper.find(TooltipAnchor);
        expect(anchorWrapper.length).toEqual(1);

        const anchorInstance = anchorWrapper.instance();
        anchorInstance._setActiveState(true, false);

        anchorWrapper.simulate("mouseleave");
        expect(wrapper.state("timeoutID")).toEqual(expect.any(Number));
        expect(wrapper.state("active")).toEqual(true);
    });

    it("should disable the timeout if the mouse hovers over TooltipAnchor within the TooltipDisappearanceDelay", () => {
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        wrapper.setState({active: true});

        const bubbleWrapper = wrapper.find(TooltipBubble);
        expect(bubbleWrapper.length).toEqual(1);

        const anchorWrapper = wrapper.find(TooltipAnchor);
        expect(anchorWrapper.length).toEqual(1);

        const anchorInstance = anchorWrapper.instance();
        anchorInstance._setActiveState(true, false);

        anchorWrapper.simulate("mouseleave");

        jest.advanceTimersByTime(TooltipDisappearanceDelay / 2);

        bubbleWrapper.simulate("mouseenter");
        expect(wrapper.state("timeoutID")).toEqual(null);
        expect(wrapper.state("active")).toEqual(true);
    });

    it("should close TooltipBubble on mouseleave on TooltipBubble", () => {
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        wrapper.setState({active: true});

        const bubbleWrapper = wrapper.find(TooltipBubble);
        expect(bubbleWrapper.length).toEqual(1);

        const anchorWrapper = wrapper.find(TooltipAnchor);
        expect(anchorWrapper.length).toEqual(1);

        const anchorInstance = anchorWrapper.instance();
        anchorInstance._setActiveState(true, false);

        anchorWrapper.simulate("mouseleave");
        bubbleWrapper.simulate("mouseenter");
        expect(wrapper.state("timeoutID")).toEqual(null);

        bubbleWrapper.simulate("mouseleave");
        expect(wrapper.state("active")).toEqual(false);
    });
});
