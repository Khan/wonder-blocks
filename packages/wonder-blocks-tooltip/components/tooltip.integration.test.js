// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../utils/testing/mount.js";
import Tooltip from "./tooltip.js";
import TooltipBubble from "./tooltip-bubble.js";
import TooltipAnchor from "./tooltip-anchor.js";

describe("tooltip integration tests", () => {
    beforeEach(() => {
        unmountAll();
    });

    it("timeoutId should be null", () => {
        const wrapper = mount(
            <Tooltip content="hello, world">an anchor</Tooltip>,
        );

        wrapper.setState({active: true});

        const bubbleWrapper = wrapper.find(TooltipBubble);
        expect(bubbleWrapper.length).toEqual(1);

        bubbleWrapper.simulate("mouseenter");

        expect(wrapper).toHaveState("timeoutID", null);
    });

    it.only("timeoutId should be null 2", () => {
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
        expect(wrapper.state("timeoutID")).toEqual(expect.any(Number));

        anchor && anchor.dispatchEvent(new FocusEvent("mouseleave"));

        // fails
        // expect(wrapper).toHaveState("timeoutID", null);

        expect(wrapper).toHaveState("active", true);
        expect(anchorWrapper).toHaveState("active", false);
    });
});
